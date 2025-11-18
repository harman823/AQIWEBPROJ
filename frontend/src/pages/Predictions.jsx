// src/pages/Predictions.jsx
import { useEffect, useState } from "react";
import feather from "feather-icons";
import PredictionChart from "../components/PredictionChart.jsx";

const API_BASE_URL = "http://localhost:5000/api";

export default function Predictions() {
  const [isTraining, setIsTraining] = useState(false);
  const [trainMessage, setTrainMessage] = useState(null);

  useEffect(() => {
    feather.replace();
  }, []);

  const handleTrainModel = async () => {
    setIsTraining(true);
    setTrainMessage(null);

    try {
      const response = await fetch(`${API_BASE_URL}/train-model`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok && data.status === "success") {
        setTrainMessage({
          status: "success",
          message: `Model trained successfully! MSE: ${data.mean_squared_error}`,
        });
      } else {
        setTrainMessage({
          status: "error",
          message: `Training failed: ${
            data.message || "An unknown error occurred."
          }`,
        });
      }
    } catch (error) {
      console.error("API call failed:", error);
      setTrainMessage({
        status: "error",
        message:
          "Network error or service unavailable. Check console for details.",
      });
    } finally {
      setIsTraining(false);
    }
  };

  const predictionInfo = [
    {
      icon: "activity",
      title: "High Accuracy",
      text: "Our models are continuously trained to achieve high accuracy in predicting AQI levels up to 7 days in advance.",
    },
    {
      icon: "cpu",
      title: "Advanced Technology",
      text: "Utilizing ensemble methods like RandomForest, trained on vast historical and real-time environmental data.",
    },
    {
      icon: "globe",
      title: "Expanding Coverage",
      text: "Currently providing forecasts for major metropolitan areas, with more cities being added regularly.",
    },
  ];

  return (
    <>
      <section className="py-16 bg-linear-to-r from-emerald-500 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Air Quality Predictions
          </h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            Machine learning forecasts for major cities worldwide
          </p>
        </div>
      </section>

      <section className="py-16 grow bg-emerald-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12 max-w-6xl mx-auto">
            <div className="flex flex-col items-center justify-center mb-6">
              <button
                onClick={handleTrainModel}
                disabled={isTraining}
                className={`flex items-center space-x-2 py-2 px-6 rounded-lg font-semibold transition duration-200 
                  ${
                    isTraining
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-red-500 text-white hover:bg-red-600 shadow-md"
                  }`}
              >
                <i
                  data-feather="repeat"
                  className={`w-5 h-5 ${isTraining ? "animate-spin" : ""}`}
                ></i>
                <span>
                  {isTraining ? "Training Model..." : "Retrain ML Model"}
                </span>
              </button>
            </div>

            {trainMessage && (
              <div
                className={`p-3 mb-6 rounded-lg text-center font-medium max-w-lg mx-auto 
                  ${
                    trainMessage.status === "success"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
              >
                {trainMessage.message}
              </div>
            )}

            <PredictionChart days={30} />

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-gray-200 pt-8">
              {predictionInfo.map((info, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 rounded-lg bg-emerald-50/50 border border-emerald-100"
                >
                  <div className="shrink-0 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shadow">
                    <i
                      data-feather={info.icon}
                      className="text-white w-5 h-5"
                    ></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-emerald-800 mb-1">
                      {info.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {info.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
