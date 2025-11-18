from typing import List, Dict
import pandas as pd
from sklearn.linear_model import LinearRegression
from supabase_client import supabase
import traceback

# Global cache to prevent re-fetching 30k rows on every request
_cached_df = None

def get_data_as_dataframe() -> pd.DataFrame:
    """
    Fetches ALL records from Supabase using pagination to bypass the 1000-row limit.
    """
    global _cached_df
    
    # Return cached data if available and not empty
    if _cached_df is not None and not _cached_df.empty:
        return _cached_df.copy()

    all_data = []
    offset = 0
    limit = 1000  # Fetch 1000 rows at a time
    
    print("Fetching data from Supabase...")
    
    try:
        while True:
            # Fetch chunk
            response = supabase.table("aqi_readings").select("*").range(offset, offset + limit - 1).execute()
            data = response.data
            
            if not data:
                break
                
            all_data.extend(data)
            
            if len(data) < limit:
                break # End of table reached
                
            offset += limit
            print(f"Fetched {len(all_data)} rows...")

    except Exception as e:
        print("Error fetching from Supabase:", traceback.format_exc())
        if not all_data: # If we failed completely, raise error
            raise e
            
    print(f"Total rows fetched: {len(all_data)}")

    df = pd.DataFrame(all_data)
    
    if df.empty:
        return df

    # --- Data Cleaning & Normalization ---
    
    # 1. Normalize columns to lowercase (Fixes 'City' vs 'city')
    df.columns = df.columns.str.lower()
    
    # 2. Fix specific CSV naming issues
    if 'pm2.5' in df.columns:
        df.rename(columns={'pm2.5': 'pm2_5'}, inplace=True)

    # 3. Standardize Date
    date_col = 'date' if 'date' in df.columns else 'created_at'
    if date_col in df.columns:
        df[date_col] = pd.to_datetime(df[date_col], utc=True, errors="coerce")
        df['date'] = df[date_col] 

    # 4. Numeric Conversion & Mean Imputation
    numeric_cols = ["pm2_5", "pm10", "no", "no2", "nox", "nh3", "co", "so2", "o3", "benzene", "toluene", "xylene", "aqi"] 
    for col in numeric_cols:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors="coerce")
            df[col] = df[col].fillna(df[col].mean())

    # 5. Clean City Names
    if "city" in df.columns:
        df["city"] = df["city"].astype(str).str.strip()

    # Update cache
    _cached_df = df
    return df

def identify_improving_cities(min_points: int = 3) -> List[Dict[str, object]]:
    df = get_data_as_dataframe()
    if df.empty or 'date' not in df.columns: return []

    analysis_df = df.dropna(subset=["date", "aqi", "city"]).copy()
    results = []
    
    for city, group in analysis_df.groupby("city"):
        try:
            if len(group) < min_points: continue
            group = group.sort_values("date")
            timestamps = group["date"].apply(lambda x: x.timestamp()).values.reshape(-1, 1)
            y = group["aqi"].values.reshape(-1, 1)
            model = LinearRegression().fit(timestamps, y)
            slope = float(model.coef_[0][0]) * (86400 * 365.25)
            if slope < 0:
                results.append({"city": city, "slope_per_year": slope, "n_points": int(len(group))})
        except: continue
        
    return sorted(results, key=lambda r: r["slope_per_year"])

def get_aqi_by_date(city: str) -> List[Dict[str, object]]:
    """Returns historical data for a specific city from the full dataframe."""
    df = get_data_as_dataframe()
    if df.empty or 'date' not in df.columns: return []
    
    # Filter case-insensitive
    city_df = df[df["city"].str.lower() == city.lower()].copy()
    
    if city_df.empty:
        return []

    city_df = city_df.sort_values("date")
    
    return [
        {"date": row["date"].strftime('%Y-%m-%d'), "aqi": row["aqi"]}
        for _, row in city_df.iterrows()
    ]

def get_yearly_aqi_average(city: str) -> List[Dict[str, object]]:
    df = get_data_as_dataframe()
    if df.empty or 'date' not in df.columns: return []
    
    city_df = df[df['city'].str.lower() == city.lower()].copy()
    city_df['year'] = city_df['date'].dt.year
    
    yearly_avg = city_df.groupby('year')['aqi'].mean().reset_index().rename(columns={'aqi': 'average_aqi'})
    return yearly_avg.to_dict(orient='records')