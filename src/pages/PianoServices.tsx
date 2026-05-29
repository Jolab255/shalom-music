import React from 'react';
import { Container, Typography, Box, Button, List, ListItem, ListItemIcon, ListItemText, Grid2 as Grid, Paper, Divider } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';

const PianoServices: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Professional Piano Services & Performance | Shalom Music</title>
        <meta name="description" content="Concert-grade piano performance and accompanist services for holy Sabbath, elegant weddings, classical recitals, church worship, and professional events." />
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
            PIANO PERFORMANCE SERVICES
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
            Our premier grand piano performance and concert accompanist services are undergoing final calendar configuration. Booking systems will open shortly.
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

        {/* Hero Section */}
        <Box 
        sx={{ 
          bgcolor: '#000000', 
          color: 'white', 
          py: { xs: 12, md: 18 },
          position: 'relative',
          overflow: 'hidden',
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
                  mb: 3 
                }}
              >
                Symphonic Splendor for Every Occasion
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
                Elevate your sacred gatherings, elegant weddings, classical recitals, and church worship services with concert-level piano performances. Experience a masterful touch that blends absolute technical precision with deep artistic expression.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button 
                  component={RouterLink}
                  to="/contact"
                  variant="contained" 
                  size="large" 
                  sx={{ 
                    bgcolor: '#ff2a74', 
                    color: 'white', 
                    fontWeight: 700,
                    fontFamily: '"Space Grotesk", sans-serif',
                    px: 4.5, 
                    py: 1.6,
                    borderRadius: 0, // Sharp!
                    boxShadow: '0 6px 20px rgba(255, 42, 116, 0.25)',
                    textTransform: 'none',
                    '&:hover': { 
                      bgcolor: '#e01f61',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 24px rgba(255, 42, 116, 0.35)'
                    },
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  Book Professional Accompanist
                </Button>
                <Button 
                  component={RouterLink}
                  to="/pricing"
                  variant="outlined" 
                  size="large" 
                  sx={{ 
                    borderColor: 'rgba(255, 255, 255, 0.2)', 
                    color: 'white', 
                    fontWeight: 700,
                    fontFamily: '"Space Grotesk", sans-serif',
                    px: 4, 
                    py: 1.6,
                    borderRadius: 0, // Sharp!
                    textTransform: 'none',
                    '&:hover': { 
                      borderColor: 'white', 
                      bgcolor: 'rgba(255,255,255,0.06)',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  View Pricing
                </Button>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box 
                sx={{ 
                  width: '100%', 
                  height: { xs: 300, sm: 450 }, 
                  borderRadius: 0, // Sharp!
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 30px 60px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                <Box 
                  component="img"
                  src="/assets/piano_performance.png"
                  alt="Professional Concert Grand Piano Performance"
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    bottom: 20, 
                    right: 20, 
                    bgcolor: 'rgba(10,10,12,0.85)', 
                    backdropFilter: 'blur(20px)', 
                    WebkitBackdropFilter: 'blur(20px)',
                    p: 2.2, 
                    borderRadius: 0, // Sharp!
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
                    CONCERT HALL STANDARD
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
                    100% LIVE
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Service Categories (Structured stages/occasions) */}
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
          `,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            width: '100%', height: '100%',
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            opacity: 0.035, 
            pointerEvents: 'none',
            zIndex: 1
          }
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
              color: 'white'
            }}
          >
            Performance & Booking Occasions
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
            Providing refined, masterfully played grand piano accompaniment tailored specifically for sacred, elegant, and grand events.
          </Typography>

          <Grid container spacing={4} alignItems="stretch">
            {[
              { 
                level: 'Sacred Sabbath Services', 
                focus: 'Spiritual Reverence & Solemnity',
                desc: 'Deeply reflective accompaniment that honors holy assemblies, offering sacred hymns, quiet devotional underscores, and spiritual prelude melodies.',
                items: ['Sacred Liturgical Accompaniment', 'Holy Sabbath Underscores', 'Bespoke Hymnal Transpositions', 'Silent Prayer Improvisation']
              },
              { 
                level: 'Weddings & Celebrations', 
                focus: 'Sophistication & High Emotion',
                desc: 'Set the perfect emotional landscape for your union. Beautiful processional and recessional themes, elegant cocktail hours, and dynamic reception standards.',
                items: ['Custom Bridal Entry Repertoire', 'Cocktail Hour Elegant Jazz', 'Reception Dinner Ambience', 'Guest Welcome Preludes']
              },
              { 
                level: 'Concerts & Collaborations', 
                focus: 'Artistic Virtuosity & Command',
                desc: 'Concert-grade solo recitals, collaborative classical keyboard for instrumentalists, orchestral ensemble accompaniment, and professional session engagements.',
                items: ['Solo Grand Piano Recitals', 'Collaborative Sonata Accompanying', 'Concerto Keyboard Sections', 'Professional Masterclass Demos']
              },
              { 
                level: 'Churches & Congregations', 
                focus: 'Worship Leadership & Fellowship',
                desc: 'Full service leadership for active Sunday worship assemblies, robust choir accompaniments, choral rehearsal coaching, and seasonal holiday music.',
                items: ['Congregational Worship Playing', 'Choir Accompanist & Rehearsal Prep', 'Choral Conducting Support', 'Festive Easter & Christmas Services']
              }
            ].map((program, idx) => (
              <Grid size={{ xs: 12, md: 6 }} key={idx} sx={{ display: 'flex' }}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: { xs: 4, sm: 5 }, 
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: idx % 2 === 1 ? 'rgba(12, 12, 15, 0.85)' : 'rgba(20, 20, 25, 0.45)', 
                    color: 'white', 
                    border: '1px solid',
                    borderColor: idx % 2 === 1 ? '#ff2a74' : 'rgba(255, 255, 255, 0.08)',
                    borderRadius: 0, // Sharp!
                    boxShadow: '0 20px 40px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.02)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: '#ff2a74',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.95), 0 0 10px rgba(255, 42, 116, 0.1)'
                    }
                  }}
                >
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 800, 
                      fontFamily: '"Space Grotesk", sans-serif',
                      fontSize: '1.35rem',
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
                      fontSize: '0.85rem',
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
                        <ListItemIcon sx={{ minWidth: 32, color: '#ff2a74' }}>
                          <CheckCircleIcon sx={{ fontSize: '1.05rem' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={item} 
                          primaryTypographyProps={{
                            sx: {
                              fontFamily: '"Linear", sans-serif',
                              color: 'rgba(255, 255, 255, 0.88)',
                              fontWeight: 300,
                              fontSize: '0.88rem'
                            }
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Experience & Value Disciplines */}
      <Box 
        sx={{ 
          bgcolor: '#000000', 
          py: 15,
          position: 'relative',
          overflow: 'hidden',
          background: `
            radial-gradient(circle at 30% 50%, rgba(45, 45, 55, 0.4) 0%, transparent 60%),
            #000000
          `,
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
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={8} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Box 
                sx={{ 
                  width: '100%', 
                  height: { xs: 300, sm: 400 }, 
                  borderRadius: 0, // Sharp!
                  overflow: 'hidden',
                  boxShadow: '0 25px 50px rgba(0,0,0,0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <Box 
                  component="img"
                  src="/assets/piano_technical.png"
                  alt="Certified Grand Piano Keyboard Details"
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 800, 
                  fontFamily: '"AerodomeRegular-2vMGK", sans-serif',
                  fontSize: { xs: '1.8rem', sm: '2.5rem' },
                  letterSpacing: '0.04em',
                  color: 'white',
                  mb: 3
                }}
              >
                Artistic Rigor & Professionalism
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 5, 
                  fontFamily: '"Linear", sans-serif',
                  color: 'rgba(255, 255, 255, 0.65)',
                  fontSize: '1rem',
                  fontWeight: 300,
                  lineHeight: 1.6
                }}
              >
                Behind every concert note lies strict academic rigor and years of keyboard experience. We guarantee a level of professionalism that removes all technical friction from your booking.
              </Typography>
              <Grid container spacing={3}>
                {[
                  { title: 'Grand Repertoire', desc: 'Masters classical, hymns, contemporary and dynamic jazz standards.', icon: <MusicNoteIcon sx={{ color: 'white' }} /> },
                  { title: 'Sight-Reading', desc: 'Immediate execution of complex musical scores on the fly.', icon: <PersonIcon sx={{ color: 'white' }} /> },
                  { title: 'Impeccable Gear', desc: 'Familiarity and adjustment to high-end acoustic grand instruments.', icon: <StarIcon sx={{ color: 'white' }} /> },
                  { title: 'Transpositions', desc: 'Real-time key transpositions to fit singer ranges perfectly.', icon: <MusicNoteIcon sx={{ color: 'white' }} /> },
                  { title: 'Custom Arrangements', desc: 'Bespoke piano arrangements tailored for your wedding party.', icon: <FavoriteIcon sx={{ color: 'white' }} /> },
                  { title: 'Reliability', desc: 'Absolute promptness, tailored attire, and zero session delays.', icon: <EmojiEventsIcon sx={{ color: 'white' }} /> }
                ].map((item, i) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={i}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 1 }}>
                      <Box 
                        sx={{ 
                          bgcolor: 'rgba(255, 42, 116, 0.1)', 
                          border: '1px solid rgba(255, 42, 116, 0.2)',
                          p: 1, 
                          borderRadius: 0, // Sharp!
                          boxShadow: '0 2px 8px rgba(255, 42, 116, 0.05)',
                          flexShrink: 0
                        }}
                      >
                        {item.icon}
                      </Box>
                      <Box>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontWeight: 700,
                            fontFamily: '"Space Grotesk", sans-serif',
                            fontSize: '0.98rem',
                            color: 'white',
                            mb: 0.5
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontFamily: '"Linear", sans-serif',
                            color: 'rgba(255, 255, 255, 0.55)',
                            fontWeight: 300,
                            lineHeight: 1.4
                          }}
                        >
                          {item.desc}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Final CTA */}
      <Box
        sx={{
          bgcolor: '#0c0c0f',
          borderTop: '1px solid rgba(255, 255, 255, 0.04)',
          position: 'relative',
          overflow: 'hidden',
          background: `
            radial-gradient(circle at 50% 50%, rgba(255, 42, 116, 0.03) 0%, transparent 60%),
            #0c0c0f
          `,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            width: '100%', height: '100%',
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            opacity: 0.035, 
            pointerEvents: 'none',
            zIndex: 1
          }
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
              color: 'white',
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
            to="/contact"
            variant="contained" 
            size="large" 
            sx={{ 
              bgcolor: '#ff2a74', 
              color: 'white', 
              fontWeight: 700,
              fontFamily: '"Space Grotesk", sans-serif',
              px: 6, 
              py: 2,
              borderRadius: 0, // Sharp!
              boxShadow: '0 6px 20px rgba(255, 42, 116, 0.25)',
              textTransform: 'none',
              '&:hover': { 
                bgcolor: '#e01f61',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 24px rgba(255, 42, 116, 0.35)'
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
