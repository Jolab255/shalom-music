import React from 'react';
import { Container, Typography, Box, Paper, Divider, Grid2 as Grid, Button, List, ListItem, ListItemIcon, ListItemText, IconButton, CircularProgress, Slider, Dialog, DialogContent, Grow } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import simpleTrackImg from '../assets/simple-track-instrumental.png';
import classicalImg from '../assets/classical-instrumental.png';
import orchestralImg from '../assets/orchestral-instrumental.png';
import instrumentalCreationImg from '../assets/instrumental-creation.webp';
import simpleInstrumentalAudio from '../assets/simple-instrumental.mp3';
import classicalInstrumentalAudio from '../assets/classical-instrumental.mp3';
import orchestralInstrumentalAudio from '../assets/ochesrtal-instrumental.mp3';
import audioRecordingImg from '../assets/audio-recording.webp';
import audioEditingImg from '../assets/audio-editing.webp';
import audioCapturingImg from '../assets/audio-capturing.webp';
import audioMasteringImg from '../assets/audio-mastering.webp';
import whyShalom1 from '../assets/why-shalom-1.webp';

// Helper to format seconds into MM:SS format
const formatTime = (time: number) => {
  if (isNaN(time) || !isFinite(time)) return '0:00';
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

// Widescreen elite instrumental creation packages data
const packagesData = [
  {
    id: 0,
    num: '01',
    title: 'Simple Track Instrumental',
    subtitle: 'Modern Beats & Arrangements',
    image: simpleTrackImg,
    description: 'Perfect for singer-songwriters, rappers, and content creators looking for solid modern beats. This package offers premium custom beatmaking, standard verse-chorus arrangements, and high-fidelity stereo stems in genres like Pop, Hip-Hop, R&B, and Indie.',
    demoUrl: simpleInstrumentalAudio,
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
    demoUrl: classicalInstrumentalAudio,
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
    demoUrl: orchestralInstrumentalAudio,
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



const genreData = [
  {
    name: 'Contemporary Christian',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
        <path d="M10 2h4v6h6v4h-6v10h-4V12H4V8h6V2z"/>
      </svg>
    )
  },
  {
    name: 'Jazz & Fusion',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11.5h-1.75V5h1.75v9.5zM14.5 5h1.75v9.5h-1.75V5zm-4.25 0h1.75v9.5h-1.75V5zm-2.5 0h1.75v9.5H7.75V5zM5 5h1.75v11H5V5zm4.5 14H7.75v-3h1.75v3zm3.5 0h-2.5v-3h2.5v3zm3.5 0h-2.5v-3h2.5v3zm3.5-5H19v3h-1.75v-3z"/>
      </svg>
    )
  },
  {
    name: 'Pop & Indie',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
        <path d="M12 2c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z"/>
      </svg>
    )
  },
  {
    name: 'Classical & Cinematic',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
        <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
      </svg>
    )
  },
  {
    name: 'Soul & R&B',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
      </svg>
    )
  },
  {
    name: 'Acoustic & Folk',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
        <path d="M17 8C8 10 5.9 16.17 5.1 18c-.07-.5-.1-1-.1-1.5C5 10.1 10.1 5 16.5 5c.28 0 .55.01.82.03C17.11 6 17 6.97 17 8zM16.5 3C8.5 3 2 9.5 2 17.5c0 .52.04 1.04.1 1.55l1.9-1.9c.8 1.95 2.5 3.35 4.5 3.85l1.9-1.9c.51.06 1.03.1 1.55.1 8 0 14.5-6.5 14.5-14.5c0-.28-.01-.55-.03-.82C24.96 4.6 20.89 3 16.5 3z"/>
      </svg>
    )
  }
];

const gearImages = [
  { id: 0, src: audioRecordingImg, alt: 'Recording Gear' },
  { id: 1, src: audioEditingImg, alt: 'Editing Gear' },
  { id: 2, src: audioCapturingImg, alt: 'Capturing Gear' },
  { id: 3, src: audioMasteringImg, alt: 'Mastering Gear' }
];

const slotStyles = [
  { left: '0%', top: '0%' },     // Slot 0: Top-Left
  { left: '50%', top: '0%' },    // Slot 1: Top-Right
  { left: '0%', top: '50%' },    // Slot 2: Bottom-Left
  { left: '50%', top: '50%' }    // Slot 3: Bottom-Right
];

const Production: React.FC = () => {
  const [currentPkg, setCurrentPkg] = React.useState<number | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [audioError, setAudioError] = React.useState<string | null>(null);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [isPricingOpen, setIsPricingOpen] = React.useState(false);
  const [selectedPkgId, setSelectedPkgId] = React.useState<number | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = React.useState(false);
  const [lightboxImg, setLightboxImg] = React.useState({ src: '', alt: '' });
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const handleInquirePackage = (pkgId: number) => {
    setSelectedPkgId(pkgId);
    setIsPricingOpen(true);
  };

  const handleImageClick = (src: string, alt: string) => {
    setLightboxImg({ src, alt });
    setIsLightboxOpen(true);
  };

  const [phase, setPhase] = React.useState<'idle' | 'pulling' | 'swapping' | 'releasing'>('idle');
  const [positions, setPositions] = React.useState<number[]>([0, 1, 2, 3]);

  React.useEffect(() => {
    let swapTimeout: ReturnType<typeof setTimeout>;
    let releaseTimeout: ReturnType<typeof setTimeout>;
    let idleTimeout: ReturnType<typeof setTimeout>;

    const getNextSlotAnticlockwise = (currentSlot: number) => {
      if (currentSlot === 1) return 0; // Top-Right -> Top-Left
      if (currentSlot === 0) return 2; // Top-Left -> Bottom-Left
      if (currentSlot === 2) return 3; // Bottom-Left -> Bottom-Right
      if (currentSlot === 3) return 1; // Bottom-Right -> Top-Right
      return currentSlot;
    };

    const runTransition = () => {
      // Step 1: Pull out towards the viewer (scale up & elevate shadow)
      setPhase('pulling');
      
      // Step 2: Swap layout positions almost immediately (after 150ms so they start lifting first)
      swapTimeout = setTimeout(() => {
        setPhase('swapping');
        setPositions(prev => prev.map(getNextSlotAnticlockwise));
      }, 150);

      // Step 3: Release back down as they settle in their new slots
      releaseTimeout = setTimeout(() => {
        setPhase('releasing');
      }, 1400);

      // Step 4: Settle back to idle
      idleTimeout = setTimeout(() => {
        setPhase('idle');
      }, 1900);
    };

    const interval = setInterval(runTransition, 6000);

    return () => {
      clearInterval(interval);
      clearTimeout(swapTimeout);
      clearTimeout(releaseTimeout);
      clearTimeout(idleTimeout);
    };
  }, []);

  const handleSeek = (_e: any, newValue: number | number[]) => {
    if (audioRef.current) {
      const seekValue = newValue as number;
      audioRef.current.currentTime = seekValue;
      setCurrentTime(seekValue);
    }
  };

  // Initialize audio element
  React.useEffect(() => {
    audioRef.current = new Audio();
    
    const handleLoadStart = () => {
      setIsLoading(true);
      setIsPlaying(false);
      setAudioError(null);
    };
    const handleWaiting = () => {
      setIsLoading(true);
      setIsPlaying(false);
    };
    const handlePlaying = () => {
      setIsLoading(false);
      setIsPlaying(true);
      setAudioError(null);
    };
    const handlePause = () => {
      setIsPlaying(false);
    };
    const handleEnded = () => {
      setIsPlaying(false);
      setIsLoading(false);
      setCurrentPkg(null);
      setAudioError(null);
      setCurrentTime(0);
      setDuration(0);
    };
    const handleError = (e: any) => {
      console.error('Audio element error event:', e);
      let errMsg = 'Failed to load audio';
      if (audioRef.current && audioRef.current.error) {
        const code = audioRef.current.error.code;
        if (code === 1) errMsg = 'Playback aborted';
        else if (code === 2) errMsg = 'Network error loading audio';
        else if (code === 3) errMsg = 'Audio decoding failed';
        else if (code === 4) errMsg = 'Audio format not supported';
      }
      setAudioError(errMsg);
      setIsPlaying(false);
      setIsLoading(false);
    };
    const handleTimeUpdate = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    };
    const handleDurationChange = () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration);
      }
    };

    audioRef.current.addEventListener('loadstart', handleLoadStart);
    audioRef.current.addEventListener('waiting', handleWaiting);
    audioRef.current.addEventListener('playing', handlePlaying);
    audioRef.current.addEventListener('pause', handlePause);
    audioRef.current.addEventListener('ended', handleEnded);
    audioRef.current.addEventListener('error', handleError);
    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    audioRef.current.addEventListener('durationchange', handleDurationChange);
    audioRef.current.addEventListener('loadedmetadata', handleDurationChange);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('loadstart', handleLoadStart);
        audioRef.current.removeEventListener('waiting', handleWaiting);
        audioRef.current.removeEventListener('playing', handlePlaying);
        audioRef.current.removeEventListener('pause', handlePause);
        audioRef.current.removeEventListener('ended', handleEnded);
        audioRef.current.removeEventListener('error', handleError);
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('durationchange', handleDurationChange);
        audioRef.current.removeEventListener('loadedmetadata', handleDurationChange);
      }
    };
  }, []);

  const handlePlayDemo = (pkgId: number, audioUrl: string) => {
    if (!audioRef.current) return;
    setAudioError(null);

    if (currentPkg === pkgId) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => {
          console.error('Play failed:', err);
          if (err.name === 'NotAllowedError') {
            setAudioError('Playback blocked - please click play');
          } else if (err.name !== 'AbortError') {
            setAudioError(prev => prev || 'Failed to play audio');
          }
          setIsPlaying(false);
          setIsLoading(false);
        });
      }
    } else {
      setIsLoading(true);
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
      setCurrentPkg(pkgId);
      audioRef.current.src = audioUrl;
      audioRef.current.load();
      audioRef.current.play().catch(err => {
        console.error('Play failed:', err);
        if (err.name === 'NotAllowedError') {
          setAudioError('Playback blocked - please click play');
        } else if (err.name !== 'AbortError') {
          setAudioError(prev => prev || 'Failed to play audio');
        }
        setIsPlaying(false);
        setIsLoading(false);
      });
    }
  };

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
                    to="/contact?service=production&package=Instrumental%20Creation%20Booking"
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
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      bgcolor: idx % 2 === 1 ? 'rgba(12, 12, 15, 0.85)' : 'rgba(20, 20, 25, 0.45)', 
                      color: 'white', 
                      border: '1px solid',
                      borderColor: 'rgba(255, 255, 255, 0.08)',
                      borderRadius: '0px', // Sharp corners
                      boxShadow: '0 20px 40px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.02)',
                      overflow: 'hidden' // clip the image header
                    }}
                  >
                    {/* Package Image Header */}
                    <Box sx={{ position: 'relative', width: '100%', height: '180px', overflow: 'hidden' }}>
                      <Box 
                        component="img"
                        src={pkg.image}
                        alt={pkg.title}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                      {/* Dark/color gradient overlay */}
                      <Box 
                        sx={{
                          position: 'absolute',
                          top: 0, right: 0, bottom: 0, left: 0,
                          background: 'linear-gradient(to bottom, rgba(12, 12, 15, 0.2) 0%, rgba(12, 12, 15, 0.95) 100%)'
                        }}
                      />
                      {/* Floating Step Number */}
                      <Box 
                        sx={{
                          position: 'absolute',
                          top: '16px',
                          right: '24px',
                          bgcolor: 'rgba(0,0,0,0.6)',
                          border: '1px solid #ff2a74',
                          px: 1.5,
                          py: 0.5,
                          color: '#ff2a74',
                          fontWeight: 900,
                          fontFamily: '"Space Grotesk", sans-serif',
                          fontSize: '0.8rem',
                          letterSpacing: '0.05em'
                        }}
                      >
                        {pkg.num}
                      </Box>
                    </Box>

                    {/* Card Content Wrapper */}
                    <Box sx={{ p: 4, pt: 2, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      <Typography 
                        variant="subtitle1" 
                        sx={{ 
                          mb: 1, 
                          color: '#ff2a74',
                          fontFamily: '"Space Grotesk", sans-serif',
                          fontWeight: 600,
                          fontSize: '0.78rem',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase'
                        }}
                      >
                        {pkg.subtitle}
                      </Typography>
                      
                      <Typography 
                        variant="h4" 
                        sx={{ 
                          fontWeight: 800, 
                          fontFamily: '"Space Grotesk", sans-serif',
                          fontSize: '1.35rem',
                          letterSpacing: '0.02em',
                          textTransform: 'uppercase',
                          color: 'white',
                          mb: 2
                        }}
                      >
                        {pkg.title}
                      </Typography>

                      <Typography 
                        variant="body2"
                        sx={{
                          fontFamily: '"Linear", sans-serif',
                          color: 'rgba(255, 255, 255, 0.6)',
                          fontWeight: 300,
                          lineHeight: 1.5,
                          mb: 4,
                          minHeight: '72px'
                        }}
                      >
                        {pkg.description}
                      </Typography>

                      <Divider sx={{ mb: 3, borderColor: 'rgba(255,255,255,0.06)' }} />

                      {/* Inclusions Group Box */}
                      <Box 
                        sx={{ 
                          bgcolor: 'rgba(255, 255, 255, 0.01)',
                          border: '1px solid rgba(255, 255, 255, 0.03)',
                          p: 3,
                          mb: 4,
                          flexGrow: 1
                        }}
                      >
                        <List sx={{ p: 0, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                          {pkg.inclusions.map((item, i) => (
                            <ListItem key={i} disableGutters sx={{ p: 0 }}>
                              <ListItemIcon sx={{ minWidth: 24, color: '#ff2a74' }}>
                                <CheckCircleIcon sx={{ fontSize: '0.9rem' }} />
                              </ListItemIcon>
                              <ListItemText 
                                primary={item} 
                                primaryTypographyProps={{
                                  sx: {
                                    fontFamily: '"Linear", sans-serif',
                                    color: 'rgba(255, 255, 255, 0.82)',
                                    fontWeight: 300,
                                    fontSize: '0.8rem',
                                    lineHeight: 1.25
                                  }
                                }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                      
                      {/* Live Demo Player Widget */}
                      <Box 
                        sx={{ 
                          mb: 4, 
                          p: 2, 
                          bgcolor: 'rgba(0, 0, 0, 0.4)', 
                          border: '1px solid',
                          borderColor: currentPkg === pkg.id && audioError
                            ? 'rgba(255, 42, 116, 0.6)'
                            : currentPkg === pkg.id && (isPlaying || isLoading)
                              ? 'rgba(255, 42, 116, 0.4)'
                              : 'rgba(255, 255, 255, 0.05)',
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 2,
                          borderRadius: '0px',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            bgcolor: 'rgba(0, 0, 0, 0.5)',
                            borderColor: 'rgba(255, 42, 116, 0.3)'
                          }
                        }}
                      >
                        <IconButton
                          onClick={() => handlePlayDemo(pkg.id, pkg.demoUrl)}
                          sx={{
                            bgcolor: currentPkg === pkg.id && isPlaying ? '#ff2a74' : 'rgba(255, 255, 255, 0.08)',
                            color: 'white',
                            '&:hover': {
                              bgcolor: currentPkg === pkg.id && isPlaying ? '#e01f61' : 'rgba(255, 42, 116, 0.2)',
                            },
                            width: 44,
                            height: 44
                          }}
                        >
                          {currentPkg === pkg.id && isLoading ? (
                            <CircularProgress size={20} sx={{ color: '#ff2a74' }} />
                          ) : currentPkg === pkg.id && isPlaying ? (
                            <PauseIcon sx={{ fontSize: '1.4rem' }} />
                          ) : (
                            <PlayArrowIcon sx={{ fontSize: '1.4rem' }} />
                          )}
                        </IconButton>
                        
                        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                          {/* Status Line */}
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.2 }}>
                            <Typography 
                              sx={{ 
                                fontSize: '0.72rem', 
                                fontWeight: 800, 
                                fontFamily: '"Space Grotesk", sans-serif',
                                color: currentPkg === pkg.id && audioError
                                  ? '#ff2a74'
                                  : currentPkg === pkg.id && (isPlaying || isLoading)
                                    ? '#ff2a74'
                                    : 'rgba(255, 255, 255, 0.5)',
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase'
                              }}
                            >
                              {currentPkg === pkg.id && audioError 
                                ? audioError 
                                : currentPkg === pkg.id && isLoading 
                                  ? 'Buffering Demo...' 
                                  : currentPkg === pkg.id && isPlaying 
                                    ? 'Playing Demo' 
                                    : 'Listen to Demo'}
                            </Typography>

                            {currentPkg === pkg.id && (isPlaying || isLoading) && (
                              <Typography
                                sx={{
                                  fontSize: '0.72rem',
                                  fontFamily: '"Space Grotesk", sans-serif',
                                  color: 'rgba(255, 255, 255, 0.6)',
                                  fontWeight: 600,
                                  letterSpacing: '0.05em'
                                }}
                              >
                                {formatTime(currentTime)} / {formatTime(duration)}
                              </Typography>
                            )}
                          </Box>

                          {/* Seekable Slider (Progress Bar) */}
                          <Box sx={{ width: '100%', px: 0.5, mt: -0.5, mb: -0.5 }}>
                            {currentPkg === pkg.id ? (
                              <Slider
                                value={currentTime}
                                min={0}
                                max={duration || 100}
                                onChange={handleSeek}
                                size="small"
                                sx={{
                                  color: '#ff2a74',
                                  height: 3,
                                  p: '8px 0',
                                  '& .MuiSlider-thumb': {
                                    width: 8,
                                    height: 8,
                                    bgcolor: 'white',
                                    transition: '0.2s ease',
                                    '&::before': {
                                      boxShadow: '0 2px 8px 0 rgba(0,0,0,0.5)',
                                    },
                                    '&:hover, &.Mui-focusVisible': {
                                      boxShadow: '0px 0px 0px 6px rgba(255, 42, 116, 0.2)',
                                    },
                                    '&.Mui-active': {
                                      width: 10,
                                      height: 10,
                                      bgcolor: '#ff2a74'
                                    },
                                  },
                                  '& .MuiSlider-track': {
                                    border: 'none',
                                  },
                                  '& .MuiSlider-rail': {
                                    opacity: 0.15,
                                    bgcolor: 'white'
                                  },
                                }}
                              />
                            ) : (
                              <Slider
                                value={0}
                                disabled
                                size="small"
                                sx={{
                                  color: 'rgba(255, 255, 255, 0.08)',
                                  height: 3,
                                  p: '8px 0',
                                  '& .MuiSlider-thumb': {
                                    display: 'none'
                                  }
                                }}
                              />
                            )}
                          </Box>
                          
                          {/* Animated Waveform Visualizer */}
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', height: '14px', mt: 0.2 }}>
                            {currentPkg === pkg.id && isPlaying ? (
                              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((bar) => {
                                const delays = [0.1, 0.4, 0.2, 0.6, 0.3, 0.5, 0.1, 0.4, 0.2, 0.7, 0.3, 0.5];
                                const heights = [10, 14, 8, 12, 6, 14, 9, 11, 7, 13, 8, 12];
                                return (
                                  <Box 
                                    key={bar}
                                    sx={{
                                      width: '2px',
                                      bgcolor: '#ff2a74',
                                      height: `${heights[bar % heights.length]}px`,
                                      animation: 'equalizer 1s ease-in-out infinite alternate',
                                      animationDelay: `${delays[bar % delays.length]}s`,
                                      '@keyframes equalizer': {
                                        '0%': { transform: 'scaleY(0.3)' },
                                        '100%': { transform: 'scaleY(1.1)' }
                                      },
                                      transformOrigin: 'bottom'
                                    }}
                                  />
                                );
                              })
                            ) : (
                              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((bar) => (
                                <Box 
                                  key={bar}
                                  sx={{
                                    width: '2px',
                                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                                    height: '3px',
                                    transformOrigin: 'bottom'
                                  }}
                                />
                              ))
                            )}
                          </Box>
                        </Box>
                      </Box>
                      
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Button
                          onClick={() => handleInquirePackage(pkg.id)}
                          variant="contained"
                          sx={{
                            bgcolor: '#ff2a74',
                            color: 'white',
                            fontFamily: '"Space Grotesk", sans-serif',
                            fontWeight: 700,
                            py: 1.6,
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
                      </Box>
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
                    borderRadius: '0px',
                    overflow: 'visible', // Allow scaled-up floating images to extend outside
                    boxShadow: '0 20px 45px rgba(0,0,0,0.6)',
                    border: '2px solid #ff2a74',
                    bgcolor: 'rgba(0,0,0,0.2)',
                    position: 'relative'
                  }}
                >
                  {gearImages.map((img, idx) => {
                    const currentSlot = positions[idx];
                    return (
                      <motion.div
                        key={img.id}
                        style={{
                          position: 'absolute',
                          width: '50%',
                          height: '50%',
                          zIndex: phase !== 'idle' ? 10 : 1
                        }}
                        animate={{
                          left: slotStyles[currentSlot].left,
                          top: slotStyles[currentSlot].top,
                        }}
                        transition={{
                          left: { type: 'spring', stiffness: 70, damping: 15 },
                          top: { type: 'spring', stiffness: 70, damping: 15 }
                        }}
                      >
                        <motion.div
                          onClick={() => handleImageClick(img.src, img.alt)}
                          style={{
                            width: '100%',
                            height: '100%',
                            cursor: 'pointer',
                            boxSizing: 'border-box',
                            border: '2px solid #ff2a74', // pink outline on each photo card
                            overflow: 'hidden', // clips the image to the card's boundary
                            backgroundColor: '#000',
                            transformOrigin: 'center'
                          }}
                          animate={{
                            scale: phase === 'pulling' || phase === 'swapping' ? 1.15 : 1.0,
                            boxShadow: phase === 'pulling' || phase === 'swapping'
                              ? '0 30px 60px rgba(0,0,0,0.85), 0 0 20px rgba(255, 42, 116, 0.6)'
                              : '0 0px 0px rgba(0,0,0,0)',
                          }}
                          transition={{
                            scale: { type: 'spring', stiffness: 100, damping: 15 },
                            boxShadow: { duration: 0.45, ease: 'easeOut' }
                          }}
                        >
                          <img
                            src={img.src}
                            alt={img.alt}
                            style={{ 
                              width: '100%', 
                              height: '100%', 
                              objectFit: 'cover',
                              display: 'block'
                            }}
                          />
                        </motion.div>
                      </motion.div>
                    );
                  })}
                  
                  {/* Pink inner separators (cross) */}
                  <Box sx={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '4px', bgcolor: '#ff2a74', transform: 'translateY(-50%)', zIndex: 2, pointerEvents: 'none' }} />
                  <Box sx={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '4px', bgcolor: '#ff2a74', transform: 'translateX(-50%)', zIndex: 2, pointerEvents: 'none' }} />
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
            {genreData.map((genre, i) => (
              <Grid size={{ xs: 6, sm: 4, md: 2 }} key={i}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 3, 
                    textAlign: 'center', 
                    bgcolor: 'rgba(255, 255, 255, 0.02)', 
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    color: 'white', 
                    borderRadius: '0px', // Sharp corners
                    backdropFilter: 'blur(5px)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                    minHeight: '130px'
                  }}
                >
                  <Box 
                    sx={{ 
                      color: '#ff2a74', 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {genre.icon}
                  </Box>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontWeight: 700,
                      fontFamily: '"Space Grotesk", sans-serif',
                      fontSize: '0.82rem',
                      lineHeight: 1.25
                    }}
                  >
                    {genre.name}
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
            backgroundImage: `linear-gradient(rgba(8, 8, 10, 0.88), rgba(8, 8, 10, 0.92)), url(${whyShalom1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
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

        {/* Dynamic Pricing Popup */}
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
              borderRadius: '0px', // Sharp corners
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

          {selectedPkgId !== null && (() => {
            const pkgPricingDetails = [
              {
                id: 0,
                title: 'Simple Track Instrumental',
                originalPrice: '80,000 TZS ($60 USD)',
                promoPrice: '70,000 TZS ($50 USD)',
                unit: 'per custom simple beat / track',
                desc: 'High-quality custom electronic beatmaking and straightforward rhythm arrangements.',
                features: [
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
                title: 'Classical Instrumental',
                originalPrice: '120,000 TZS ($90 USD)',
                promoPrice: '100,000 TZS ($70 USD)',
                unit: 'per custom classical composition',
                desc: 'Traditional arrangement including acoustic grand piano, strings, and solo instruments.',
                features: [
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
                title: 'Orchestral Instrumental',
                originalPrice: '250,000 TZS ($180 USD)',
                promoPrice: '200,000 TZS ($140 USD)',
                unit: 'per cinematic orchestral score',
                desc: 'Epic multi-layered symphonic scores, dramatic pads, brass sections, and complex polyphonic dynamics.',
                features: [
                  'Full-scale cinematic orchestration & midi programming',
                  'Hybrid symphonic scoring (orchestra + synth sound design)',
                  'Epic orchestral percussion, brass, strings & choir layering',
                  'Professional stems delivered (Brass, Strings, Perc, Synths)',
                  'Unlimited revisions to match film visual cues perfectly',
                  'Premium royalty-free global sync & performance license'
                ]
              }
            ];
            const pkg = pkgPricingDetails[selectedPkgId];
            if (!pkg) return null;
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
                  {pkg.title}
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
                  {pkg.desc}
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
                  {/* Offer Badge */}
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
                      mt: 0.25
                    }}
                  >
                    {pkg.originalPrice}
                  </Typography>
                  <Typography 
                    sx={{ 
                      color: '#ff2a74', 
                      fontWeight: 900, 
                      fontSize: { xs: '1.25rem', sm: '1.4rem' },
                      fontFamily: '"Space Grotesk", sans-serif',
                      lineHeight: 1
                    }}
                  >
                    {pkg.promoPrice}
                  </Typography>
                  <Typography 
                    sx={{ 
                      fontSize: '0.75rem',
                      color: 'rgba(255, 255, 255, 0.5)',
                      fontFamily: '"Linear", sans-serif',
                      mt: 0.75
                    }}
                  >
                    {pkg.unit}
                  </Typography>
                </Box>

                {/* Inclusions List */}
                <Box sx={{ textAlign: 'left', mb: 3.5, display: 'flex', flexDirection: 'column', gap: 1.5, px: 1 }}>
                  {pkg.features.map((text, i) => (
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
                    to={`/contact?service=production&package=${encodeURIComponent(pkg.title)}`}
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

        {/* Lightbox Dialog for Image Expansion */}
        <Dialog
          open={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
          maxWidth="lg"
          PaperProps={{
            sx: {
              bgcolor: 'transparent',
              boxShadow: 'none',
              overflow: 'hidden',
              borderRadius: '0px',
              m: 0,
              p: 0,
              position: 'relative'
            }
          }}
          sx={{
            backdropFilter: 'blur(15px)',
            '& .MuiBackdrop-root': {
              bgcolor: 'rgba(0, 0, 0, 0.92)'
            }
          }}
        >
          <IconButton 
            onClick={() => setIsLightboxOpen(false)} 
            aria-label="close"
            sx={{ 
              position: 'absolute', 
              top: 16, 
              right: 16, 
              zIndex: 10,
              color: 'white', 
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              '&:hover': { bgcolor: '#ff2a74', color: 'white' } 
            }}
          >
            <CloseIcon sx={{ fontSize: '1.8rem' }} />
          </IconButton>
          
          <Box 
            component="img"
            src={lightboxImg.src}
            alt={lightboxImg.alt}
            sx={{
              maxWidth: '100%',
              maxHeight: '90vh',
              objectFit: 'contain',
              border: '2px solid #ff2a74',
              display: 'block'
            }}
          />
        </Dialog>
      </Box>
    </>
  );
};

export default Production;
