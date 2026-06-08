import React from 'react';
import { Container, Typography, Box, Button, List, ListItem, ListItemIcon, ListItemText, Grid2 as Grid, Paper, Divider, Dialog, DialogContent, IconButton, Grow } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { motion } from 'framer-motion';
import shalomCtaVideo from '../assets/shalom-cta.mp4';
import shalomPlayingHero from '../assets/shalom-playing-hero.jpeg';
import campMeetingImg from '../assets/camp-meeting.jpeg';
import concertImg from '../assets/concert.png';
import pianoImg from '../assets/piano.jpeg';

const PianoServices: React.FC = () => {
  const [isPricingOpen, setIsPricingOpen] = React.useState(false);
  const [selectedOccasionId, setSelectedOccasionId] = React.useState<number | null>(null);

  const handleBookNow = (idx: number) => {
    setSelectedOccasionId(idx);
    setIsPricingOpen(true);
  };

  const occasions = [
    { 
      level: 'Churches', 
      focus: 'Liturgical Elegance & Worship',
      desc: 'Reverent accompaniments for divine services, Sabbath convocations, choral support, and special congregational prayer assemblies.',
      items: ['Congregational Worship Playing', 'Hymnal Harmonizations', 'Choir Accompanist & Rehearsals', 'Preludes & Quiet Devotional Underscores'],
      image: pianoImg,
      price: '120,000 TZS ($85 USD)',
      originalPrice: '150,000 TZS ($110 USD)',
      duration: 'per service session',
      inquiryName: 'Church Service Booking'
    },
    { 
      level: 'Camp Meetings', 
      focus: 'Spiritual Unity & Leadership',
      desc: 'Comprehensive performance coverage for multi-day conventions, open-air camps, dynamic choral assemblies, and fellowship services.',
      items: ['Multi-Session Continuous Playback', 'Mass Choir Collaboration', 'Real-Time Transpositions', 'Liturgical Devotional Hymnal Standards'],
      image: campMeetingImg,
      price: '399,999 TZS ($280 USD)',
      originalPrice: '500,000 TZS ($360 USD)',
      duration: 'per day (multi-session)',
      inquiryName: 'Camp Meeting Booking'
    },
    { 
      level: 'Music Concerts', 
      focus: 'Virtuosity & Collaboration',
      desc: 'Concert-grade piano recitals, collaborative classical accompanying for soloists, instrumentalists, and chamber ensemble backing.',
      items: ['Solo Piano Recitals', 'Collaborative Sonata Accompanying', 'Orchestra/Ensemble Backing', 'HD Recording & Session Playing'],
      image: concertImg,
      price: '699,999 TZS ($490 USD)',
      originalPrice: '800,000 TZS ($580 USD)',
      duration: 'per concert event',
      inquiryName: 'Music Concert Booking'
    },
    { 
      level: 'Wedding Ceremonies', 
      focus: 'Sophistication & Emotion',
      desc: 'Live grand piano accompaniment to score the milestones of your union. Beautiful entrances, registries, recessions, and cocktail hours.',
      items: ['Bridal March Processionals', 'Registry Signing Underscores', 'Elegant Cocktail Hour Jazz & Pop', 'Custom Arrangement Requests'],
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&h=400&q=80',
      price: '199,999 TZS ($140 USD)',
      originalPrice: '250,000 TZS ($180 USD)',
      duration: 'per wedding event',
      inquiryName: 'Wedding Ceremony Booking'
    },
    { 
      level: 'Functions', 
      focus: 'Bespoke Ambient Repertoire',
      desc: 'Polished background standards and performance numbers for banquets, award ceremonies, grand launches, and corporate galas.',
      items: ['Sophisticated Ambient Standards', 'Official Walk-up/Theme Fanfares', 'Tailored Genre Selection', 'High-Fidelity Sound Coordination'],
      image: 'https://images.unsplash.com/photo-1552422535-c45813c61732?auto=format&fit=crop&w=600&h=400&q=80',
      price: '299,999 TZS ($210 USD)',
      originalPrice: '350,000 TZS ($250 USD)',
      duration: 'per event session',
      inquiryName: 'Function Booking'
    },
    { 
      level: 'Other Places', 
      focus: 'Versatility & Promptness',
      desc: 'Available for classical recitals, funerals and memorial services, private parties, academic masterclasses, and community events.',
      items: ['Memorial Service Solemn Hymns', 'Masterclass Demonstrations', 'High-End Private Gatherings', 'Flexible Location Setup Options'],
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&h=400&q=80',
      price: '149,999 TZS ($110 USD)',
      originalPrice: '200,000 TZS ($150 USD)',
      duration: 'per booking session',
      inquiryName: 'Other Places Booking'
    }
  ];

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
            height: { xs: 'auto', md: '80vh' },
            minHeight: { xs: '550px', md: '80vh' },
            pt: { xs: 8, sm: 10, md: 12 },
            pb: { xs: 10, sm: 12, md: 14 },
            position: 'relative',
            overflow: 'hidden', // clips the slowly zooming background image
            display: 'flex',
            alignItems: 'center',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              // Dark gradient mask overlay for legibility
              background: {
                xs: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.95) 100%)',
                md: 'linear-gradient(to right, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0.4) 100%)'
              },
              zIndex: 1
            },
            // Sandy noise texture overlay
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              width: '100%', height: '100%',
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              opacity: 0.035, 
              pointerEvents: 'none',
              zIndex: 2
            }
          }}
        >
          {/* Slowly zooming background image */}
          <motion.img
            src={shalomPlayingHero}
            alt="Shalom playing piano"
            initial={{ scale: 1.0 }}
            animate={{ scale: 1.16 }}
            transition={{
              duration: 4,
              ease: 'easeInOut', // smoother transition at the zoom limits
              repeat: Infinity,
              repeatType: 'reverse'
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0,
              pointerEvents: 'none'
            }}
          />
          {/* Ambient Glows */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '20%',
              transform: 'translate(-50%, -50%)',
              width: { xs: '300px', sm: '500px', md: '700px' },
              height: { xs: '300px', sm: '500px', md: '700px' },
              background: 'radial-gradient(circle, rgba(255, 42, 116, 0.1) 0%, transparent 75%)',
              filter: 'blur(80px)',
              pointerEvents: 'none',
              zIndex: 2
            }}
          />

          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3 }}>
            <Box sx={{ maxWidth: { xs: '100%', md: '750px', lg: '850px' } }}>
              {/* Spacing placeholder to maintain layout positions */}
              <Box sx={{ pt: { xs: 6, md: 8 } }} />

              <Typography 
                variant="h1" 
                sx={{ 
                  fontWeight: 900, 
                  fontFamily: '"AerodomeRegular-2vMGK", sans-serif',
                  fontSize: { xs: '2rem', sm: '2.8rem', md: '3.5rem' },
                  letterSpacing: '0.04em',
                  lineHeight: 1.05,
                  color: '#ffffff',
                  mb: 3.5,
                  textShadow: '0 4px 15px rgba(0,0,0,0.5)'
                }}
              >
                Concert-Grade Piano Performance Bookings
              </Typography>

              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 6, 
                  opacity: 0.8, 
                  fontWeight: 300, 
                  lineHeight: 1.65,
                  fontFamily: '"Linear", sans-serif',
                  fontSize: { xs: '1rem', sm: '1.2rem' },
                  maxWidth: '700px',
                  color: 'rgba(255, 255, 255, 0.9)',
                  textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                }}
              >
                Elevate your sacred worship, elegant weddings, classical recitals, and prestigious functions with master-level live piano performances. Experience a masterful touch that blends absolute keyboard precision with deep emotional expression.
              </Typography>

              <Box sx={{ display: 'flex', gap: 2.5, flexWrap: 'wrap' }}>
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
                    px: 5, 
                    py: 1.8,
                    borderRadius: '0px',
                    boxShadow: '0 8px 30px rgba(255, 42, 116, 0.3)',
                    textTransform: 'none',
                    letterSpacing: '0.02em',
                    '&:hover': { 
                      bgcolor: '#e01f61',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 35px rgba(255, 42, 116, 0.4)'
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
                    borderColor: 'rgba(255, 255, 255, 0.35)', 
                    color: 'white', 
                    fontWeight: 700,
                    fontFamily: '"Space Grotesk", sans-serif',
                    px: 4.5, 
                    py: 1.8,
                    borderRadius: '0px',
                    textTransform: 'none',
                    letterSpacing: '0.02em',
                    backdropFilter: 'blur(5px)',
                    WebkitBackdropFilter: 'blur(5px)',
                    '&:hover': { 
                      borderColor: 'white', 
                      bgcolor: 'rgba(255,255,255,0.1)',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  View Rates
                </Button>
              </Box>
            </Box>
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
              {occasions.map((program, idx) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx} sx={{ display: 'flex' }}>
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      bgcolor: idx % 2 === 1 ? 'rgba(12, 12, 15, 0.85)' : 'rgba(20, 20, 25, 0.45)', 
                      color: 'white', 
                      border: '1px solid',
                      borderColor: 'rgba(255, 255, 255, 0.08)',
                      borderRadius: '0px',
                      overflow: 'hidden',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.02)'
                    }}
                  >
                    {/* Image Container */}
                    <Box sx={{ position: 'relative', width: '100%', height: '200px', overflow: 'hidden' }}>
                      <Box 
                        component="img"
                        src={program.image}
                        alt={program.level}
                        className="card-image"
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                      {/* Dark/color gradient overlay */}
                      <Box 
                        className="card-image-overlay"
                        sx={{
                          position: 'absolute',
                          top: 0, right: 0, bottom: 0, left: 0,
                          background: 'linear-gradient(to bottom, rgba(12, 12, 15, 0.2) 0%, rgba(12, 12, 15, 0.95) 100%)'
                        }}
                      />
                      {/* Title overlay */}
                      <Box 
                        sx={{
                          position: 'absolute',
                          bottom: '16px',
                          left: '24px',
                          zIndex: 3
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
                            textShadow: '0 2px 8px rgba(0,0,0,0.9)',
                            color: 'white'
                          }}
                        >
                          {program.level}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Card Content */}
                    <Box sx={{ p: 4, pt: 2, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      <Typography 
                        variant="subtitle1" 
                        sx={{ 
                          mb: 2, 
                          color: '#ff2a74',
                          fontFamily: '"Space Grotesk", sans-serif',
                          fontWeight: 600,
                          fontSize: '0.78rem',
                          letterSpacing: '0.08em',
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
                          lineHeight: 1.6,
                          mb: 3,
                          minHeight: '72px'
                        }}
                      >
                        {program.desc}
                      </Typography>

                      <Divider sx={{ mb: 3, borderColor: 'rgba(255,255,255,0.06)' }} />

                      <List sx={{ p: 0, display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                        {program.items.map((item, i) => (
                          <ListItem key={i} disableGutters sx={{ p: 0 }}>
                            <ListItemIcon sx={{ minWidth: 24, color: '#ff2a74' }}>
                              <CheckCircleIcon sx={{ fontSize: '0.9rem' }} />
                            </ListItemIcon>
                            <ListItemText 
                              primary={item} 
                              primaryTypographyProps={{
                                sx: {
                                  fontFamily: '"Linear", sans-serif',
                                  color: 'rgba(255, 255, 255, 0.88)',
                                  fontWeight: 300,
                                  fontSize: '0.8rem'
                                }
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>

                      <Button 
                        onClick={() => handleBookNow(idx)}
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
                            transform: 'translateX(4px)'
                          }
                        }}
                      >
                        Book Now →
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
            // Sandy texture overlay
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              width: '100%', height: '100%',
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              opacity: 0.045, 
              pointerEvents: 'none',
              zIndex: 2
            }
          }}
        >
          {/* Full-width absolute Video background */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              zIndex: 1,
              pointerEvents: 'none',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                // Dark overlay to protect text readability
                background: 'rgba(0, 0, 0, 0.82)',
                zIndex: 2
              }
            }}
          >
            <video
              src={shalomCtaVideo}
              muted
              playsInline
              autoPlay
              loop
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.45
              }}
            />
          </Box>

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
                color: 'rgba(255, 255, 255, 0.7)',
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
                borderRadius: '0px',
                boxShadow: '0 8px 30px rgba(255, 42, 116, 0.3)',
                textTransform: 'none',
                '&:hover': { 
                  bgcolor: '#e01f61',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 35px rgba(255, 42, 116, 0.4)'
                },
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              Request Performance Booking
            </Button>
          </Container>
        </Box>

        {/* Pricing Modal */}
        <Dialog
          open={isPricingOpen}
          onClose={() => setIsPricingOpen(false)}
          TransitionComponent={Grow}
          transitionDuration={{ enter: 400, exit: 250 }}
          scroll="paper"
          PaperProps={{
            sx: {
              bgcolor: '#0a0a0a',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '0px',
              maxWidth: '440px',
              width: '100%',
              maxHeight: 'calc(100vh - 48px)',
              py: { xs: 2, sm: 2.5 },
              px: { xs: 3, sm: 3.5 },
              position: 'relative',
              boxShadow: '0 20px 45px rgba(0, 0, 0, 0.95)',
              backgroundImage: 'none',
              display: 'flex',
              flexDirection: 'column'
            }
          }}
          sx={{
            backdropFilter: 'blur(10px)',
            '& .MuiBackdrop-root': {
              bgcolor: 'rgba(0, 0, 0, 0.85)'
            }
          }}
        >
          <IconButton 
            onClick={() => setIsPricingOpen(false)} 
            aria-label="close"
            sx={{ 
              position: 'absolute', 
              top: 12, 
              right: 12, 
              zIndex: 10,
              color: 'rgba(255, 255, 255, 0.6)', 
              '&:hover': { color: 'white', bgcolor: 'rgba(255, 255, 255, 0.05)' } 
            }}
          >
            <CloseIcon />
          </IconButton>

          {selectedOccasionId !== null && (() => {
            const program = occasions[selectedOccasionId];
            if (!program) return null;
            return (
              <DialogContent 
                sx={{ 
                  p: 0, 
                  textAlign: 'center', 
                  color: 'white', 
                  overflowY: 'auto',
                  '&::-webkit-scrollbar': { display: 'none' },
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}
              >
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontFamily: '"Space Grotesk", sans-serif', 
                    fontWeight: 700, 
                    fontSize: { xs: '1.3rem', sm: '1.5rem' },
                    mb: 1,
                    mt: 2,
                    px: 2,
                    textTransform: 'uppercase',
                    letterSpacing: '0.02em'
                  }}
                >
                  {program.level}
                </Typography>
                <Typography 
                  sx={{ 
                    fontFamily: '"Linear", sans-serif',
                    fontWeight: 300,
                    fontSize: '0.88rem',
                    color: 'rgba(255, 255, 255, 0.65)',
                    mb: 2.5,
                    lineHeight: 1.4,
                    px: 1
                  }}
                >
                  {program.desc}
                </Typography>

                {/* Pricing Panel */}
                <Box 
                  sx={{ 
                    bgcolor: 'rgba(255, 42, 116, 0.04)',
                    border: '1px dashed rgba(255, 42, 116, 0.25)',
                    borderRadius: '0px',
                    py: 2.5,
                    px: 2,
                    mb: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}
                >
                  <Box 
                    sx={{ 
                      position: 'absolute',
                      top: -10,
                      bgcolor: '#ff2a74',
                      color: 'white',
                      fontFamily: '"Space Grotesk", sans-serif',
                      fontWeight: 700,
                      fontSize: '0.65rem',
                      letterSpacing: '0.1em',
                      px: 1.5,
                      py: 0.2,
                      borderRadius: '0px'
                    }}
                  >
                    LIMITED OFFER
                  </Box>

                  <Typography 
                    sx={{ 
                      textDecoration: 'line-through', 
                      color: 'rgba(255, 255, 255, 0.4)', 
                      fontSize: '0.78rem',
                      fontFamily: '"Space Grotesk", sans-serif',
                      fontWeight: 500,
                      mb: 0.25,
                      mt: 0.25,
                      textAlign: 'center'
                    }}
                  >
                    {program.originalPrice}
                  </Typography>
                  <Typography 
                    sx={{ 
                      color: '#ff2a74', 
                      fontWeight: 900, 
                      fontSize: { xs: '1.25rem', sm: '1.4rem' },
                      fontFamily: '"Space Grotesk", sans-serif',
                      lineHeight: 1,
                      textAlign: 'center'
                    }}
                  >
                    {program.price}
                  </Typography>
                  <Typography 
                    sx={{ 
                      fontSize: '0.75rem',
                      color: 'rgba(255, 255, 255, 0.5)',
                      fontFamily: '"Linear", sans-serif',
                      mt: 0.75,
                      textAlign: 'center'
                    }}
                  >
                    {program.duration}
                  </Typography>
                </Box>

                {/* Inclusions List */}
                <Box sx={{ textAlign: 'left', mb: 3.5, display: 'flex', flexDirection: 'column', gap: 1.5, px: 1 }}>
                  {program.items.map((text, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25 }}>
                      <CheckCircleIcon sx={{ color: '#ff2a74', fontSize: 15, mt: 0.3 }} />
                      <Typography 
                        sx={{ 
                          fontFamily: '"Linear", sans-serif', 
                          fontWeight: 300, 
                          fontSize: '0.84rem', 
                          color: 'rgba(255, 255, 255, 0.85)',
                          lineHeight: 1.3
                        }}
                      >
                        {text}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                {/* Booking Actions */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <Button
                    component={RouterLink}
                    to={`/contact?service=accompanist&package=${encodeURIComponent(program.inquiryName)}`}
                    onClick={() => setIsPricingOpen(false)}
                    variant="contained"
                    fullWidth
                    sx={{
                      bgcolor: '#ff2a74',
                      color: 'white',
                      py: 1.4,
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      borderRadius: '0px',
                      boxShadow: 'none',
                      '&:hover': { bgcolor: '#e01b5d', boxShadow: 'none' },
                      fontFamily: '"Space Grotesk", sans-serif',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}
                  >
                    Continue to Book
                  </Button>
                  <Button
                    onClick={() => setIsPricingOpen(false)}
                    variant="text"
                    fullWidth
                    sx={{
                      color: 'rgba(255, 255, 255, 0.5)',
                      py: 1,
                      fontSize: '0.82rem',
                      fontWeight: 500,
                      borderRadius: '0px',
                      '&:hover': { color: 'white', bgcolor: 'rgba(255, 255, 255, 0.05)' },
                      fontFamily: '"Space Grotesk", sans-serif',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </DialogContent>
            );
          })()}
        </Dialog>
      </Box>
    </>
  );
};

export default PianoServices;
