import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/nav'
import HeroPage from './components/heropage'
import StatsSection from './components/StatSection'
import CoreSpecialties from './components/CoreSpecialties'
import CredentialsSection from './components/CredentialsSection'
import SuccessStories from './components/SuccessStories'
import CTASection from './components/CTASection'
import Specialties from './components/Specialties'
import Implantology from './components/Implantology'
import Footer from './components/Footer'

const HomePage = () => (
  <>
    <HeroPage />
    <StatsSection />
    <CoreSpecialties />
    <CredentialsSection />
    <SuccessStories />
    <CTASection />
  </>
)

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/specialties" element={<Specialties />} />
        <Route path="/implantology" element={<Implantology />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App