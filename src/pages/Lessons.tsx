import { Container, Typography, Box, Button, List, ListItem, ListItemIcon, ListItemText, Grid2 as Grid, Paper, Divider } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Lessons: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Professional Piano Lessons in Tanzania | Shalom Music</title>
        <meta name="description" content="Elite piano lessons for all ages and skill levels in Tanzania. Master classical and contemporary keys under expert instructors." />
        <link rel="canonical" href="https://shalommusic.com/lessons" />
      </Helmet>

      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        {/* Full-Page Under Development Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            bgcolor: 'rgba(0, 0, 0, 0.88)',
            backdropFilter: 'blur(35px)',
            WebkitBackdropFilter: 'blur(35px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 100,
            p: 4,
            minHeight: '80vh',
            textAlign: 'center'
          }}
        >
          <Box 
            sx={{ 
              bgcolor: '#ff2a74', 
              color: 'white', 
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 800,
              fontSize: '0.8rem',
              letterSpacing: '0.15em',
              px: 3,
              py: 1,
              borderRadius: 0, // Sharp!
              textTransform: 'uppercase',
              mb: 3,
              boxShadow: '0 4px 15px rgba(255, 42, 116, 0.4)'
            }}
          >
            Coming Soon
          </Box>
          <Typography 
            sx={{ 
              fontFamily: '"AerodomeRegular-2vMGK", sans-serif', 
              fontSize: { xs: '2rem', sm: '3rem', md: '3.6rem' }, 
              fontWeight: 800, 
              letterSpacing: '0.04em',
              mb: 2,
              color: 'white',
              lineHeight: 1.1
            }}
          >
            PIANO LESSONS ACADEMY
          </Typography>
          <Typography 
            sx={{ 
              fontFamily: '"Linear", sans-serif', 
              fontSize: { xs: '0.95rem', sm: '1.1rem' }, 
              color: 'rgba(255, 255, 255, 0.65)', 
              maxWidth: '480px',
              mx: 'auto',
              lineHeight: 1.6,
              mb: 5
            }}
          >
            Our expert private keyboard training academy is undergoing final curriculum configuration. Booking systems will open shortly.
          </Typography>
          <Button
            component={RouterLink}
            to="/"
            variant="outlined"
            sx={{
              borderColor: '#ff2a74',
              color: '#ff2a74',
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 700,
              px: 4,
              py: 1.5,
              borderRadius: 0, // Sharp!
              textTransform: 'none',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: '#ff2a74',
                color: 'white',
                borderColor: '#ff2a74',
                transform: 'translateY(-2px)'
              }
            }}
          >
            Return to Homepage
          </Button>
        </Box>

        <Box sx={{ bgcolor: 'black', color: 'white', py: { xs: 8, md: 15 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h2" sx={{ fontWeight: 900, mb: 3 }}>
                Master the Art of Piano
              </Typography>
              <Typography variant="h5" sx={{ mb: 4, opacity: 0.8, fontWeight: 300, lineHeight: 1.6 }}>
                Unlock your musical potential with tailored piano instruction. We combine classical foundations with modern techniques to help you become the pianist you want to be.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="contained" size="large" sx={{ bgcolor: 'white', color: 'black', px: 4, '&:hover': { bgcolor: '#e0e0e0' } }}>
                  Book a Trial
                </Button>
                <Button variant="outlined" size="large" sx={{ borderColor: 'white', color: 'white', px: 4, '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}>
                  View Pricing
                </Button>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box 
                sx={{ 
                  width: '100%', 
                  height: 450, 
                  borderRadius: 2,
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                <Box 
                  component="img"
                  src="/assets/piano_lessons.png"
                  alt="Professional Piano Lessons"
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <Box sx={{ position: 'absolute', bottom: 20, right: 20, bgcolor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', p: 2, borderRadius: 1, border: '1px solid rgba(255,255,255,0.1)' }}>
                  <Typography variant="caption" sx={{ display: 'block', fontWeight: 700, color: '#d4af37' }}>STUDENT SUCCESS RATE</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 900, color: 'white' }}>98%</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 15 }}>
        <Typography variant="h3" align="center" sx={{ mb: 2, fontWeight: 800 }}>
          Learning Programs
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 10, maxWidth: 700, mx: 'auto' }}>
          We offer structured paths designed to take you from your first note to advanced performance mastery.
        </Typography>
        <Grid container spacing={4}>
          {[
            { 
              level: 'Beginner', 
              focus: 'Foundations & Joy',
              items: ['Basic Note Reading', 'Proper Hand Posture', 'Simple Melodies', 'Introduction to Rhythm']
            },
            { 
              level: 'Intermediate', 
              focus: 'Technique & Style',
              items: ['Advanced Theory', 'Complex Repertoire', 'Dynamic Control', 'Scales & Arpeggios']
            },
            { 
              level: 'Advanced', 
              focus: 'Artistry & Performance',
              items: ['Concert Preparation', 'Mastering Expression', 'Exam Readiness', 'Professional Etiquette']
            }
          ].map((program, idx) => (
            <Grid size={{ xs: 12, md: 4 }} key={idx}>
              <Paper elevation={0} sx={{ p: 5, height: '100%', bgcolor: idx === 1 ? 'black' : 'transparent', color: idx === 1 ? 'white' : 'inherit', border: '1px solid #eee' }}>
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>{program.level}</Typography>
                <Typography variant="subtitle1" sx={{ mb: 4, opacity: 0.7 }}>{program.focus}</Typography>
                <Divider sx={{ mb: 4, borderColor: idx === 1 ? 'rgba(255,255,255,0.1)' : '#eee' }} />
                <List>
                  {program.items.map((item, i) => (
                    <ListItem key={i} disableGutters>
                      <ListItemIcon sx={{ minWidth: 36, color: idx === 1 ? 'white' : 'black' }}>
                        <CheckCircleIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box sx={{ bgcolor: '#f5f5f5', py: 15 }}>
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Box 
                sx={{ 
                  width: '100%', 
                  height: 400, 
                  borderRadius: 2, 
                  overflow: 'hidden',
                  boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
                  border: '1px solid #e0e0e0'
                }}
              >
                <Box 
                  component="img"
                  src="/assets/about_legacy.png"
                  alt="Student learning music"
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 4 }}>
                What You'll Learn
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontSize: '1.1rem' }}>
                Our holistic approach ensures you develop into a well-rounded musician, not just a piano player.
              </Typography>
              <Grid container spacing={2}>
                {[
                  { title: 'Theory', icon: <MusicNoteIcon /> },
                  { title: 'Technique', icon: <PersonIcon /> },
                  { title: 'Performance', icon: <EmojiEventsIcon /> },
                  { title: 'Improvisation', icon: <MusicNoteIcon /> },
                  { title: 'Composition', icon: <PersonIcon /> },
                  { title: 'Ear Training', icon: <EmojiEventsIcon /> }
                ].map((item, i) => (
                  <Grid size={{ xs: 6 }} key={i}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Box sx={{ bgcolor: 'white', p: 1, borderRadius: 1, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                        {item.icon}
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>{item.title}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: 15, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 4 }}>
          Ready to Play?
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 6 }}>
          Join our community of passionate learners and start your musical journey today.
        </Typography>
        <Button variant="contained" size="large" sx={{ bgcolor: 'black', color: 'white', px: 6, py: 2, '&:hover': { bgcolor: '#333' } }}>
          Book Your Introductory Lesson
        </Button>
      </Container>
      </Box>
    </>
  );
};

export default Lessons;
