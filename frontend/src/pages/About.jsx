// src/pages/About.jsx
import { useEffect } from 'react';
import feather from 'feather-icons';

export default function About() {
  useEffect(() => {
    feather.replace(); // Initialize Feather icons on component mount
  }, []);

  return (
    <>
      {/* Header Section */}
      <section className="py-16 bg-linear-to-r from-emerald-500 to-teal-600 text-white"> {/* Correction: bg-linear-to-r */}
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About AQI Predictor</h1> {/* Updated title */}
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">Revolutionizing air quality forecasting with artificial intelligence</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white"> {/* White background */}
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-emerald-800 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8"> {/* Increased line height */}
              We believe everyone deserves to breathe clean air. Our mission is to make air quality information
              accessible, understandable, and actionable through cutting-edge technology and data science.
            </p>
            <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-200"> {/* Light bg with border */}
              <blockquote className="text-xl italic text-emerald-700 font-medium"> {/* Adjusted quote style */}
                "By predicting air quality with high accuracy, we empower communities to make informed decisions
                about their health and activities."
              </blockquote>
            </div>
          </div>

          {/* Technology Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-emerald-800 mb-4">The Technology Behind Our Predictions</h3>
              <p className="text-gray-700 mb-4">
                Our proprietary machine learning models analyze vast amounts of environmental data including:
              </p>
              <ul className="space-y-3 mb-6 text-gray-700"> {/* Consistent text color */}
                <li className="flex items-start">
                  <i data-feather="thermometer" className="w-5 h-5 text-emerald-500 mt-1 mr-3 shrink-0"></i> {/* Correction: shrink-0 */}
                  <span>Real-time pollutant measurements (PM2.5, PM10, NO2, etc.)</span>
                </li>
                 <li className="flex items-start">
                  <i data-feather="wind" className="w-5 h-5 text-emerald-500 mt-1 mr-3 shrink-0"></i> {/* Correction: shrink-0 */}
                  <span>Meteorological data (wind speed/direction, temperature, humidity)</span>
                </li>
                 <li className="flex items-start">
                  <i data-feather="calendar" className="w-5 h-5 text-emerald-500 mt-1 mr-3 shrink-0"></i> {/* Correction: shrink-0 */}
                  <span>Historical air quality trends and seasonal patterns</span>
                </li>
                 <li className="flex items-start">
                  <i data-feather="map" className="w-5 h-5 text-emerald-500 mt-1 mr-3 shrink-0"></i> {/* Correction: shrink-0 */}
                  <span>Geographical factors and emission source data</span>
                </li>
              </ul>
              <p className="text-gray-700">
                These models continuously learn and improve, utilizing algorithms like RandomForest to provide increasingly accurate forecasts.
              </p>
            </div>
            {/* Placeholder for an image or graphic */}
            <div className="bg-linear-to-br from-emerald-100 to-teal-100 rounded-xl w-full h-80 flex items-center justify-center text-emerald-500 shadow"> {/* Correction: bg-linear-to-br */}
               {/* Replace with actual image/graphic */}
               <i data-feather="cpu" className="w-24 h-24 opacity-50"></i>
              {/* <span className="text-lg font-medium">Machine Learning Visualization</span> */}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section (Optional) */}
       <section className="py-16 bg-emerald-50"> {/* Light green background */}
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-emerald-800 mb-4">Meet the Team (Example)</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Dedicated professionals passionate about environmental data science.</p>
          </div>
          {/* Example Team Member Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
             {/* Card 1 */}
            <div className="bg-white rounded-lg shadow p-6 text-center">
                {/* Placeholder Image */}
                 <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-4 flex items-center justify-center">
                     <i data-feather="user" className="w-12 h-12 text-gray-500"></i>
                 </div>
                <h4 className="font-semibold text-lg text-gray-800">Alex Chen</h4>
                <p className="text-sm text-emerald-600">Lead Data Scientist</p>
            </div>
             {/* Card 2 */}
            <div className="bg-white rounded-lg shadow p-6 text-center">
                <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-4 flex items-center justify-center">
                     <i data-feather="user" className="w-12 h-12 text-gray-500"></i>
                 </div>
                <h4 className="font-semibold text-lg text-gray-800">Maria Garcia</h4>
                <p className="text-sm text-emerald-600">Backend Engineer</p>
            </div>
             {/* Add more team members as needed */}
             {/* Card 3 Placeholder */}
             <div className="bg-white rounded-lg shadow p-6 text-center">
                 <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-4 flex items-center justify-center">
                      <i data-feather="user" className="w-12 h-12 text-gray-500"></i>
                  </div>
                 <h4 className="font-semibold text-lg text-gray-800">Sam Lee</h4>
                 <p className="text-sm text-emerald-600">Frontend Developer</p>
             </div>
              {/* Card 4 Placeholder */}
             <div className="bg-white rounded-lg shadow p-6 text-center">
                 <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-4 flex items-center justify-center">
                      <i data-feather="user" className="w-12 h-12 text-gray-500"></i>
                  </div>
                 <h4 className="font-semibold text-lg text-gray-800">Priya Sharma</h4>
                 <p className="text-sm text-emerald-600">UI/UX Designer</p>
             </div>
          </div>
        </div>
      </section>

    </>
  );
}