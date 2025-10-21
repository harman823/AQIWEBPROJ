import pandas as pd
from supabase_client import fetch_city_data, fetch_all_data
import pickle
import os

def get_yearly_data(city):
    """Fetches and processes yearly average AQI data for a city."""
    data = fetch_city_data(city)
    if not data:
        return None
    df = pd.DataFrame(data)
    df['reading_date'] = pd.to_datetime(df['reading_date'])
    df.set_index('reading_date', inplace=True)
    yearly_df = df.resample('Y').mean(numeric_only=True)
    return yearly_df.reset_index()

def predict_aqi_for_years(city, years=1):
    """Loads a pre-trained model and predicts future AQI."""
    model_path = os.path.join('models', f'{city}_model.pkl')
    if not os.path.exists(model_path):
        return None, "Model for this city has not been trained yet."
    with open(model_path, 'rb') as pkl_file:
        model_results = pickle.load(pkl_file)
    steps = int(years) * 12
    forecast = model_results.get_forecast(steps=steps)
    return forecast.predicted_mean, None

def get_city_rankings_and_yearly_data():
    """Calculates overall and yearly AQI averages for all cities."""
    all_data = fetch_all_data()
    if not all_data:
        return None
    df = pd.DataFrame(all_data)
    df = df.dropna(subset=['aqi', 'reading_date'])
    df['reading_date'] = pd.to_datetime(df['reading_date'])
    df['Year'] = df['reading_date'].dt.year
    
    city_overall_avg = df.groupby('city')['aqi'].mean().sort_values().reset_index()
    city_overall_avg.rename(columns={'aqi': 'Overall_Avg_AQI'}, inplace=True)
    
    city_yearly_avg = df.groupby(['city', 'Year'])['aqi'].mean().reset_index()
    
    ranked_cities = []
    for index, row in city_overall_avg.iterrows():
        city_name = row['city']
        yearly_data = city_yearly_avg[city_yearly_avg['city'] == city_name]
        
        ranked_cities.append({
            'City': city_name,
            'Overall_Avg_AQI': row['Overall_Avg_AQI'],
            'Yearly_AQI': yearly_data.rename(columns={'aqi': 'AQI'}).to_dict(orient='records')
        })
    return ranked_cities