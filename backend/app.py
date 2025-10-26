from flask import Flask, jsonify, request
from flask_cors import CORS
from supabase_client import supabase
from analytics import (
    get_data_as_dataframe,
    identify_improving_cities,
    get_yearly_aqi_average,
    get_aqi_by_date,
)
from model_trainer import train_and_save_model, predict_with_trained_model
import traceback
import os

# At the top with other imports
from flask_cors import CORS

app = Flask(__name__)
# Be specific about the allowed origin
CORS(app, origins=["https://aqiwebproj.vercel.app", "https://aqiwebproj-qjuusa84f-harman823s-projects.vercel.app"])

# ... rest of your app code
# --- Core API Endpoints ---
@app.route('/api/city/<string:city_name>', methods=['GET'])
def get_city_aqi(city_name):
    """Gets the most recent AQI reading for a single city."""
    try:
        # ✨ CHANGE ✨: Order by 'created_at' instead of 'reading_date'
        response = supabase.table('aqi_readings').select('*').eq('city', city_name).order('created_at', desc=True).limit(1).execute()
        return jsonify(response.data[0] if response.data else {}), 200
    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/api/compare', methods=['GET'])
def compare_cities():
    """Gets the most recent AQI reading for all cities and returns the top 5 most polluted."""
    try:
        df = get_data_as_dataframe()
        if df.empty:
            return jsonify([]), 200
        # ✨ CHANGE ✨: Sort by 'created_at' instead of 'reading_date'
        latest_df = df.sort_values('created_at').groupby('city').tail(1)
        top_cities = latest_df.sort_values('aqi', ascending=False).head(5)
        return jsonify(top_cities.to_dict(orient='records')), 200
    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

# --- (The rest of the file is unchanged as the logic is handled in the analytics/model_trainer files) ---

# --- Analytics Endpoints ---
@app.route('/api/analytics/improving', methods=['GET'])
def improving_cities():
    """Returns a list of cities with a statistically improving AQI trend."""
    try:
        improving = identify_improving_cities()
        return jsonify({'improving_cities': improving}), 200
    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/api/history/<string:city_name>', methods=['GET'])
def city_aqi_history(city_name):
    """Gets all historical data points for a given city."""
    try:
        history = get_aqi_by_date(city_name)
        return jsonify(history), 200
    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/api/yearly_history/<string:city_name>', methods=['GET'])
def get_yearly_history(city_name):
    """Gets the average AQI for each year for a given city."""
    try:
        yearly_data = get_yearly_aqi_average(city_name)
        return jsonify(yearly_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# --- Machine Learning Endpoints ---
@app.route('/api/train-model', methods=['POST'])
def handle_train_model():
    """Triggers the model training process."""
    try:
        result = train_and_save_model()
        if result['status'] == 'success':
            return jsonify(result), 200
        else:
            return jsonify(result), 500
    except Exception as e:
        traceback.print_exc()
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/forecast', methods=['POST'])
def get_forecast():
    """
    Generates an AQI forecast using the trained RandomForest model.
    Expects a JSON body: {"city": "CityName", "days": 30}
    """
    data = request.get_json()
    if not data or 'city' not in data or 'days' not in data:
        return jsonify({'error': 'Missing "city" or "days" in request body'}), 400

    city = data['city']
    days = data['days']

    try:
        predictions = predict_with_trained_model(city, days)
        if not predictions:
            return jsonify({'error': 'Could not generate prediction.'}), 404

        aqi_values = [p['predicted_aqi'] for p in predictions]
        response_data = {
            'lowest_aqi': min(aqi_values),
            'highest_aqi': max(aqi_values),
            'predictions': predictions
        }
        return jsonify(response_data), 200
    except FileNotFoundError:
        return jsonify({'error': 'Model not found. Please train the model via the /api/train-model endpoint first.'}), 404
    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500
    
@app.route('/', methods=['GET'])
def health_check():
    """Basic health check endpoint for Hugging Face Spaces."""
    return jsonify({"status": "ok"}), 200

if __name__ == '__main__':
    # Get port from environment variable, default to 5000 if not set (for local testing)
    port = int(os.environ.get('PORT', 5000))
    # Run the app, binding to 0.0.0.0 and the correct port
    app.run(host='0.0.0.0', port=port, debug=False)