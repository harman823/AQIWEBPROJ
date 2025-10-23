// src/components/CurrentAqi.jsx

// Helper function to get text color class based on AQI
function getAqiTextColorClass(aqi) {
    if (aqi <= 50) return "text-green-500";       // Good
    if (aqi <= 100) return "text-yellow-500";    // Moderate
    if (aqi <= 150) return "text-orange-500";    // Unhealthy for Sensitive
    if (aqi <= 200) return "text-red-500";       // Unhealthy
    if (aqi <= 300) return "text-purple-600";    // Very Unhealthy
    return "text-purple-900";                    // Hazardous (e.g., maroon/dark purple)
  }

// Helper function to get background color class (used for status badge)
function getAqiStatusBgClass(status) {
  switch (status) {
    case 'Good': return 'bg-green-500 text-white';
    case 'Moderate': return 'bg-yellow-400 text-white'; // Changed to text-white for better contrast
    case 'Unhealthy for Sensitive Groups': return 'bg-orange-500 text-white';
    case 'Unhealthy': return 'bg-red-500 text-white';
    case 'Very Unhealthy': return 'bg-purple-600 text-white'; // Adjusted purple shade
    case 'Hazardous': return 'bg-purple-900 text-white'; // Adjusted purple shade
    default: return 'bg-gray-400 text-white'; // Default fallback
  }
}

// Helper function to get the AQI category from a value
function getAqiCategory(aqi) {
  if (aqi === null || aqi === undefined) return "N/A";
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
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <h2 className="text-xl font-bold text-emerald-800 mb-4">Current AQI</h2>
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <h2 className="text-xl font-bold text-emerald-800 mb-4">Select a city</h2>
        <p className="text-gray-500">Search for a city to see its current AQI.</p>
      </div>
    );
  }

  const aqi = data.aqi !== null && data.aqi !== undefined ? Math.round(data.aqi) : null;
  const textColorClass = getAqiTextColorClass(aqi);
  const category = getAqiCategory(aqi);
  const statusBgClass = getAqiStatusBgClass(category);
  const lastUpdated = data.created_at ? new Date(data.created_at).toLocaleString() : 'N/A';

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-emerald-800 mb-4">Current AQI: {data.city || 'N/A'}</h2>
      <div className="text-center mb-6">
        <p className={`text-6xl font-bold mb-1 ${textColorClass}`}>{aqi !== null ? aqi : 'N/A'}</p>
        <p className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${statusBgClass}`}>
           {category}
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Last updated: {lastUpdated}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4 text-center border-t border-gray-200 pt-4">
        <div>
          <p className="text-sm text-gray-500 font-medium">PM2.5</p>
          <p className="text-lg font-semibold text-gray-800">{data.pm2_5 !== null && data.pm2_5 !== undefined ? data.pm2_5 : 'N/A'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 font-medium">PM10</p>
          <p className="text-lg font-semibold text-gray-800">{data.pm10 !== null && data.pm10 !== undefined ? data.pm10 : 'N/A'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 font-medium">NO2</p>
          <p className="text-lg font-semibold text-gray-800">{data.no2 !== null && data.no2 !== undefined ? data.no2 : 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}