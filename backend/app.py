from flask import Flask, jsonify
from supabase_client import supabase
from analytics import get_data_as_dataframe, identify_improving_cities

app = Flask(__name__)

# --- API: Get latest AQI for a specific city ---
@app.route('/api/city/<string:city_name>', methods=['GET'])
def get_city_aqi(city_name):
    try:
        # Capitalize the city name to match potential database format
        response = supabase.table('aqi_readings').select('*').eq('city', city_name.title()).order('reading_date', desc=True).limit(1).execute()

        if response.data:
            return jsonify(response.data[0])
        else:
            return jsonify({'error': f'City "{city_name}" not found'}), 404
    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500

# --- API: Compare - Top 5 most polluted cities ---
@app.route('/api/compare', methods=['GET'])
def compare_cities():
    try:
        df = get_data_as_dataframe()
        if df.empty:
            return jsonify([])

        # Get the latest reading for each city
        latest_readings = df.loc[df.groupby('city')['reading_date'].idxmax()]
        
        # Sort by AQI (descending) and take the top 5
        top_polluted = latest_readings.sort_values('aqi', ascending=False).head(5)
        
        return jsonify(top_polluted.to_dict(orient='records'))
    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500

# --- API: Analytics - Improving Cities ---
@app.route('/api/analytics/improving', methods=['GET'])
def improving_cities():
    try:
        # The function now returns a list of dicts directly
        improving = identify_improving_cities()
        return jsonify(improving)
    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500

# --- Root Endpoint ---
@app.route('/')
def index():
    return jsonify({"message": "API is running"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)