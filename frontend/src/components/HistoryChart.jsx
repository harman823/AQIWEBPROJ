import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { getAqiColor } from "../utils/aqiUtils";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
  Filler
);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: "top", align: "end" } },
  scales: {
    x: { type: "time", time: { unit: "month" }, grid: { display: false } },
    y: {
      beginAtZero: true,
      grid: { color: "#f3f4f6" },
      title: { display: true, text: "AQI Value" },
    },
  },
};

export default function HistoryChart({ data, isLoading, city }) {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return null;
    const sortedData = [...data].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    const avgAqi =
      sortedData.reduce((acc, curr) => acc + (curr.aqi || 0), 0) /
      sortedData.length;
    const { hex, hexBg } = getAqiColor(avgAqi);

    return {
      labels: sortedData.map((d) => new Date(d.date)),
      datasets: [
        {
          label: `Historical AQI - ${city}`,
          data: sortedData.map((d) => d.aqi),
          borderColor: hex,
          backgroundColor: hexBg,
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 4,
          fill: true,
          tension: 0.4,
        },
      ],
    };
  }, [data, city]);

  if (isLoading)
    return (
      <div className="h-72 flex items-center justify-center bg-gray-50">
        <p className="text-gray-400 animate-pulse">Loading history...</p>
      </div>
    );
  if (!data || data.length === 0)
    return (
      <div className="h-72 flex items-center justify-center bg-gray-50">
        <p className="text-gray-400">No historical data available.</p>
      </div>
    );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">AQI History</h2>
      <div className="relative h-72">
        <Line options={chartOptions} data={chartData} />
      </div>
    </div>
  );
}
