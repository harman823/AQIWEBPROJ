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
                    const response = await axios.get(`http://127.0.0.1:5000/yearly_history/${city}`);
                    const formattedData = response.data.map(item => ({
                        Year: new Date(item.reading_date).getFullYear(),
                        AQI: item.aqi
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
    if (loading) return <div className="card"><p>Loading yearly history...</p></div>;
    return (
        <div className="history-container card">
            <h3>Yearly Average AQI History for {city}</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="AQI" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
export default AQIHistory;