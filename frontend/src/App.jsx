// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Predictions from "./pages/Predictions.jsx";
import Trends from "./pages/Trends.jsx"; // <--- Import Trends
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="predictions" element={<Predictions />} />
          <Route path="trends" element={<Trends />} /> {/* <--- Add Route */}
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
