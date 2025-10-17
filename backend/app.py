from flask import Flask, jsonify, request
from supabase_client import supabase
from analytics import get_data_as_dataframe, identify_improving_cities
import pandas as pd

app = Flask(__name__)

# ---------------------------
# API: Get latest AQI for a specific city
# ---------------------------
@app.route('/api/city/<string:city_name>', methods=['GET'])
def get_city_aqi(city_name):
    try:
        response = supabase.table('aqi_readings').select('*').eq('city', city_name).order('reading_date', desc=True).limit(1).execute()

        if not response.data:
            return jsonify({'error': f'City "{city_name}" not found'}), 404

        return jsonify(response.data[0]), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ---------------------------
# API: Compare - Top 5 most polluted cities (latest AQI)
# ---------------------------
@app.route('/api/compare', methods=['GET'])
def compare_cities():
    try:
        df = get_data_as_dataframe()

        # Get latest record for each city
        latest_df = df.sort_values('reading_date').groupby('city').tail(1)

        # Sort by AQI descending (most polluted first)
        top_cities = latest_df.sort_values('aqi', ascending=False).head(5)

        result = top_cities[['city', 'aqi', 'reading_date']].to_dict(orient='records')

        return jsonify(result), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ---------------------------
# API: Analytics - Improving Cities
# ---------------------------
@app.route('/api/analytics/improving', methods=['GET'])
def improving_cities():
    try:
        improving = identify_improving_cities()
        return jsonify({'improving_cities': improving}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ---------------------------
# Root Endpoint
# ---------------------------
@app.route('/', methods=['GET'])
def root():
    return jsonify({'message': 'Air Quality Monitoring Dashboard Backend is running!'}), 200


# ---------------------------
# Main entry point
# ---------------------------
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
