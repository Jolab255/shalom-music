import { Container, Typography, Box, Button, List, ListItem, ListItemIcon, ListItemText, Grid2 as Grid, Paper, Divider } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import DoneIcon from '@mui/icons-material/Done';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import SpeakerIcon from '@mui/icons-material/Speaker';
import SettingsIcon from '@mui/icons-material/Settings';

const StudioRental: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Studio Rental | Shalom Music</title>
        <meta name="description" content="Rent our professional recording studio space at Shalom Music. Perfect for independent artists, podcasts, and rehearsals." />
      </Helmet>

      {/* Hero Section */}
      <Box sx={{ bgcolor: 'black', color: 'white', py: { xs: 8, md: 15 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 7 }}>
              <Typography variant="h2" sx={{ fontWeight: 900, mb: 3 }}>
                Premium Creative Space
              </Typography>
              <Typography variant="h5" sx={{ mb: 4, opacity: 0.8, fontWeight: 300, lineHeight: 1.6 }}>
                Our studio is more than just a room—it's a sanctuary for sound. Designed by acoustic experts, we provide the perfect environment for artists to focus, create, and capture excellence.
              </Typography>
              <Button variant="contained" size="large" sx={{ bgcolor: 'white', color: 'black', px: 6, py: 1.5, '&:hover': { bgcolor: '#e0e0e0' } }}>
                Book Your Session
              </Button>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <Box 
                sx={{ 
                  width: '100%', 
                  height: 400, 
                  bgcolor: '#111', 
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #222'
                }}
              >
                <MeetingRoomIcon sx={{ fontSize: 100, color: '#333' }} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Facilities Overview */}
      <Container maxWidth="lg" sx={{ py: 15 }}>
        <Typography variant="h3" align="center" sx={{ mb: 10, fontWeight: 800 }}>
          Designed for Excellence
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              title: 'Main Live Room',
              desc: 'A spacious 400 sq ft room with variable acoustics, perfect for drum tracking, ensembles, and live video sessions.',
              icon: <SpeakerIcon />
            },
            {
              title: 'Control Room A',
              desc: 'Acoustically accurate environment featuring our main console and high-end monitoring for critical listening.',
              icon: <SettingsIcon />
            },
            {
              title: 'Artist Lounge',
              desc: 'A comfortable space to relax and recharge, equipped with high-speed Wi-Fi and refreshment facilities.',
              icon: <MeetingRoomIcon />
            }
          ].map((facility, idx) => (
            <Grid size={{ xs: 12, md: 4 }} key={idx}>
              <Paper elevation={0} sx={{ p: 5, height: '100%', border: '1px solid #eee' }}>
                <Box sx={{ mb: 3, color: 'black' }}>{facility.icon}</Box>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>{facility.title}</Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>{facility.desc}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Equipment Highlights */}
      <Box sx={{ bgcolor: '#f5f5f5', py: 15 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 8, textAlign: 'center' }}>
            Equipment Highlights
          </Typography>
          <Grid container spacing={4}>
            {[
              { category: 'Monitoring', items: ['Genelec 8351B', 'Yamaha NS-10M', 'Sennheiser HD650'] },
              { category: 'Outboard', items: ['Universal Audio 1176', 'Neve 1073DPD', 'SSL G-Comp'] },
              { category: 'Microphones', items: ['Neumann U87 Ai', 'AKG C414 XLS', 'Shure SM7B'] },
              { category: 'Instruments', items: ['Yamaha C7 Grand Piano', 'Custom Drum Kit', 'Vintage Synths'] }
            ].map((cat, idx) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>{cat.category}</Typography>
                <List dense disablePadding>
                  {cat.items.map((item, i) => (
                    <ListItem key={i} disableGutters>
                      <ListItemIcon sx={{ minWidth: 28 }}><DoneIcon sx={{ fontSize: 16 }} /></ListItemIcon>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Rental Process */}
      <Container maxWidth="md" sx={{ py: 15 }}>
        <Typography variant="h3" align="center" sx={{ mb: 10, fontWeight: 800 }}>
          The Rental Process
        </Typography>
        <Box>
          {[
            { step: 'Check Availability', desc: 'Contact us via the form or phone to confirm your preferred dates and times.' },
            { step: 'Confirm Setup', desc: 'Let us know your specific equipment needs so we can have the room ready for you.' },
            { step: 'Secure Booking', desc: 'A 50% deposit is required to lock in your session in our studio calendar.' },
            { step: 'Create Magic', desc: 'Arrive at the studio and start your productive creative session.' }
          ].map((item, idx) => (
            <Box key={idx} sx={{ mb: 6, display: 'flex', gap: 4 }}>
              <Box sx={{ 
                minWidth: 50, 
                height: 50, 
                bgcolor: 'black', 
                color: 'white', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontWeight: 800
              }}>
                {idx + 1}
              </Box>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>{item.step}</Typography>
                <Typography variant="body1" color="text.secondary">{item.desc}</Typography>
                {idx < 3 && <Divider sx={{ mt: 4 }} />}
              </Box>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Final CTA */}
      <Box sx={{ bgcolor: 'black', color: 'white', py: 12, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h3" sx={{ mb: 3, fontWeight: 800 }}>
            Ready to book your space?
          </Typography>
          <Typography variant="h6" sx={{ mb: 6, opacity: 0.8, fontWeight: 400 }}>
            Our studio is available 7 days a week for half-day or full-day bookings.
          </Typography>
          <Button variant="contained" size="large" sx={{ bgcolor: 'white', color: 'black', px: 6, py: 2, '&:hover': { bgcolor: '#e0e0e0' } }}>
            View Full Equipment List
          </Button>
        </Container>
      </Box>
    </>
  );
};

export default StudioRental;
