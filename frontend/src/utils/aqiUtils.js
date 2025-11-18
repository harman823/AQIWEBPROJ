export const CITIES = [
  "Ahmedabad",
  "Aizawl",
  "Amaravati",
  "Amritsar",
  "Bengaluru",
  "Bhopal",
  "Chennai",
  "Coimbatore",
  "Delhi",
  "Ernakulam",
  "Gandhinagar",
  "Gurugram",
  "Guwahati",
  "Hyderabad",
  "Jaipur",
  "Jorapokhar",
  "Kochi",
  "Kolkata",
  "Lucknow",
  "Mumbai",
  "Patna",
  "Shillong",
  "Thiruvananthapuram",
  "Visakhapatnam",
];

export function getAqiColor(aqi) {
  if (aqi === null || aqi === undefined)
    return {
      text: "text-gray-500",
      bg: "bg-gray-100",
      hex: "#6b7280",
      hexBg: "rgba(107, 114, 128, 0.1)",
      status: "Unknown",
    };

  if (aqi <= 50)
    return {
      text: "text-green-600",
      bg: "bg-green-100",
      hex: "#059669",
      hexBg: "rgba(5, 150, 105, 0.1)",
      status: "Good",
    };
  if (aqi <= 100)
    return {
      text: "text-yellow-600",
      bg: "bg-yellow-100",
      hex: "#d97706",
      hexBg: "rgba(217, 119, 6, 0.1)",
      status: "Satisfactory",
    };
  if (aqi <= 200)
    return {
      text: "text-orange-600",
      bg: "bg-orange-100",
      hex: "#ea580c",
      hexBg: "rgba(234, 88, 12, 0.1)",
      status: "Moderate",
    };
  if (aqi <= 300)
    return {
      text: "text-red-600",
      bg: "bg-red-100",
      hex: "#dc2626",
      hexBg: "rgba(220, 38, 38, 0.1)",
      status: "Poor",
    };
  if (aqi <= 400)
    return {
      text: "text-purple-600",
      bg: "bg-purple-100",
      hex: "#7c3aed",
      hexBg: "rgba(124, 58, 237, 0.1)",
      status: "Very Poor",
    };
  return {
    text: "text-rose-900",
    bg: "bg-rose-100",
    hex: "#881337",
    hexBg: "rgba(136, 19, 55, 0.1)",
    status: "Severe",
  };
}
