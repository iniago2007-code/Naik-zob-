import os
import pandas as pd
import re
import pickle
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional

# The class definition must match the one used to create the pickle
class FruitData:
    def __init__(self, train_csv, test_csv):
        # Load and combine data
        train = pd.read_csv(train_csv)
        test = pd.read_csv(test_csv)
        self.df = pd.concat([train, test], ignore_index=True)
        self._parse_production()

    def _parse_production(self):
        """Convert 'Annual Production (tonnes)' column into a dictionary column."""
        def parse(prod_str):
            if pd.isna(prod_str) or prod_str.strip() == "":
                return {}
            prod_dict = {}
            parts = prod_str.split('|')
            for part in parts:
                match = re.search(r'([A-Za-z\s]+):\s*([\d,]+)', part)
                if match:
                    fruit = match.group(1).strip()
                    amount_str = match.group(2).replace(',', '')
                    try:
                        amount = int(amount_str)
                        prod_dict[fruit] = amount
                    except:
                        pass
            return prod_dict

        self.df['production_dict'] = self.df['Annual Production (tonnes)'].apply(parse)

    def get_country_info(self, country_name: str) -> Optional[dict]:
        """Return details for a country (case‑insensitive partial match)."""
        mask = self.df['Country'].str.contains(country_name, case=False, na=False)
        results = self.df[mask]

        if len(results) == 0:
            return None
        
        row = results.iloc[0]
        
        # Convert row to dictionary format suitable for JSON response
        data = {
            "country": str(row['Country']),
            "region": str(row['Region']),
            "main_fruits_produced": str(row['Main Fruits Produced']),
            "production_rating": int(row['Production Rating (1-10)']) if pd.notna(row['Production Rating (1-10)']) else None,
            "production_season": str(row['Production Season']),
            "notes": str(row['Notes']),
            "detailed_production": row['production_dict'] if isinstance(row['production_dict'], dict) else {}
        }
        return data


app = FastAPI(title="Farming Prediction API")

# Configure CORS for Vite React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all origins for local dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global instance of our data logic, initialized at startup
fruit_data = None

# Custom unpickler to handle module name mismatches
class CustomUnpickler(pickle.Unpickler):
    def find_class(self, module, name):
        if name == 'FruitData':
            return FruitData
        return super().find_class(module, name)

@app.on_event("startup")
def startup_event():
    global fruit_data
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    pickle_path = os.path.join(base_dir, 'fruit_data.pkl')
    
    print(f"🔄 Checking for pickle file at: {pickle_path}")
    if os.path.exists(pickle_path):
        try:
            with open(pickle_path, 'rb') as f:
                unpickler = CustomUnpickler(f)
                fruit_data = unpickler.load()
            print(f"✅ SUCCESSFULLY loaded fruit data from {pickle_path}")
            print(f"📈 Loaded {len(fruit_data.df)} records")
        except Exception as e:
            print(f"❌ ERROR: Failed to load pickle file: {e}")
            import traceback
            traceback.print_exc()
            fruit_data = None
    else:
        print(f"❌ ERROR: Could not find pickle file at {pickle_path}")
        # Fallback to CSV if pickle is missing
        train_csv = os.path.join(base_dir, 'africa_fruit_train.csv')
        test_csv = os.path.join(base_dir, 'africa_fruit_test.csv')
        if os.path.exists(train_csv) and os.path.exists(test_csv):
            print("⚠️ Falling back to CSV loading...")
            fruit_data = FruitData(train_csv, test_csv)
        else:
            print("❌ ERROR: CSV files also missing!")
            fruit_data = None


@app.get("/api/countries")
def get_countries():
    if not fruit_data:
        raise HTTPException(status_code=500, detail="Data not loaded properly on the server.")
    
    try:
        # Get unique countries and sort them
        countries = sorted(fruit_data.df['Country'].unique().tolist())
        return countries
    except Exception as e:
        print(f"❌ ERROR inside get_countries: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/country/{name}")
def get_prediction_for_country(name: str):
    if not fruit_data:
        print("❌ ERROR: fruit_data is None")
        raise HTTPException(status_code=500, detail="Data not loaded properly on the server.")
    
    print(f"🔍 Searching for country: {name}")
    try:
        info = fruit_data.get_country_info(name)
        if not info:
            print(f"⚠️ No data found for: {name}")
            raise HTTPException(status_code=404, detail=f"No prediction data found for country: {name}")
        
        print(f"✅ Found data for {name}, type: {type(info)}")
        
        # If the pickled object returns a pandas Series, convert to dict
        if hasattr(info, 'to_dict'):
            print("📦 Converting Series to dict...")
            row_dict = info.to_dict()
            # Construct the API response format
            response = {
                "country": str(row_dict.get('Country', name)),
                "region": str(row_dict.get('Region', 'Unknown')),
                "main_fruits_produced": str(row_dict.get('Main Fruits Produced', '')),
                "production_rating": int(row_dict.get('Production Rating (1-10)', 0)) if pd.notna(row_dict.get('Production Rating (1-10)')) else 0,
                "production_season": str(row_dict.get('Production Season', '')),
                "notes": str(row_dict.get('Notes', '')),
                "detailed_production": row_dict.get('production_dict', {})
            }
            return response
        
        return info
    except Exception as e:
        print(f"❌ ERROR inside get_prediction_for_country: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
