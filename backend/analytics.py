"""
analytics.py

Contains data analysis functions that use the Supabase client.
"""

from typing import List, Dict
import pandas as pd
from sklearn.linear_model import LinearRegression
from supabase_client import supabase


def get_data_as_dataframe() -> pd.DataFrame:
    """
    Fetches all records from public.aqi_readings table and returns a pandas DataFrame.
    """
    try:
        # The execute() method returns an APIResponse object
        response = supabase.table("aqi_readings").select("*").execute()

        # The actual data is in the 'data' attribute of the response
        if response.data:
            df = pd.DataFrame(response.data)
            df['reading_date'] = pd.to_datetime(df['reading_date'])
            return df
        else:
            # If there's no data, return an empty DataFrame
            return pd.DataFrame()

    except Exception as e:
        print(f"Error fetching data from Supabase: {e}")
        # Return an empty DataFrame on error
        return pd.DataFrame()


def identify_improving_cities() -> List[Dict[str, any]]:
    """
    Identifies cities with an improving AQI trend using linear regression.
    Returns a list of dictionaries, each containing the city and its trend slope.
    """
    df = get_data_as_dataframe()

    if df.empty:
        return []

    improving_cities = []
    # Group by city and perform regression for each
    for city_name, group in df.groupby('city'):
        if len(group) < 3:  # Need at least 3 data points for a meaningful trend
            continue

        # Prepare data for regression
        group = group.sort_values('reading_date').copy()
        # Convert dates to numerical values (timestamps)
        group['time'] = group['reading_date'].astype('int64') // 10**9
        
        X = group[['time']]
        y = group['aqi']

        # Fit the model
        model = LinearRegression()
        model.fit(X, y)

        # A negative slope indicates an improving trend (lower AQI over time)
        slope = model.coef_[0]
        if slope < 0:
            improving_cities.append({
                "city": city_name,
                "trend_slope": slope
            })

    # Sort by the most rapidly improving (most negative slope)
    improving_cities.sort(key=lambda x: x['trend_slope'])
    return improving_cities