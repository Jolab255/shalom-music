import React from 'react';
import { Container, Typography, Box, Button, List, ListItem, ListItemIcon, ListItemText, Grid2 as Grid, Paper, Divider } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const PianoServices: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Professional Piano Accompanist & Performance Bookings | Shalom Music Studios</title>
        <meta name="description" content="Book concert-grade grand piano accompaniment for churches, camp meetings, music concerts, wedding ceremonies, functions, and special events in Tanzania." />
        <link rel="canonical" href="https://shalommusic.co.tz/piano-services" />
      </Helmet>

      <Box sx={{ bgcolor: '#000000', color: 'white', overflow: 'hidden' }}>
        {/* Hero Section */}
        <Box 
          sx={{ 
            py: { xs: 12, md: 18 },
            position: 'relative',
            // Cloudy background matching Home page exactly
            background: `
              radial-gradient(circle at 20% 30%, rgba(45, 45, 55, 0.45) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(35, 35, 45, 0.4) 0%, transparent 60%),
              radial-gradient(circle at 50% 50%, rgba(25, 25, 30, 0.3) 0%, transparent 80%),
              #000000
            `,
            // Sandy texture overlay matching Home page exactly
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              width: '100%', height: '100%',
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              opacity: 0.045, 
              pointerEvents: 'none',
              zIndex: 1
            }
          }}
        >
          {/* Ambient Pink Glow Overlay */}
          <Box
            sx={{
              position: 'absolute',
              top: '40%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: '300px', sm: '500px', md: '700px' },
              height: { xs: '300px', sm: '500px', md: '700px' },
              background: 'radial-gradient(circle, rgba(255, 42, 116, 0.08) 0%, transparent 75%)',
              filter: 'blur(70px)',
              pointerEvents: 'none',
              zIndex: 1
            }}
          />

          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3 }}>
            <Grid container spacing={6} sx={{ alignItems: 'center' }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography 
                  variant="h2" 
                  sx={{ 
                    fontWeight: 900, 
                    fontFamily: '"AerodomeRegular-2vMGK", sans-serif',
                    fontSize: { xs: '2.2rem', sm: '3rem', md: '3.6rem' },
                    letterSpacing: '0.04em',
                    lineHeight: 1.1,
                    color: '#ffffff', // Clean white
                    mb: 3 
                  }}
                >
                  Concert-Grade Piano Performance Bookings
                </Typography>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    mb: 5, 
                    opacity: 0.75, 
                    fontWeight: 300, 
                    lineHeight: 1.6,
                    fontFamily: '"Linear", sans-serif',
                    fontSize: { xs: '1rem', sm: '1.15rem' }
                  }}
                >
                  Elevate your sacred worship, elegant weddings, classical recitals, and prestigious functions with master-level live piano performances. Experience a masterful touch that blends absolute keyboard precision with deep emotional expression.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button 
                    component={RouterLink}
                    to="/contact?service=accompanist"
                    variant="contained" 
                    size="large" 
                    sx={{ 
                      bgcolor: '#ff2a74', 
                      color: 'white', 
                      fontWeight: 700,
                      fontFamily: '"Space Grotesk", sans-serif',
                      px: 4.5, 
                      py: 1.6,
                      borderRadius: '0px', // Sharp corners
                      boxShadow: 'none',
                      textTransform: 'none',
                      '&:hover': { 
                        bgcolor: '#e01f61',
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    Book Accompanist
                  </Button>
                  <Button 
                    onClick={() => {
                      const element = document.getElementById('pricing-plans');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    variant="outlined" 
                    size="large" 
                    sx={{ 
                      borderColor: 'rgba(255, 255, 255, 0.2)', 
                      color: 'white', 
                      fontWeight: 700,
                      fontFamily: '"Space Grotesk", sans-serif',
                      px: 4, 
                      py: 1.6,
                      borderRadius: '0px', // Sharp corners
                      textTransform: 'none',
                      '&:hover': { 
                        borderColor: 'white', 
                        bgcolor: 'rgba(255,255,255,0.06)',
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    View Rates
                  </Button>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Box 
                  sx={{ 
                    width: '100%', 
                    height: { xs: 300, sm: 450 }, 
                    borderRadius: '0px', // Sharp corners
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 30px 60px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  <Box 
                    component="img"
                    src="https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=800&q=80"
                    alt="Professional Grand Piano Performance"
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <Box 
                    sx={{ 
                      position: 'absolute', 
                      bottom: 20, 
                      right: 20, 
                      bgcolor: 'rgba(10,10,12,0.9)', 
                      backdropFilter: 'blur(20px)', 
                      WebkitBackdropFilter: 'blur(20px)',
                      p: 2.2, 
                      borderRadius: '0px', // Sharp corners
                      border: '1px solid rgba(255, 255, 255, 0.08)' 
                    }}
                  >
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        display: 'block', 
                        fontWeight: 800, 
                        color: '#ff2a74',
                        fontFamily: '"Space Grotesk", sans-serif',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase'
                      }}
                    >
                      Performance Standards
                    </Typography>
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        fontWeight: 900, 
                        color: 'white',
                        fontFamily: '"Space Grotesk", sans-serif',
                        mt: 0.5
                      }}
                    >
                      100% Live
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Occasions Sections */}
        <Box 
          sx={{ 
            bgcolor: '#0c0c0f', 
            py: 15,
            position: 'relative',
            overflow: 'hidden',
            borderTop: '1px solid rgba(255, 255, 255, 0.04)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
            background: `
              radial-gradient(circle at 80% 20%, rgba(35, 35, 45, 0.3) 0%, transparent 60%),
              radial-gradient(circle at 20% 80%, rgba(45, 45, 55, 0.3) 0%, transparent 60%),
              #0c0c0f
            `
          }}
        >
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
            <Typography 
              variant="h3" 
              align="center" 
              sx={{ 
                mb: 2, 
                fontWeight: 800,
                fontFamily: '"AerodomeRegular-2vMGK", sans-serif',
                fontSize: { xs: '1.8rem', sm: '2.5rem', md: '2.8rem' },
                letterSpacing: '0.04em',
                color: '#ffffff', // Clean white
              }}
            >
              Accompanist Booking Occasions
            </Typography>
            <Typography 
              variant="h6" 
              align="center" 
              sx={{ 
                mb: 10, 
                maxWidth: 700, 
                mx: 'auto',
                fontFamily: '"Linear", sans-serif',
                color: 'rgba(255, 255, 255, 0.6)',
                fontWeight: 300,
                fontSize: { xs: '0.92rem', sm: '1.05rem' }
              }}
            >
              Professional, concert-grade grand piano performances tailored specifically to add artistic depth to sacred and formal assemblies.
            </Typography>

            <Grid container spacing={4} alignItems="stretch">
              {[
                { 
                  level: 'Churches', 
                  focus: 'Liturgical Elegance & Worship',
                  desc: 'Reverent accompaniments for divine services, Sabbath convocations, choral support, and special congregational prayer assemblies.',
                  items: ['Congregational Worship Playing', 'Hymnal Harmonizations', 'Choir Accompanist & Rehearsals', 'Preludes & Quiet Devotional Underscores']
                },
                { 
                  level: 'Camp Meetings', 
                  focus: 'Spiritual Unity & Leadership',
                  desc: 'Comprehensive performance coverage for multi-day conventions, open-air camps, dynamic choral assemblies, and fellowship services.',
                  items: ['Multi-Session Continuous Playback', 'Mass Choir Collaboration', 'Real-Time Transpositions', 'Liturgical Devotional Hymnal Standards']
                },
                { 
                  level: 'Music Concerts', 
                  focus: 'Virtuosity & Collaboration',
                  desc: 'Concert-grade piano recitals, collaborative classical accompanying for soloists, instrumentalists, and chamber ensemble backing.',
                  items: ['Solo Piano Recitals', 'Collaborative Sonata Accompanying', 'Orchestra/Ensemble Backing', 'HD Recording & Session Playing']
                },
                { 
                  level: 'Wedding Ceremonies', 
                  focus: 'Sophistication & Emotion',
                  desc: 'Live grand piano accompaniment to score the milestones of your union. Beautiful entrances, registries, recessions, and cocktail hours.',
                  items: ['Bridal March Processionals', 'Registry Signing Underscores', 'Elegant Cocktail Hour Jazz & Pop', 'Custom Arrangement Requests']
                },
                { 
                  level: 'Functions', 
                  focus: 'Bespoke Ambient Repertoire',
                  desc: 'Polished background standards and performance numbers for banquets, award ceremonies, grand launches, and corporate galas.',
                  items: ['Sophisticated Ambient Standards', 'Official Walk-up/Theme Fanfares', 'Tailored Genre Selection', 'High-Fidelity Sound Coordination']
                },
                { 
                  level: 'Other Places', 
                  focus: 'Versatility & Promptness',
                  desc: 'Available for classical recitals, funerals and memorial services, private parties, academic masterclasses, and community events.',
                  items: ['Memorial Service Solemn Hymns', 'Masterclass Demonstrations', 'High-End Private Gatherings', 'Flexible Location Setup Options']
                }
              ].map((program, idx) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx} sx={{ display: 'flex' }}>
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: 4, 
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      bgcolor: idx % 2 === 1 ? 'rgba(12, 12, 15, 0.85)' : 'rgba(20, 20, 25, 0.45)', 
                      color: 'white', 
                      border: '1px solid',
                      borderColor: 'rgba(255, 255, 255, 0.08)',
                      borderRadius: '0px', // Sharp corners
                      boxShadow: '0 20px 40px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.02)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: '#ff2a74',
                        transform: 'translateY(-4px)',
                        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.95)'
                      }
                    }}
                  >
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        fontWeight: 800, 
                        fontFamily: '"Space Grotesk", sans-serif',
                        fontSize: '1.25rem',
                        letterSpacing: '0.02em',
                        textTransform: 'uppercase',
                        color: 'white',
                        mb: 0.5 
                      }}
                    >
                      {program.level}
                    </Typography>
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        mb: 2.5, 
                        color: '#ff2a74',
                        fontFamily: '"Space Grotesk", sans-serif',
                        fontWeight: 600,
                        fontSize: '0.8rem',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase'
                      }}
                    >
                      {program.focus}
                    </Typography>
                    <Typography 
                      variant="body2"
                      sx={{
                        fontFamily: '"Linear", sans-serif',
                        color: 'rgba(255, 255, 255, 0.65)',
                        fontWeight: 300,
                        lineHeight: 1.5,
                        mb: 4,
                        minHeight: '72px'
                      }}
                    >
                      {program.desc}
                    </Typography>
                    <Divider sx={{ mb: 4, borderColor: 'rgba(255,255,255,0.08)' }} />
                    <List sx={{ mt: 'auto', p: 0, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                      {program.items.map((item, i) => (
                        <ListItem key={i} disableGutters sx={{ p: 0 }}>
                          <ListItemIcon sx={{ minWidth: 28, color: '#ff2a74' }}>
                            <CheckCircleIcon sx={{ fontSize: '0.95rem' }} />
                          </ListItemIcon>
                          <ListItemText 
                            primary={item} 
                            primaryTypographyProps={{
                              sx: {
                                fontFamily: '"Linear", sans-serif',
                                color: 'rgba(255, 255, 255, 0.88)',
                                fontWeight: 300,
                                fontSize: '0.82rem'
                              }
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                    
                    <Button 
                      component={RouterLink}
                      to="/pricing?category=pianoServices"
                      variant="text"
                      sx={{
                        mt: 4,
                        color: '#ff2a74',
                        fontFamily: '"Space Grotesk", sans-serif',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        alignSelf: 'flex-start',
                        p: 0,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          color: '#e01f61',
                          bgcolor: 'transparent',
                          transform: 'translateX(3px)'
                        }
                      }}
                    >
                      See Prices →
                    </Button>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            {/* View Rates Button */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
              <Button
                component={RouterLink}
                to="/pricing?category=pianoServices"
                variant="contained"
                size="large"
                sx={{
                  bgcolor: '#ff2a74',
                  color: 'white',
                  fontWeight: 700,
                  fontFamily: '"Space Grotesk", sans-serif',
                  px: 5,
                  py: 1.8,
                  borderRadius: '0px', // Sharp corners
                  boxShadow: 'none',
                  textTransform: 'none',
                  '&:hover': {
                    bgcolor: '#e01f61',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                View Performance Booking Rates
              </Button>
            </Box>
          </Container>
        </Box>


        {/* Final CTA */}
        <Box
          sx={{
            bgcolor: '#000000',
            borderTop: '1px solid rgba(255, 255, 255, 0.04)',
            position: 'relative',
            overflow: 'hidden',
            background: `
              radial-gradient(circle at 50% 50%, rgba(255, 42, 116, 0.03) 0%, transparent 60%),
              #000000
            `
          }}
        >
          <Container maxWidth="md" sx={{ py: 15, textAlign: 'center', position: 'relative', zIndex: 2 }}>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 800, 
                fontFamily: '"AerodomeRegular-2vMGK", sans-serif',
                fontSize: { xs: '1.8rem', sm: '2.5rem' },
                letterSpacing: '0.04em',
                color: '#ffffff', // Clean white
                mb: 3
              }}
            >
              Bring Virtuosic Depth to Your Gathering
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 6, 
                fontFamily: '"Linear", sans-serif',
                color: 'rgba(255, 255, 255, 0.6)',
                fontWeight: 300,
                fontSize: { xs: '0.92rem', sm: '1.1rem' }
              }}
            >
              Discuss your liturgical timing, wedding soundtrack, or concert arrangement needs. We offer standard rates and bespoke session packages.
            </Typography>
            <Button 
              component={RouterLink}
              to="/contact?service=accompanist"
              variant="contained" 
              size="large" 
              sx={{ 
                bgcolor: '#ff2a74', 
                color: 'white', 
                fontWeight: 700,
                fontFamily: '"Space Grotesk", sans-serif',
                px: 6, 
                py: 2,
                borderRadius: '0px', // Sharp corners
                boxShadow: 'none',
                textTransform: 'none',
                '&:hover': { 
                  bgcolor: '#e01f61',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Request Performance Booking
            </Button>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default PianoServices;
