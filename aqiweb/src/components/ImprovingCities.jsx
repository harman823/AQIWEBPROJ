import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ImprovingCities({ onCityClick }) {
  const [cities, setCities] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch data when the component mounts
    axios.get('/api/analytics/improving')
      .then((res) => {
        if (Array.isArray(res.data)) {
          setCities(res.data);
        } else {
          // Handle cases where the API might not return an array
          setCities([]);
        }
      })
      .catch(() => {
        setError('Could not fetch improving cities data.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="bg-slate-800 shadow-lg rounded-xl p-6 h-full">
      <h2 className="text-xl font-bold mb-4 text-white">Cities with Improving AQI</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-700">
          <thead className="bg-slate-900/50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">City</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Improvement Trend (AQI/Year)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {isLoading ? (
              <tr>
                <td colSpan="2" className="px-4 py-3 text-center text-slate-400">Loading data...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="2" className="px-4 py-3 text-center text-red-400">{error}</td>
              </tr>
            ) : cities.length > 0 ? (
              cities.map((cityData) => (
                <tr 
                  key={cityData.city} 
                  className="hover:bg-slate-700 cursor-pointer transition-colors"
                  onClick={() => onCityClick(cityData.city)}
                  title={`Click to see historical data for ${cityData.city}`}
                >
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-white">{cityData.city}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-green-400 font-semibold">
                    {/* This check prevents the crash. It ensures slope_per_year is a number before formatting. */}
                    {typeof cityData.slope_per_year === 'number' 
                      ? cityData.slope_per_year.toFixed(2) 
                      : 'N/A'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="px-4 py-3 text-center text-slate-400">
                  No cities with a clear improving trend found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <p className="text-xs text-slate-500 mt-2">Click on a city to view its historical data in the chart above.</p>
      </div>
    </div>
  );
}

