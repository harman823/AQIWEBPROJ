import joblib
import pandas as pd
import numpy as np
from flask import Flask, jsonify, request
from analytics import get_data_as_dataframe, identify_improving_cities
from supabase_client import supabase

app = Flask(__name__)

# --- Load the trained model and encoder on startup ---
try:
    model = joblib.load('aqi_predictor.joblib')
    city_encoder = joblib.load('city_label_encoder.joblib')
    print("✅ ML model and encoder loaded successfully.")
except FileNotFoundError:
    model = None
    city_encoder = None
    print("⚠️ Warning: ML model files not found. The /api/predict endpoint will not work.")
    print("➡️ Please run 'python train_model.py' to generate the model files.")

# --- API Endpoints ---

@app.route('/api/city/<string:city_name>/history', methods=['GET'])
def get_city_history(city_name):
    """Fetches all historical AQI readings for a single city for chart visualization."""
    try:
        response = supabase.table('aqi_readings').select('*').eq('city', city_name.title()).order('reading_date', desc=False).execute()
        return jsonify(response.data or [])
    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500

@app.route('/api/compare', methods=['GET'])
def compare_cities():
    """Returns a list of the top 5 most polluted cities based on their latest AQI."""
    try:
        df = get_data_as_dataframe()
        if df.empty:
            return jsonify([])
        latest_readings = df.loc[df.groupby('city')['reading_date'].idxmax()]
        top_polluted = latest_readings.sort_values('aqi', ascending=False).head(5)
        return jsonify(top_polluted.to_dict(orient='records'))
    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500

@app.route('/api/analytics/improving', methods=['GET'])
def improving_cities():
    """Returns a list of cities with a statistically improving air quality trend."""
    try:
        improving = identify_improving_cities()
        return jsonify(improving)
    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500

@app.route('/api/predict', methods=['POST'])
def predict_aqi():
    """Predicts future AQI for a given city using the trained ML model."""
    if not model or not city_encoder:
        return jsonify({"error": "Model not loaded. Run train_model.py first."}), 500

    data = request.get_json()
    city = data.get('city')
    days = int(data.get('days', 30))

    if not city:
        return jsonify({"error": "City is a required parameter"}), 400

    try:
        city_title = city.title()
        if city_title not in city_encoder.classes_:
            return jsonify({"error": f"Model was not trained on data for '{city_title}'. Prediction is not available."}), 404

        latest_data = get_data_as_dataframe()
        city_data = latest_data[latest_data['city'] == city_title].sort_values('reading_date', ascending=False)
        
        if city_data.empty:
            return jsonify({"error": f"Not enough historical data for '{city_title}' to make a prediction."}), 404

        baseline = city_data.iloc[0]
        future_dates = pd.to_datetime(pd.date_range(start=pd.Timestamp.now() + pd.Timedelta(days=1), periods=days, freq='D'))
        
        future_df = pd.DataFrame({'reading_date': future_dates})
        future_df['month'] = future_df['reading_date'].dt.month
        future_df['day_of_year'] = future_df['reading_date'].dt.dayofyear
        future_df['day_of_week'] = future_df['reading_date'].dt.dayofweek
        future_df['city_encoded'] = city_encoder.transform([city_title])[0]
        future_df['pm2_5'] = baseline['pm2_5']
        future_df['pm10'] = baseline['pm10']
        future_df['no2'] = baseline['no2']
        
        features = ['city_encoded', 'month', 'day_of_year', 'day_of_week', 'pm2_5', 'pm10', 'no2']
        predictions = model.predict(future_df[features])
        
        predictions = np.round(predictions).astype(int)

        response_data = {
            "lowest_aqi": int(predictions.min()),
            "highest_aqi": int(predictions.max()),
            "predictions": [
                {"date": date.strftime('%Y-%m-%d'), "aqi": int(aqi)} for date, aqi in zip(future_dates, predictions)
            ]
        }
        
        return jsonify(response_data)

    except Exception as e:
        return jsonify({'error': f'Server error: {str(e)}'}), 500

@app.route('/')
def index():
    """A simple root endpoint to confirm the API is running."""
    return jsonify({"message": "Air Quality Monitoring API is running!"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)

