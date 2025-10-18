import React, { useEffect } from 'react';

// PredictionChart Component
const PredictionChart = ({ data, city }) => {
    const chartRef = React.useRef(null);

    useEffect(() => {
        if (data && data.length > 0 && chartRef.current) {
            const dates = data.map(record => record.date);
            const aqiValues = data.map(record => record.aqi);

            const trace = {
                x: dates,
                y: aqiValues,
                type: 'scatter',
                mode: 'lines+markers',
                line: { color: '#10b981' },
                marker: { color: '#059669' }
            };

            const layout = {
                title: `AQI Forecast for ${city}`,
                plot_bgcolor: '#1e293b',
                paper_bgcolor: '#1e293b',
                font: { color: '#e2e8f0' },
                xaxis: { gridcolor: '#334155', title: 'Date' },
                yaxis: { gridcolor: '#334155', title: 'Predicted AQI' }
            };

            Plotly.newPlot(chartRef.current, [trace], layout);
        }
    }, [data, city]);

    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Forecast Visualization</h3>
            {data && data.length > 0 ? (
                <div ref={chartRef} className="h-64"></div>
            ) : (
                <div className="h-64 flex items-center justify-center text-slate-400">
                    <p>No forecast data available</p>
                </div>
            )}
        </div>
    );
};

export default PredictionChart;

