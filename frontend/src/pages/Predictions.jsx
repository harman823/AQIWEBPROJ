// src/pages/Predictions.jsx
import { useEffect } from 'react';
import feather from 'feather-icons';
// Import the actual PredictionChart component
import PredictionChart from '../components/PredictionChart.jsx';
// REMOVED: import * as api from '../apiService.js';

export default function Predictions() {
  useEffect(() => {
    feather.replace(); // Initialize Feather icons
  }, []);

  // Example data structure for the cards below the chart
  const predictionInfo = [
    { icon: 'activity', title: 'High Accuracy', text: 'Our models are continuously trained to achieve high accuracy in predicting AQI levels up to 7 days in advance.' }, // Updated text
    { icon: 'cpu', title: 'Advanced Technology', text: 'Utilizing ensemble methods like RandomForest, trained on vast historical and real-time environmental data.' }, // Updated text
    { icon: 'globe', title: 'Expanding Coverage', text: 'Currently providing forecasts for major metropolitan areas, with more cities being added regularly.' }, // Updated text
  ];

  return (
    <>
      {/* Header Section */}
      <section className="py-16 bg-linear-to-r from-emerald-500 to-teal-600 text-white"> {/* Correction: bg-linear-to-r */}
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Air Quality Predictions</h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">Machine learning forecasts for major cities worldwide</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 grow bg-emerald-50"> {/* Correction: grow */}
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12 max-w-6xl mx-auto"> {/* Centered and max width */}

            {/* Render the PredictionChart component */}
            <PredictionChart />

            {/* Informational cards below the chart */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-gray-200 pt-8">
              {predictionInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-emerald-50/50 border border-emerald-100"> {/* Added subtle border */}
                  <div className="shrink-0 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shadow"> {/* Correction: shrink-0 */}
                    <i data-feather={info.icon} className="text-white w-5 h-5"></i> {/* Smaller icon */}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-emerald-800 mb-1">{info.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{info.text}</p> {/* Better line spacing */}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Sections */}
          <div className="max-w-6xl mx-auto"> {/* Centered */}
              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4">Understanding the Forecast</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">Learn more about how we generate predictions and interpret the results.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Data Sources Card */}
                <div className="bg-white rounded-lg shadow p-6 border border-gray-100"> {/* Subtle border */}
                  <h3 className="text-xl font-bold text-emerald-800 mb-3 flex items-center">
                    <i data-feather="layers" className="mr-2 w-5 h-5 text-emerald-500"></i> {/* Changed icon */}
                    Data Sources & Features
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3"> {/* Smaller text */}
                    Our predictions rely on a diverse set of inputs including: real-time pollutant levels (PM2.5, PM10, NO2), weather data (wind, temp, humidity), day of the year, year, and city-specific encoding.
                  </p>
                   <p className="text-gray-700 text-sm leading-relaxed">
                     This comprehensive data allows our RandomForest model to capture complex interactions affecting air quality.
                  </p>
                </div>
                {/* Limitations Card */}
                <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
                  <h3 className="text-xl font-bold text-emerald-800 mb-3 flex items-center">
                    <i data-feather="alert-triangle" className="mr-2 w-5 h-5 text-orange-500"></i> {/* Changed icon color */}
                    Model Limitations
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    While highly accurate, forecasts may be less reliable during sudden, unpredictable events like large wildfires, dust storms, or major industrial accidents not captured in historical data patterns.
                  </p>
                   <p className="text-gray-700 text-sm leading-relaxed">
                     Always supplement forecasts with local news and official health advisories during emergency situations.
                  </p>
                </div>
              </div>
          </div>
        </div>
      </section>
    </>
  );
}