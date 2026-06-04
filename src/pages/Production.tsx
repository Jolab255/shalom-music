import { useState, useEffect, useRef } from 'react';
import { Container, Typography, Box, Paper, Divider, Grid2 as Grid, Button, Fade } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MicExternalOnIcon from '@mui/icons-material/MicExternalOn';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AlbumIcon from '@mui/icons-material/Album';
import instrumentalHeroVideo from '../assets/instrumental-creation.mp4';
import simpleTrackImg from '../assets/simple-track-instrumental.png';
import classicalImg from '../assets/classical-instrumental.png';
import orchestralImg from '../assets/orchestral-instrumental.png';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const XRef = useRef<number>(0);
  const isPausedRef = useRef<boolean>(false);
  const isAnimatingToTargetRef = useRef<boolean>(false);
  const targetXRef = useRef<number>(0);
  const requestRef = useRef<number | null>(null);
  const hasInitializedRef = useRef<boolean>(false);
  const lastTimeRef = useRef<number | null>(null);

  const [activePkg, setActivePkg] = useState(0);
  const [displayPkg, setDisplayPkg] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (activePkg !== displayPkg) {
      setIsFadingOut(true);
      const timer = setTimeout(() => {
        setDisplayPkg(activePkg);
        setIsFadingOut(false);
      }, 1000); // 1000ms (1s) fade-out duration
      return () => clearTimeout(timer);
    }
  }, [activePkg, displayPkg]);

  useEffect(() => {
    lastTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (!containerRef.current || containerRef.current.children.length === 0) {
        requestRef.current = requestAnimationFrame(animate);
        return;
      }

      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
      }
      const deltaTime = (timestamp - lastTimeRef.current) / 1000; // in seconds
      lastTimeRef.current = timestamp;

      const firstChild = containerRef.current.children[0] as HTMLElement;
      const cardWidth = firstChild.getBoundingClientRect().width;
      
      const computedStyle = window.getComputedStyle(containerRef.current);
      const gap = parseFloat(computedStyle.gap) || 24;

      const cycleWidth = 3 * (cardWidth + gap);
      const isDesktop = window.innerWidth >= 900;
      // 40% from the right edge on desktop (100% - 40% = 60%), and 50% on mobile
      const triggerX = isDesktop ? window.innerWidth * 0.60 : window.innerWidth * 0.5;

      // Initialize position to perfectly center Package 01 (index 3) on load
      if (!hasInitializedRef.current) {
        XRef.current = triggerX - 3 * (cardWidth + gap);
        hasInitializedRef.current = true;
      }

      if (isAnimatingToTargetRef.current) {
        const dx = targetXRef.current - XRef.current;
        XRef.current += dx * 0.08;
        
        if (Math.abs(dx) < 0.5) {
          XRef.current = targetXRef.current;
          isAnimatingToTargetRef.current = false;
        }
      } else if (!isPausedRef.current) {
        // High-fidelity delta-time based scrolling (exact 40s duration per image cycle, Hz independent!)
        const pixelsPerSecond = (cardWidth + gap) / 40;
        XRef.current -= pixelsPerSecond * deltaTime;
        
        if (-XRef.current >= cycleWidth) {
          XRef.current += cycleWidth;
        }
      }

      containerRef.current.style.transform = `translate3d(${XRef.current}px, 0px, 0px)`;

      if (!isAnimatingToTargetRef.current) {
        // Track the image currently reaching 40% from the right (triggerX)
        const targetXValue = triggerX - XRef.current;
        const indexAtLeftEdge = Math.floor(targetXValue / (cardWidth + gap));
        const pkgId = Math.max(0, indexAtLeftEdge) % 3;

        setActivePkg((prev) => {
          if (prev !== pkgId) {
            return pkgId;
          }
          return prev;
        });
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  const handlePkgClick = (targetPkg: number) => {
    if (!containerRef.current || containerRef.current.children.length === 0) return;

    const firstChild = containerRef.current.children[0] as HTMLElement;
    const cardWidth = firstChild.getBoundingClientRect().width;
    const computedStyle = window.getComputedStyle(containerRef.current);
    const gap = parseFloat(computedStyle.gap) || 24;

    const cycleWidth = 3 * (cardWidth + gap);
    const isDesktop = window.innerWidth >= 900;
    const triggerX = isDesktop ? window.innerWidth * 0.60 : window.innerWidth * 0.5;

    let bestTargetX = 0;
    let minDistance = Infinity;

    for (let i = 0; i < 9; i++) {
      if (i % 3 === targetPkg) {
        // Target translation to align the left edge of the image exactly at triggerX (40% from right)
        const targetX = triggerX - i * (cardWidth + gap);
        
        // Keep targetX within [-cycleWidth, 0] to avoid blank spaces on the left
        let normalizedTargetX = targetX;
        while (normalizedTargetX > 0) {
          normalizedTargetX -= cycleWidth;
        }
        while (normalizedTargetX < -cycleWidth) {
          normalizedTargetX += cycleWidth;
        }

        const dist = Math.abs(normalizedTargetX - XRef.current);
        if (dist < minDistance) {
          minDistance = dist;
          bestTargetX = normalizedTargetX;
        }
      }
    }

    setActivePkg(targetPkg);
    targetXRef.current = bestTargetX;
    isAnimatingToTargetRef.current = true;
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
          pt: 0, // Touch the absolute top edge of the screen perfectly!
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
        {/* Cinematic Showcase Video (No overlays, no elements on top) */}
        <Box 
          sx={{ 
            width: '100%', 
            height: { xs: '55vh', sm: '70vh', md: '85vh', lg: '100vh' },
            overflow: 'hidden',
            position: 'relative',
            bgcolor: '#000000',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
          }}
        >
          <video
            src={instrumentalHeroVideo}
            muted
            playsInline
            autoPlay
            loop
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
              objectFit: 'cover',
              opacity: 1
            }}
          />
        </Box>

        {/* Intro Content Section */}
        <Box 
          sx={{ 
            py: { xs: 8, md: 12 },
            textAlign: 'center',
            position: 'relative',
            zIndex: 2,
            background: `
              radial-gradient(circle at 50% 30%, rgba(255, 42, 116, 0.04) 0%, transparent 60%),
              transparent
            `,
          }}
        >
          <Container maxWidth="md">
            {/* Subheading Badge */}
            <Box 
              sx={{ 
                display: 'inline-flex',
                bgcolor: 'rgba(255, 42, 116, 0.1)',
                border: '1px solid rgba(255, 42, 116, 0.3)',
                color: '#ff2a74', 
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 800,
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                px: 3,
                py: 0.8,
                borderRadius: '20px',
                textTransform: 'uppercase',
                mb: 4,
                boxShadow: '0 4px 15px rgba(255, 42, 116, 0.15)',
                backdropFilter: 'blur(5px)',
              }}
            >
              Elite Instrumental & Audio Engineering
            </Box>

            <Typography 
              variant="h1" 
              sx={{ 
                fontFamily: '"Sans Superellipse Ragan 2", "AerodomeRegular-2vMGK", sans-serif',
                fontSize: { xs: '2.4rem', sm: '3.6rem', md: '4.8rem' }, 
                fontWeight: 900, 
                mb: 3,
                letterSpacing: '-0.01em',
                lineHeight: 1.15,
                textTransform: 'uppercase',
                background: 'linear-gradient(135deg, #ffffff 40%, rgba(255, 255, 255, 0.75) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0px 10px 30px rgba(0, 0, 0, 0.6)'
              }}
            >
              Professional Production for Modern Artists
            </Typography>

            <Typography 
              variant="h5" 
              sx={{ 
                fontFamily: '"Linear", "Space Grotesk", sans-serif',
                mb: 6, 
                color: 'rgba(255, 255, 255, 0.75)', 
                fontWeight: 300, 
                lineHeight: 1.6,
                fontSize: { xs: '0.95rem', sm: '1.2rem', md: '1.3rem' },
                maxWidth: '720px',
                mx: 'auto'
              }}
            >
              From raw bedroom demos to grand radio-ready masters, we synthesize technical accuracy with organic warmth to make your musical projects stand out globally.
            </Typography>

            <Button 
              component={RouterLink}
              to="/contact?service=production"
              variant="contained" 
              size="large" 
              sx={{ 
                bgcolor: '#ff2a74', 
                color: 'white', 
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 800,
                fontSize: '0.95rem',
                letterSpacing: '0.05em',
                px: 5, 
                py: 1.8, 
                borderRadius: 0,
                boxShadow: '0 8px 25px rgba(255, 42, 116, 0.3)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                '&:hover': { 
                  bgcolor: '#e01f61',
                  boxShadow: '0 12px 35px rgba(255, 42, 116, 0.6)',
                  transform: 'translateY(-2px)'
                } 
              }}
            >
              Start Your Project
            </Button>
          </Container>
        </Box>

        {/* Continuous Widescreen Package Showcase Section */}
        <Box 
          sx={{ 
            py: 0, 
            position: 'relative', 
            zIndex: 2,
            overflow: 'hidden',
            height: { xs: 'auto', md: '110vh' },
            minHeight: { xs: '750px', md: '700px' },
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {/* Continuous Infinite Scrolling Marquee */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              width: '100%',
              zIndex: 1,
              overflow: 'hidden',
              transform: 'translateZ(0)',
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              // Fade out images only on the left text area (desktop) or top text area (mobile) to keep the right edge 100% full and visible
              WebkitMaskImage: {
                xs: 'linear-gradient(to bottom, transparent 0%, #000000 35%, #000000 100%)',
                md: 'linear-gradient(to right, transparent 0%, #000000 30%, #000000 100%)'
              },
              maskImage: {
                xs: 'linear-gradient(to bottom, transparent 0%, #000000 35%, #000000 100%)',
                md: 'linear-gradient(to right, transparent 0%, #000000 30%, #000000 100%)'
              }
            }}
          >
            <style>{`
              @keyframes fadeIn {
                0% { opacity: 0; }
                100% { opacity: 1; }
              }
            `}</style>
            <Box
              ref={containerRef}
              onMouseEnter={() => { isPausedRef.current = true; }}
              onMouseLeave={() => { isPausedRef.current = false; }}
              sx={{
                display: 'flex',
                gap: { xs: '16px', md: '24px' }, // Tight, gorgeous cinematic gap!
                alignItems: 'center', // Vertically center the cards!
                width: 'max-content',
                height: '100%',
                willChange: 'transform', // GPU acceleration!
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              }}
            >
              {[
                simpleTrackImg,
                classicalImg,
                orchestralImg,
                simpleTrackImg,
                classicalImg,
                orchestralImg,
                simpleTrackImg,
                classicalImg,
                orchestralImg
              ].map((img, idx) => (
                <Box
                  key={idx}
                  sx={{
                    width: { xs: '360px', sm: '560px', md: '800px' }, // Cinematic widescreen dimensions!
                    height: { xs: '203px', sm: '315px', md: '450px' }, // Perfect 16:9 aspect ratio!
                    border: 'none',
                    boxShadow: 'none', // Totally transparent, no shadows!
                    overflow: 'hidden',
                    flexShrink: 0,
                    display: 'flex',
                    position: 'relative',
                    borderRadius: 0, // Sharp!
                    bgcolor: 'transparent', // Completely transparent container!
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden'
                  }}
                >
                  {/* Sharp Main Image (Contain - 100% Uncut!) */}
                  <Box
                    component="img"
                    src={img}
                    alt={`Instrumental Showcase ${idx + 1}`}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      position: 'relative',
                      zIndex: 1,
                      willChange: 'transform',
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden'
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>

          {/* Left-heavy Dark Gradient Mask Overlay */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: {
                xs: 'linear-gradient(to bottom, #000000 0%, rgba(0, 0, 0, 0.95) 45%, rgba(0, 0, 0, 0.6) 75%, transparent 100%)',
                md: 'linear-gradient(to right, #000000 0%, #000000 25%, rgba(0, 0, 0, 0.95) 45%, rgba(0, 0, 0, 0.3) 70%, transparent 100%)'
              },
              zIndex: 2,
              pointerEvents: 'none',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden'
            }}
          />

          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3, py: { xs: 8, md: 10 }, width: '100%' }}>
            <Grid container spacing={6} alignItems="center">
              {/* Left Column: Dynamic Package Description */}
              <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: 'transparent',
                    border: 'none',
                    boxShadow: 'none',
                    p: 0,
                    position: 'relative'
                  }}
                >
                  <Fade in={!isFadingOut} timeout={1000}>
                    <Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        bgcolor: 'transparent',
                        border: 'none',
                        boxShadow: 'none',
                        p: 0,
                        position: 'relative'
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontFamily: '"Space Grotesk", sans-serif',
                          fontWeight: 800,
                          color: '#ff2a74',
                          letterSpacing: '0.15em',
                          mb: 1,
                          textTransform: 'uppercase',
                          fontSize: '0.85rem'
                        }}
                      >
                        {packagesData[displayPkg].subtitle}
                      </Typography>

                      <Typography
                        variant="h4"
                        sx={{
                          fontFamily: '"Space Grotesk", sans-serif',
                          fontWeight: 800,
                          fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.4rem' },
                          mb: { xs: 2.5, md: 1.5 },
                          color: 'white',
                          lineHeight: 1.2
                        }}
                      >
                        {packagesData[displayPkg].title}
                      </Typography>
                      
                      <Typography
                        variant="body1"
                        sx={{
                          fontFamily: '"Linear", sans-serif',
                          color: 'rgba(255, 255, 255, 0.75)',
                          fontSize: '0.98rem',
                          lineHeight: 1.7,
                          mb: { xs: 3, md: 2 },
                          minHeight: { xs: 'auto', sm: 'auto', md: '120px' }
                        }}
                      >
                        {packagesData[displayPkg].description}
                      </Typography>

                      <Divider sx={{ mb: { xs: 3, md: 2 }, borderColor: 'rgba(255,255,255,0.08)' }} />
                      
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontFamily: '"Space Grotesk", sans-serif',
                          fontWeight: 700,
                          color: 'white',
                          letterSpacing: '0.05em',
                          mb: 1.5,
                          textTransform: 'uppercase'
                        }}
                      >
                        Key Inclusions:
                      </Typography>

                      <Grid container spacing={2} sx={{ mb: { xs: 4, md: 3.5 } }}>
                        {packagesData[displayPkg].inclusions.map((item, i) => (
                          <Grid size={{ xs: 12, sm: 6 }} key={i}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <CheckCircleIcon sx={{ fontSize: '1.1rem', color: '#ff2a74', flexShrink: 0 }} />
                              <Typography 
                                fontFamily='"Linear", sans-serif'
                                fontSize="0.88rem"
                                color="rgba(255, 255, 255, 0.85)"
                                sx={{ lineHeight: 1.3 }}
                              >
                                {item}
                              </Typography>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </Fade>

                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, alignItems: 'center' }}>
                    <Button 
                      component={RouterLink}
                      to="/contact?service=production"
                      variant="contained" 
                      sx={{ 
                        bgcolor: '#ff2a74', 
                        color: 'white', 
                        fontFamily: '"Space Grotesk", sans-serif',
                        fontWeight: 800,
                        borderRadius: 0,
                        py: 1.8,
                        px: 4,
                        boxShadow: 'none',
                        transition: 'all 0.3s ease',
                        textTransform: 'none',
                        fontSize: '1rem',
                        whiteSpace: 'nowrap',
                        width: { xs: '100%', sm: 'auto' },
                        '&:hover': { 
                          bgcolor: '#e01b5d',
                          transform: 'translateY(-2px)'
                        } 
                      }}
                    >
                      Inquire About This Package
                    </Button>

                    <Box 
                      sx={{ 
                        display: 'flex', 
                        gap: 2.5,
                        width: { xs: '100%', sm: 'auto' },
                        justifyContent: { xs: 'center', sm: 'flex-start' }
                      }}
                    >
                      {packagesData.map((pkg, idx) => {
                        const active = activePkg === idx;
                        return (
                          <Box
                            key={pkg.id}
                            onClick={() => handlePkgClick(idx)}
                            sx={{
                              fontFamily: '"Space Grotesk", sans-serif',
                              fontWeight: active ? 800 : 500,
                              fontSize: '0.85rem',
                              color: active ? '#ff2a74' : 'rgba(255,255,255,0.4)',
                              cursor: 'pointer',
                              position: 'relative',
                              pb: 0.5,
                              transition: 'all 0.3s ease',
                              '&::after': {
                                content: '""',
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                width: active ? '100%' : '0%',
                                height: '2px',
                                bgcolor: '#ff2a74',
                                transition: 'all 0.3s ease'
                              },
                              '&:hover': {
                                color: active ? '#ff2a74' : 'white'
                              }
                            }}
                          >
                            {pkg.num}
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                </Box>
              </Grid>

              {/* Right Column: Left empty so background marquee images roll freely in full view! */}
              <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'block' } }} />
            </Grid>
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
