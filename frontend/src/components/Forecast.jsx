// src/components/Forecast.jsx

// Helper function to get text color class based on AQI
function getAqiTextColorClass(aqi) {
  if (aqi === null || aqi === undefined) return "text-gray-500"; // Handle null/undefined case
  if (aqi <= 50) return "text-green-500";       // Good
  if (aqi <= 100) return "text-yellow-500";    // Moderate
  if (aqi <= 150) return "text-orange-500";    // Unhealthy for Sensitive
  if (aqi <= 200) return "text-red-500";       // Unhealthy
  if (aqi <= 300) return "text-purple-600";    // Very Unhealthy
  return "text-purple-900";                    // Hazardous
}

export default function Forecast({ data, isLoading }) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center"> {/* Updated styling */}
        <h2 className="text-xl font-bold text-emerald-800 mb-4">Forecast (Next 7 Days)</h2> {/* Updated styling */}
        <p className="text-gray-500">Loading forecast...</p> {/* Updated styling */}
      </div>
    );
  }

  // Check specifically if data exists and has predictions
  if (!data || !data.predictions || data.predictions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center"> {/* Updated styling */}
        <h2 className="text-xl font-bold text-emerald-800 mb-4">Forecast (Next 7 Days)</h2> {/* Updated styling */}
        <p className="text-gray-500">Search for a city to see its forecast.</p> {/* Updated styling */}
      </div>
    );
  }

  // Ensure lowest/highest are numbers or null
  const lowest = data.lowest_aqi !== null && data.lowest_aqi !== undefined ? Math.round(data.lowest_aqi) : null;
  const highest = data.highest_aqi !== null && data.highest_aqi !== undefined ? Math.round(data.highest_aqi) : null;

  const lowestColorClass = getAqiTextColorClass(lowest);
  const highestColorClass = getAqiTextColorClass(highest);

  return (
    <div className="bg-white rounded-lg shadow p-6"> {/* Updated styling */}
      <h2 className="text-xl font-bold text-emerald-800 mb-6 text-center">Forecast (Next 7 Days)</h2> {/* Updated styling */}
      <div className="grid grid-cols-2 gap-4 text-center">
        <div>
          <p className="text-sm text-gray-500 font-medium mb-1">Lowest AQI</p> {/* Updated styling */}
          <p className={`text-4xl font-bold ${lowestColorClass}`}>
            {lowest !== null ? lowest : 'N/A'} {/* Handle null */}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 font-medium mb-1">Highest AQI</p> {/* Updated styling */}
          <p className={`text-4xl font-bold ${highestColorClass}`}>
            {highest !== null ? highest : 'N/A'} {/* Handle null */}
          </p>
        </div>
      </div>
      <p className="text-xs text-gray-400 text-center mt-4">Based on 7-day model prediction.</p> {/* Updated styling */}
    </div>
  );
}