// src/components/Sidebar.jsx
import { useState, useEffect } from 'react';
import * as api from '../apiService.js';

// Helper to render a list
function CityList({ title, data, renderItem }) {
  return (
    <div className="card">
      <h2 className="card-title">{title}</h2>
      {data.length === 0 ? (
        <p className="text-muted">Loading...</p>
      ) : (
        <ul className="list">
          {data.map(renderItem)}
        </ul>
      )}
    </div>
  );
}

export default function Sidebar() {
  const [top5, setTop5] = useState([]);
  const [improving, setImproving] = useState([]);

  useEffect(() => {
    // Load sidebar data on mount
    api.getTop5Compare().then(setTop5).catch(console.error);
    api.getImprovingCities()
      .then(data => setImproving(data.improving_cities))
      .catch(console.error);
  }, []);

  return (
    <>
      <CityList
        title="Top 5 Most Polluted"
        data={top5}
        renderItem={(city) => (
          <li key={city.city} className="list-item">
            <span>{city.city}</span>
            <span className="font-bold text-lg aqi-unhealthy">{Math.round(city.aqi)}</span>
          </li>
        )}
      />
      <CityList
        title="Improving Cities"
        data={improving}
        renderItem={(city) => (
          <li key={city.city} className="list-item">
            <span>{city.city}</span>
            <span className="text-improving">({city.n_points} points)</span>
          </li>
        )}
      />
    </>
  );
}