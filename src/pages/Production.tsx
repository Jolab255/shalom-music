import React from 'react';
import { Container, Typography, Box, Paper, Divider, Grid2 as Grid, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import simpleTrackImg from '../assets/simple-track-instrumental.png';
import classicalImg from '../assets/classical-instrumental.png';
import orchestralImg from '../assets/orchestral-instrumental.png';
import instrumentalCreationImg from '../assets/instrumental-creation.webp';

// Widescreen elite instrumental creation packages data
const packagesData = [
  {
    id: 0,
    num: '01',
    title: 'Simple Track Instrumental',
    subtitle: 'Modern Beats & Arrangements',
    image: simpleTrackImg,
    description: 'Perfect for singer-songwriters, rappers, and content creators looking for solid modern beats. This package offers premium custom beatmaking, standard verse-chorus arrangements, and high-fidelity stereo stems in genres like Pop, Hip-Hop, R&B, and Indie.',
    inclusions: [
      'Custom beat composition & rhythmic design',
      'Standard arrangement (Intro, Verse, Chorus, Outro)',
      'High-quality stereo WAV & MP3 mixdowns',
      'Up to 3 revision sessions included',
      'Individual audio stems (up to 12 tracks)',
      'Standard digital commercial rights license'
    ]
  },
  {
    id: 1,
    num: '02',
    title: 'Classical Instrumental',
    subtitle: 'Acoustic Elegance & Classical Artistry',
    image: classicalImg,
    description: 'Tailored for classical soloists, theatrical scores, and acoustic projects. We compose rich, warm grand piano parts, classical string accompaniments, and chamber arrangements, capturing the organic beauty and emotional depth of traditional orchestration.',
    inclusions: [
      'Acoustic grand piano composition & recording',
      'Chamber-style string & woodwind arrangements',
      'High-fidelity acoustic microphone setup & editing',
      'ABRSM-grade classical harmonic structure matching',
      'Separate close, room, and ambient mic stems',
      'Full publishing & non-exclusive sync rights'
    ]
  },
  {
    id: 2,
    num: '03',
    title: 'Orchestral Instrumental',
    subtitle: 'Epic Symphonic & Cinematic Scores',
    image: orchestralImg,
    description: 'Designed for filmmakers, game developers, and artists seeking a massive, epic symphonic sound. We craft elaborate cinematic tracks featuring full orchestral brass, lush strings, booming percussion, and modern hybrid elements to deliver breathtaking sonic scale.',
    inclusions: [
      'Full-scale cinematic orchestration & midi programming',
      'Hybrid symphonic scoring (orchestra + synth sound design)',
      'Epic orchestral percussion, brass, strings & choir layering',
      'Professional stems delivered (Brass, Strings, Perc, Synths)',
      'Unlimited revisions to match film visual cues perfectly',
      'Premium royalty-free global sync & performance license'
    ]
  }
];



const Production: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Professional Music Production & Instrumental Creation | Shalom Music Studios</title>
        <meta name="description" content="Tanzania's premier music production and instrumental creation services in Dar es Salaam. Elevate your sound with world-class beatmaking, audio recording, mixing, and mastering." />
        <link rel="canonical" href="https://shalommusic.co.tz/production" />
      </Helmet>

      {/* Main Page Content Wrapper (Dark Premium Theme) */}
      <Box 
        sx={{ 
          bgcolor: '#08080a', 
          color: 'white', 
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
          pt: 0,
          // Sandy texture overlay matching home page exactly
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            width: '100%', height: '100%',
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            opacity: 0.02, 
            pointerEvents: 'none',
            zIndex: 1
          }
        }}
      >
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
                  Instrumental Creation & Production
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
                  Bring your sonic vision to life with custom beat composition, classical acoustic arrangements, and epic symphonic cinematic scores. We deliver studio-grade compositions, mixing, and mastering tailored for artists, songwriters, filmmakers, and content creators.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button 
                    component={RouterLink}
                    to="/contact?service=production"
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
                    Inquire Instrumental
                  </Button>
                  <Button 
                    component={RouterLink}
                    to="/pricing?category=instrumental"
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
                    View Instrumental Rates
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
                    overflow: 'hidden'
                  }}
                >
                  <Box 
                    component="img"
                    src={instrumentalCreationImg}
                    alt="Professional Music Production Studio"
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Instrumental Creation Packages Grid Section */}
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
              Instrumental Creation Packages
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
              Select an instrumental level tailored to your creative vision, from standard demo beats to full classical recordings and epic orchestral cinematic compositions.
            </Typography>

            <Grid container spacing={4} alignItems="stretch">
              {packagesData.map((pkg, idx) => (
                <Grid size={{ xs: 12, md: 4 }} key={idx} sx={{ display: 'flex' }}>
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
                      {pkg.title}
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
                      {pkg.subtitle}
                    </Typography>
                    <Typography 
                      variant="body2"
                      sx={{
                        fontFamily: '"Linear", sans-serif',
                        color: 'rgba(255, 255, 255, 0.65)',
                        fontWeight: 300,
                        lineHeight: 1.5,
                        mb: 4,
                        minHeight: '80px'
                      }}
                    >
                      {pkg.description}
                    </Typography>
                    <Divider sx={{ mb: 4, borderColor: 'rgba(255,255,255,0.08)' }} />
                    <List sx={{ mt: 'auto', p: 0, display: 'flex', flexDirection: 'column', gap: 1.5, mb: 4 }}>
                      {pkg.inclusions.map((item, i) => (
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
                    
                    <Box sx={{ mt: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Button
                        component={RouterLink}
                        to="/contact?service=production"
                        variant="contained"
                        sx={{
                          bgcolor: '#ff2a74',
                          color: 'white',
                          fontFamily: '"Space Grotesk", sans-serif',
                          fontWeight: 700,
                          py: 1.4,
                          borderRadius: '0px',
                          textTransform: 'none',
                          boxShadow: 'none',
                          '&:hover': {
                            bgcolor: '#e01f61'
                          }
                        }}
                      >
                        Inquire Package
                      </Button>
                      
                      <Button 
                        component={RouterLink}
                        to="/pricing?category=instrumental"
                        variant="text"
                        sx={{
                          color: '#ff2a74',
                          fontFamily: '"Space Grotesk", sans-serif',
                          fontWeight: 700,
                          fontSize: '0.8rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          alignSelf: 'center',
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
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            {/* View Rates Button */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
              <Button
                component={RouterLink}
                to="/pricing?category=instrumental"
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
                View Instrumental Creation Rates
              </Button>
            </Box>
          </Container>
        </Box>

        {/* Equipment & Tech */}
        <Box 
          sx={{ 
            bgcolor: 'rgba(255, 255, 255, 0.01)', 
            py: 15, 
            position: 'relative', 
            zIndex: 2,
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={8} alignItems="center">
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontWeight: 800, 
                    mb: 4,
                    fontFamily: '"AerodomeRegular-2vMGK", "Sans Superellipse Ragan 2", sans-serif',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontSize: { xs: '1.8rem', sm: '2.4rem', md: '3rem' }
                  }}
                >
                  The Gear Behind the Sound
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mb: 6, 
                    color: 'rgba(255, 255, 255, 0.65)', 
                    fontSize: '1.1rem',
                    fontFamily: '"Linear", sans-serif',
                    lineHeight: 1.7
                  }}
                >
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
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 700, 
                          mb: 1,
                          fontFamily: '"Space Grotesk", sans-serif',
                          color: '#ff2a74'
                        }}
                      >
                        {item.category}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'rgba(255, 255, 255, 0.75)',
                          fontFamily: '"Linear", sans-serif'
                        }}
                      >
                        {item.items}
                      </Typography>
                      <Divider sx={{ mt: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
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
                    boxShadow: '0 20px 45px rgba(0,0,0,0.6)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0, left: 0, right: 0, bottom: 0,
                      boxShadow: 'inset 0 0 40px rgba(0,0,0,0.6)',
                      pointerEvents: 'none'
                    }
                  }}
                >
                  <Box 
                    component="img"
                    src="/assets/studio_interior.png"
                    alt="Studio Production Equipment"
                    sx={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      transition: 'all 0.5s ease',
                      '&:hover': {
                        transform: 'scale(1.05)'
                      }
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Genres Section */}
        <Container maxWidth="lg" sx={{ py: 15, position: 'relative', zIndex: 2 }}>
          <Typography 
            variant="h3" 
            align="center" 
            sx={{ 
              mb: 4, 
              fontWeight: 800,
              fontFamily: '"AerodomeRegular-2vMGK", "Sans Superellipse Ragan 2", sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontSize: { xs: '1.8rem', sm: '2.4rem', md: '3rem' }
            }}
          >
            Versatility Across Genres
          </Typography>
          <Typography 
            variant="h6" 
            align="center" 
            sx={{ 
              mb: 10, 
              maxWidth: 700, 
              mx: 'auto',
              fontFamily: '"Linear", sans-serif',
              color: 'rgba(255, 255, 255, 0.65)',
              fontSize: '1.1rem',
              fontWeight: 400
            }}
          >
            While we appreciate all music, we have extensive experience and specialized workflows for these core genres.
          </Typography>
          <Grid container spacing={2}>
            {['Contemporary Christian', 'Jazz & Fusion', 'Pop & Indie', 'Classical & Cinematic', 'Soul & R&B', 'Acoustic & Folk'].map((genre, i) => (
              <Grid size={{ xs: 6, sm: 4, md: 2 }} key={i}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 3, 
                    textAlign: 'center', 
                    bgcolor: 'rgba(255, 255, 255, 0.02)', 
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    color: 'white', 
                    borderRadius: 2,
                    backdropFilter: 'blur(5px)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    '&:hover': {
                      bgcolor: 'rgba(255, 42, 116, 0.1)',
                      borderColor: '#ff2a74',
                      boxShadow: '0 4px 15px rgba(255, 42, 116, 0.2)',
                      transform: 'scale(1.05)'
                    }
                  }}
                >
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontWeight: 700,
                      fontFamily: '"Space Grotesk", sans-serif'
                    }}
                  >
                    {genre}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Workflow Section */}
        <Box 
          sx={{ 
            borderTop: '1px solid rgba(255, 255, 255, 0.08)', 
            py: 15, 
            position: 'relative', 
            zIndex: 2,
            bgcolor: 'rgba(0, 0, 0, 0.2)'
          }}
        >
          <Container maxWidth="md">
            <Typography 
              variant="h3" 
              align="center" 
              sx={{ 
                mb: 10, 
                fontWeight: 800,
                fontFamily: '"AerodomeRegular-2vMGK", "Sans Superellipse Ragan 2", sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontSize: { xs: '1.8rem', sm: '2.4rem', md: '3rem' }
              }}
            >
              Our Workflow
            </Typography>
            <Box>
              {[
                { step: '1. Consultation', desc: 'A deep dive into your artistic vision, influences, and project goals.' },
                { step: '2. Pre-Production', desc: 'Refining arrangements, choosing keys, and mapping out the sonic landscape.' },
                { step: '3. The Session', desc: 'Capturing the magic in our controlled, high-end recording environment.' },
                { step: '4. Mix & Master', desc: 'Bringing everything together for a polished, competitive final release.' }
              ].map((item, idx) => (
                <Box key={idx} sx={{ mb: 6, display: 'flex', gap: 4, alignItems: 'flex-start' }}>
                  <Typography 
                    variant="h2" 
                    sx={{ 
                      fontWeight: 900, 
                      color: 'rgba(255, 42, 116, 0.15)', 
                      lineHeight: 1,
                      fontFamily: '"Space Grotesk", "Sans Superellipse Ragan 2", sans-serif',
                      fontSize: { xs: '3rem', md: '4.5rem' },
                      mt: -1
                    }}
                  >
                    {idx + 1}
                  </Typography>
                  <Box>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontWeight: 700, 
                        mb: 1,
                        fontFamily: '"Space Grotesk", sans-serif',
                        color: 'white'
                      }}
                    >
                      {item.step}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.65)',
                        fontFamily: '"Linear", sans-serif',
                        fontSize: '1.05rem',
                        lineHeight: 1.6
                      }}
                    >
                      {item.desc}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Production;
