import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { HelmetProvider } from 'react-helmet-async';
import theme from './theme/theme';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Production from './pages/Production';
import Lessons from './pages/Lessons';
import VoiceTraining from './pages/VoiceTraining';
import StudioRental from './pages/StudioRental';
import PianoService from './pages/PianoService';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/production" element={<Production />} />
              <Route path="/lessons" element={<Lessons />} />
              <Route path="/voice" element={<VoiceTraining />} />
              <Route path="/rental" element={<StudioRental />} />
              <Route path="/piano-service" element={<PianoService />} />
              <Route path="/pricing" element={<Pricing />} />
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
