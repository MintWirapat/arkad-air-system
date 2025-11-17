import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import AirQualityMap from './pages/AirQualityMap.tsx';
import AboutUs from './pages/AboutUs.tsx';
import Navbar from './components/Navbar.tsx';
import ContactUs from './pages/ContactUs.tsx';
import ArkadPPV from './pages/ArkadPPV.tsx';
import ArkadERV from './pages/ArkadERV.tsx';
import ArkadDustWalker from './pages/ArkadDustWalker.tsx';
import ArkadMonitor from './pages/ArkadMonitor.tsx';
import ArkadIPV from './pages/ArkadIPV.tsx';
import PlaceRegistration from './pages/PlaceRegistration.tsx';
// Import NEW ManualPage
import ManualPage from './pages/ManualPage.tsx';
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
          <Route path="/place-Regis" element={<PlaceRegistration />} />

          {/* Product Routes */}
          <Route path="/arkad-ppv" element={<ArkadPPV />} />
          <Route path="/arkad-erv" element={<ArkadERV />} />
          <Route path="/arkad-dust-walker" element={<ArkadDustWalker />} />
          <Route path="/arkad-monitor" element={<ArkadMonitor />} />
          <Route path="/arkad-ipv" element={<ArkadIPV />} />
          {/* NEW Route สำหรับ ManualPage */}
          <Route path="/manual" element={<ManualPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;