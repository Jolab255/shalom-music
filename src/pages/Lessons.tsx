import { useState, useEffect, useRef } from 'react';
import { Container, Typography, Box, Button, List, ListItem, ListItemIcon, ListItemText, Grid2 as Grid, Divider, Fade } from '@mui/material';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import shalomCtaVideo from '../assets/shalom-cta.mp4';
import pianoLessonSect2Img from '../assets/piano-lesson-sect-2.png';

// Natively import the correct .webp assets
import pianoBeginnerImg from '../assets/piano-beginner.webp';
import pianoIntermediateImg from '../assets/piano-intermediate.webp';
import pianoKidsImg from '../assets/piano-kids.webp';
import pianoAdvancedImg from '../assets/piano-lesson-advanced.webp';

import kidsLevelImg from '../assets/kids-level.webp';
import intermediaryLevelImg from '../assets/intermediary-level.webp';
import advancedLevel2Img from '../assets/advanced-level2.webp';
import advancedLevelImg from '../assets/advanced-level.webp';
import beginnerLevelImg from '../assets/beginner-level.webp';

// Google-research-backed elite training packages data for Shalom Music Studios
const packagesData = [
  {
    id: 0,
    num: '01',
    title: 'Young Keys Academy',
    subtitle: 'Ages 6-12 Play & Discover',
    image: pianoKidsImg,
    description: 'Introduce children aged 6–12 to the joy of piano through the world-renowned John Thompson\'s Easiest Piano Course. Our junior curriculum combines melodic reading, visual flashcards, and popular children\'s songs to nurture a lifelong love for the keys.',
    inclusions: [
      '8 x 30-Minute private grand piano lessons',
      'John Thompson\'s Easiest Piano Course books',
      'Gamified visual notation & rhythmic cards',
      'Acoustic grand practice room access (1 hr/week)',
      'Secure student progress portfolio & practice logs',
      'Performance slot in seasonal recitals & showcases'
    ]
  },
  {
    id: 1,
    num: '02',
    title: 'Beginner Foundations',
    subtitle: 'Teens & Adults Starting Fresh',
    image: pianoBeginnerImg,
    description: 'A comprehensive starting point for teens and adults using ABRSM foundations and "Hymns Made Easy." We focus on sight-reading and dual-staff note reading, enabling you to play your favorite hymns and classical themes in your first month.',
    inclusions: [
      '8 x 50-Minute private grand piano lessons',
      'Hymns Made Easy & ABRSM method books',
      'Professional hand posture & finger articulation basics',
      'Dual-clef note reading & common time signatures',
      'Single acoustic grand practice session access',
      '24/7 direct chat support with your instructor'
    ]
  },
  {
    id: 2,
    num: '03',
    title: 'Intermediate Artistry',
    subtitle: 'Technique & Personal Style',
    image: pianoIntermediateImg,
    description: 'Transition your technical fluency into personal musical expression using ABRSM Grade 1-3 syllabi and intermediate Hymn arrangements. We introduce advanced scale routines and teach keyboard harmony, giving you the tools to perform with professional style.',
    inclusions: [
      '8 x 1-Hour weekly grand piano lessons',
      'ABRSM / Trinity graded syllabus integrated',
      'Technical studies and ABRSM theory materials',
      'Chord theory & intermediate keyboard harmony',
      'Acoustic grand practice room access (2 hrs/week)',
      '2 makeup lesson rollover credits per semester'
    ]
  },
  {
    id: 3,
    num: '04',
    title: 'Advanced Concert Mastery',
    subtitle: 'Artistry & Board Exam Prep',
    image: pianoAdvancedImg,
    description: 'Intensive training for advanced pianists aiming for ultimate keyboard control using the full ABRSM Grades 4-8 curriculum. Master complex keyboard voicings, speed arpeggios, and virtuoso literature under expert guidance for professional concert recitals.',
    inclusions: [
      '8 x 1-Hour flexible private lessons',
      'Elite board exam preparation (ABRSM Grades 1-8)',
      'Advanced repertoire (Bach, Czerny, Chopin)',
      'Acoustic grand practice room access (4 hrs/week)',
      'VIP recital performance slot with HD recording',
      'Advanced music theory & multi-voice harmony workshops'
    ]
  }
];

const heroImages = [
  kidsLevelImg,
  beginnerLevelImg,
  intermediaryLevelImg,
  advancedLevelImg,
  advancedLevel2Img
];

// Specific descriptions for each hero image grade (aligned with heroImages order)
const levelDescriptions = [
  {
    title: 'Junior Discovery',
    description: 'We use the classic John Thompson\'s Easiest Piano Course for kids aged 6-12. This method builds a solid foundation through melodic reading and engaging visual cues that make learning intuitive.',
    tools: ['John Thompson\'s Course', 'Visual Flashcards', 'Gamified Notation']
  },
  {
    title: 'Beginner Launchpad',
    description: 'Focusing on dual-staff reading and foundational technique. We incorporate "Hymns Made Easy" alongside ABRSM beginner materials to build confidence and coordination in new pianists.',
    tools: ['Hymns Made Easy', 'ABRSM Foundations', 'Dual-Staff Reading']
  },
  {
    title: 'Artistry & Flow',
    description: 'Transitioning to technical routines using ABRSM Grade 1-3 materials and intermediate Hymn arrangements. We introduce chord harmony to help students find their own unique musical voice.',
    tools: ['ABRSM Grade 1-3', 'Hymn Arrangements', 'Chord Harmony']
  },
  {
    title: 'Concert Precision',
    description: 'Mastering complex keyboard voicings and speed through ABRSM Grade 4-6 syllabi. Elite preparation for board certifications and high-level professional performance.',
    tools: ['ABRSM Grade 4-6', 'Czerny Velocity', 'Bach Inventions']
  },
  {
    title: 'Elite Performance',
    description: 'Deep dive into performance psychology using ABRSM Grade 7-8 repertoire and advanced classical literature. Cultivating professional-grade interpretation for master-class concert recitals.',
    tools: ['ABRSM Grade 7-8', 'Chopin Etudes', 'Performance Psychology']
  }
];

const Lessons: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const XRef = useRef<number>(0);
  const isPausedRef = useRef<boolean>(false);
  const isAnimatingToTargetRef = useRef<boolean>(false);
  const targetXRef = useRef<number>(0);
  const requestRef = useRef<number | null>(null);
  const hasInitializedRef = useRef<boolean>(false);
  const lastTimeRef = useRef<number | null>(null);

  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

    const animateMarquee = (timestamp: number) => {
      if (!containerRef.current || containerRef.current.children.length === 0) {
        requestRef.current = requestAnimationFrame(animateMarquee);
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
      const rawGap = parseFloat(computedStyle.gap);
      const gap = isNaN(rawGap) ? 24 : rawGap;

      const cycleWidth = 4 * (cardWidth + gap);
      const isDesktop = window.innerWidth >= 900;
      // 40% from the right edge on desktop (100% - 40% = 60%), and 50% on mobile
      const triggerX = isDesktop ? window.innerWidth * 0.60 : window.innerWidth * 0.5;

      // Initialize position to perfectly center Package 01 (index 4) on load
      if (!hasInitializedRef.current) {
        XRef.current = triggerX - 4 * (cardWidth + gap);
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
        const pkgId = Math.max(0, indexAtLeftEdge) % 4;

        setActivePkg((prev) => {
          if (prev !== pkgId) {
            return pkgId;
          }
          return prev;
        });
      }

      requestRef.current = requestAnimationFrame(animateMarquee);
    };

    requestRef.current = requestAnimationFrame(animateMarquee);
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
    const rawGap = parseFloat(computedStyle.gap);
    const gap = isNaN(rawGap) ? 24 : rawGap;

    const cycleWidth = 4 * (cardWidth + gap);
    const isDesktop = window.innerWidth >= 900;
    const triggerX = isDesktop ? window.innerWidth * 0.60 : window.innerWidth * 0.5;

    let bestTargetX = 0;
    let minDistance = Infinity;

    for (let i = 0; i < 8; i++) {
      if (i % 4 === targetPkg) {
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
        <title>Professional Piano Lessons in Tanzania | Shalom Music Studios</title>
        <meta name="description" content="Elite piano lessons for all ages and grades in Tanzania. Master classical and contemporary keys under expert instructors." />
        <link rel="canonical" href="https://shalommusic.co.tz/lessons" />
      </Helmet>

      <Box
        sx={{
          bgcolor: '#000000',
          color: 'white',
          minHeight: '100vh',
          position: 'relative',
          pt: 0,
          pb: 0,
          overflowX: 'hidden', // Contain horizontal overflow without breaking sticky (no overflowY: hidden)
          background: `
            radial-gradient(circle at 20% 30%, rgba(45, 45, 55, 0.45) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(35, 35, 45, 0.4) 0%, transparent 60%),
            radial-gradient(circle at 50% 50%, rgba(25, 25, 30, 0.3) 0%, transparent 80%),
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
            zIndex: 3
          }
        }}
      >


        <Box sx={{ position: 'relative', bgcolor: '#000000' }}>
          
          <Box sx={{ position: 'relative', width: '100%' }}>
            {/* Persistent Fixed Red Overlay (Static relative to viewport) */}
            <Box
              sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                height: '100vh',
                width: { md: '35%', lg: '30%' },
                background: 'linear-gradient(to right, rgba(150, 0, 0, 0.95) 0%, rgba(150, 0, 0, 0.95) 40%, rgba(150, 0, 0, 0.85) 70%, rgba(150, 0, 0, 0) 100%)',
                zIndex: 10,
                pointerEvents: 'none',
                display: { xs: 'none', md: 'block' },
                // Artistic Sandy Texture Overlay
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
            />

            {/* ── Hero Section: CSS Fixed-Background Reveal Sequence ── */}
            {heroImages.map((imgSrc, idx) => (
              <Box
                key={idx}
                sx={{
                  position: 'relative',
                  height: '65vh', 
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: '#000000',
                }}
              >
                {/* Content that scrolls OVER the fixed sidebar (Scroll-triggered animation) */}
                <Box
                  component={motion.div}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: { md: '35%', lg: '30%' },
                    zIndex: 11,
                    pointerEvents: 'none',
                    display: { xs: 'none', md: 'flex' },
                    flexDirection: 'column',
                    justifyContent: 'center',
                    pl: { md: 5, lg: 8, xl: 12 },
                    pr: 4
                  }}
                >
                    <Box>
                      <Typography 
                        variant="overline" 
                        sx={{ 
                          color: '#ff2a74', 
                          fontWeight: 800, 
                          letterSpacing: '0.3em', 
                          fontFamily: '"Space Grotesk", sans-serif',
                          mb: 1.5, 
                          display: 'block',
                          opacity: 0.9
                        }}
                      >
                        GRADE 0{idx + 1}
                      </Typography>

                      <Typography 
                        variant="h3" 
                        sx={{ 
                          fontFamily: '"Space Grotesk", sans-serif', 
                          fontWeight: 800, 
                          color: 'white', 
                          mb: 3,
                          fontSize: { md: '1.6rem', lg: '2.2rem', xl: '2.6rem' },
                          lineHeight: 1.1,
                          textTransform: 'uppercase'
                        }}
                      >
                        {levelDescriptions[idx].title}
                      </Typography>
                      <Typography 
                        sx={{ 
                          fontFamily: '"Linear", sans-serif', 
                          color: 'rgba(255,255,255,0.9)', 
                          fontSize: { md: '0.85rem', lg: '0.92rem' }, 
                          lineHeight: 1.7, 
                          maxWidth: '380px'
                        }}
                      >
                        {levelDescriptions[idx].description}
                      </Typography>
                    </Box>
                </Box>

              {/* The Image Window: 50% width, aspect ratio locked. The reveal happens ONLY here. */}
              <Box
                sx={{
                  width: { xs: '90%', sm: '70%', md: '50%' },
                  aspectRatio: '1542 / 1020',
                  position: 'relative',
                  overflow: 'hidden',
                  clipPath: 'inset(0)', // clip-path is the ONLY way to clip background-attachment:fixed
                  zIndex: 1,
                  mt: 0,
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundImage: `url(${imgSrc})`,
                    backgroundAttachment: 'fixed',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: { xs: 'contain', md: '50% auto' },
                    zIndex: -1,
                  }
                }}
              />

              {/* Ambient Pink Glows on first image */}
              {idx === 0 && (
                <>
                  <Box sx={{ position: 'absolute', top: '15%', right: '-10%', width: { xs: '300px', md: '600px' }, height: { xs: '300px', md: '600px' }, background: 'radial-gradient(circle, rgba(255, 42, 116, 0.06) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />
                  <Box sx={{ position: 'absolute', bottom: '20%', left: '-10%', width: { xs: '300px', md: '600px' }, height: { xs: '300px', md: '600px' }, background: 'radial-gradient(circle, rgba(255, 42, 116, 0.05) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />
                </>
              )}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Section 2: Interactive Packages Pathways */}
      <Box
        sx={{
          py: 0,
          position: 'relative',
          zIndex: 15, // Sit above the fixed red overlay (zIndex: 10)
          overflow: 'hidden',
          height: { xs: 'auto', md: '110vh' },
          minHeight: { xs: '750px', md: '700px' },
          display: 'flex',
          alignItems: 'center',
          // Cloudy background for atmospheric depth
          background: `
            radial-gradient(circle at 80% 30%, rgba(45, 45, 55, 0.45) 0%, transparent 72%),
            radial-gradient(circle at 20% 70%, rgba(35, 35, 45, 0.4) 0%, transparent 82%),
            transparent
          `,
          // Sandy texture overlay
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
                gap: 0, // Removed gap completely to 0!
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
                pianoKidsImg,
                pianoBeginnerImg,
                pianoIntermediateImg,
                pianoAdvancedImg,
                pianoKidsImg,
                pianoBeginnerImg,
                pianoIntermediateImg,
                pianoAdvancedImg
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
                    alt={`Piano Lesson Showcase ${idx + 1}`}
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
                      to={`/contact?service=lessons&package=${encodeURIComponent(packagesData[displayPkg].title)}`}
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
                      Enroll in This Program
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

        {/* ── Content Sections (Opaque wrapper to cover fixed hero overlay from Section 3 onwards) ── */}
        <Box sx={{ position: 'relative', zIndex: 20, bgcolor: '#000000' }}>
          <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 }, position: 'relative', zIndex: 20 }}>
            <Typography
              variant="h3"
            align="center"
            sx={{
              fontFamily: '"AerodomeRegular-2vMGK", sans-serif',
              fontSize: { xs: '2.2rem', sm: '3rem' },
              mb: 2,
              fontWeight: 800,
              color: 'white',
              letterSpacing: '0.02em'
            }}
          >
            What You'll Learn
          </Typography>
          <Typography
            variant="h6"
            align="center"
            sx={{
              fontFamily: '"Linear", sans-serif',
              color: 'rgba(255, 255, 255, 0.6)',
              mb: 10,
              maxWidth: 700,
              mx: 'auto',
              fontSize: { xs: '0.95rem', sm: '1.1rem' },
              lineHeight: 1.6
            }}
          >
            Our specialized curriculums are custom-tailored for each student cohort, ensuring rapid and solid progress at every grade of your musical journey.
          </Typography>
          <Grid container spacing={4} alignItems="stretch">
            {[
              {
                level: 'Young Keys Grade',
                focus: 'Ages 6-12 Play & Discover',
                items: ['John Thompson\'s Piano Course', 'Basic Note Names & Keys', 'Fun Melodies & Cartoon Themes', 'Rhythmic Clapping & Ear Play'],
                popular: false
              },
              {
                level: 'Beginner Grade',
                focus: 'Foundations & Keyboard Joy',
                items: ['Hymns Made Easy for Piano', 'ABRSM Foundation Materials', 'Rested Hand Posture & Touch', 'Dual-Staff Reading Basics'],
                popular: false
              },
              {
                level: 'Intermediate Grade',
                focus: 'Technique & Personal Style',
                items: ['ABRSM Grade 1-3 Repertoire', 'Intermediate Hymn Settings', 'Chord Theory & Harmonies', 'Dynamic Shading & Articulation'],
                popular: false
              },
              {
                level: 'Advanced Grade',
                focus: 'Artistry & Concert Mastery',
                items: ['ABRSM Grade 4-8 Syllabus', 'Advanced Classical Literature', 'Technical Speed & Polyrhythms', 'Performance Psychology'],
                popular: false
              }
            ].map((program, idx) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx} sx={{ display: 'flex' }}>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    bgcolor: 'rgba(12, 12, 15, 0.84)',
                    border: '1px solid',
                    borderColor: program.popular ? '#ff2a74' : 'rgba(255, 255, 255, 0.08)',
                    borderRadius: 0, // Sharp corners!
                    borderTop: program.popular ? '3px solid #ff2a74' : '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: '0 30px 60px rgba(0, 0, 0, 0.95), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                    position: 'relative',
                    overflow: 'visible',
                    p: { xs: 4, sm: 5 }
                  }}
                >

                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 800,
                      fontFamily: '"Space Grotesk", sans-serif',
                      fontSize: '1.8rem',
                      letterSpacing: '0.02em',
                      color: 'white',
                      mb: 1
                    }}
                  >
                    {program.level}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      mb: 4,
                      color: program.popular ? '#ff2a74' : 'rgba(255, 255, 255, 0.5)',
                      fontWeight: 600,
                      fontFamily: '"Space Grotesk", sans-serif'
                    }}
                  >
                    {program.focus}
                  </Typography>
                  <Divider sx={{ mb: 4, borderColor: 'rgba(255, 255, 255, 0.08)' }} />
                  <List sx={{ p: 0, flexGrow: 1 }}>
                    {program.items.map((item, i) => (
                      <ListItem key={i} disableGutters sx={{ py: 1 }}>
                        <ListItemIcon sx={{ minWidth: 32, color: '#ff2a74' }}>
                          <CheckCircleIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary={item}
                          primaryTypographyProps={{
                            fontFamily: '"Linear", sans-serif',
                            fontSize: '0.95rem',
                            color: 'rgba(255, 255, 255, 0.85)'
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>

        <Box sx={{ pt: { xs: 0.5, md: 1.5 }, pb: { xs: 8, md: 12 }, position: 'relative', zIndex: 20 }}>
          <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
            {/* Centered Headline - Exact match to Home Page tab active headline */}
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
              Master the Art of Piano
            </Typography>
            {/* Centered Paragraph - Exact match to Home Page tab active description */}
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
              Our holistic approach ensures you develop into a well-rounded musician, not just a piano player. We merge rigorous classical principles with modern expressive freedoms to cultivate deep musical intelligence, creative curiosity, and performance excellence.
            </Typography>

            {/* Central Centered Widescreen Showcase Image - Enlarged and Glassless */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mb: 6,
                width: '100%',
                maxWidth: '960px', // Refined mid-size for perfect visual proportions!
                mx: 'auto',
                borderRadius: 0, // Sharp corners!
                overflow: 'hidden',
                boxShadow: 'none',
                border: 'none',
                bgcolor: 'transparent',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              }}
            >
              <Box
                component="img"
                src={pianoLessonSect2Img}
                alt="Students practicing piano technique"
                sx={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                  transform: 'translateZ(0)',
                  willChange: 'transform'
                }}
              />
            </Box>

            {/* Symmetrical Centered Grid of Core Skills - Exact match to Home Page active tab features grid */}
            <Grid
              container
              spacing={{ xs: 1.5, sm: 3 }}
              sx={{
                maxWidth: '1100px',
                mx: 'auto',
                mb: 6,
                textAlign: 'left'
              }}
            >
              {[
                {
                  title: 'Theory',
                  desc: 'Master music notation, key signatures, and chord harmonies to unlock the architecture of sound.',
                },
                {
                  title: 'Technique',
                  desc: 'Build independent finger control, correct arm weight distribution, speed, and fluid articulation.',
                },
                {
                  title: 'Performance',
                  desc: 'Develop stage presence, manage performance anxiety, and master beautiful artistic interpretation.',
                },
                {
                  title: 'Improvisation',
                  desc: 'Learn scale patterns to play by ear, create gorgeous melodic variations, and jam confidently.',
                },
                {
                  title: 'Composition',
                  desc: 'Transform your musical ideas into beautiful original sheet music and tailored arrangements.',
                },
                {
                  title: 'Ear Training',
                  desc: 'Train your ears to recognize chord types, pitch intervals, and dictate melodies instantly.',
                }
              ].map((item, i) => (
                <Grid size={{ xs: 6, sm: 6, md: 4 }} key={i}>
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

            {/* Centered outlined CTA button matching the homepage Featured Services active tab CTA exactly! */}
            <Box sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
              <Button
                component={RouterLink}
                to="/contact?service=lessons&package=Piano%20Lessons%20Inquiry"
                variant="outlined"
                size="large"
                sx={{
                  borderColor: 'rgba(255,255,255,0.3)',
                  color: 'white',
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontWeight: 700,
                  borderRadius: 0,
                  px: 6,
                  py: 2,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#ff2a74',
                    color: '#ff2a74',
                    bgcolor: 'transparent',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                Book Piano Lesson
              </Button>
            </Box>
          </Container>
        </Box>

        {/* Common Site-Wide CTA Section */}
        <Box
          id="cta-section"
          sx={{
            bgcolor: '#000000',
            color: 'white',
            minHeight: { xs: 'auto', md: '620px' },
            py: { xs: 10, sm: 15 },
            position: 'relative',
            zIndex: 20,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            // Force hardware acceleration to prevent flickering while scrolling
            transform: 'translate3d(0, 0, 0)',
            willChange: 'transform',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
            // Cloudy background matching Testimonials exactly, expanded to compensate for the shorter section height so they spread identically
            background: `
              radial-gradient(circle at 80% 30%, rgba(45, 45, 55, 0.45) 0%, transparent 72%),
              radial-gradient(circle at 20% 70%, rgba(35, 35, 45, 0.4) 0%, transparent 82%),
              #000000
            `,
            // Sandy texture overlay using data URI SVG noise with low opacity (matching other sections exactly)
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              opacity: 0.045,
              pointerEvents: 'none',
              zIndex: 2
            }
          }}
        >

          {/* Absolute Video on the Right (Cinematic blend with smooth mask) */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              width: { xs: '100%', md: '56%' },
              height: '100%',
              overflow: 'hidden',
              zIndex: 1,
              pointerEvents: 'none',
              // Mask to smoothly fade the left edge of the video into the solid black background
              maskImage: {
                xs: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.95) 45%, rgba(0, 0, 0, 0.05) 100%)',
                md: 'linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.05) 12%, rgba(0, 0, 0, 0.95) 60%)'
              },
              WebkitMaskImage: {
                xs: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.95) 45%, rgba(0, 0, 0, 0.05) 100%)',
                md: 'linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.05) 12%, rgba(0, 0, 0, 0.95) 60%)'
              },
              // Soft overlay on mobile to keep text readable
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: {
                  xs: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.45) 50%, rgba(0, 0, 0, 0.95) 100%)',
                  md: 'none'
                },
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
                opacity: 0.82
              }}
            />
          </Box>

          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3 }}>
            <Grid container>
              <Grid
                size={{ xs: 12, md: 6 }}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: { xs: 'center', md: 'flex-start' },
                  textAlign: { xs: 'center', md: 'left' },
                  pr: { xs: 0, md: 4, lg: 8 }
                }}
              >

                {/* Heading */}
                <Typography
                  variant="h2"
                  sx={{
                    mb: 4,
                    fontWeight: 900,
                    fontFamily: '"Sans Superellipse Ragan 2", sans-serif',
                    letterSpacing: '0.02em',
                    fontSize: { xs: '2.8rem', sm: '4.2rem', md: '5.2rem' },
                    lineHeight: 0.95,
                    color: '#ffffff',
                    textAlign: { xs: 'center', md: 'left' }
                  }}
                >
                  Ready to Create <br />Your Masterpiece?
                </Typography>

                {/* Description */}
                <Typography
                  variant="body1"
                  sx={{
                    mb: 5,
                    color: 'rgba(255, 255, 255, 0.72)',
                    fontWeight: 300,
                    fontFamily: '"Linear", sans-serif',
                    fontSize: { xs: '0.92rem', sm: '1.02rem' },
                    lineHeight: 1.7,
                    maxWidth: '540px'
                  }}
                >
                  Step into our sanctuary of sound. Whether you're looking to record in our state-of-the-art studio, craft elite music productions, or master the piano with custom lessons—we are here to elevate your art.
                </Typography>

                {/* CTA Buttons */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: { xs: 'center', md: 'flex-start' },
                    alignItems: 'center',
                    gap: { xs: 2, sm: 2.5 },
                    width: '100%'
                  }}
                >
                  <Button
                    component={RouterLink}
                    to="/pricing"
                    variant="outlined"
                    size="large"
                    sx={{
                      width: { xs: '100%', sm: 'auto' },
                      border: '2px solid #ff2a74',
                      color: '#ff2a74',
                      borderRadius: '4px',
                      px: { xs: 3.5, sm: 4 },
                      py: 1.5,
                      fontSize: { xs: '14px', sm: '15px' },
                      fontWeight: 700,
                      textTransform: 'none',
                      fontFamily: '"Space Grotesk", sans-serif',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        border: '2px solid #ff2a74',
                        bgcolor: '#ff2a74',
                        color: 'white',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 12px 30px rgba(255, 42, 116, 0.35)',
                      }
                    }}
                  >
                    Discover Production Plans
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/contact?service=lessons&package=Piano%20Lessons%20Inquiry"
                    variant="contained"
                    size="large"
                    sx={{
                      width: { xs: '100%', sm: 'auto' },
                      bgcolor: '#ff2a74',
                      color: '#ffffff',
                      borderRadius: '4px',
                      px: { xs: 3.5, sm: 4 },
                      py: 1.5,
                      fontSize: { xs: '14px', sm: '15px' },
                      fontWeight: 700,
                      textTransform: 'none',
                      fontFamily: '"Space Grotesk", sans-serif',
                      boxShadow: '0 8px 25px rgba(255, 42, 116, 0.3)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        bgcolor: '#e01f61',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 12px 35px rgba(255, 42, 116, 0.5)',
                      }
                    }}
                  >
                    Request Piano Lesson
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </Box>
    </>
  );
};

export default Lessons;
