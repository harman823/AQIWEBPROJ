import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ImprovingCities() {
  const [cities, setCities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('/api/analytics/improving')
      .then((res) => {
        // ✨ FIX ✨: Correctly access the 'improving_cities' array from the response object
        const cityData = res.data?.improving_cities || [];
        setCities(cityData);
      })
      .catch(() => {
        setError('Could not fetch improving cities data.');
        setCities([]);
      });
  }, []);

  return (
    <div className="card bg-slate-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <i data-feather="smile" className="mr-2 text-green-400"></i>
        Cities with Improving Air Quality
      </h2>
      {error && <p className="text-red-400">{error}</p>}
      {!error && cities.length > 0 ? (
        <ul className="list-disc pl-6 space-y-2">
          {/* ✨ FIX ✨: Map over the array of objects and access the 'city' property */}
          {cities.map((cityData, i) => (
            <li key={i} className="text-green-300 font-medium">
              {cityData.city} (Improving by ~{Math.abs(cityData.slope_per_year).toFixed(1)} AQI points per year)
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-slate-400">
          {!error && 'No cities with a consistent improving trend found.'}
        </p>
      )}
    </div>
  );
}