import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import PromotionalPopup from './components/PromotionalPopup';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Booking from './pages/Booking';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Toaster position="top-center" />
        <PromotionalPopup />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking" element={<Booking />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;