import React from 'react';

export default function Card({ children }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg rounded-2xl p-6 text-white">
      {children}
    </div>
  );
}