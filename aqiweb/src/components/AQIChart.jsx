import React from 'react';

// This component receives data and renders a Plotly chart
export default function AQIChart({ data, city }) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-500 p-4">
        Select a city to view its historical AQI data.
      </div>
    );
  }

  // Prepare data for Plotly
  const trace = {
    x: data.map(d => new Date(d.reading_date)), // Dates for the x-axis
    y: data.map(d => d.aqi),                     // AQI values for the y-axis
    mode: 'lines+markers',
    type: 'scatter',
    name: `${city} AQI`,
    marker: { color: 'blue' },
  };

  const layout = {
    title: `Historical AQI for ${city}`,
    xaxis: {
      title: 'Date',
    },
    yaxis: {
      title: 'Air Quality Index (AQI)',
    },
  };

  // Use Plotly to create the chart
  React.useEffect(() => {
    Plotly.newPlot('aqi-chart-div', [trace], layout);
  }, [data]); // Re-render the chart when data changes

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">AQI Trend</h2>
      <div id="aqi-chart-div"></div>
    </div>
  );
}