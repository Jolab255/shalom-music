import { Container, Typography, Box, Paper, Divider, Grid2 as Grid, Button } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MicExternalOnIcon from '@mui/icons-material/MicExternalOn';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AlbumIcon from '@mui/icons-material/Album';

const services = [
  {
    title: 'Audio Recording',
    description: 'High-fidelity multi-track recording in an acoustically treated environment using world-class microphones and preamps.',
    icon: <MicExternalOnIcon />
  },
  {
    title: 'Mixing & Editing',
    description: 'Professional balance, surgical editing, and creative processing to ensure every element of your track has its own space.',
    icon: <SettingsInputComponentIcon />
  },
  {
    title: 'Mastering',
    description: 'The final sonic polish to ensure your music sounds consistent and professional across all playback systems.',
    icon: <CheckCircleIcon />
  },
  {
    title: 'Song Composition',
    description: 'Collaborative songwriting and arrangement support to help you structure your musical ideas into a coherent masterpiece.',
    icon: <MusicNoteIcon />
  },
  {
    title: 'Full Production',
    description: 'A complete end-to-end service where we take your demo or idea and build a fully produced, radio-ready track.',
    icon: <AlbumIcon />
  },
  {
    title: 'Post-Production',
    description: 'Specialized services including pitch correction, drum replacement, and sound design for film or media.',
    icon: <SettingsInputComponentIcon />
  }
];

const Production: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Music Production | Shalom Music</title>
        <meta name="description" content="Professional audio recording, mixing, mastering, and song composition at Shalom Music." />
      </Helmet>

      {/* Hero Section */}
      <Box sx={{ bgcolor: 'black', color: 'white', py: { xs: 8, md: 15 }, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h2" sx={{ fontWeight: 900, mb: 3 }}>
            Professional Production for Modern Artists
          </Typography>
          <Typography variant="h5" sx={{ mb: 6, opacity: 0.8, fontWeight: 300, lineHeight: 1.6 }}>
            From bedroom demos to radio-ready masters, we provide the expertise and environment to make your music stand out.
          </Typography>
          <Button variant="contained" size="large" sx={{ bgcolor: 'white', color: 'black', px: 6, py: 1.5, '&:hover': { bgcolor: '#e0e0e0' } }}>
            Start Your Project
          </Button>
        </Container>
      </Box>

      {/* Services Grid */}
      <Container maxWidth="lg" sx={{ py: 15 }}>
        <Typography variant="h3" align="center" sx={{ mb: 10, fontWeight: 800 }}>
          Our Production Services
        </Typography>
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Paper elevation={0} sx={{ p: 5, height: '100%', border: '1px solid #eee', transition: '0.3s', '&:hover': { transform: 'translateY(-5px)', borderColor: 'black' } }}>
                <Box sx={{ color: 'black', mb: 3 }}>
                  {service.icon}
                </Box>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
                  {service.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {service.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Equipment & Tech */}
      <Box sx={{ bgcolor: '#f5f5f5', py: 15 }}>
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 4 }}>
                The Gear Behind the Sound
              </Typography>
              <Typography variant="body1" sx={{ mb: 6, color: 'text.secondary', fontSize: '1.1rem' }}>
                We believe in using the best tools for the job. Our studio is equipped with a curated selection of analog and digital gear to provide a versatile sonic palette.
              </Typography>
              <Grid container spacing={4}>
                {[
                  { category: 'Microphones', items: 'Neumann, AKG, Shure, Rode' },
                  { category: 'Preamps & EQ', items: 'Universal Audio, Neve, SSL' },
                  { category: 'DAW & Plugins', items: 'Pro Tools, Logic Pro, Waves, FabFilter' },
                  { category: 'Monitoring', items: 'Genelec, Yamaha, Beyerdynamic' }
                ].map((item, i) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={i}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{item.category}</Typography>
                    <Typography variant="body2" color="text.secondary">{item.items}</Typography>
                    <Divider sx={{ mt: 2 }} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box 
                sx={{ 
                  width: '100%', 
                  height: 450, 
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                <Box 
                  component="img"
                  src="/assets/studio_interior.png"
                  alt="Studio Production Equipment"
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Genres Section */}
      <Container maxWidth="lg" sx={{ py: 15 }}>
        <Typography variant="h3" align="center" sx={{ mb: 4, fontWeight: 800 }}>
          Versatility Across Genres
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 10, maxWidth: 700, mx: 'auto' }}>
          While we appreciate all music, we have extensive experience and specialized workflows for these core genres.
        </Typography>
        <Grid container spacing={2}>
          {['Contemporary Christian', 'Jazz & Fusion', 'Pop & Indie', 'Classical & Cinematic', 'Soul & R&B', 'Acoustic & Folk'].map((genre, i) => (
            <Grid size={{ xs: 6, sm: 4, md: 2 }} key={i}>
              <Paper elevation={0} sx={{ p: 3, textAlign: 'center', bgcolor: 'black', color: 'white', borderRadius: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>{genre}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Workflow Section */}
      <Box sx={{ borderTop: '1px solid #eee', py: 15 }}>
        <Container maxWidth="md">
          <Typography variant="h3" align="center" sx={{ mb: 8, fontWeight: 800 }}>
            Our Workflow
          </Typography>
          <Box>
            {[
              { step: '1. Consultation', desc: 'A deep dive into your artistic vision, influences, and project goals.' },
              { step: '2. Pre-Production', desc: 'Refining arrangements, choosing keys, and mapping out the sonic landscape.' },
              { step: '3. The Session', desc: 'Capturing the magic in our controlled, high-end recording environment.' },
              { step: '4. Mix & Master', desc: 'Bringing everything together for a polished, competitive final release.' }
            ].map((item, idx) => (
              <Box key={idx} sx={{ mb: 6, display: 'flex', gap: 4 }}>
                <Typography variant="h2" sx={{ fontWeight: 900, color: '#eee', lineHeight: 1 }}>{idx + 1}</Typography>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>{item.step}</Typography>
                  <Typography variant="body1" color="text.secondary">{item.desc}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Production;
