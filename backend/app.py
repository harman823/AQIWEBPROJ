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
from model_trainer import train_and_save_model, predict_with_trained_model, get_forecast_trends # Import here
import os

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

def normalize_keys(data):
    if isinstance(data, list):
        return [{k.lower(): v for k, v in item.items()} for item in data]
    elif isinstance(data, dict):
        return {k.lower(): v for k, v in data.items()}
    return data

@app.route('/api/city/<string:city_name>', methods=['GET'])
def get_city_aqi(city_name):
    try:
        # Try both capitalized and lowercase to be safe
        try:
            response = supabase.table('aqi_readings').select('*').eq('City', city_name).order('Date', desc=True).limit(1).execute()
        except:
            response = supabase.table('aqi_readings').select('*').eq('city', city_name).order('date', desc=True).limit(1).execute()
            
        data = response.data[0] if response.data else {}
        return jsonify(normalize_keys(data)), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/compare', methods=['GET'])
def compare_cities():
    try:
        df = get_data_as_dataframe() # Uses the new paginated fetcher
        if df.empty: return jsonify([]), 200
        
        # df columns are guaranteed lowercase by analytics.py
        latest_df = df.sort_values('date').groupby('city').tail(1)
        top_cities = latest_df.sort_values('aqi', ascending=False).head(5)
        return jsonify(top_cities.to_dict(orient='records')), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/analytics/improving', methods=['GET'])
def improving_cities():
    try:
        return jsonify({'improving_cities': identify_improving_cities()}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/history/<string:city_name>', methods=['GET'])
def city_aqi_history(city_name):
    try:
        history = get_aqi_by_date(city_name)
        return jsonify(history), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/yearly_history/<string:city_name>', methods=['GET'])
def get_yearly_history(city_name):
    try:
        return jsonify(get_yearly_aqi_average(city_name)), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/train-model', methods=['POST'])
def handle_train_model():
    try:
        result = train_and_save_model()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/forecast', methods=['POST'])
def get_forecast():
    data = request.get_json()
    try:
        predictions = predict_with_trained_model(data.get('city'), data.get('days'))
        aqi_values = [p['predicted_aqi'] for p in predictions]
        return jsonify({
            'lowest_aqi': min(aqi_values),
            'highest_aqi': max(aqi_values),
            'predictions': predictions
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/api/forecast-trends', methods=['GET'])
def forecast_trends_route():
    try:
        # Calculate trends based on 30-day forecast
        trends = get_forecast_trends(days=30)
        if 'error' in trends:
            return jsonify(trends), 400
        return jsonify(trends), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500    

@app.route('/', methods=['GET'])
def health_check():
    return jsonify({"status": "ok"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)