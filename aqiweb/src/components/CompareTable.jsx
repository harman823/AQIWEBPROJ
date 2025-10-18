import React, { useState, useEffect } from 'react';

// Helper function to determine AQI status and styling
const getAqiStatus = (aqi) => {
    if (aqi > 4) return { text: 'Very Unhealthy', className: 'bg-red-900 text-red-100' };
    if (aqi > 3) return { text: 'Unhealthy', className: 'bg-orange-900 text-orange-100' };
    if (aqi > 2) return { text: 'Moderate', className: 'bg-yellow-900 text-yellow-100' };
    return { text: 'Good', className: 'bg-green-900 text-green-100' };
};

const CompareTable = () => {
    const [compareData, setCompareData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompareData = async () => {
            try {
                const response = await fetch('/api/compare');
                const data = await response.json();
                setCompareData(data.slice(0, 5)); // Ensure only top 5 are shown
            } catch (error) {
                console.error('Error fetching compare data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCompareData();
    }, []);

    useEffect(() => {
        // This ensures Feather icons are rendered after the component updates
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }, [loading, compareData]);


    return (
        <div className="card bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4 flex items-center">
                <i data-feather="bar-chart-2" className="mr-2 text-primary-400"></i>
                Most Polluted Cities (Latest Reading)
            </h2>
            {loading ? (
                <div className="h-48 flex items-center justify-center text-slate-400">
                    <i data-feather="loader" className="animate-spin"></i>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-700">
                        <thead>
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-medium text-slate-300 uppercase tracking-wider">City</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-slate-300 uppercase tracking-wider">AQI</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-slate-300 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                            {compareData.map((city, index) => {
                                const status = getAqiStatus(city.aqi);
                                return (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-slate-800' : 'bg-slate-900/50'}>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">{city.city}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-bold">{city.aqi}</td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status.className}`}>
                                                {status.text}
                                            </span>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CompareTable;

