import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AQIPredictions = ({ city }) => {
    const [predictionData, setPredictionData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [years, setYears] = useState(1);
    useEffect(() => {
        if (city) {
            const fetchPrediction = async () => {
                setLoading(true);
                setError('');
                try {
                    const response = await axios.get(`http://127.0.0.1:5000/predict/${city}?years=${years}`);
                    setPredictionData(response.data.prediction);
                } catch (err) {
                    setError(err.response?.data?.error || 'Could not fetch prediction data.');
                }
                setLoading(false);
            };
            fetchPrediction();
        }
    }, [city, years]);
    if (!city) return null;
    const isModelNotTrainedError = error.includes("Model for this city has not been trained yet");
    return (
        <div className="prediction-container card">
            <div className="card-header">
                <h3>AQI Forecast for {city}</h3>
                <div className="prediction-controls">
                    <label htmlFor="years">Forecast:</label>
                    <select id="years" value={years} onChange={(e) => setYears(e.target.value)}>
                        <option value="1">1 Year</option>
                        <option value="2">2 Years</option>
                        <option value="3">3 Years</option>
                    </select>
                </div>
            </div>
            {loading && <p>Loading prediction...</p>}
            {isModelNotTrainedError && (
                <div className="helpful-error">
                    <p><strong>Prediction Model Not Found</strong></p>
                    <p>To see the forecast, you first need to train the model for this city.</p>
                    <NavLink to="/training" className="button-link">
                        Go to Model Training Page
                    </NavLink>
                </div>
            )}
            {!isModelNotTrainedError && error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && !error && predictionData.length > 0 && (
                 <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={predictionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="predicted_aqi" name="Predicted AQI" stroke="#27ae60" />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};
export default AQIPredictions;