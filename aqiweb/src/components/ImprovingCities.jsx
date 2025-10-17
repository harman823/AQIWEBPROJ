import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ImprovingCities() {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    axios.get('/api/analytics/improving')
      .then((res) => {
        const cityArray = Array.isArray(res.data) ? res.data : res.data.cities || [];
        setCities(cityArray);
      })
      .catch(() => setCities([]));
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Cities with Improving Air Quality
      </h2>
      {Array.isArray(cities) && cities.length > 0 ? (
        <ul className="list-disc pl-6 space-y-1">
          {cities.map((city, i) => (
            <li key={i} className="text-green-700 font-medium">{city}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No improving cities found.</p>
      )}
    </div>
  );
}
