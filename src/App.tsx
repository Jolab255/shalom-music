import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { HelmetProvider } from 'react-helmet-async';
import theme from './theme/theme';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Production from './pages/Production';
import Lessons from './pages/Lessons';
import StudioRental from './pages/StudioRental';
import PianoService from './pages/PianoService';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';

// Scroll to hash handler for routing links like "#testimonials"
const ScrollToHash = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <ScrollToHash />
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/production" element={<Production />} />
              <Route path="/lessons" element={<Lessons />} />
              <Route path="/rental" element={<StudioRental />} />
              <Route path="/piano-service" element={<PianoService />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/offers" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
