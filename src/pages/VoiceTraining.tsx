import { Container, Typography, Box, Paper, Button, Grid2 as Grid, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import MicIcon from '@mui/icons-material/Mic';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';

const VoiceTraining: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Voice Training | Shalom Music</title>
        <meta name="description" content="Professional vocal coaching and voice training at Shalom Music. Develop your range, power, and expression." />
      </Helmet>

      {/* Hero Section */}
      <Box sx={{ bgcolor: 'black', color: 'white', py: { xs: 8, md: 15 }, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h2" sx={{ fontWeight: 900, mb: 3 }}>
            Unleash Your Full Vocal Potential
          </Typography>
          <Typography variant="h5" sx={{ mb: 6, opacity: 0.8, fontWeight: 300, lineHeight: 1.6 }}>
            From technical control to emotional expression, our expert vocal coaching is designed to help singers of all levels find their authentic voice.
          </Typography>
          <Button variant="contained" size="large" sx={{ bgcolor: 'white', color: 'black', px: 6, py: 1.5, '&:hover': { bgcolor: '#e0e0e0' } }}>
            Start Your Training
          </Button>
        </Container>
      </Box>

      {/* Core Focus Areas */}
      <Container maxWidth="lg" sx={{ py: 15 }}>
        <Typography variant="h3" align="center" sx={{ mb: 10, fontWeight: 800 }}>
          Our Training Pillars
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              title: 'Vocal Health & Technique',
              desc: 'Master the fundamentals of breath support, resonance, and vocal cord health to ensure a sustainable singing career.',
              icon: <FitnessCenterIcon sx={{ fontSize: 40 }} />
            },
            {
              title: 'Artistry & Interpretation',
              desc: 'Develop your unique style by learning how to interpret lyrics and deliver emotionally resonant performances.',
              icon: <GraphicEqIcon sx={{ fontSize: 40 }} />
            },
            {
              title: 'Performance Mastery',
              desc: 'Build confidence for the stage with coaching on microphone technique, stage presence, and overcoming anxiety.',
              icon: <MicIcon sx={{ fontSize: 40 }} />
            }
          ].map((item, idx) => (
            <Grid size={{ xs: 12, md: 4 }} key={idx}>
              <Paper elevation={0} sx={{ p: 5, textAlign: 'center', height: '100%', border: '1px solid #eee', transition: '0.3s', '&:hover': { borderColor: 'black' } }}>
                <Box sx={{ mb: 3, color: 'black' }}>{item.icon}</Box>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>{item.title}</Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>{item.desc}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Detailed Curriculum */}
      <Box sx={{ bgcolor: '#f5f5f5', py: 15 }}>
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 4 }}>
                What We Cover
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary', fontSize: '1.1rem' }}>
                Our curriculum is built on decades of professional experience across multiple genres, including Classical, Jazz, Pop, and Contemporary Worship.
              </Typography>
              <Grid container spacing={2}>
                {[
                  'Breath Management',
                  'Vocal Placement',
                  'Register Blending',
                  'Diction & Articulation',
                  'Dynamic Variation',
                  'Vibrato Control',
                  'Song Analysis',
                  'Audition Prep'
                ].map((text, i) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={i}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                      <CheckCircleIcon sx={{ fontSize: 20 }} />
                      <Typography sx={{ fontWeight: 500 }}>{text}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box 
                sx={{ 
                  width: '100%', 
                  height: 400, 
                  borderRadius: 2,
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                  backgroundImage: 'url("/assets/voice_training.png")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  display: 'flex',
                  alignItems: 'stretch'
                }}
              >
                <Box 
                  sx={{ 
                    width: '100%',
                    bgcolor: 'rgba(0,0,0,0.75)',
                    backdropFilter: 'blur(3px)',
                    p: 6,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    color: 'white'
                  }}
                >
                  <StarIcon sx={{ fontSize: 40, mb: 3, color: '#d4af37' }} />
                  <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
                    Artist Development
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9, mb: 4, lineHeight: 1.6 }}>
                    Beyond just singing, we help you develop your identity as an artist. This includes choosing the right repertoire and finding your "signature sound."
                  </Typography>
                  <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)', mb: 4 }} />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>Available for all levels.</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Final CTA */}
      <Container maxWidth="md" sx={{ py: 15, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 4 }}>
          Discover the Power of Your Voice
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 6, fontWeight: 400 }}>
          Schedule a 30-minute vocal assessment with one of our expert coaches today.
        </Typography>
        <Button variant="contained" size="large" sx={{ bgcolor: 'black', color: 'white', px: 6, py: 2, '&:hover': { bgcolor: '#333' } }}>
          Book Assessment Now
        </Button>
      </Container>
    </>
  );
};

export default VoiceTraining;
