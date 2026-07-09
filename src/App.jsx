import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ScrollToAnchor from './components/ScrollToAnchor'
import Footer from './components/Footer'
import Home from './pages/Home/Home'
import Specialties from './pages/Specialties/Specialties'
import Gallery from './pages/Gallery/Gallery'
import Booking from './pages/Booking/Booking'

const App = () => {
  return (
    <Router>
      <ScrollToAnchor />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/specialties" element={<Specialties />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/book" element={<Booking />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App