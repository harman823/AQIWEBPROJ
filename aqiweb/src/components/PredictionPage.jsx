import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PredictionChart from './PredictionChart';

const MAJOR_CITIES = ["New York", "London", "Tokyo", "Delhi", "Beijing", "Sydney", "Paris"];

export default function PredictionPage() {
  const [city, setCity] = useState('New York');
  const [days] = useState(30); // Kept at 30 days for simplicity
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Use Feather Icons after render
  useEffect(() => {
    if (window.feather) {
      window.feather.replace();
    }
  }, [isLoading]);


  const handlePredict = async () => {
    setIsLoading(true);
    setError('');
    setPrediction(null);
    try {
      // ✨ CHANGE ✨: Updated the endpoint to the new '/api/forecast'
      const res = await axios.post('/api/forecast', { city, days });
      setPrediction(res.data);
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'An unexpected error occurred while fetching the prediction.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card bg-slate-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <i data-feather="cloud-drizzle" className="mr-2 text-primary-400"></i>
        AQI Forecast
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">Select City</label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Choose a city</option>
            {MAJOR_CITIES.map((c, i) => (
              <option key={i} value={c}>{c}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Forecast Period</label>
            <input
              type="text"
              value={`${days} days`}
              readOnly
              className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none cursor-default"
            />
        </div>
        
        <div className="flex items-end">
          <button
            onClick={handlePredict}
            disabled={isLoading || !city}
            className={`w-full px-4 py-2 rounded-lg font-medium flex items-center justify-center transition-colors ${
              isLoading || !city
                ? 'bg-slate-600 cursor-not-allowed' 
                : 'bg-primary-600 hover:bg-primary-700'
            }`}
          >
            {isLoading ? (
              <>
                <i data-feather="loader" className="animate-spin mr-2"></i>
                Forecasting...
              </>
            ) : (
              <>
                <i data-feather="trending-up" className="mr-2"></i>
                Get Forecast
              </>
            )}
          </button>
        </div>
      </div>
      
      {error && (
        <div className="mt-4 p-3 bg-red-900/30 text-red-200 rounded-lg">
          <strong>Error:</strong> {error}
        </div>
      )}
      
      {prediction && (
        <div className="mt-6 p-4 bg-slate-700/50 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Forecast Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900 p-4 rounded-lg">
              <p className="text-slate-400">Lowest Predicted AQI</p>
              <p className="text-2xl font-bold text-green-400">{prediction.lowest_aqi}</p>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg">
              <p className="text-slate-400">Highest Predicted AQI</p>
              <p className="text-2xl font-bold text-red-400">{prediction.highest_aqi}</p>
            </div>
          </div>
          
          <PredictionChart data={prediction.predictions} city={city} />
        </div>
      )}
    </div>
  );
};