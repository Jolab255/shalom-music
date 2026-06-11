import { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { HelmetProvider } from 'react-helmet-async';
import { Box, CircularProgress } from '@mui/material';
import theme from './theme/theme';
import Layout from './components/layout/Layout';
import Loader from './components/layout/Loader';
import PageTransitionLoader from './components/layout/PageTransitionLoader';
import ErrorBoundary from './components/common/ErrorBoundary';
import { NotificationProvider } from './components/common/NotificationContext';

// Dynamic lazy-loaded page imports to optimize initial bundle delivery
const Home = lazy(() => import('./pages/Home'));
const Production = lazy(() => import('./pages/Production'));
const Lessons = lazy(() => import('./pages/Lessons'));

const PianoService = lazy(() => import('./pages/PianoService'));
const PianoServices = lazy(() => import('./pages/PianoServices'));
const Pricing = lazy(() => import('./pages/Pricing'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Academy = lazy(() => import('./pages/Academy'));
const Terms = lazy(() => import('./pages/Terms'));

// Scroll to hash handler for routing links like "#testimonials"
const ScrollToHash = () => {
  const { pathname, hash } = useLocation();
  const lastPathRef = useRef(pathname);

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        const isSamePage = pathname === lastPathRef.current;
        lastPathRef.current = pathname;

        const timer = setTimeout(() => {
          // If same page, scroll smoothly. If different page, jump instantly to avoid rendering lag under loader!
          element.scrollIntoView({ 
            behavior: isSamePage ? 'smooth' : 'auto', 
            block: 'start' 
          });
        }, 150);
        return () => clearTimeout(timer);
      }
    } else {
      lastPathRef.current = pathname;
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
              <PageTransitionLoader />
              <Layout>
                <Suspense
                  fallback={
                    <Box
                      sx={{
                        bgcolor: '#000000',
                        minHeight: '80vh',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <CircularProgress
                        variant="indeterminate"
                        size={50}
                        thickness={3}
                        sx={{
                          color: '#ff2a74',
                          filter: 'drop-shadow(0 0 10px rgba(255, 42, 116, 0.4))',
                        }}
                      />
                    </Box>
                  }
                >
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/production" element={<Production />} />
                    <Route path="/lessons" element={<Lessons />} />
                    <Route path="/rental" element={<Navigate to="/#rental" replace />} />
                    <Route path="/piano-service" element={<PianoService />} />
                    <Route path="/piano-services" element={<PianoServices />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/offers" element={<Pricing />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/academy" element={<Academy />} />
                    <Route path="/terms" element={<Terms />} />
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
