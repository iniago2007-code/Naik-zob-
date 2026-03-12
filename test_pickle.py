import pickle
import sys
import os

# Define the class exactly as it might be stored in the pickle
# If it was defined in a notebook, it might be __main__.FruitData
class FruitData:
    def __init__(self, train_csv, test_csv):
        pass
    def _parse_production(self):
        pass
    def get_country_info(self, country_name: str):
        pass

pickle_path = 'fruit_data.pkl'

print(f"Checking for pickle at: {os.path.abspath(pickle_path)}")
if not os.path.exists(pickle_path):
    print(f"ERROR: File not found: {pickle_path}")
    sys.exit(1)

try:
    with open(pickle_path, 'rb') as f:
        data = pickle.load(f)
    print("✅ SUCCESS: Loaded pickle!")
    print(f"Data type: {type(data)}")
    print(f"Data dict: {data.__dict__.keys()}")
except Exception as e:
    print(f"❌ ERROR: Failed to load pickle: {e}")
    import traceback
    traceback.print_exc()
