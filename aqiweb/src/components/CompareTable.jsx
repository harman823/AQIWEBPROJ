import React from "react";

export default function CompareTable({ data }) {
  // Ensure data is always an array
  const rows = Array.isArray(data) ? data : [];

  if (!Array.isArray(data)) {
    console.error("CompareTable expects an array, got:", data);
  }

  // Handle empty data
  if (rows.length === 0) {
    return (
      <div className="text-gray-500 text-center p-4">
        {Array.isArray(data)
          ? "No data to display."
          : "Error: Invalid data format."}
      </div>
    );
  }

  // Extract table headers from the first row
  const headers = Object.keys(rows[0] || {});

  return (
    <div className="overflow-x-auto p-4">
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
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50">
              {headers.map((header) => (
                <td key={header} className="px-4 py-2 text-sm text-gray-800">
                  {row?.[header] ?? "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
