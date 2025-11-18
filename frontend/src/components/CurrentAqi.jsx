import { getAqiColor } from "../utils/aqiUtils";

export default function CurrentAqi({ city, aqi, date }) {
  const { text, bg, status } = getAqiColor(aqi);
  const formattedDate = date ? new Date(date).toLocaleDateString() : "N/A";

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100">
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-800">{city}</h3>
            <p className="text-xs text-gray-500">{formattedDate}</p>
          </div>
          <span
            className={`px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${bg} ${text}`}
          >
            {status}
          </span>
        </div>

        <div className="flex items-baseline">
          <span className={`text-4xl font-extrabold ${text}`}>
            {aqi !== null ? Math.round(aqi) : "--"}
          </span>
          <span className="ml-2 text-sm text-gray-500">AQI</span>
        </div>
      </div>
    </div>
  );
}
