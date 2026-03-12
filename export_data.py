import pickle
import json
import pandas as pd
import re

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

with open("fruit_data.pkl", "rb") as f:
    fruit_data = pickle.load(f)

# Export to both the requested locations
# 1. Root data.json
data = fruit_data.df.to_dict(orient="records")
with open("data.json", "w") as f:
    json.dump(data, f, indent=2)

# 2. Frontend data file (Consolidated into public/data.json)
import os
import shutil

# Save consolidated file
with open("frontend/public/data.json", "w") as f:
    json.dump(data, f, indent=2)

# Clean up the old directory if it exists
old_data_dir = "frontend/public/data"
if os.path.exists(old_data_dir):
    shutil.rmtree(old_data_dir)

print("✅ Data consolidated and exported successfully to data.json and frontend/public/data.json")
