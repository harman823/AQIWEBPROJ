import pandas as pd
from sklearn.linear_model import LinearRegression
from supabase_client import supabase

def get_data_as_dataframe() -> pd.DataFrame:
    """
    Fetches all data from the aqi_readings table in Supabase and returns a pandas DataFrame.
    """
    try:
        response = supabase.table("aqi_readings").select("*").execute()
        if response.data:
            df = pd.DataFrame(response.data)
            df['reading_date'] = pd.to_datetime(df['reading_date'])
            # Normalize city names to avoid case sensitivity issues (e.g., "london" vs "London")
            df['city'] = df['city'].str.title()
            return df
        return pd.DataFrame()
    except Exception as e:
        print(f"Error fetching data from Supabase: {e}")
        return pd.DataFrame()

def identify_improving_cities():
    """
    Identifies cities with an improving AQI trend and returns detailed statistics.
    """
    df = get_data_as_dataframe()
    if df.empty or 'aqi' not in df.columns or 'reading_date' not in df.columns:
        return []

    improving_cities = []
    
    for city_name, group in df.groupby('city'):
        if len(group) < 3:  # A trend requires at least 3 data points
            continue

        group = group.sort_values('reading_date').copy()
        
        # Create a numerical feature for time: number of days since the first reading
        group['time_delta'] = (group['reading_date'] - group['reading_date'].min()).dt.days
        
        X = group[['time_delta']]
        y = group['aqi']

        model = LinearRegression()
        model.fit(X, y)
        
        # The slope represents the change in AQI per day
        slope_per_day = model.coef_[0]
        
        # A negative slope means the AQI is decreasing (improving)
        if slope_per_day < 0:
            improving_cities.append({
                "city": city_name,
                "slope_per_year": slope_per_day * 365.25 # Annualize the trend for better readability
            })
            
    # Sort by the most rapidly improving cities first
    improving_cities.sort(key=lambda x: x['slope_per_year'])
    return improving_cities

