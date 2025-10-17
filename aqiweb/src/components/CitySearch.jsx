import React, { useState } from 'react';
import axios from 'axios';

// Update the component to accept a prop 'onDataLoaded'
export default function CitySearch({ onDataLoaded }) {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');

  const fetchCityData = async () => {
    if (!city) {
      setError('Please enter a city name.');
      return;
    }
    try {
      setError('');
      // Fetch historical data from the new endpoint
      const res = await axios.get(`/api/city/${city}/history`);
      // Pass the data up to the parent App component
      onDataLoaded(res.data, city);
    } catch (err) {
      onDataLoaded([], city); // Clear chart on error
      setError('City not found or server error.');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Search City AQI</h2>
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full sm:w-2/3 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
        <button
          onClick={fetchCityData}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-600 mt-3">{error}</p>}
    </div>
  );
}