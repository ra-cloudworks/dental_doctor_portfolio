import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import ScrollToAnchor from './components/ScrollToAnchor'
import Footer from './components/Footer'
import GlobalBackground from './components/GlobalBackground'
import CursorTrail from './components/CursorTrail'
import { BookingProvider } from './components/BookingContext'
import Home from './pages/Home/Home'
import Specialties from './pages/Specialties/Specialties'
import Gallery from './pages/Gallery/Gallery'
import Booking from './pages/Booking/Booking'
import Dashboard from './pages/Dashboard/Dashboard'
import NotFound from './pages/NotFound/NotFound'

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.99,
    filter: 'blur(4px)',
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
  },
  out: {
    opacity: 0,
    y: -15,
    scale: 0.99,
    filter: 'blur(4px)',
  },
};

const pageTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  mass: 0.8,
};

const AnimatedPage = ({ children }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
    style={{ minHeight: '100vh' }}
  >
    {children}
  </motion.div>
);

const NavigationWrapper = ({ children }) => {
  const location   = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <>
      {!isDashboard && <GlobalBackground />}
      <CursorTrail />
      {!isDashboard && <Navbar />}
      {children}
      {!isDashboard && <Footer />}
    </>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"           element={<AnimatedPage><Home /></AnimatedPage>} />
        <Route path="/specialties" element={<AnimatedPage><Specialties /></AnimatedPage>} />
        <Route path="/gallery"     element={<AnimatedPage><Gallery /></AnimatedPage>} />
        <Route path="/book"        element={<AnimatedPage><Booking /></AnimatedPage>} />
        <Route path="/dashboard"   element={<Dashboard />} />
        <Route path="*"            element={<AnimatedPage><NotFound /></AnimatedPage>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <Router>
    <BookingProvider>
      <ScrollToAnchor />
      <NavigationWrapper>
        <AnimatedRoutes />
      </NavigationWrapper>
    </BookingProvider>
  </Router>
);

export default App
