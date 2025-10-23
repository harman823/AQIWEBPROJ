// src/components/HistoryChart.jsx
import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale, // Use TimeScale for dates
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import 'chartjs-adapter-date-fns'; // Import the date adapter

// Register Chart.js components and the adapter
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  TimeScale, // Register TimeScale
  Tooltip,
  Legend,
  Filler
);

// Consistent chart styling options
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false, // Allows chart to fill container height
  plugins: {
    legend: {
        position: 'top', // Position legend at the top
        labels: {
            color: "#6b7280", // Gray color for labels (Tailwind gray-500)
            padding: 15, // Add padding to legend items
        }
     },
     tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker tooltip background
        titleColor: '#ffffff', // White title color
        bodyColor: '#ffffff', // White body color
     }
  },
  scales: {
    x: {
      type: "time", // Specify x-axis is time-based
      time: {
        unit: 'day', // Display units in days, adjust as needed (e.g., 'month')
        tooltipFormat: 'MMM d, yyyy', // Format for tooltips
        displayFormats: {
           day: 'MMM d' // Format for axis labels
        }
      },
      grid: {
        color: "#e5e7eb", // Lighter grid lines (Tailwind gray-200)
      },
      ticks: {
        color: "#9ca3af", // Medium gray ticks (Tailwind gray-400)
        maxRotation: 0, // Prevent label rotation
        autoSkip: true, // Automatically skip labels to prevent overlap
        maxTicksLimit: 10 // Limit the number of visible ticks
      },
       title: {
         display: true,
         text: 'Date',
         color: '#6b7280'
       }
    },
    y: {
      grid: {
        color: "#e5e7eb", // Lighter grid lines
      },
      ticks: {
        color: "#9ca3af", // Medium gray ticks
        stepSize: 50, // Adjust step size based on expected AQI range
      },
      beginAtZero: true, // Start y-axis at 0
      suggestedMax: 250, // Suggest a max value, chartjs will adjust if needed
      title: {
        display: true,
        text: 'AQI Value',
        color: '#6b7280'
      }
    },
  },
  elements: {
    line: {
      tension: 0.1, // Slight curve to the line
      borderColor: "#10B981", // Emerald-500 border
      borderWidth: 2, // Thinner line
      fill: true, // Fill area under the line
      backgroundColor: "rgba(16, 185, 129, 0.1)", // Light emerald fill
    },
    point: {
      radius: 0, // Hide points by default
      hoverRadius: 5, // Show points on hover
      backgroundColor: "#10B981", // Emerald point color
    }
  },
  interaction: {
      mode: 'index', // Show tooltips for all datasets at the same x-index
      intersect: false, // Tooltip will show even if not directly hovering over point/line
  },
};

export default function HistoryChart({ data, isLoading, city }) {
  // useMemo prevents re-calculating chart data on every render unless data or city changes
  const chartData = useMemo(() => {
    // Ensure data is sorted by date ascending for correct time scale rendering
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    return {
      // Use sorted data dates for labels
      labels: sortedData.map((d) => new Date(d.date)),
      datasets: [
        {
          label: `Historical AQI for ${city || 'Selected City'}`, // Use city prop
          // Use sorted data AQI values
          data: sortedData.map((d) => (d.aqi !== null && d.aqi !== undefined ? d.aqi : NaN)), // Handle null/undefined AQI
          // Styling defined in chartOptions.elements.line
        },
      ],
    };
  }, [data, city]); // Dependencies for useMemo

  return (
    <div className="bg-white rounded-lg shadow p-6"> {/* Card styling */}
      <h2 className="text-xl font-bold text-emerald-800 mb-4">Historical AQI</h2>
      <div className="relative h-72 md:h-80"> {/* Chart container with defined height, responsive */}
        {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-500">Loading chart data...</p>
            </div>
        )}
        {!isLoading && (!data || data.length === 0) && (
            <div className="absolute inset-0 flex items-center justify-center">
                 <p className="text-gray-500">No historical data available for {city || 'this city'}.</p>
            </div>
        )}
        {/* Render chart only when not loading and data exists */}
        {!isLoading && data && data.length > 0 && (
          <Line options={chartOptions} data={chartData} />
        )}
      </div>
    </div>
  );
}