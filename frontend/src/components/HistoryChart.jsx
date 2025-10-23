// src/components/HistoryChart.jsx
import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import 'chart.js/auto';

// Register Chart.js components
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
  plugins: { legend: { labels: { color: "#9ca3af" } } },
  scales: {
    x: { type: "time", grid: { color: "#374151" }, ticks: { color: "#9ca3af" } },
    y: { grid: { color: "#374151" }, ticks: { color: "#9ca3af" }, beginAtZero: true },
  },
};

export default function HistoryChart({ data, isLoading, city }) {
  // useMemo prevents re-calculating chart data on every render
  const chartData = useMemo(() => {
    return {
      labels: data.map((d) => new Date(d.date)),
      datasets: [
        {
          label: `Historical AQI for ${city}`,
          data: data.map((d) => d.aqi),
          borderColor: "#22d3ee",
          backgroundColor: "rgba(34, 211, 238, 0.1)",
          fill: true,
          tension: 0.1,
        },
      ],
    };
  }, [data, city]);

  return (
    <div className="card">
      <h2 className="card-title">Historical AQI</h2>
      <div className="chart-container">
        {isLoading && <p className="text-muted">Loading chart...</p>}
        {!isLoading && data.length === 0 && <p className="text-muted">No historical data.</p>}
        {data.length > 0 && <Line options={chartOptions} data={chartData} />}
      </div>
    </div>
  );
}