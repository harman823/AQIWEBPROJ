import React from 'react';

export default function CompareTable({ data }) {
  const rows = Array.isArray(data) ? data : [];

  if (!Array.isArray(data)) {
    console.error('CompareTable expects an array, got:', data);
  }

  if (rows.length === 0) {
    return (
      <div className="card">
        <h2 className="card-title">Comparison Table</h2>
        <div className="text-center p-4 text-[var(--subtle-text)]">
          {Array.isArray(data)
            ? 'No data to display.'
            : 'Error: Invalid data format.'}
        </div>
      </div>
    );
  }

  const headers = Object.keys(rows[0] || {});

  return (
    <div className="card overflow-x-auto">
      <h2 className="card-title">Comparison Table</h2>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-4 py-2 text-left text-sm font-semibold border-b-2 border-[var(--border-color)]"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-[var(--primary-bg)]">
              {headers.map((header) => (
                <td
                  key={header}
                  className="px-4 py-2 text-sm border-b border-[var(--border-color)]"
                >
                  {row?.[header] ?? '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
