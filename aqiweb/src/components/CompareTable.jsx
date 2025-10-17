import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CompareTable() {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/api/compare')
      .then(res => {
        if (Array.isArray(res.data)) {
          setData(res.data);
        }
      })
      .catch(() => {
        setError('Could not fetch comparison data.');
      });
  }, []);

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  if (data.length === 0) {
    return (
      <div className="text-gray-500 text-center p-4">
        Loading comparison data or no data available.
      </div>
    );
  }

  const headers = Object.keys(data[0] || {});

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Top 5 Most Polluted Cities</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="px-4 py-2 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {data.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50">
                {headers.map((header) => (
                  <td key={header} className="px-4 py-2 text-sm text-gray-800">
                    {/* Format the date for better readability */}
                    {header === 'reading_date'
                      ? new Date(row[header]).toLocaleString()
                      : row[header] ?? "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}