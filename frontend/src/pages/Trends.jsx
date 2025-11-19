/* eslint-disable no-unused-vars */
// src/pages/Trends.jsx
import { useEffect, useState } from "react";
import feather from "feather-icons";

// Ensure this matches your other files
const API_BASE_URL = "http://localhost:5000/api";

export default function Trends() {
  const [trends, setTrends] = useState({ improving: [], worsening: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTrends();
  }, []);

  useEffect(() => {
    feather.replace();
  });

  async function fetchTrends() {
    try {
      const response = await fetch(`${API_BASE_URL}/forecast-trends`);
      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setTrends(data);
      }
    } catch (err) {
      setError("Failed to fetch trend data. Ensure backend is running.");
    } finally {
      setLoading(false);
    }
  }

  const CityCard = ({ city, data, type }) => {
    const isImproving = type === "improving";

    // Dynamic Styling
    const containerClass = isImproving
      ? "bg-emerald-50 border-emerald-100 hover:shadow-emerald-100"
      : "bg-red-50 border-red-100 hover:shadow-red-100";

    const titleClass = isImproving ? "text-emerald-800" : "text-red-800";
    const metricClass = isImproving ? "text-emerald-600" : "text-red-600";
    const icon = isImproving ? "arrow-down-right" : "arrow-up-right";

    return (
      <div
        className={`p-5 rounded-xl border ${containerClass} shadow-sm transition duration-300 hover:shadow-md flex justify-between items-center`}
      >
        <div>
          <h3
            className={`text-lg font-bold ${titleClass} flex items-center gap-2`}
          >
            {city}
          </h3>
          <div className="mt-2 text-sm text-gray-600">
            <span className="font-medium">Today:</span> {data.current_forecast}{" "}
            <span className="mx-1">→</span>
            <span className="font-medium">30 Days:</span> {data.future_forecast}
          </div>
        </div>

        <div className="text-right">
          <div
            className={`text-2xl font-extrabold ${metricClass} flex items-center justify-end gap-1`}
          >
            {data.change > 0 ? "+" : ""}
            {data.change}
            <i data-feather={icon} className="w-5 h-5"></i>
          </div>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mt-1">
            AQI Change
          </p>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Header */}
      <section className="py-16 bg-linear-to-r from-emerald-500 to-teal-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Future Trends</h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            Which cities will breathe easier next month? Based on our 30-day ML
            forecast.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 grow bg-white min-h-[60vh]">
        <div className="container mx-auto px-4 max-w-7xl">
          {loading && (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-200 border-t-emerald-600 mx-auto mb-4"></div>
              <p className="text-gray-500 font-medium">
                Analyzing 30-day forecasts...
              </p>
            </div>
          )}

          {error && (
            <div className="max-w-lg mx-auto bg-red-50 text-red-600 p-4 rounded-xl border border-red-200 text-center">
              <p className="font-semibold">Error</p>
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Improving Column */}
              <div>
                <div className="flex items-center gap-3 mb-8 pb-4 border-b-2 border-emerald-100">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <i data-feather="trending-down" className="w-6 h-6"></i>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-emerald-800">
                      Improving Air Quality
                    </h2>
                    <p className="text-sm text-emerald-600">
                      Predicted AQI decrease over 30 days
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {trends.improving.length === 0 ? (
                    <p className="text-gray-400 italic text-center py-8">
                      No cities currently showing a strong improving trend.
                    </p>
                  ) : (
                    trends.improving.map((item) => (
                      <CityCard
                        key={item.city}
                        city={item.city}
                        data={item}
                        type="improving"
                      />
                    ))
                  )}
                </div>
              </div>

              {/* Worsening Column */}
              <div>
                <div className="flex items-center gap-3 mb-8 pb-4 border-b-2 border-red-100">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                    <i data-feather="trending-up" className="w-6 h-6"></i>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-red-800">
                      Worsening Air Quality
                    </h2>
                    <p className="text-sm text-red-600">
                      Predicted AQI increase over 30 days
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {trends.worsening.length === 0 ? (
                    <p className="text-gray-400 italic text-center py-8">
                      No cities currently showing a worsening trend.
                    </p>
                  ) : (
                    trends.worsening.map((item) => (
                      <CityCard
                        key={item.city}
                        city={item.city}
                        data={item}
                        type="worsening"
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
