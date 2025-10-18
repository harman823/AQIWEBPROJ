import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import joblib
import sys
from analytics import get_data_as_dataframe

def train_model():
    """
    Fetches data from Supabase, trains a machine learning model, and saves it.
    """
    try:
        print("Fetching data from Supabase for model training...")
        df = get_data_as_dataframe()

        if df.empty:
            print("Error: No data was fetched from Supabase. The 'aqi_readings' table might be empty.", file=sys.stderr)
            sys.exit(1)
        
        # --- Feature Engineering ---
        df['reading_date'] = pd.to_datetime(df['reading_date'])
        df['month'] = df['reading_date'].dt.month
        df['day_of_year'] = df['reading_date'].dt.dayofyear
        df['day_of_week'] = df['reading_date'].dt.dayofweek
        df['city'] = df['city'].str.strip().str.title()

        for col in ['pm2_5', 'pm10', 'no2']:
            if df[col].isnull().any():
                df[col].fillna(df[col].mean(), inplace=True)

        le = LabelEncoder()
        df['city_encoded'] = le.fit_transform(df['city'])

        # --- Model Training ---
        features = ['city_encoded', 'month', 'day_of_year', 'day_of_week', 'pm2_5', 'pm10', 'no2']
        target = 'aqi'
        X = df[features].fillna(0)
        y = df[target]

        X_train, _, y_train, _ = train_test_split(X, y, test_size=0.2, random_state=42)

        print("Training RandomForestRegressor model...")
        model = RandomForestRegressor(n_estimators=100, random_state=42, n_jobs=-1)
        model.fit(X_train, y_train)

        # --- Save Model and Encoder ---
        joblib.dump(model, 'aqi_predictor.joblib')
        joblib.dump(le, 'city_label_encoder.joblib')

        print("✅ Model and label encoder have been saved successfully.")

    except Exception as e:
        print(f"An error occurred during model training: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    train_model()

