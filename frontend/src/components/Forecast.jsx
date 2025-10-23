// src/components/Forecast.jsx

// (You can copy the getAqiColorClass helper from CurrentAqi.jsx)
function getAqiColorClass(aqi) {
  if (aqi <= 50) return "aqi-good";
  if (aqi <= 100) return "aqi-moderate";
  // ...etc.
  return "aqi-hazardous";
}

export default function Forecast({ data, isLoading }) {
  if (isLoading) {
    return (
      <div className="card">
        <h2 className="card-title">Forecast (30 Days)</h2>
        <p className="text-muted">Loading...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="card">
        <h2 className="card-title">Forecast (30 Days)</h2>
        <p className="text-muted">Search for a city to see its forecast.</p>
      </div>
    );
  }

  const lowest = Math.round(data.lowest_aqi);
  const highest = Math.round(data.highest_aqi);

  return (
    <div className="card">
      <h2 className="card-title">Forecast (30 Days)</h2>
      <div className="grid grid-cols-2 gap-4 text-center">
        <div>
          <p className="text-muted">Lowest</p>
          <p className={`text-3xl font-bold ${getAqiColorClass(lowest)}`}>{lowest}</p>
        </div>
        <div>
          <p className="text-muted">Highest</p>
          <p className={`text-3xl font-bold ${getAqiColorClass(highest)}`}>{highest}</p>
        </div>
      </div>
      <p className="text-muted text-center mt-4">Based on 30-day model prediction.</p>
    </div>
  );
}