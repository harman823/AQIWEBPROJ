import React, { useEffect, useRef } from 'react';

// AQIChart Component
const AQIChart = ({ data, city }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        // This ensures Feather icons are rendered when the component updates
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }, [data, city]);

    useEffect(() => {
        if (data && data.length > 0 && chartRef.current) {
            const dates = data.map(record => new Date(record.reading_date));
            const aqiValues = data.map(record => record.aqi);

            const trace = {
                x: dates,
                y: aqiValues,
                type: 'scatter',
                mode: 'lines+markers',
                line: { color: '#10b981', width: 3 },
                marker: { color: '#059669', size: 8 }
            };

            const layout = {
                title: {
                    text: `Historical AQI Trend for ${city}`,
                    font: {
                        size: 20
                    }
                },
                plot_bgcolor: '#1e293b', // slate-800
                paper_bgcolor: '#1e293b', // slate-800
                font: { color: '#e2e8f0' }, // slate-200
                xaxis: { 
                    gridcolor: '#334155', // slate-700
                    title: 'Date'
                },
                yaxis: { 
                    gridcolor: '#334155', // slate-700
                    title: 'Air Quality Index (AQI)'
                },
                margin: { l: 50, r: 50, b: 50, t: 80, pad: 4 }
            };

            Plotly.newPlot(chartRef.current, [trace], layout, {responsive: true});
        }
    }, [data, city]);

    return (
        <div className="card bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4 flex items-center">
                <i data-feather="trending-up" className="mr-2 text-primary-400"></i>
                AQI Trend Analysis
            </h2>
            {data && data.length > 0 ? (
                <div ref={chartRef} className="h-96 w-full"></div>
            ) : (
                <div className="h-96 flex items-center justify-center text-slate-400">
                    <p>Select a city to view its historical AQI data.</p>
                </div>
            )}
        </div>
    );
};

export default AQIChart;

