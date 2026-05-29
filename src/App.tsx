import { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { HelmetProvider } from 'react-helmet-async';
import { Box } from '@mui/material';
import theme from './theme/theme';
import Layout from './components/layout/Layout';
import Loader from './components/layout/Loader';
import ErrorBoundary from './components/common/ErrorBoundary';
import { NotificationProvider } from './components/common/NotificationContext';

// Dynamic lazy-loaded page imports to optimize initial bundle delivery
const Home = lazy(() => import('./pages/Home'));
const Production = lazy(() => import('./pages/Production'));
const Lessons = lazy(() => import('./pages/Lessons'));
const StudioRental = lazy(() => import('./pages/StudioRental'));
const PianoService = lazy(() => import('./pages/PianoService'));
const PianoServices = lazy(() => import('./pages/PianoServices'));
const Pricing = lazy(() => import('./pages/Pricing'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

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
  const [loading, setLoading] = useState(true);

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <NotificationProvider>
          <ThemeProvider theme={theme}>
            {loading && <Loader onComplete={() => setLoading(false)} />}
            <Router>
              <ScrollToHash />
              <Layout>
                <Suspense fallback={<Box sx={{ bgcolor: '#000000', minHeight: '80vh' }} />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/production" element={<Production />} />
                    <Route path="/lessons" element={<Lessons />} />
                    <Route path="/rental" element={<StudioRental />} />
                    <Route path="/piano-service" element={<PianoService />} />
                    <Route path="/piano-services" element={<PianoServices />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/offers" element={<Pricing />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                  </Routes>
                </Suspense>
              </Layout>
            </Router>
          </ThemeProvider>
        </NotificationProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
