import React, { useState } from 'react';
import axios from 'axios';

export default function CitySearch() {
  const [city, setCity] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const fetchCityAQI = async () => {
    setError('');
    setResult(null);

    if (!city.trim()) {
      setError('Please enter a city name.');
      return;
    }

    try {
      const res = await axios.get(`/api/city/${city}`);
      setResult(res.data);
    } catch (err) {
      setError('City not found or server error.');
    }
  };

  return (
    <div className="card">
      <h2 className="card-title">Search City AQI</h2>
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="form-input sm:w-2/3"
        />
        <button onClick={fetchCityAQI} className="btn w-full sm:w-auto">
          Search
        </button>
      </div>

      {error && <p className="text-error">{error}</p>}
      {result && (
        <div className="mt-4 border-t border-[var(--border-color)] pt-3">
          <p>
            <span className="font-medium">City:</span> {result.city}
          </p>
          <p>
            <span className="font-medium">AQI:</span> {result.aqi}
          </p>
          <p>
            <span className="font-medium">Date:</span>{' '}
            {new Date(result.reading_date).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}
