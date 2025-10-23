// src/components/CurrentAqi.jsx

// Helper function
function getAqiColorClass(aqi) {
  if (aqi <= 50) return "aqi-good";
  if (aqi <= 100) return "aqi-moderate";
  if (aqi <= 150) return "aqi-unhealthy-sensitive";
  if (aqi <= 200) return "aqi-unhealthy";
  if (aqi <= 300) return "aqi-very-unhealthy";
  return "aqi-hazardous";
}

function getAqiCategory(aqi) {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy for Sensitive Groups";
  if (aqi <= 200) return "Unhealthy";
  if (aqi <= 300) return "Very Unhealthy";
  return "Hazardous";
}

export default function CurrentAqi({ data, isLoading }) {
  if (isLoading) {
    return (
      <div className="card">
        <h2 className="card-title">Current AQI</h2>
        <p className="text-muted">Loading...</p>
      </div>
    );
  }

  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="card">
        <h2 className="card-title">Select a city to start</h2>
        <p className="text-muted">Search for a city to see its current AQI.</p>
      </div>
    );
  }

  const aqi = Math.round(data.aqi);
  const colorClass = getAqiColorClass(aqi);
  const category = getAqiCategory(aqi);

  return (
    <div className="card">
      <h2 className="card-title">Current AQI: {data.city}</h2>
      <div className="aqi-display">
        <p className={`aqi-value-large ${colorClass}`}>{aqi}</p>
        <p className={`aqi-category ${colorClass}`}>{category}</p>
        <p className="aqi-updated-time">
          Last updated: {new Date(data.created_at).toLocaleString()}
        </p>
      </div>
      <div className="pollutant-grid">
        <div>
          <p className="pollutant-label">PM2.5</p>
          <p className="pollutant-value">{data.pm2_5 || 'N/A'}</p>
        </div>
        <div>
          <p className="pollutant-label">PM10</p>
          <p className="pollutant-value">{data.pm10 || 'N/A'}</p>
        </div>
        <div>
          <p className="pollutant-label">NO2</p>
          <p className="pollutant-value">{data.no2 || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}