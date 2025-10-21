from flask import Flask, jsonify, request
from flask_cors import CORS
from analytics import get_yearly_data, predict_aqi_for_years, get_city_rankings_and_yearly_data
from model_trainer import train_and_save_models

app = Flask(__name__)
CORS(app) 

@app.route('/yearly_history/<city>', methods=['GET'])
def yearly_history_data(city):
    yearly_df = get_yearly_data(city)
    if yearly_df is None or yearly_df.empty:
        return jsonify({"error": f"Could not fetch yearly history for {city}."}), 404
    return jsonify(yearly_df.to_dict(orient='records'))

@app.route('/predict/<city>', methods=['GET'])
def predict_aqi(city):
    years = request.args.get('years', 1, type=int)
    predicted_mean, error = predict_aqi_for_years(city, years)
    if error:
        return jsonify({"error": error}), 404
    response = {
        "city": city,
        "prediction": [{"month": date.strftime('%Y-%m'), "predicted_aqi": aqi} for date, aqi in predicted_mean.items()]
    }
    return jsonify(response)

@app.route('/improving_cities', methods=['GET'])
def improving_cities_data():
    data = get_city_rankings_and_yearly_data()
    if data is None:
        return jsonify({"error": "Could not process city ranking data."}), 500
    return jsonify(data)

@app.route('/train', methods=['POST'])
def trigger_training():
    result = train_and_save_models()
    if result['status'] == 'error':
        return jsonify(result), 500
    return jsonify(result), 200

if __name__ == '__main__':
    app.run(debug=True)