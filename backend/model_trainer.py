import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
import joblib
import traceback
from analytics import get_data_as_dataframe
from datetime import datetime, timedelta
import os

MODEL_DIR = "trained_model"
MODEL_PATH = os.path.join(MODEL_DIR, "aqi_predictor.joblib")
METADATA_PATH = os.path.join(MODEL_DIR, "model_metadata.joblib")

def train_and_save_model():
    print("Starting model training process...")
    try:
        os.makedirs(MODEL_DIR, exist_ok=True)
        df = get_data_as_dataframe() # Now robust with lowercase columns
        
        if df.empty or len(df) < 50:
            return {"status": "error", "message": "Not enough data for training."}
        
        if 'date' not in df.columns:
             return {"status": "error", "message": "'date' column missing after processing."}

        # Feature Engineering
        df['day_of_year'] = df['date'].dt.dayofyear
        df['year'] = df['date'].dt.year
        
        # One-hot encode cities
        df_encoded = pd.get_dummies(df, columns=['city'], drop_first=False)

        features = ['day_of_year', 'year'] + [col for col in df_encoded if col.startswith('city_')]
        X = df_encoded[features]
        y = df_encoded['aqi']

        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

        model = RandomForestRegressor(n_estimators=100, random_state=42, n_jobs=-1)
        model.fit(X_train, y_train)

        predictions = model.predict(X_test)
        mse = mean_squared_error(y_test, predictions)

        joblib.dump(model, MODEL_PATH)
        joblib.dump({'features': features}, METADATA_PATH)

        return {
            "status": "success",
            "message": f"Model trained successfully. MSE: {round(mse, 2)}",
            "mean_squared_error": round(mse, 2)
        }
    except Exception as e:
        traceback.print_exc()
        return {"status": "error", "message": str(e)}

def predict_with_trained_model(city: str, days: int) -> list:
    if not os.path.exists(MODEL_PATH) or not os.path.exists(METADATA_PATH):
        raise FileNotFoundError("Model not found.")

    model = joblib.load(MODEL_PATH)
    metadata = joblib.load(METADATA_PATH)
    trained_features = metadata['features']

    last_date = datetime.now()
    future_dates = [last_date + timedelta(days=i) for i in range(1, days + 1)]
    
    pred_df = pd.DataFrame({
        'date': future_dates,
        'city': [city] * days
    })

    pred_df['day_of_year'] = pred_df['date'].dt.dayofyear
    pred_df['year'] = pred_df['date'].dt.year

    pred_df_encoded = pd.get_dummies(pred_df, columns=['city'])
    
    # Align columns
    final_pred_df = pd.DataFrame(columns=trained_features)
    for col in pred_df_encoded.columns:
        if col in final_pred_df.columns:
            final_pred_df[col] = pred_df_encoded[col]
    
    final_pred_df.fillna(0, inplace=True)
    final_pred_df = final_pred_df[trained_features]

    predictions = model.predict(final_pred_df)

    return [
        {"date": date.strftime('%Y-%m-%d'), "predicted_aqi": round(pred)}
        for date, pred in zip(future_dates, predictions)
    ]