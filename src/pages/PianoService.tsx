import { Container, Typography, Box, Paper, Divider, Grid2 as Grid, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import BuildIcon from '@mui/icons-material/Build';
import TuneIcon from '@mui/icons-material/Tune';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const PianoService: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Piano Service | Shalom Music</title>
        <meta name="description" content="Professional piano tuning, maintenance, and repair services at Shalom Music. Keep your instrument in perfect harmony." />
      </Helmet>

      {/* Hero Section */}
      <Box sx={{ bgcolor: 'black', color: 'white', py: { xs: 8, md: 12 }, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h2" sx={{ fontWeight: 900, mb: 3 }}>
            Expert Care for Your Instrument
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, opacity: 0.8, fontWeight: 300, lineHeight: 1.6 }}>
            Preserve the value and voice of your piano with our certified technical services. From concert tuning to complete regulation, we handle every instrument with precision and care.
          </Typography>
          <Button variant="contained" size="large" sx={{ bgcolor: 'white', color: 'black', px: 6, py: 1.5, '&:hover': { bgcolor: '#e0e0e0' } }}>
            Book a Service
          </Button>
        </Container>
      </Box>

      {/* Services Grid */}
      <Container maxWidth="lg" sx={{ py: 15 }}>
        <Typography variant="h3" align="center" sx={{ mb: 10, fontWeight: 800 }}>
          Our Technical Services
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              title: 'Professional Tuning',
              desc: 'Standard pitch adjustment using traditional aural methods combined with high-precision electronic equipment for the perfect temperament.',
              icon: <TuneIcon sx={{ fontSize: 40 }} />
            },
            {
              title: 'Action Regulation',
              desc: 'Surgical adjustment of the thousands of moving parts between the key and the string to ensure a responsive and uniform touch.',
              icon: <BuildIcon sx={{ fontSize: 40 }} />
            },
            {
              title: 'Voicing & Toning',
              desc: 'Adjusting the density of the hammer felt to achieve your desired tone—from bright and brilliant to warm and mellow.',
              icon: <VisibilityIcon sx={{ fontSize: 40 }} />
            }
          ].map((service, idx) => (
            <Grid size={{ xs: 12, md: 4 }} key={idx}>
              <Paper elevation={0} sx={{ p: 5, textAlign: 'center', height: '100%', border: '1px solid #eee', transition: '0.3s', '&:hover': { borderColor: 'black' } }}>
                <Box sx={{ color: 'black', mb: 3 }}>{service.icon}</Box>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>{service.title}</Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>{service.desc}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Maintenance Schedule */}
      <Box sx={{ bgcolor: '#f5f5f5', py: 15 }}>
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 4 }}>
                Recommended Care
              </Typography>
              <Typography variant="body1" sx={{ mb: 6, color: 'text.secondary', fontSize: '1.1rem' }}>
                A piano is a living instrument that responds to its environment. Regular maintenance is essential to prevent costly repairs and ensure musical satisfaction.
              </Typography>
              <List>
                {[
                  { title: 'Bi-Annual Tuning', desc: 'Recommended for home pianos to compensate for seasonal humidity changes.' },
                  { title: 'Annual Regulation', desc: 'Fine-tuning the mechanical response as parts wear and settle over time.' },
                  { title: 'Humidity Control', desc: 'Installation of climate systems to stabilize your piano\'s environment.' },
                  { title: 'Deep Cleaning', desc: 'Removal of dust and debris from the soundboard and action cavity.' }
                ].map((item, i) => (
                  <ListItem key={i} disableGutters sx={{ alignItems: 'flex-start', mb: 2 }}>
                    <ListItemIcon sx={{ mt: 0.5, minWidth: 40 }}>
                      <CheckCircleIcon sx={{ color: 'black' }} fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={<Typography variant="h6" sx={{ fontWeight: 700 }}>{item.title}</Typography>}
                      secondary={item.desc}
                    />
                  </ListItem>
                ))}
              </List>
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
                  src="/assets/piano_technical.png"
                  alt="Piano action and tuning"
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Final CTA */}
      <Container maxWidth="md" sx={{ py: 15, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 4 }}>
          Keep Your Piano in Harmony
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 6, fontWeight: 400 }}>
          Contact us with your piano's location and last service date for a customized maintenance plan.
        </Typography>
        <Button variant="contained" size="large" sx={{ bgcolor: 'black', color: 'white', px: 6, py: 2, '&:hover': { bgcolor: '#333' } }}>
          Request a Quote
        </Button>
      </Container>
    </>
  );
};

export default PianoService;
