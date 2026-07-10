import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import ScrollToAnchor from './components/ScrollToAnchor'
import Footer from './components/Footer'
import Home from './pages/Home/Home'
import Specialties from './pages/Specialties/Specialties'
import Gallery from './pages/Gallery/Gallery'
import Booking from './pages/Booking/Booking'
import Dashboard from './pages/Dashboard/Dashboard'

const NavigationWrapper = ({ children }) => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <>
      {!isDashboard && <Navbar />}
      {children}
      {!isDashboard && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <ScrollToAnchor />
      <NavigationWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/specialties" element={<Specialties />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/book" element={<Booking />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </NavigationWrapper>
    </Router>
  )
}

export default App