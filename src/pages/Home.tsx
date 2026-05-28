import { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Card, CardContent, Grid2 as Grid, Avatar, Dialog, DialogContent, IconButton, Grow } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PianoIcon from '@mui/icons-material/Piano';
import MicIcon from '@mui/icons-material/Mic';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import StarIcon from '@mui/icons-material/Star';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import BuildIcon from '@mui/icons-material/Build';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import CloseIcon from '@mui/icons-material/Close';
import sect2Img from '../assets/sect_2.png';
import audioRecordingImg from '../assets/audio-recording.png';
import audioCapturingImg from '../assets/audio-capturing.png';
import audioEditingImg from '../assets/audio-editing.png';
import audioMasteringImg from '../assets/audio-mastering.png';

const leftImages = [
  '/assets/piano_lessons.png',
  '/assets/studio_interior.png',
  '/assets/hero.png',
  '/assets/piano_technical.png',
];

const rightImages = [
  '/assets/about_legacy.png',
  '/assets/voice_training.png',
  '/assets/piano_lessons.png',
  '/assets/studio_interior.png',
];

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { hash } = useLocation();
  const [isRecordPopupOpen, setIsRecordPopupOpen] = useState(false);
  const [isCapturingPopupOpen, setIsCapturingPopupOpen] = useState(false);
  const [isMixingPopupOpen, setIsMixingPopupOpen] = useState(false);
  const [isMasteringPopupOpen, setIsMasteringPopupOpen] = useState(false);

  useEffect(() => {
    if (hash) {
      if (hash === '#recording') setActiveTab(0);
      else if (hash === '#capturing') setActiveTab(1);
      else if (hash === '#mixing') setActiveTab(2);
      else if (hash === '#mastering') setActiveTab(3);
      else if (hash === '#instrumental') setActiveTab(4);
      else if (hash === '#rental') setActiveTab(5);
    }
  }, [hash]);

  const featuredServices = [
    {
      title: 'Audio Recording',
      headline: 'Pristine Multi-Track Studio Recording',
      desc: 'Experience absolute acoustic purity with our high-end multi-track studio recording services. Designed for bands, vocalists, acoustic ensembles, and voiceover artists seeking state-of-the-art capture mechanics and premium microphone systems.',
      features: ['Multi-Room Acoustic Control', 'Premium Valve & Condenser Mics', 'Ultra-low Noise Preamps', 'High-Definition Digital Capture'],
      link: '/contact',
      largeIcon: <MicIcon sx={{ fontSize: 48 }} />
    },
    {
      title: 'Audio Capturing',
      headline: 'Field Recording & Ambient Sound Capture',
      desc: 'High-fidelity ambient sound capture, location sound for film, and premium live performance capturing. We use professional field recording modules and specialized stereo microphone arrays to document organic soundscapes with spectacular depth.',
      features: ['Location Sound for Cinema & Media', 'High-Definition Field Recorder Modules', 'Custom Binaural & Stereo Arrays', 'Live Concert Multi-track Capture'],
      link: '/contact',
      largeIcon: <GraphicEqIcon sx={{ fontSize: 48 }} />
    },
    {
      title: 'Audio Mixing',
      headline: 'Multi-Dimensional Audio Mixing',
      desc: 'Balance your tracks with an elite three-dimensional soundstage. Our hybrid analog/digital mixing service blends warmth, clarity, depth, and spatial panning to deliver a professional sonic profile tailored for modern listening environments.',
      features: ['Hybrid Analog & Digital Summing', 'Three-Dimensional Spatial Panning', 'Precise Frequency Separation', 'Vocal Presence & Balance Control'],
      link: '/contact',
      largeIcon: <EqualizerIcon sx={{ fontSize: 48 }} />
    },
    {
      title: 'Audio Mastering',
      headline: 'Audio Mastering',
      desc: 'Prepare your tracks for global distribution on Spotify, Apple Music, and vinyl. Our commercial mastering suite optimizes loudness dynamics, checks stereo field compatibility, and applies premium multi-band compression.',
      features: ['Commercial Loudness Optimization (LUFS)', 'Dynamic Stereo Field Balancing', 'Multi-Band Compression & EQ Polish', 'Global Distribution Readiness (DDP)'],
      link: '/contact',
      largeIcon: <StarIcon sx={{ fontSize: 48 }} />
    },
    {
      title: 'Instrumental Creation',
      headline: 'Bespoke Beatmaking & Orchestration',
      desc: 'Co-create a completely unique sonic identity. We compose bespoke instrumentals, full orchestral arrangements, and custom electronic beats from scratch. Access premium sample synthesis engines and custom songwriting structures.',
      features: ['Custom Beatmaking & Synth Compositions', 'Full Cinematic Orchestral Scores', 'Bespoke Commercial Jingle Writing', 'Unique Sonic Branding & Soundbeds'],
      link: '/contact',
      largeIcon: <MusicNoteIcon sx={{ fontSize: 48 }} />
    },
    {
      title: 'Studio Rental',
      headline: 'Elite Creative Production Spaces',
      desc: 'Rent our world-class, acoustically perfected recording studios and production rooms. Fully equipped with industry-standard analog consoles, vintage instruments, premium microphone systems, and comfortable creative lounges.',
      features: ['Acoustically Calibrated Recording Spaces', 'Elite Analog Summing & Console Routing', 'Vintage Pianos, Synths & Drum Kits', 'Luxury Lounges & Production Suites'],
      link: '/contact',
      largeIcon: <PianoIcon sx={{ fontSize: 48 }} />
    }
  ];

  return (
    <>
      <Helmet>
        <title>Shalom Music | Premium Music Production & Lessons</title>
        <meta name="description" content="Elevate your sound with Shalom Music. Professional music production, piano lessons, and piano services." />
      </Helmet>

      {/* Hero Section */}
      <Box 
        sx={{ 
          color: 'white', 
          position: 'relative',
          overflow: 'hidden',
          minHeight: { xs: 'auto', md: 'calc(100vh - 112px)' },
          display: 'flex',
          alignItems: 'center',
          // Cloudy background matching Section 2 exactly
          background: `
            radial-gradient(circle at 20% 30%, rgba(45, 45, 55, 0.45) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(35, 35, 45, 0.4) 0%, transparent 60%),
            radial-gradient(circle at 50% 50%, rgba(25, 25, 30, 0.3) 0%, transparent 80%),
            #000000
          `,
          // Sandy texture overlay matching Section 2 exactly
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            opacity: 0.045, 
            pointerEvents: 'none',
            zIndex: 1
          }
        }}
      >
        <Grid container sx={{ width: '100%', minHeight: { xs: 'auto', md: 'calc(100vh - 112px)' }, position: 'relative', zIndex: 2 }}>
          {/* Left Column (Content) */}
          <Grid 
            size={{ xs: 12, md: 6 }} 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              pl: { xs: 3, sm: 6, md: 8, lg: 12 }, 
              pr: { xs: 3, sm: 4, md: 4, lg: 6 }, 
              py: { xs: 10, md: 6 },
              bgcolor: 'transparent',
              zIndex: 2,
            }}
          >
            <Typography 
              variant="h1" 
              sx={{ 
                fontSize: { xs: '4.2rem', sm: '5.8rem', md: '6.8rem', lg: '8.2rem' }, 
                mb: 3, 
                fontWeight: 900, 
                lineHeight: 0.82, 
                letterSpacing: '0.02em',
                fontFamily: '"Sans Superellipse Ragan 2", sans-serif'
              }}
            >
              <Box component="span" sx={{ display: 'block', whiteSpace: { xs: 'normal', sm: 'nowrap' } }}>
                Shape your sound,
              </Box>
              <Box component="span" sx={{ display: 'block', whiteSpace: { xs: 'normal', sm: 'nowrap' } }}>
                master your art.
              </Box>
            </Typography>

            <Typography 
              variant="h5" 
              sx={{ 
                mb: 6, 
                color: 'rgba(255, 255, 255, 0.7)',
                fontWeight: 400, 
                letterSpacing: '0.06em',
                wordSpacing: '0.15em',
                maxWidth: '540px', 
                lineHeight: 1.6,
                fontFamily: '"Linear", sans-serif',
                fontSize: { xs: '1.1rem', sm: '1.25rem' }
              }}
            >
              Elite music production, studio rentals, and piano lessons.
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button 
                component={RouterLink}
                to="/lessons"
                variant="contained" 
                size="large" 
                sx={{ 
                  bgcolor: '#ff2a74', 
                  color: 'white', 
                  px: 2.2, 
                  py: 0.6, 
                  fontSize: '18px',
                  fontWeight: 700,
                  borderRadius: 1,
                  boxShadow: 'none',
                  '&:hover': { bgcolor: '#e01b5d', transform: 'translateY(-2px)', boxShadow: 'none' },
                  transition: 'all 0.3s ease',
                  textTransform: 'none',
                  fontFamily: '"Space Grotesk", sans-serif',
                }}
              >
                Start Piano Lessons
              </Button>
              <Button 
                component={RouterLink}
                to="/rental"
                variant="outlined" 
                size="large" 
                sx={{ 
                  borderColor: 'rgba(255, 255, 255, 0.2)', 
                  color: 'white', 
                  px: 2.2, 
                  py: 0.6, 
                  fontSize: '18px',
                  fontWeight: 700,
                  borderRadius: 1,
                  '&:hover': { borderColor: 'white', bgcolor: 'rgba(255, 255, 255, 0.05)', transform: 'translateY(-2px)' },
                  transition: 'all 0.3s ease',
                  textTransform: 'none',
                  fontFamily: '"Space Grotesk", sans-serif',
                }}
              >
                Request Studio Service
              </Button>
            </Box>
          </Grid>

          {/* Right Column (Scrolling Image Bands) */}
          <Grid 
            size={{ xs: 12, md: 6 }} 
            sx={{ 
              position: 'relative', 
              height: { xs: '380px', md: 'calc(100vh - 112px)' },
              overflow: 'hidden',
              bgcolor: 'transparent',
              display: 'flex',
              gap: 2,
              px: 2,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {/* Top and Bottom Fading Masks */}
            <Box 
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '15%',
                background: 'linear-gradient(to bottom, #000000 0%, transparent 100%)',
                zIndex: 3,
                pointerEvents: 'none'
              }}
            />
            <Box 
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '15%',
                background: 'linear-gradient(to top, #000000 0%, transparent 100%)',
                zIndex: 3,
                pointerEvents: 'none'
              }}
            />

            <Box 
              sx={{ 
                width: 'calc(50% - 10px)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              {/* Sibling 1 */}
              <Box 
                sx={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  flexShrink: 0,
                  animation: 'scrollUpLeft 28s linear infinite',
                  '@keyframes scrollUpLeft': {
                    '0%': { transform: 'translateY(0)' },
                    '100%': { transform: 'translateY(-100%)' }
                  }
                }}
              >
                {leftImages.map((src, i) => (
                  <Box 
                    key={i} 
                    sx={{ 
                      position: 'relative', 
                      width: '100%', 
                      paddingTop: '120%', 
                      borderRadius: 2,
                      overflow: 'hidden',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                    }}
                  >
                    <Box 
                      component="img" 
                      src={src} 
                      alt={`Music image left ${i}`} 
                      sx={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover' 
                      }} 
                    />
                  </Box>
                ))}
                <Box sx={{ height: '16px', flexShrink: 0 }} />
              </Box>

              {/* Sibling 2 */}
              <Box 
                sx={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  flexShrink: 0,
                  animation: 'scrollUpLeft 28s linear infinite',
                }}
              >
                {leftImages.map((src, i) => (
                  <Box 
                    key={i} 
                    sx={{ 
                      position: 'relative', 
                      width: '100%', 
                      paddingTop: '120%', 
                      borderRadius: 2,
                      overflow: 'hidden',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                    }}
                  >
                    <Box 
                      component="img" 
                      src={src} 
                      alt={`Music image left copy ${i}`} 
                      sx={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover' 
                      }} 
                    />
                  </Box>
                ))}
                <Box sx={{ height: '16px', flexShrink: 0 }} />
              </Box>
            </Box>

            <Box 
              sx={{ 
                width: 'calc(50% - 10px)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              {/* Sibling 1 */}
              <Box 
                sx={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  flexShrink: 0,
                  animation: 'scrollUpRight 35s linear infinite',
                  animationDelay: '-17.5s',
                  '@keyframes scrollUpRight': {
                    '0%': { transform: 'translateY(0)' },
                    '100%': { transform: 'translateY(-100%)' }
                  }
                }}
              >
                {rightImages.map((src, i) => (
                  <Box 
                    key={i} 
                    sx={{ 
                      position: 'relative', 
                      width: '100%', 
                      paddingTop: '120%', 
                      borderRadius: 2,
                      overflow: 'hidden',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                    }}
                  >
                    <Box 
                      component="img" 
                      src={src} 
                      alt={`Music image right ${i}`} 
                      sx={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover' 
                      }} 
                    />
                  </Box>
                ))}
                <Box sx={{ height: '16px', flexShrink: 0 }} />
              </Box>

              {/* Sibling 2 */}
              <Box 
                sx={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  flexShrink: 0,
                  animation: 'scrollUpRight 35s linear infinite',
                  animationDelay: '-17.5s',
                }}
              >
                {rightImages.map((src, i) => (
                  <Box 
                    key={i} 
                    sx={{ 
                      position: 'relative', 
                      width: '100%', 
                      paddingTop: '120%', 
                      borderRadius: 2,
                      overflow: 'hidden',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                    }}
                  >
                    <Box 
                      component="img" 
                      src={src} 
                      alt={`Music image right copy ${i}`} 
                      sx={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover' 
                      }} 
                    />
                  </Box>
                ))}
                <Box sx={{ height: '16px', flexShrink: 0 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Core Services Overview */}
      <Box 
        sx={{ 
          color: 'white', 
          pt: 15,
          pb: 4,
          position: 'relative',
          overflow: 'hidden',
          // Cloudy background using radial-gradients blending into pure black
          background: `
            radial-gradient(circle at 20% 30%, rgba(45, 45, 55, 0.45) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(35, 35, 45, 0.4) 0%, transparent 60%),
            radial-gradient(circle at 50% 50%, rgba(25, 25, 30, 0.3) 0%, transparent 80%),
            #000000
          `,
          // Sandy texture overlay using data URI SVG noise with low opacity
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            opacity: 0.045, 
            pointerEvents: 'none',
            zIndex: 1
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Typography 
            variant="h2" 
            align="center" 
            sx={{ 
              mb: 4, 
              fontWeight: 800,
              fontFamily: '"AerodomeRegular-2vMGK", sans-serif',
              fontSize: { xs: '1.6rem', sm: '2.2rem', md: '2.8rem' },
              letterSpacing: '0.04em',
              color: 'transparent',
              WebkitTextStroke: '1.5px #ffffff'
            }}
          >
            UNLOCK OVER 50 products
          </Typography>

          {/* Stats Bar */}
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              gap: { xs: 4, md: 8 }, 
              mb: 6, 
              flexWrap: 'wrap' 
            }}
          >
            {[
              { label: '50,000 SOUNDS', icon: <GraphicEqIcon sx={{ fontSize: { xs: 24, md: 28 }, color: '#ff2a74' }} /> },
              { label: '28 FX', icon: <EqualizerIcon sx={{ fontSize: { xs: 24, md: 28 }, color: '#ff2a74' }} /> },
              { label: '21 INSTRUMENTS', icon: <PianoIcon sx={{ fontSize: { xs: 24, md: 28 }, color: '#ff2a74' }} /> },
            ].map((stat, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                {stat.icon}
                <Typography 
                  sx={{ 
                    fontFamily: '"Space Grotesk", sans-serif', 
                    fontWeight: 700, 
                    fontSize: { xs: '1.05rem', sm: '1.15rem', md: '1.3rem' },
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#ffffff'
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>

        {/* Showcase Banner - Cinematic Widescreen (90% viewport width, 5% gap) */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mb: 0, 
            width: '100%',
            position: 'relative',
            zIndex: 2
          }}
        >
          <Box 
            component="img" 
            src={sect2Img} 
            alt="Section 2 products showcase" 
            sx={{ 
              width: '90%', 
              height: 'auto', 
              borderRadius: 1
            }} 
          />
        </Box>

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          {/* Detailed Products Highlight Paragraph */}
          <Typography 
            align="center" 
            sx={{ 
              mt: -3,
              mb: 4,
              maxWidth: '100%',
              mx: 'auto',
              fontFamily: '"Linear", sans-serif',
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
              lineHeight: 1.7,
              color: 'rgba(255, 255, 255, 0.75)',
              letterSpacing: '0.03em',
              fontWeight: 300
            }}
          >
            Unlock emotive powerful FX, multiple synthesis technologies, premium instrument samples, high-definition drums, vintage electric pianos, and a comprehensive groove-creation platform to provide today’s musician, composer, and producer with all the tools they need to make music.
          </Typography>

          {/* Discover Plans CTA Button */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 0 }}>
            <Button
              component={RouterLink}
              to="/plans"
              variant="outlined"
              size="large"
              sx={{
                border: '2px solid #ff2a74',
                color: '#ff2a74',
                px: 4,
                py: 1,
                fontSize: '16px',
                fontWeight: 700,
                borderRadius: '4px',
                '&:hover': { 
                  border: '2px solid #ff2a74',
                  bgcolor: '#ff2a74',
                  color: 'white',
                  transform: 'translateY(-2px)' 
                },
                transition: 'all 0.3s ease',
                textTransform: 'none',
                fontFamily: '"Space Grotesk", sans-serif',
              }}
            >
              Discover Plans
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Featured Services Section - Interactive Tabbed Sub-Navbar */}
      <Box 
        id="featured"
        sx={{ 
          bgcolor: '#000000', 
          color: 'white', 
          pt: 4,
          pb: 15,
          position: 'relative',
          overflow: 'visible',
          // Matching Section 2 cloudy mist gradient + sandy overlay
          background: `
            radial-gradient(circle at 80% 30%, rgba(45, 45, 55, 0.45) 0%, transparent 50%),
            radial-gradient(circle at 20% 70%, rgba(35, 35, 45, 0.4) 0%, transparent 60%),
            #000000
          `,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            width: '100%', height: '100%',
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            opacity: 0.045, 
            pointerEvents: 'none',
            zIndex: 1
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          {/* Section Headline */}
          <Typography 
            variant="h2" 
            align="center" 
            sx={{ 
              mb: 6, 
              fontWeight: 800,
              fontFamily: '"AerodomeRegular-2vMGK", sans-serif',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3.2rem' },
              letterSpacing: '0.06em',
              color: 'transparent',
              WebkitTextStroke: '1.5px #ffffff',
              textTransform: 'uppercase'
            }}
          >
            FEATURED SERVICES
          </Typography>

          {/* Interactive Sub-Navbar Tabs */}
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              flexWrap: 'wrap',
              gap: { xs: 0.5, sm: 1, md: 2 }, 
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)', 
              pb: 0.25, 
              mb: 3,
              position: 'sticky',
              top: 0,
              zIndex: 1090,
              bgcolor: 'rgba(0, 0, 0, 0.95)',
              backdropFilter: 'blur(8px)',
              py: 0.5,
              mx: { xs: -2, sm: -3, md: -4 },
              px: { xs: 2, sm: 3, md: 4 }
            }}
          >
            {featuredServices.map((service, index) => {
              const active = activeTab === index;
              return (
                <Button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  sx={{
                    fontFamily: '"Space Grotesk", sans-serif',
                    fontSize: { xs: '0.72rem', sm: '0.8rem', md: '0.86rem' },
                    fontWeight: active ? 700 : 500,
                    color: active ? '#ff2a74' : 'rgba(255, 255, 255, 0.6)',
                    px: { xs: 1, sm: 1.5 },
                    pb: 0.5,
                    pt: 0.25,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    position: 'relative',
                    borderRadius: 0,
                    borderBottom: active ? '2px solid #ff2a74' : '2px solid transparent',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      color: '#ff2a74',
                      bgcolor: 'transparent'
                    }
                  }}
                >
                  {service.title}
                </Button>
              );
            })}
          </Box>

          {/* Dynamic Tab Content with Smooth Transitions */}
          {featuredServices.map((service, index) => {
            if (activeTab !== index) return null;

            if (index === 0) {
              return (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    animation: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                    '@keyframes fadeInUp': {
                      '0%': { opacity: 0, transform: 'translateY(20px)' },
                      '100%': { opacity: 1, transform: 'translateY(0)' }
                    }
                  }}
                >
                  <Typography 
                    variant="h3" 
                    sx={{ 
                      mb: 3, 
                      fontWeight: 700, 
                      fontFamily: '"Space Grotesk", sans-serif',
                      fontSize: { xs: '2rem', sm: '2.5rem', md: '3.2rem' },
                      color: 'white',
                      lineHeight: 1.2
                    }}
                  >
                    {service.headline}
                  </Typography>
                  <Typography 
                    sx={{ 
                      mb: 5, 
                      color: 'rgba(255, 255, 255, 0.7)', 
                      fontSize: '1.1rem', 
                      lineHeight: 1.8,
                      fontFamily: '"Linear", sans-serif',
                      fontWeight: 300,
                      maxWidth: '900px',
                      mx: 'auto'
                    }}
                  >
                    {service.desc}
                  </Typography>

                  {/* Audio Recording Tab Image */}
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      mb: 6, 
                      width: '100%',
                      maxWidth: '900px',
                      mx: 'auto'
                    }}
                  >
                    <Box 
                      component="img" 
                      src={audioRecordingImg} 
                      alt="Audio Recording studio visualization" 
                      sx={{ 
                        width: '100%', 
                        height: 'auto', 
                        borderRadius: 1
                      }} 
                    />
                  </Box>

                  {/* Explanatory Grid of Recording Features */}
                  <Grid 
                    container 
                    spacing={3} 
                    sx={{ 
                      maxWidth: '1100px', 
                      mx: 'auto', 
                      mb: 6,
                      textAlign: 'left'
                    }}
                  >
                    {[
                      { 
                        title: 'Multi-Room Acoustic Control', 
                        desc: 'Acoustically isolated live and control rooms designed for zero sound leakage and perfect reflection dynamics.' 
                      },
                      { 
                        title: 'Premium Valve & Condenser Mics', 
                        desc: 'Access to an elite collection of vintage and modern microphones, including tube condensers and high-end ribbons.' 
                      },
                      { 
                        title: 'Ultra-low Noise Preamps', 
                        desc: 'Master-grade signal preamplification ensuring clean, transparent gain structures for high-definition recordings.' 
                      },
                      { 
                        title: 'High-Definition Digital Capture', 
                        desc: 'Pristine analog-to-digital conversion operating at ultra-high sample rates to capture every sonic detail.' 
                      }
                    ].map((item, i) => (
                      <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                        <Box 
                          sx={{ 
                            p: 1.5, 
                            bgcolor: 'transparent', 
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            gap: 1.5
                          }}
                        >
                          <CheckCircleOutlineIcon sx={{ color: '#ff2a74', fontSize: 20 }} />
                          <Box>
                            <Typography 
                              sx={{ 
                                fontFamily: '"Linear", sans-serif', 
                                fontWeight: 700, 
                                fontSize: { xs: '1.1rem', md: '1.2rem' }, 
                                color: 'white',
                                mb: 0.75,
                                letterSpacing: '0.01em'
                              }}
                            >
                              {item.title}
                            </Typography>
                            <Typography 
                              sx={{ 
                                fontFamily: '"Linear", sans-serif', 
                                fontWeight: 300, 
                                fontSize: { xs: '0.9rem', md: '0.95rem' }, 
                                color: 'rgba(255, 255, 255, 0.6)',
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

                  <Button
                    onClick={() => setIsRecordPopupOpen(true)}
                    variant="outlined"
                    size="large"
                    sx={{
                      border: '2px solid #ff2a74',
                      color: '#ff2a74',
                      px: 5,
                      py: 1.3,
                      fontSize: '16px',
                      fontWeight: 700,
                      borderRadius: '4px',
                      '&:hover': { 
                        border: '2px solid #ff2a74',
                        bgcolor: '#ff2a74',
                        color: 'white',
                        transform: 'translateY(-2px)' 
                      },
                      transition: 'all 0.3s ease',
                      textTransform: 'none',
                      fontFamily: '"Space Grotesk", sans-serif',
                    }}
                  >
                    Request Audio Recording Session
                  </Button>
                </Box>
              );
            }

            if (index === 1) {
              return (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    animation: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                    '@keyframes fadeInUp': {
                      '0%': { opacity: 0, transform: 'translateY(20px)' },
                      '100%': { opacity: 1, transform: 'translateY(0)' }
                    }
                  }}
                >
                  <Typography 
                    variant="h3" 
                    sx={{ 
                      mb: 3, 
                      fontWeight: 700, 
                      fontFamily: '"Space Grotesk", sans-serif',
                      fontSize: { xs: '2rem', sm: '2.5rem', md: '3.2rem' },
                      color: 'white',
                      lineHeight: 1.2
                    }}
                  >
                    {service.headline}
                  </Typography>
                  <Typography 
                    sx={{ 
                      mb: 3, 
                      color: 'rgba(255, 255, 255, 0.7)', 
                      fontSize: '1.1rem', 
                      lineHeight: 1.8,
                      fontFamily: '"Linear", sans-serif',
                      fontWeight: 300,
                      maxWidth: '900px',
                      mx: 'auto'
                    }}
                  >
                    {service.desc}
                  </Typography>

                  {/* Audio Capturing Tab Image */}
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      mb: 3, 
                      width: '100%',
                      maxWidth: '900px',
                      mx: 'auto'
                    }}
                  >
                    <Box 
                      component="img" 
                      src={audioCapturingImg} 
                      alt="Audio Capturing studio visualization" 
                      sx={{ 
                        width: '100%', 
                        height: 'auto', 
                        borderRadius: 1
                      }} 
                    />
                  </Box>

                  {/* Explanatory Grid of Capturing Features */}
                  <Grid 
                    container 
                    spacing={3} 
                    sx={{ 
                      maxWidth: '1100px', 
                      mx: 'auto', 
                      mb: 6,
                      textAlign: 'left'
                    }}
                  >
                    {[
                      { 
                        title: 'Location Sound for Cinema & Media', 
                        desc: 'High-fidelity location audio recording for television, cinema, documentary, and digital media productions.' 
                      },
                      { 
                        title: 'High-Definition Field Recorder Modules', 
                        desc: 'Rugged, ultra-portable field recorders operating at master-grade resolutions for clean wilderness soundscapes.' 
                      },
                      { 
                        title: 'Custom Binaural & Stereo Arrays', 
                        desc: 'Specialized microphone arrays capturing rich 3D stereo images and organic room reflections.' 
                      },
                      { 
                        title: 'Live Concert Multi-track Capture', 
                        desc: 'Multi-microphone stage capture recording live performances with immaculate separation and direct lines.' 
                      }
                    ].map((item, i) => (
                      <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                        <Box 
                          sx={{ 
                            p: 1.5, 
                            bgcolor: 'transparent', 
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            gap: 1.5
                          }}
                        >
                          <CheckCircleOutlineIcon sx={{ color: '#ff2a74', fontSize: 20 }} />
                          <Box>
                            <Typography 
                              sx={{ 
                                fontFamily: '"Linear", sans-serif', 
                                fontWeight: 700, 
                                fontSize: { xs: '1.1rem', md: '1.2rem' }, 
                                color: 'white',
                                mb: 0.75,
                                letterSpacing: '0.01em'
                              }}
                            >
                              {item.title}
                            </Typography>
                            <Typography 
                              sx={{ 
                                fontFamily: '"Linear", sans-serif', 
                                fontWeight: 300, 
                                fontSize: { xs: '0.9rem', md: '0.95rem' }, 
                                color: 'rgba(255, 255, 255, 0.6)',
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

                  <Button
                    onClick={() => setIsCapturingPopupOpen(true)}
                    variant="outlined"
                    size="large"
                    sx={{
                      border: '2px solid #ff2a74',
                      color: '#ff2a74',
                      px: 5,
                      py: 1.3,
                      fontSize: '16px',
                      fontWeight: 700,
                      borderRadius: '4px',
                      '&:hover': { 
                        border: '2px solid #ff2a74',
                        bgcolor: '#ff2a74',
                        color: 'white',
                        transform: 'translateY(-2px)' 
                      },
                      transition: 'all 0.3s ease',
                      textTransform: 'none',
                      fontFamily: '"Space Grotesk", sans-serif',
                    }}
                  >
                    Request Audio Capturing Session
                  </Button>
                </Box>
              );
            }

            if (index === 2) {
              return (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    animation: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                    '@keyframes fadeInUp': {
                      '0%': { opacity: 0, transform: 'translateY(20px)' },
                      '100%': { opacity: 1, transform: 'translateY(0)' }
                    }
                  }}
                >
                  <Typography 
                    variant="h3" 
                    sx={{ 
                      mb: 3, 
                      fontWeight: 700, 
                      fontFamily: '"Space Grotesk", sans-serif',
                      fontSize: { xs: '2rem', sm: '2.5rem', md: '3.2rem' },
                      color: 'white',
                      lineHeight: 1.2
                    }}
                  >
                    {service.headline}
                  </Typography>
                  <Typography 
                    sx={{ 
                      mb: 3, 
                      color: 'rgba(255, 255, 255, 0.7)', 
                      fontSize: '1.1rem', 
                      lineHeight: 1.8,
                      fontFamily: '"Linear", sans-serif',
                      fontWeight: 300,
                      maxWidth: '900px',
                      mx: 'auto'
                    }}
                  >
                    {service.desc}
                  </Typography>

                  {/* Audio Mixing Tab Image */}
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      mb: 3, 
                      width: '100%',
                      maxWidth: '900px',
                      mx: 'auto'
                    }}
                  >
                    <Box 
                      component="img" 
                      src={audioEditingImg} 
                      alt="Audio Mixing studio visualization" 
                      sx={{ 
                        width: '100%', 
                        height: 'auto', 
                        borderRadius: 1
                      }} 
                    />
                  </Box>

                  {/* Explanatory Grid of Mixing Features */}
                  <Grid 
                    container 
                    spacing={3} 
                    sx={{ 
                      maxWidth: '1100px', 
                      mx: 'auto', 
                      mb: 6,
                      textAlign: 'left'
                    }}
                  >
                    {[
                      { 
                        title: 'Hybrid Analog & Digital Summing', 
                        desc: 'Combine the warmth of boutique analog consoles with the precision of cutting-edge digital summing buses.' 
                      },
                      { 
                        title: 'Three-Dimensional Spatial Panning', 
                        desc: 'Position each instrument precisely within a wide, deep, and immersive 3D stereo field.' 
                      },
                      { 
                        title: 'Precise Frequency Separation', 
                        desc: 'Carve out custom frequency bands to resolve sonic masking and ensure every element breathes perfectly.' 
                      },
                      { 
                        title: 'Vocal Presence & Balance Control', 
                        desc: 'Deliver crystal-clear vocal presence and robust level balancing using dynamic volume and phase control.' 
                      }
                    ].map((item, i) => (
                      <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                        <Box 
                          sx={{ 
                            p: 1.5, 
                            bgcolor: 'transparent', 
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            gap: 1.5
                          }}
                        >
                          <CheckCircleOutlineIcon sx={{ color: '#ff2a74', fontSize: 20 }} />
                          <Box>
                            <Typography 
                              sx={{ 
                                fontFamily: '"Linear", sans-serif', 
                                fontWeight: 700, 
                                fontSize: { xs: '1.1rem', md: '1.2rem' }, 
                                color: 'white',
                                mb: 0.75,
                                letterSpacing: '0.01em'
                              }}
                            >
                              {item.title}
                            </Typography>
                            <Typography 
                              sx={{ 
                                fontFamily: '"Linear", sans-serif', 
                                fontWeight: 300, 
                                fontSize: { xs: '0.9rem', md: '0.95rem' }, 
                                color: 'rgba(255, 255, 255, 0.6)',
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

                  <Button
                    onClick={() => setIsMixingPopupOpen(true)}
                    variant="outlined"
                    size="large"
                    sx={{
                      border: '2px solid #ff2a74',
                      color: '#ff2a74',
                      px: 5,
                      py: 1.3,
                      fontSize: '16px',
                      fontWeight: 700,
                      borderRadius: '4px',
                      '&:hover': { 
                        border: '2px solid #ff2a74',
                        bgcolor: '#ff2a74',
                        color: 'white',
                        transform: 'translateY(-2px)' 
                      },
                      transition: 'all 0.3s ease',
                      textTransform: 'none',
                      fontFamily: '"Space Grotesk", sans-serif',
                    }}
                  >
                    Request Audio Mixing Session
                  </Button>
                </Box>
              );
            }

            if (index === 3) {
              return (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    animation: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                    '@keyframes fadeInUp': {
                      '0%': { opacity: 0, transform: 'translateY(20px)' },
                      '100%': { opacity: 1, transform: 'translateY(0)' }
                    }
                  }}
                >
                  <Typography 
                    variant="h3" 
                    sx={{ 
                      mb: 3, 
                      fontWeight: 700, 
                      fontFamily: '"Space Grotesk", sans-serif',
                      fontSize: { xs: '2rem', sm: '2.5rem', md: '3.2rem' },
                      color: 'white',
                      lineHeight: 1.2
                    }}
                  >
                    {service.headline}
                  </Typography>
                  <Typography 
                    sx={{ 
                      mb: 1, 
                      color: 'rgba(255, 255, 255, 0.7)', 
                      fontSize: '1.1rem', 
                      lineHeight: 1.8,
                      fontFamily: '"Linear", sans-serif',
                      fontWeight: 300,
                      maxWidth: '900px',
                      mx: 'auto'
                    }}
                  >
                    {service.desc}
                  </Typography>

                  {/* Audio Mastering Tab Image */}
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      mb: 1, 
                      width: '100%',
                      maxWidth: '900px',
                      mx: 'auto'
                    }}
                  >
                    <Box 
                      component="img" 
                      src={audioMasteringImg} 
                      alt="Audio Mastering studio visualization" 
                      sx={{ 
                        width: '100%', 
                        height: 'auto', 
                        borderRadius: 1
                      }} 
                    />
                  </Box>

                  {/* Explanatory Grid of Mastering Features */}
                  <Grid 
                    container 
                    spacing={3} 
                    sx={{ 
                      maxWidth: '1100px', 
                      mx: 'auto', 
                      mb: 6,
                      textAlign: 'left'
                    }}
                  >
                    {[
                      { 
                        title: 'Commercial Loudness Optimization (LUFS)', 
                        desc: 'Achieve competitive commercial volume thresholds tailored specifically for all major streaming platforms.' 
                      },
                      { 
                        title: 'Dynamic Stereo Field Balancing', 
                        desc: 'Ensure perfect mono-compatibility, widen the stereo image, and balance low-frequency energy.' 
                      },
                      { 
                        title: 'Multi-Band Compression & EQ Polish', 
                        desc: 'Glue the mix together with surgical multi-band compressors and smooth, vintage shelving equalizers.' 
                      },
                      { 
                        title: 'Global Distribution Readiness (DDP)', 
                        desc: 'Generate industry-standard redbook DDP files, metadata tagging, and high-fidelity output archives.' 
                      }
                    ].map((item, i) => (
                      <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                        <Box 
                          sx={{ 
                            p: 1.5, 
                            bgcolor: 'transparent', 
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            gap: 1.5
                          }}
                        >
                          <CheckCircleOutlineIcon sx={{ color: '#ff2a74', fontSize: 20 }} />
                          <Box>
                            <Typography 
                              sx={{ 
                                fontFamily: '"Linear", sans-serif', 
                                fontWeight: 700, 
                                fontSize: { xs: '1.1rem', md: '1.2rem' }, 
                                color: 'white',
                                mb: 0.75,
                                letterSpacing: '0.01em'
                              }}
                            >
                              {item.title}
                            </Typography>
                            <Typography 
                              sx={{ 
                                fontFamily: '"Linear", sans-serif', 
                                fontWeight: 300, 
                                fontSize: { xs: '0.9rem', md: '0.95rem' }, 
                                color: 'rgba(255, 255, 255, 0.6)',
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

                  <Button
                    onClick={() => setIsMasteringPopupOpen(true)}
                    variant="outlined"
                    size="large"
                    sx={{
                      border: '2px solid #ff2a74',
                      color: '#ff2a74',
                      px: 5,
                      py: 1.3,
                      fontSize: '16px',
                      fontWeight: 700,
                      borderRadius: '4px',
                      '&:hover': { 
                        border: '2px solid #ff2a74',
                        bgcolor: '#ff2a74',
                        color: 'white',
                        transform: 'translateY(-2px)' 
                      },
                      transition: 'all 0.3s ease',
                      textTransform: 'none',
                      fontFamily: '"Space Grotesk", sans-serif',
                    }}
                  >
                    Request Audio Mastering Session
                  </Button>
                </Box>
              );
            }

            return (
              <Grid 
                container 
                spacing={8} 
                alignItems="center" 
                key={index}
                sx={{
                  animation: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                  '@keyframes fadeInUp': {
                    '0%': { opacity: 0, transform: 'translateY(20px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' }
                  }
                }}
              >
                {/* Text Content Column */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography 
                    variant="h3" 
                    sx={{ 
                      mb: 3, 
                      fontWeight: 700, 
                      fontFamily: '"Space Grotesk", sans-serif',
                      fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.6rem' },
                      color: 'white',
                      lineHeight: 1.2
                    }}
                  >
                    {service.headline}
                  </Typography>
                  <Typography 
                    sx={{ 
                      mb: 4, 
                      color: 'rgba(255, 255, 255, 0.7)', 
                      fontSize: '1.05rem', 
                      lineHeight: 1.7,
                      fontFamily: '"Linear", sans-serif',
                      fontWeight: 300
                    }}
                  >
                    {service.desc}
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mb: 5 }}>
                    {service.features.map((feature, i) => (
                      <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <CheckCircleOutlineIcon sx={{ color: '#ff2a74', fontSize: 22 }} />
                        <Typography 
                          sx={{ 
                            fontSize: '1.05rem', 
                            fontWeight: 500,
                            fontFamily: '"Space Grotesk", sans-serif',
                            color: 'white'
                          }}
                        >
                          {feature}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  <Button
                    component={RouterLink}
                    to={service.link}
                    variant="outlined"
                    size="large"
                    sx={{
                      border: '2px solid #ff2a74',
                      color: '#ff2a74',
                      px: 4.5,
                      py: 1.2,
                      fontSize: '16px',
                      fontWeight: 700,
                      borderRadius: '4px',
                      '&:hover': { 
                        border: '2px solid #ff2a74',
                        bgcolor: '#ff2a74',
                        color: 'white',
                        transform: 'translateY(-2px)' 
                      },
                      transition: 'all 0.3s ease',
                      textTransform: 'none',
                      fontFamily: '"Space Grotesk", sans-serif',
                    }}
                  >
                    Explore {service.title}
                  </Button>
                </Grid>

                {/* Glassmorphic Glowing Visual Column */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box 
                    sx={{ 
                      position: 'relative',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                      height: { xs: '320px', md: '420px' },
                      borderRadius: 2,
                      overflow: 'hidden',
                      bgcolor: 'rgba(10, 10, 10, 0.65)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      backdropFilter: 'blur(16px)',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
                      p: 4,
                      // Subtle glowing background mesh gradient
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        width: '200px',
                        height: '200px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(255, 42, 116, 0.25) 0%, transparent 70%)',
                        filter: 'blur(40px)',
                        zIndex: 0,
                        animation: 'pulseGlow 8s ease-in-out infinite alternate',
                        '@keyframes pulseGlow': {
                          '0%': { transform: 'scale(1) translate(-20px, -20px)' },
                          '100%': { transform: 'scale(1.3) translate(20px, 20px)' }
                        }
                      }
                    }}
                  >
                    {/* Centered Premium Icon Representation */}
                    <Box 
                      sx={{ 
                        position: 'relative', 
                        zIndex: 2, 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        gap: 3 
                      }}
                    >
                      <Box 
                        sx={{ 
                          width: 100, 
                          height: 100, 
                          borderRadius: '50%', 
                          bgcolor: 'rgba(255, 42, 116, 0.08)', 
                          border: '2px solid rgba(255, 42, 116, 0.25)', 
                          display: 'flex', 
                          justifyContent: 'center', 
                          alignItems: 'center',
                          color: '#ff2a74',
                          boxShadow: '0 0 30px rgba(255, 42, 116, 0.15)',
                          animation: 'floatIcon 6s ease-in-out infinite',
                          '@keyframes floatIcon': {
                            '0%, 100%': { transform: 'translateY(0)' },
                            '50%': { transform: 'translateY(-12px)' }
                          }
                        }}
                      >
                        {service.largeIcon}
                      </Box>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontFamily: '"Space Grotesk", sans-serif', 
                          fontWeight: 700, 
                          color: 'rgba(255, 255, 255, 0.9)',
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase'
                        }}
                      >
                        {service.title} SPECIFICATIONS
                      </Typography>
                      {/* Modern data visualizer representation */}
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end', height: '40px', mt: 1 }}>
                        {[0.4, 0.7, 0.9, 0.5, 0.8, 0.6, 0.9, 0.4].map((h, i) => (
                          <Box 
                            key={i} 
                            sx={{ 
                              width: '6px', 
                              height: `${h * 100}%`, 
                              bgcolor: 'rgba(255, 42, 116, 0.35)', 
                              borderRadius: '3px',
                              animation: `growBar 1.2s ease-in-out infinite alternate`,
                              animationDelay: `${i * 0.15}s`,
                              '@keyframes growBar': {
                                '0%': { height: '20%' },
                                '100%': { height: `${h * 100}%`, bgcolor: '#ff2a74' }
                              }
                            }} 
                          />
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            );
          })}
        </Container>
      </Box>

      {/* Why Choose Us */}
      <Box sx={{ bgcolor: 'black', color: 'white', py: 15 }}>
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h2" sx={{ mb: 4, fontWeight: 800 }}>
                Why Shalom Music?
              </Typography>
              <Typography variant="body1" sx={{ mb: 6, opacity: 0.8, fontSize: '1.1rem' }}>
                We combine technical expertise with artistic passion to deliver results that exceed expectations. Our commitment to excellence is reflected in every project we undertake.
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {[
                  'Professional Grade Equipment & Software',
                  'Tailored Learning Programs for Students',
                  'Expert Technical Support for Piano Owners',
                  'Acoustically Treated Studio Environment'
                ].map((text, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CheckCircleOutlineIcon sx={{ color: 'white' }} />
                    <Typography variant="h6" sx={{ fontWeight: 500 }}>{text}</Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box 
                sx={{ 
                  width: '100%', 
                  height: { xs: 350, md: 450 }, 
                  borderRadius: 4,
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  position: 'relative'
                }}
              >
                <Box 
                  component="img" 
                  src="/assets/studio_interior.png" 
                  alt="Shalom Music Recording Studio"
                  sx={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    transition: 'transform 0.8s ease',
                    '&:hover': { transform: 'scale(1.05)' }
                  }} 
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Testimonials */}
      <Container id="testimonials" maxWidth="lg" sx={{ py: 15 }}>
        <Typography variant="h2" align="center" sx={{ mb: 10, fontWeight: 800 }}>
          What Our Clients Say
        </Typography>
        <Grid container spacing={4}>
          {[
            { name: 'Alex Rivera', role: 'Artist', text: 'Shalom Music transformed my rough demos into a professional EP. The attention to detail is unmatched.' },
            { name: 'Sarah Johnson', role: 'Student', text: 'The piano lessons are incredible. I went from a complete beginner to playing my favorite pieces in months.' },
            { name: 'Michael Chen', role: 'Producer', text: 'The studio rental facilities are top-notch. High-end gear and a very creative atmosphere.' }
          ].map((testimonial, idx) => (
            <Grid size={{ xs: 12, md: 4 }} key={idx}>
              <Card elevation={0} sx={{ p: 4, bgcolor: '#f9f9f9', height: '100%' }}>
                <Box sx={{ display: 'flex', color: 'black', mb: 2 }}>
                  {[...Array(5)].map((_, i) => <StarIcon key={i} fontSize="small" />)}
                </Box>
                <Typography variant="body1" sx={{ mb: 4, fontStyle: 'italic' }}>
                  "{testimonial.text}"
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'black' }}>{testimonial.name[0]}</Avatar>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{testimonial.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{testimonial.role}</Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: '#eee', py: 12, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h3" sx={{ mb: 3, fontWeight: 800 }}>
            Ready to start your musical journey?
          </Typography>
          <Typography variant="h6" sx={{ mb: 6, color: 'text.secondary', fontWeight: 400 }}>
            Join Shalom Music today and experience excellence in sound.
          </Typography>
          <Button variant="contained" size="large" sx={{ bgcolor: 'black', color: 'white', px: 6, py: 2, '&:hover': { bgcolor: '#333' } }}>
            Get Started Now
          </Button>
        </Container>
      </Box>

      {/* Audio Recording Request Pricing Popup */}
      <Dialog
        open={isRecordPopupOpen}
        onClose={() => setIsRecordPopupOpen(false)}
        TransitionComponent={Grow}
        transitionDuration={{ enter: 400, exit: 250 }}
        scroll="paper"
        PaperProps={{
          sx: {
            bgcolor: '#0a0a0a',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '4px',
            maxWidth: '420px',
            width: '100%',
            maxHeight: 'calc(100vh - 48px)',
            py: { xs: 1.5, sm: 2 },
            px: { xs: 2.5, sm: 3 },
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
          onClick={() => setIsRecordPopupOpen(false)} 
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

        <DialogContent 
          sx={{ 
            p: 0, 
            textAlign: 'center', 
            color: 'white', 
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              display: 'none'
            },
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          <Typography 
            variant="h4" 
            sx={{ 
              fontFamily: '"Space Grotesk", sans-serif', 
              fontWeight: 700, 
              fontSize: { xs: '1.3rem', sm: '1.6rem' },
              mb: 1,
              mt: 2.5,
              px: 4
            }}
          >
            Pristine Multi-Track Studio Recording
          </Typography>
          <Typography 
            sx={{ 
              fontFamily: '"Linear", sans-serif',
              fontWeight: 300,
              fontSize: '0.9rem',
              color: 'rgba(255, 255, 255, 0.65)',
              mb: 2.5,
              lineHeight: 1.4
            }}
          >
            Experience ultimate acoustic purity with our high-end multi-track studio recording plan.
          </Typography>

          {/* Pricing Panel */}
          <Box 
            sx={{ 
              bgcolor: 'rgba(255, 42, 116, 0.05)',
              border: '1px dashed rgba(255, 42, 116, 0.25)',
              borderRadius: '4px',
              py: 2,
              px: 2,
              mb: 2.5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}
          >
            {/* Offer Badge */}
            <Box 
              sx={{ 
                position: 'absolute',
                top: -10,
                bgcolor: '#ff2a74',
                color: 'white',
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 700,
                fontSize: '0.68rem',
                letterSpacing: '0.1em',
                px: 1.5,
                py: 0.2,
                borderRadius: '4px',
                animation: 'pulseGlow 2s infinite alternate',
                '@keyframes pulseGlow': {
                  '0%': { boxShadow: '0 0 10px rgba(255, 42, 116, 0.4)' },
                  '100%': { boxShadow: '0 0 20px rgba(255, 42, 116, 0.8)' }
                }
              }}
            >
              LIMITED OFFER
            </Box>

            <Typography 
              sx={{ 
                textDecoration: 'line-through', 
                color: 'rgba(255, 255, 255, 0.4)', 
                fontSize: '1.1rem',
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 500,
                mb: 0.25,
                mt: 0.25
              }}
            >
              80,000 TZS
            </Typography>
            <Typography 
              sx={{ 
                color: '#ff2a74', 
                fontWeight: 900, 
                fontSize: { xs: '1.8rem', sm: '2.2rem' },
                fontFamily: '"Space Grotesk", sans-serif',
                lineHeight: 1
              }}
            >
              79,999 TZS
            </Typography>
            <Typography 
              sx={{ 
                fontSize: '0.75rem',
                color: 'rgba(255, 255, 255, 0.5)',
                fontFamily: '"Linear", sans-serif',
                mt: 0.75
              }}
            >
              All premium features & sound engineering support included.
            </Typography>
          </Box>

          {/* Inclusions List */}
          <Box sx={{ textAlign: 'left', mb: 3, display: 'flex', flexDirection: 'column', gap: 1, px: 1 }}>
            {[
              'Multi-Room isolated acoustic control live room',
              'Elite valve, condenser & high-end ribbon microphones',
              'Ultra-low noise preamps with master-grade transparent gain',
              'High-definition digital multi-track studio recording',
              'Includes fully certified resident audio engineer'
            ].map((text, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                <CheckCircleOutlineIcon sx={{ color: '#ff2a74', fontSize: 16 }} />
                <Typography 
                  sx={{ 
                    fontFamily: '"Linear", sans-serif', 
                    fontWeight: 300, 
                    fontSize: '0.84rem', 
                    color: 'rgba(255, 255, 255, 0.8)',
                    lineHeight: 1.3
                  }}
                >
                  {text}
                </Typography>
              </Box>
            ))}
          </Box>

          <Button
            component={RouterLink}
            to="/contact"
            onClick={() => setIsRecordPopupOpen(false)}
            variant="contained"
            fullWidth
            sx={{
              bgcolor: '#ff2a74',
              color: 'white',
              py: 1.2,
              fontSize: '15px',
              fontWeight: 700,
              borderRadius: '4px',
              boxShadow: 'none',
              '&:hover': { bgcolor: '#e01b5d', boxShadow: 'none' },
              fontFamily: '"Space Grotesk", sans-serif',
              textTransform: 'none'
            }}
          >
            Proceed to Book Session
          </Button>
        </DialogContent>
      </Dialog>

      {/* Audio Capturing Request Pricing Popup */}
      <Dialog
        open={isCapturingPopupOpen}
        onClose={() => setIsCapturingPopupOpen(false)}
        TransitionComponent={Grow}
        transitionDuration={{ enter: 400, exit: 250 }}
        scroll="paper"
        PaperProps={{
          sx: {
            bgcolor: '#0a0a0a',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '4px',
            maxWidth: '420px',
            width: '100%',
            maxHeight: 'calc(100vh - 48px)',
            py: { xs: 1.5, sm: 2 },
            px: { xs: 2.5, sm: 3 },
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
          onClick={() => setIsCapturingPopupOpen(false)} 
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

        <DialogContent 
          sx={{ 
            p: 0, 
            textAlign: 'center', 
            color: 'white', 
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              display: 'none'
            },
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          <Typography 
            variant="h4" 
            sx={{ 
              fontFamily: '"Space Grotesk", sans-serif', 
              fontWeight: 700, 
              fontSize: { xs: '1.3rem', sm: '1.6rem' },
              mb: 1,
              mt: 2.5,
              px: 4
            }}
          >
            Field Recording & Ambient Sound Capture
          </Typography>
          <Typography 
            sx={{ 
              fontFamily: '"Linear", sans-serif',
              fontWeight: 300,
              fontSize: '0.9rem',
              color: 'rgba(255, 255, 255, 0.65)',
              mb: 2.5,
              lineHeight: 1.4
            }}
          >
            Capture pristine field environments and ambient organic room reflections with master resolution.
          </Typography>

          {/* Pricing Panel */}
          <Box 
            sx={{ 
              bgcolor: 'rgba(255, 42, 116, 0.05)',
              border: '1px dashed rgba(255, 42, 116, 0.25)',
              borderRadius: '4px',
              py: 2,
              px: 2,
              mb: 2.5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}
          >
            {/* Offer Badge */}
            <Box 
              sx={{ 
                position: 'absolute',
                top: -10,
                bgcolor: '#ff2a74',
                color: 'white',
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 700,
                fontSize: '0.68rem',
                letterSpacing: '0.1em',
                px: 1.5,
                py: 0.2,
                borderRadius: '4px',
                animation: 'pulseGlow 2s infinite alternate',
                '@keyframes pulseGlow': {
                  '0%': { boxShadow: '0 0 10px rgba(255, 42, 116, 0.4)' },
                  '100%': { boxShadow: '0 0 20px rgba(255, 42, 116, 0.8)' }
                }
              }}
            >
              LIMITED OFFER
            </Box>

            <Typography 
              sx={{ 
                textDecoration: 'line-through', 
                color: 'rgba(255, 255, 255, 0.4)', 
                fontSize: '1.1rem',
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 500,
                mb: 0.25,
                mt: 0.25
              }}
            >
              400,000 TZS
            </Typography>
            <Typography 
              sx={{ 
                color: '#ff2a74', 
                fontWeight: 900, 
                fontSize: { xs: '1.8rem', sm: '2.2rem' },
                fontFamily: '"Space Grotesk", sans-serif',
                lineHeight: 1
              }}
            >
              399,999 TZS
            </Typography>
            <Typography 
              sx={{ 
                fontSize: '0.75rem',
                color: 'rgba(255, 255, 255, 0.5)',
                fontFamily: '"Linear", sans-serif',
                mt: 0.75
              }}
            >
              All premium features & field acoustics support included.
            </Typography>
          </Box>

          {/* Inclusions List */}
          <Box sx={{ textAlign: 'left', mb: 3, display: 'flex', flexDirection: 'column', gap: 1, px: 1 }}>
            {[
              'High-fidelity cinema location & media sound recording',
              'High-Definition rugged portable field recorders',
              'Specialized binaural & 3D stereo microphone arrays',
              'Immaculate live concert venue multi-track capturing',
              'Resident field capture sound technician included'
            ].map((text, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                <CheckCircleOutlineIcon sx={{ color: '#ff2a74', fontSize: 16 }} />
                <Typography 
                  sx={{ 
                    fontFamily: '"Linear", sans-serif', 
                    fontWeight: 300, 
                    fontSize: '0.84rem', 
                    color: 'rgba(255, 255, 255, 0.8)',
                    lineHeight: 1.3
                  }}
                >
                  {text}
                </Typography>
              </Box>
            ))}
          </Box>

          <Button
            component={RouterLink}
            to="/contact"
            onClick={() => setIsCapturingPopupOpen(false)}
            variant="contained"
            fullWidth
            sx={{
              bgcolor: '#ff2a74',
              color: 'white',
              py: 1.2,
              fontSize: '15px',
              fontWeight: 700,
              borderRadius: '4px',
              boxShadow: 'none',
              '&:hover': { bgcolor: '#e01b5d', boxShadow: 'none' },
              fontFamily: '"Space Grotesk", sans-serif',
              textTransform: 'none'
            }}
          >
            Proceed to Book Session
          </Button>
        </DialogContent>
      </Dialog>

      {/* Audio Mixing Request Pricing Popup */}
      <Dialog
        open={isMixingPopupOpen}
        onClose={() => setIsMixingPopupOpen(false)}
        TransitionComponent={Grow}
        transitionDuration={{ enter: 400, exit: 250 }}
        scroll="paper"
        PaperProps={{
          sx: {
            bgcolor: '#0a0a0a',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '4px',
            maxWidth: '420px',
            width: '100%',
            maxHeight: 'calc(100vh - 48px)',
            py: { xs: 1.5, sm: 2 },
            px: { xs: 2.5, sm: 3 },
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
          onClick={() => setIsMixingPopupOpen(false)} 
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

        <DialogContent 
          sx={{ 
            p: 0, 
            textAlign: 'center', 
            color: 'white', 
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              display: 'none'
            },
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          <Typography 
            variant="h4" 
            sx={{ 
              fontFamily: '"Space Grotesk", sans-serif', 
              fontWeight: 700, 
              fontSize: { xs: '1.3rem', sm: '1.6rem' },
              mb: 1,
              mt: 2.5,
              px: 4
            }}
          >
            Multi-Dimensional Audio Mixing
          </Typography>
          <Typography 
            sx={{ 
              fontFamily: '"Linear", sans-serif',
              fontWeight: 300,
              fontSize: '0.9rem',
              color: 'rgba(255, 255, 255, 0.65)',
              mb: 2.5,
              lineHeight: 1.4
            }}
          >
            Balance your tracks with an elite three-dimensional soundstage and warm, rich frequency separation.
          </Typography>

          {/* Pricing Panel */}
          <Box 
            sx={{ 
              bgcolor: 'rgba(255, 42, 116, 0.05)',
              border: '1px dashed rgba(255, 42, 116, 0.25)',
              borderRadius: '4px',
              py: 2,
              px: 2,
              mb: 2.5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}
          >
            {/* Offer Badge */}
            <Box 
              sx={{ 
                position: 'absolute',
                top: -10,
                bgcolor: '#ff2a74',
                color: 'white',
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 700,
                fontSize: '0.68rem',
                letterSpacing: '0.1em',
                px: 1.5,
                py: 0.2,
                borderRadius: '4px',
                animation: 'pulseGlow 2s infinite alternate',
                '@keyframes pulseGlow': {
                  '0%': { boxShadow: '0 0 10px rgba(255, 42, 116, 0.4)' },
                  '100%': { boxShadow: '0 0 20px rgba(255, 42, 116, 0.8)' }
                }
              }}
            >
              LIMITED OFFER
            </Box>

            <Typography 
              sx={{ 
                textDecoration: 'line-through', 
                color: 'rgba(255, 255, 255, 0.4)', 
                fontSize: '1.1rem',
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 500,
                mb: 0.25,
                mt: 0.25
              }}
            >
              100,000 TZS
            </Typography>
            <Typography 
              sx={{ 
                color: '#ff2a74', 
                fontWeight: 900, 
                fontSize: { xs: '1.8rem', sm: '2.2rem' },
                fontFamily: '"Space Grotesk", sans-serif',
                lineHeight: 1
              }}
            >
              99,999 TZS
            </Typography>
            <Typography 
              sx={{ 
                fontSize: '0.75rem',
                color: 'rgba(255, 255, 255, 0.5)',
                fontFamily: '"Linear", sans-serif',
                mt: 0.75
              }}
            >
              All premium features & sound engineering support included.
            </Typography>
          </Box>

          {/* Inclusions List */}
          <Box sx={{ textAlign: 'left', mb: 3, display: 'flex', flexDirection: 'column', gap: 1, px: 1 }}>
            {[
              'Hybrid analog and digital summing consolidation',
              'Elite 3D stereo panning & spatial soundstage mapping',
              'Dynamic multitrack frequency separation and resonance control',
              'Pristine lead and backing vocal presence balancing',
              'Senior resident mix engineer supervision included'
            ].map((text, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                <CheckCircleOutlineIcon sx={{ color: '#ff2a74', fontSize: 16 }} />
                <Typography 
                  sx={{ 
                    fontFamily: '"Linear", sans-serif', 
                    fontWeight: 300, 
                    fontSize: '0.84rem', 
                    color: 'rgba(255, 255, 255, 0.8)',
                    lineHeight: 1.3
                  }}
                >
                  {text}
                </Typography>
              </Box>
            ))}
          </Box>

          <Button
            component={RouterLink}
            to="/contact"
            onClick={() => setIsMixingPopupOpen(false)}
            variant="contained"
            fullWidth
            sx={{
              bgcolor: '#ff2a74',
              color: 'white',
              py: 1.2,
              fontSize: '15px',
              fontWeight: 700,
              borderRadius: '4px',
              boxShadow: 'none',
              '&:hover': { bgcolor: '#e01b5d', boxShadow: 'none' },
              fontFamily: '"Space Grotesk", sans-serif',
              textTransform: 'none'
            }}
          >
            Proceed to Book Session
          </Button>
        </DialogContent>
      </Dialog>

      {/* Audio Mastering Request Pricing Popup */}
      <Dialog
        open={isMasteringPopupOpen}
        onClose={() => setIsMasteringPopupOpen(false)}
        TransitionComponent={Grow}
        transitionDuration={{ enter: 400, exit: 250 }}
        scroll="paper"
        PaperProps={{
          sx: {
            bgcolor: '#0a0a0a',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '4px',
            maxWidth: '420px',
            width: '100%',
            maxHeight: 'calc(100vh - 48px)',
            py: { xs: 1.5, sm: 2 },
            px: { xs: 2.5, sm: 3 },
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
          onClick={() => setIsMasteringPopupOpen(false)} 
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

        <DialogContent 
          sx={{ 
            p: 0, 
            textAlign: 'center', 
            color: 'white', 
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              display: 'none'
            },
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          <Typography 
            variant="h4" 
            sx={{ 
              fontFamily: '"Space Grotesk", sans-serif', 
              fontWeight: 700, 
              fontSize: { xs: '1.3rem', sm: '1.6rem' },
              mb: 1,
              mt: 2.5,
              px: 4
            }}
          >
            Commercial Audio Mastering
          </Typography>
          <Typography 
            sx={{ 
              fontFamily: '"Linear", sans-serif',
              fontWeight: 300,
              fontSize: '0.9rem',
              color: 'rgba(255, 255, 255, 0.65)',
              mb: 2.5,
              lineHeight: 1.4
            }}
          >
            Optimize loudness dynamics, stereo field imaging, and overall warmth for global streaming platforms.
          </Typography>

          {/* Pricing Panel */}
          <Box 
            sx={{ 
              bgcolor: 'rgba(255, 42, 116, 0.05)',
              border: '1px dashed rgba(255, 42, 116, 0.25)',
              borderRadius: '4px',
              py: 2,
              px: 2,
              mb: 2.5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}
          >
            {/* Offer Badge */}
            <Box 
              sx={{ 
                position: 'absolute',
                top: -10,
                bgcolor: '#ff2a74',
                color: 'white',
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 700,
                fontSize: '0.68rem',
                letterSpacing: '0.1em',
                px: 1.5,
                py: 0.2,
                borderRadius: '4px',
                animation: 'pulseGlow 2s infinite alternate',
                '@keyframes pulseGlow': {
                  '0%': { boxShadow: '0 0 10px rgba(255, 42, 116, 0.4)' },
                  '100%': { boxShadow: '0 0 20px rgba(255, 42, 116, 0.8)' }
                }
              }}
            >
              LIMITED OFFER
            </Box>

            <Typography 
              sx={{ 
                textDecoration: 'line-through', 
                color: 'rgba(255, 255, 255, 0.4)', 
                fontSize: '1.1rem',
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 500,
                mb: 0.25,
                mt: 0.25
              }}
            >
              100,000 TZS
            </Typography>
            <Typography 
              sx={{ 
                color: '#ff2a74', 
                fontWeight: 900, 
                fontSize: { xs: '1.8rem', sm: '2.2rem' },
                fontFamily: '"Space Grotesk", sans-serif',
                lineHeight: 1
              }}
            >
              99,999 TZS
            </Typography>
            <Typography 
              sx={{ 
                fontSize: '0.75rem',
                color: 'rgba(255, 255, 255, 0.5)',
                fontFamily: '"Linear", sans-serif',
                mt: 0.75
              }}
            >
              All premium features & mastering dynamics support included.
            </Typography>
          </Box>

          {/* Inclusions List */}
          <Box sx={{ textAlign: 'left', mb: 3, display: 'flex', flexDirection: 'column', gap: 1, px: 1 }}>
            {[
              'Commercial loudness optimization (LUFS) streaming compliance',
              'Dynamic stereo width enhancement & low-end mono consolidation',
              'Master-grade linear phase EQ correction and coloring',
              'Multi-band dynamic gluing and ceiling limiting protection',
              'Redbook DDP image file creation & CD/streaming output archives'
            ].map((text, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                <CheckCircleOutlineIcon sx={{ color: '#ff2a74', fontSize: 16 }} />
                <Typography 
                  sx={{ 
                    fontFamily: '"Linear", sans-serif', 
                    fontWeight: 300, 
                    fontSize: '0.84rem', 
                    color: 'rgba(255, 255, 255, 0.8)',
                    lineHeight: 1.3
                  }}
                >
                  {text}
                </Typography>
              </Box>
            ))}
          </Box>

          <Button
            component={RouterLink}
            to="/contact"
            onClick={() => setIsMasteringPopupOpen(false)}
            variant="contained"
            fullWidth
            sx={{
              bgcolor: '#ff2a74',
              color: 'white',
              py: 1.2,
              fontSize: '15px',
              fontWeight: 700,
              borderRadius: '4px',
              boxShadow: 'none',
              '&:hover': { bgcolor: '#e01b5d', boxShadow: 'none' },
              fontFamily: '"Space Grotesk", sans-serif',
              textTransform: 'none'
            }}
          >
            Proceed to Book Session
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Home;
