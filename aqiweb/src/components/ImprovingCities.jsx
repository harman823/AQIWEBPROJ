import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ImprovingCities() {
  const [cities, setCities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/api/analytics/improving')
      .then((res) => {
        // Correctly access the array from the response object
        if (res.data && Array.isArray(res.data.improving_cities)) {
          setCities(res.data.improving_cities);
        } else {
          setCities([]);
        }
      })
      .catch(() => {
        setError('Could not fetch improving cities data.');
        setCities([]);
      });
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Cities with Improving Air Quality
      </h2>
      {error && <p className="text-red-500">{error}</p>}
      {cities.length > 0 ? (
        <ul className="list-disc pl-6 space-y-1">
          {cities.map((cityData, i) => (
            // Render the 'city' property of the object
            <li key={i} className="text-green-700 font-medium">
              {cityData.city}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No improving cities found or data is loading...</p>
      )}
    </div>
  );
}