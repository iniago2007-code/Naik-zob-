import pickle
import sys
import os
import pandas as pd

class FruitData:
    def __init__(self, train_csv, test_csv):
        pass
    def _parse_production(self):
        pass
    def get_country_info(self, country_name: str):
        pass

pickle_path = 'fruit_data.pkl'

try:
    with open(pickle_path, 'rb') as f:
        data = pickle.load(f)
    print("✅ SUCCESS: Loaded pickle!")
    print(f"Columns: {data.df.columns.tolist()}")
    
    # Test get_country_info logic
    country_name = "Nigeria"
    mask = data.df['Country'].str.contains(country_name, case=False, na=False)
    results = data.df[mask]
    if len(results) > 0:
        row = results.iloc[0]
        print(f"Sample row for Nigeria: {row.to_dict()}")
        if 'production_dict' in row:
            print(f"production_dict found: {row['production_dict']}")
        else:
            print("❌ ERROR: production_dict NOT found in row!")
    else:
        print(f"No results for {country_name}")

except Exception as e:
    print(f"❌ ERROR: {e}")
