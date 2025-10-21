from typing import List, Dict
import pandas as pd
from sklearn.linear_model import LinearRegression
from supabase_client import supabase
import traceback

def get_data_as_dataframe() -> pd.DataFrame:
    """
    Fetches all records from public.aqi_readings and returns a pandas DataFrame.
    """
    try:
        response = supabase.table("aqi_readings").select("*").execute()
        data = response.data
        if not data:
            return pd.DataFrame()
    except Exception as e:
        print("Error fetching from Supabase in get_data_as_dataframe:")
        traceback.print_exc()
        raise e

    df = pd.DataFrame(data)
    # ✨ CHANGE ✨: Only need to process 'created_at' now
    if 'created_at' in df.columns:
        df['created_at'] = pd.to_datetime(df['created_at'], utc=True, errors="coerce")

    numeric_cols = ["pm2_5", "pm10", "no2", "aqi"]
    for col in numeric_cols:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors="coerce")
    if "city" in df.columns:
        df["city"] = df["city"].astype(str).str.strip()
    return df

def identify_improving_cities(min_points: int = 3) -> List[Dict[str, object]]:
    """
    Performs a linear regression of AQI over time for each city.
    """
    df = get_data_as_dataframe()
    if df.empty:
        return []

    # ✨ CHANGE ✨: Use 'created_at'
    analysis_df = df.dropna(subset=["created_at", "aqi", "city"]).copy()
    if analysis_df.empty:
        return []

    results = []
    for city, group in analysis_df.groupby("city"):
        try:
            if len(group) < min_points:
                continue
            # ✨ CHANGE ✨: Use 'created_at'
            group = group.sort_values("created_at")
            # ✨ CHANGE ✨: Use 'created_at'
            timestamps = group["created_at"].apply(lambda x: x.timestamp()).values.reshape(-1, 1)
            y = group["aqi"].values.reshape(-1, 1)
            model = LinearRegression()
            model.fit(timestamps, y)
            slope_per_second = float(model.coef_[0][0])
            slope_per_year = slope_per_second * (86400 * 365.25)
            if slope_per_year < 0:
                results.append({
                    "city": city,
                    "slope_per_year": slope_per_year,
                    "n_points": int(len(group)),
                })
        except Exception:
            continue
    return sorted(results, key=lambda r: r["slope_per_year"])

def get_aqi_by_date(city: str) -> List[Dict[str, object]]:
    """
    Returns the historical AQI data for a given city.
    """
    df = get_data_as_dataframe()
    if df.empty:
        return []
    
    city_df = df[df["city"] == city].copy()
    if city_df.empty:
        return []

    # ✨ CHANGE ✨: Use 'created_at'
    city_df = city_df.dropna(subset=["created_at", "aqi"]).sort_values("created_at")
    
    return [
        # ✨ CHANGE ✨: Use 'created_at' but keep the JSON key as 'date' for frontend compatibility
        {"date": row["created_at"].isoformat(), "aqi": row["aqi"]}
        for _, row in city_df.iterrows()
    ]

def get_yearly_aqi_average(city: str) -> List[Dict[str, object]]:
    """
    Calculates the average AQI per year for a given city.
    """
    df = get_data_as_dataframe()
    if df.empty:
        return []
    
    city_df = df[df['city'] == city].copy()
    if city_df.empty:
        return []

    # ✨ CHANGE ✨: Use 'created_at'
    city_df = city_df.dropna(subset=['created_at', 'aqi'])
    city_df['year'] = city_df['created_at'].dt.year
    
    yearly_avg = city_df.groupby('year')['aqi'].mean().reset_index()
    yearly_avg.rename(columns={'aqi': 'average_aqi'}, inplace=True)
    
    return yearly_avg.to_dict(orient='records')