// src/pages/About.jsx
import { useEffect } from 'react';
import feather from 'feather-icons';

export default function About() {
  useEffect(() => {
    feather.replace();
  }, []);

  return (
    <>
      {/* Header Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About AQI Predictor Pro</h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">Revolutionizing air quality forecasting with artificial intelligence</p>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-emerald-800 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-8">
              We believe everyone deserves to breathe clean air. Our mission is to make air quality information 
              accessible, understandable, and actionable through cutting-edge technology and data science.
            </p>
            <div className="bg-emerald-100 rounded-2xl p-8">
              <blockquote className="text-xl italic text-emerald-800">
                "By predicting air quality with high accuracy, we empower communities to make informed decisions 
                about their health and activities."
              </blockquote>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-emerald-800 mb-4">The Technology Behind Our Predictions</h3>
              <p className="text-gray-700 mb-4">
                Our proprietary machine learning models analyze vast amounts of environmental data including:
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <i data-feather="check-circle" className="w-5 h-5 text-emerald-500 mt-0.5 mr-2 flex-shrink-0"></i>
                  <span>Real-time air quality measurements from monitoring stations</span>
                </li>
                {/* ... (other list items) ... */}
              </ul>
              <p className="text-gray-700">
                These models continuously learn and improve, providing increasingly accurate forecasts.
              </p>
            </div>
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 flex items-center justify-center text-gray-500">
              Machine Learning Visualization
            </div>
          </div>
        </div>
      </section>
      
      {/* ... (Rest of the sections from about.html converted to JSX) ... */}
    </>
  );
}