import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import AirQualityMap from './pages/AirQualityMap.tsx';
import AboutUs from './pages/AboutUs.tsx';
import Navbar from './components/Navbar.tsx';
import ContactUs from './pages/ContactUs.tsx';
import ArkadPPV from './pages/ArkadPPV.tsx';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/air-quality" element={<AirQualityMap />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/arkad-ppv" element={<ArkadPPV />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;