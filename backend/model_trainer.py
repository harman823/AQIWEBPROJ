import pandas as pd
import statsmodels.api as sm
from supabase_client import fetch_all_data
import pickle
import os
import warnings

warnings.filterwarnings("ignore")

def train_and_save_models():
    """
    Fetches all data from the aqi_readings table, fills missing values,
    and trains a model for every city.
    """
    print("Starting model training process with 'aqi_readings' table...")
    all_data = fetch_all_data()
    if not all_data:
        return {"status": "error", "message": "Could not fetch data."}

    df = pd.DataFrame(all_data)
    df['reading_date'] = pd.to_datetime(df['reading_date'])
    
    pollutant_columns = ['pm2_5', 'pm10', 'no2', 'aqi']
    
    if not os.path.exists('models'):
        os.makedirs('models')
        
    cities = df['city'].unique()
    trained_models = []
    
    for city_name in cities:
        print(f"Processing and training for {city_name}...")
        city_df = df[df['city'] == city_name].copy()
        
        for col in pollutant_columns:
            if col in city_df.columns:
                city_mean = city_df[col].mean()
                city_df[col].fillna(city_mean, inplace=True)

        city_df.set_index('reading_date', inplace=True)
        y = city_df['aqi'].resample('M').mean()

        if y.empty or y.isnull().all():
            print(f"Skipping {city_name} due to no valid AQI data.")
            continue

        try:
            seasonal_order = (1, 1, 1, 12) if len(y) >= 12 else (0, 0, 0, 0)
            model = sm.tsa.statespace.SARIMAX(y,
                                              order=(1, 1, 1),
                                              seasonal_order=seasonal_order,
                                              enforce_stationarity=False,
                                              enforce_invertibility=False)
            results = model.fit(disp=False)
            
            model_path = os.path.join('models', f'{city_name}_model.pkl')
            with open(model_path, 'wb') as pkl_file:
                pickle.dump(results, pkl_file)
            
            trained_models.append(city_name)
            print(f"Successfully trained and saved model for {city_name}.")
        except Exception as e:
            print(f"Could not train model for {city_name}. Error: {e}")

    print("Model training process finished.")
    return {"status": "success", "trained_models": trained_models}