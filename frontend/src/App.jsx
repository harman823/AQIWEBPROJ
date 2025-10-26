// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Predictions from './pages/Predictions.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import './index.css'; // Ensure Tailwind styles are imported

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Use the Layout component to wrap all pages */}
        <Route path="/" element={<Layout />}>
          {/* Define routes for each page */}
          <Route index element={<Home />} /> {/* index route for the homepage */}
          <Route path="predictions" element={<Predictions />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          {/* Add a catch-all route for 404 Not Found if needed */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;