import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AQIHistory = ({ city }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (city) {
            const fetchData = async () => {
                setLoading(true);
                setError('');
                try {
                    // ✨ FIX ✨: Changed URL to use relative API path
                    const response = await axios.get(`/api/yearly_history/${city}`);
                    // ✨ FIX ✨: Directly use the response data, which is already formatted
                    const formattedData = response.data.map(item => ({
                        Year: item.year,
                        'Average AQI': Math.round(item.average_aqi)
                    }));
                    setData(formattedData);
                } catch (err) {
                    setError('Could not fetch yearly historical data.');
                }
                setLoading(false);
            };
            fetchData();
        }
    }, [city]);

    if (!city) return null;
    if (loading) return <div className="p-4 text-center">Loading yearly history...</div>;

    return (
        <div className="mt-6 p-4 bg-slate-700/50 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Yearly Average AQI History for {city}</h3>
            {error && <p className="text-red-400">{error}</p>}
            {data.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="Year" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} />
                        <Legend />
                        <Line type="monotone" dataKey="Average AQI" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            ) : (
                 <div className="h-64 flex items-center justify-center text-slate-400">
                    <p>No historical data available for this city.</p>
                </div>
            )}
        </div>
    );
};

export default AQIHistory;