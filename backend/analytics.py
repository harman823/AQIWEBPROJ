"""
analytics.py

Contains data analysis functions that use the Supabase client.
Functions:
- get_data_as_dataframe(): fetches all records from public.aqi_readings into a pandas DataFrame.
- identify_improving_cities(): runs per-city linear regressions on AQI over time and returns cities
  with negative slope (improving trend).
"""

from typing import List, Dict
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from supabase_client import supabase


def get_data_as_dataframe() -> pd.DataFrame:
    """
    Fetches all records from public.aqi_readings table and returns a pandas DataFrame.
    Ensures reading_date is converted to datetime dtype (timezone-aware if present).
    """
    # supabase.client.table("aqi_readings").select("*").execute()
    response = supabase.table("aqi_readings").select("*").execute()
    if response.status_code not in (200, 201):
        # handle gracefully by raising exception
        raise RuntimeError(
            f"Failed to fetch data from Supabase. status_code={response.status_code} "
            f"error={response.data}"
        )

    data = response.data  # list of records (dicts)
    if not data:
        # Return empty DataFrame with expected columns
        return pd.DataFrame(
            columns=["id", "city", "reading_date", "pm2_5", "pm10", "no2", "aqi", "created_at"]
        )

    df = pd.DataFrame(data)

    # Convert reading_date and created_at to datetime types
    for col in ["reading_date", "created_at"]:
        if col in df.columns:
            df[col] = pd.to_datetime(df[col], utc=True, errors="coerce")

    # Ensure columns have correct dtypes where possible
    numeric_cols = ["pm2_5", "pm10", "no2", "aqi"]
    for col in numeric_cols:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors="coerce")

    # Normalize city names (strip whitespace) — optional but helpful
    if "city" in df.columns:
        df["city"] = df["city"].astype(str).str.strip()

    return df


def identify_improving_cities(min_points: int = 3) -> List[Dict[str, object]]:
    """
    For each city, performs a linear regression of AQI over time.
    If the slope is negative, the city is considered 'improving'.
    Returns a list of dicts: [{ "city": str, "slope": float, "n_points": int }, ...]
    - min_points: minimum number of data points per city to be considered for regression (default 3)
    """
    df = get_data_as_dataframe()

    # If no data, return empty list
    if df.empty:
        return []

    # Drop rows with missing reading_date or aqi
    analysis_df = df.dropna(subset=["reading_date", "aqi", "city"]).copy()

    if analysis_df.empty:
        return []

    results = []

    # Group by city and perform regression for each
    for city, group in analysis_df.groupby("city"):
        # sort by date
        group = group.sort_values("reading_date")

        if len(group) < min_points:
            # Optionally skip cities with too few data points to be meaningful
            continue

        # Convert reading_date to numeric (seconds since epoch) for regression
        # Use float seconds to avoid integer overflow
        # pandas datetime64[ns] -> astype("int64") gives nanoseconds since epoch
        try:
            timestamps_ns = group["reading_date"].astype("int64").values  # nanoseconds
            # convert to seconds as float
            timestamps = timestamps_ns.astype(np.float64) / 1e9
        except Exception:
            # fallback: use pandas.Timestamp.timestamp()
            timestamps = group["reading_date"].map(lambda ts: ts.timestamp()).values

        X = timestamps.reshape(-1, 1)  # shape (n_samples, 1)
        y = group["aqi"].astype(np.float64).values.reshape(-1, 1)

        # Fit linear regression
        model = LinearRegression()
        model.fit(X, y)
        slope = float(model.coef_[0][0])  # slope in aqi units per second

        # For readability, convert slope to change per 30 days (approx) or per year if desired.
        # But we will return raw slope (aqi units per second) plus an optionally scaled slope per year.
        slope_per_day = slope * 86400  # aqi change per day
        slope_per_year = slope_per_day * 365.25

        if slope < 0:
            results.append(
                {
                    "city": city,
                    "slope_per_second": slope,
                    "slope_per_day": slope_per_day,
                    "slope_per_year": slope_per_year,
                    "n_points": int(len(group)),
                }
            )

    # Sort improving cities by magnitude of improvement (most negative slope_per_year first)
    results = sorted(results, key=lambda r: r["slope_per_year"])

    return results
