import React, { useEffect } from 'react';

// PredictionChart Component
const PredictionChart = ({ data, city }) => {
    const chartRef = React.useRef(null);

    useEffect(() => {
        if (data && data.length > 0 && chartRef.current && window.Plotly) {
            const dates = data.map(record => record.date);
            // ✨ FIX ✨: Changed `record.aqi` to `record.predicted_aqi` to match the API response
            const aqiValues = data.map(record => record.predicted_aqi);

            const trace = {
                x: dates,
                y: aqiValues,
                type: 'scatter',
                mode: 'lines+markers',
                line: { color: '#34d399' }, // Emerald-400
                marker: { color: '#10b981' } // Emerald-500
            };

            const layout = {
                title: `30-Day AQI Forecast for ${city}`,
                plot_bgcolor: 'transparent',
                paper_bgcolor: 'transparent',
                font: { color: '#e2e8f0' }, // slate-200
                xaxis: { gridcolor: '#334155', title: 'Date' }, // slate-700
                yaxis: { gridcolor: '#334155', title: 'Predicted AQI' },
                margin: { l: 40, r: 20, t: 40, b: 40 }
            };

            Plotly.newPlot(chartRef.current, [trace], layout, {responsive: true});
        }
    }, [data, city]);

    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Forecast Visualization</h3>
            {data && data.length > 0 ? (
                <div ref={chartRef}></div>
            ) : (
                <div className="h-64 flex items-center justify-center text-slate-400">
                    <p>No forecast data available to display.</p>
                </div>
            )}
        </div>
    );
};

export default PredictionChart;