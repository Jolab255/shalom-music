import { useState, useEffect, useRef } from 'react';
import { Container, Typography, Box, Button, Grid2 as Grid, Dialog, DialogContent, IconButton, Grow } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PianoIcon from '@mui/icons-material/Piano';
import MicIcon from '@mui/icons-material/Mic';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import StarIcon from '@mui/icons-material/Star';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import CloseIcon from '@mui/icons-material/Close';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import sect2Img from '../assets/sect_2.png';
import audioRecordingImg from '../assets/audio-recording.png';
import audioCapturingImg from '../assets/audio-capturing.png';
import audioEditingImg from '../assets/audio-editing.png';
import audioMasteringImg from '../assets/audio-mastering.png';
import instrumentalCreationImg from '../assets/instrumental-creation.png';
import studioRentalImg from '../assets/studio-rental.png';
import whyShalom1Img from '../assets/why-shalom-1.png';
import whyShalom2Img from '../assets/why-shalom-2.png';
import whyShalom3Img from '../assets/why-shalom-3.png';
import whyShalom4Img from '../assets/why-shalom-4.png';
import harmonyImg from '../assets/harmony.png';
import livingLightImg from '../assets/living_light.png';
import accendoImg from '../assets/accendo.png';
import pianoStudent1Img from '../assets/piano_student_1.png';
import pianoStudent2Img from '../assets/piano_student_2.png';
import aboutUsVideo1 from '../assets/about-us-1.webm';
import aboutUsVideo2 from '../assets/about-us-2.webm';

const whyShalomSlides = [
  {
    image: whyShalom1Img,
    title: 'Professional Grade Equipment & Software',
    description: 'Equipped with industry-standard hardware and cutting-edge software, we combine technical precision with artistic passion to deliver exceptional results. From pristine acoustic recordings to modern digital production, we ensure your sound meets the highest professional standards.'
  },
  {
    image: whyShalom3Img,
    title: 'Affordable Prices & Better Customer Support',
    description: 'We believe world-class music services should be accessible to all. We offer highly competitive, transparent pricing across all studio bookings, lessons, and piano services—backed by dedicated, warm customer support that puts your creative journey first.'
  },
  {
    image: whyShalom2Img,
    title: 'Tailored Learning Programs for Students',
    description: 'Our structured piano curriculum is tailored to all skill levels, from absolute beginners to advanced musicians. Led by expert instructors, we blend classical foundations with modern creative techniques to help you master the keyboard with confidence.'
  },
  {
    image: whyShalom4Img,
    title: 'Acoustically Treated Studio Environment',
    description: 'Designed and optimized for pristine sound isolation and clean acoustics, our tracking and control rooms offer a perfect sonic canvas. Capture your voice, instruments, and mixes in a space built to deliver zero distortion and perfect clarity.'
  }
];


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

interface TabImageWithLoaderProps {
  src: string;
  alt: string;
  sx?: any;
}

const TabImageWithLoader: React.FC<TabImageWithLoaderProps> = ({ src, alt, sx }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  useEffect(() => {
    setImgLoaded(false);
    setMinTimeElapsed(false);

    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, 1000); // 1 second minimum loader duration

    return () => clearTimeout(timer);
  }, [src]);

  const handleImageLoad = () => {
    setImgLoaded(true);
  };

  const showLoader = !imgLoaded || !minTimeElapsed;

  return (
    <Box sx={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {showLoader && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: { xs: '100px', sm: '140px', md: '180px' },
            bgcolor: 'transparent',
            zIndex: 2,
          }}
        >
          <video
            src="/loader-video.mp4"
            muted
            playsInline
            autoPlay
            loop
            style={{
              maxWidth: '100px',
              width: '30%',
              height: 'auto',
            }}
          />
        </Box>
      )}

      <Box
        component="img"
        src={src}
        alt={alt}
        onLoad={handleImageLoad}
        sx={{
          width: '100%',
          height: 'auto',
          borderRadius: 1,
          ...sx,
          ...(showLoader ? {
            position: 'absolute',
            opacity: 0,
            pointerEvents: 'none',
            zIndex: -1,
          } : {
            position: 'relative',
            opacity: 1,
            transition: 'opacity 0.5s ease-in-out',
          })
        }}
      />
    </Box>
  );
};

const typingSegments = [
  {
    title: "Who We Are",
    text: "Shalom Music Studio is a state-of-the-art creative sanctuary designed for professional musicians and independent artists. We combine high-end acoustics with standard analog and digital technologies to create a space where sonic dreams become reality."
  },
  {
    title: "What We Do",
    text: "We provide professional multi-track recording, premium music production, pristine mixing, and mastering. We also offer personalized piano and music lessons for all ages, expert concert piano services, and high-end studio space rentals."
  },
  {
    title: "Our Goal & Focus",
    text: "Our unwavering goal is to capture the authentic emotion of your music. We focus on organic warmth, perfect acoustic balance, and customized production to make sure your master sound stands out globally with pristine quality."
  }
];

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { hash } = useLocation();
  const [isRecordPopupOpen, setIsRecordPopupOpen] = useState(false);
  const [isCapturingPopupOpen, setIsCapturingPopupOpen] = useState(false);
  const [isMixingPopupOpen, setIsMixingPopupOpen] = useState(false);
  const [isMasteringPopupOpen, setIsMasteringPopupOpen] = useState(false);
  const [isInstrumentalPopupOpen, setIsInstrumentalPopupOpen] = useState(false);
  const [isRentalPopupOpen, setIsRentalPopupOpen] = useState(false);
  const [isScrollPopupOpen, setIsScrollPopupOpen] = useState(false);

  const [activeWhySlide, setActiveWhySlide] = useState(0);
  const [testimonialCategory, setTestimonialCategory] = useState<'production' | 'piano'>('production');

  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [overlayVideo, setOverlayVideo] = useState<string | null>(null);
  const videoTimeoutRef = useRef<any>(null);
  const overlayTimeoutRef = useRef<any>(null);
  const [activeAboutVideo, setActiveAboutVideo] = useState<1 | 2>(1);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleAboutVideoEnded = () => {
    if (activeAboutVideo === 1) {
      setActiveAboutVideo(2);
    }
  };

  // Scroll spy to highlight active service tab in the sticky sub-navbar on mobile
  useEffect(() => {
    const handleResizeOrScrollSpy = () => {
      const isMobile = window.innerWidth < 900;
      if (!isMobile) return null;

      const observerOptions = {
        root: null, // viewport
        rootMargin: '-180px 0px -50% 0px', // check when item is in the top-middle part of the viewport
        threshold: 0
      };

      const observerCallback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const match = id.match(/featured-service-(\d+)/);
            if (match) {
              const index = parseInt(match[1], 10);
              setActiveTab(index);
            }
          }
        });
      };

      const observer = new IntersectionObserver(observerCallback, observerOptions);

      // Observe each of the 6 service sections
      for (let i = 0; i < 6; i++) {
        const el = document.getElementById(`featured-service-${i}`);
        if (el) observer.observe(el);
      }

      return observer;
    };

    let observer = handleResizeOrScrollSpy();

    const handleResize = () => {
      if (observer) observer.disconnect();
      observer = handleResizeOrScrollSpy();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (activeAboutVideo === 2 && video2Ref.current) {
      video2Ref.current.play().catch((err) => {
        console.warn("Video 2 autoplay failed:", err);
      });
    }
  }, [activeAboutVideo]);

  const [typingSegmentIdx, setTypingSegmentIdx] = useState(0);
  const [typedTitle0, setTypedTitle0] = useState("");
  const [typedTitle1, setTypedTitle1] = useState("");
  const [typedTitle2, setTypedTitle2] = useState("");
  const [typedText0, setTypedText0] = useState("");
  const [typedText1, setTypedText1] = useState("");
  const [typedText2, setTypedText2] = useState("");
  const [isTypingTitle, setIsTypingTitle] = useState(true);

  useEffect(() => {
    let timer: any;
    
    if (typingSegmentIdx === 0) {
      const segment = typingSegments[0];
      if (isTypingTitle) {
        if (typedTitle0.length < segment.title.length) {
          timer = setTimeout(() => {
            setTypedTitle0(segment.title.substring(0, typedTitle0.length + 1));
          }, 60);
        } else {
          timer = setTimeout(() => setIsTypingTitle(false), 300);
        }
      } else {
        if (typedText0.length < segment.text.length) {
          timer = setTimeout(() => {
            setTypedText0(segment.text.substring(0, typedText0.length + 1));
          }, 20);
        } else {
          timer = setTimeout(() => {
            setTypingSegmentIdx(1);
            setIsTypingTitle(true);
          }, 400);
        }
      }
    } else if (typingSegmentIdx === 1) {
      const segment = typingSegments[1];
      if (isTypingTitle) {
        if (typedTitle1.length < segment.title.length) {
          timer = setTimeout(() => {
            setTypedTitle1(segment.title.substring(0, typedTitle1.length + 1));
          }, 60);
        } else {
          timer = setTimeout(() => setIsTypingTitle(false), 300);
        }
      } else {
        if (typedText1.length < segment.text.length) {
          timer = setTimeout(() => {
            setTypedText1(segment.text.substring(0, typedText1.length + 1));
          }, 20);
        } else {
          timer = setTimeout(() => {
            setTypingSegmentIdx(2);
            setIsTypingTitle(true);
          }, 400);
        }
      }
    } else if (typingSegmentIdx === 2) {
      const segment = typingSegments[2];
      if (isTypingTitle) {
        if (typedTitle2.length < segment.title.length) {
          timer = setTimeout(() => {
            setTypedTitle2(segment.title.substring(0, typedTitle2.length + 1));
          }, 60);
        } else {
          timer = setTimeout(() => setIsTypingTitle(false), 300);
        }
      } else {
        if (typedText2.length < segment.text.length) {
          timer = setTimeout(() => {
            setTypedText2(segment.text.substring(0, typedText2.length + 1));
          }, 20);
        } else {
          setTypingSegmentIdx(3);
        }
      }
    }

    return () => clearTimeout(timer);
  }, [
    typingSegmentIdx,
    isTypingTitle,
    typedTitle0,
    typedTitle1,
    typedTitle2,
    typedText0,
    typedText1,
    typedText2
  ]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          // Only reset when scrolled away if ALL cards have successfully finished typing
          if (typingSegmentIdx === 3) {
            setTypedTitle0("");
            setTypedTitle1("");
            setTypedTitle2("");
            setTypedText0("");
            setTypedText1("");
            setTypedText2("");
            setTypingSegmentIdx(0);
            setIsTypingTitle(true);
          }
        }
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [typingSegmentIdx]);

  const handlePlayVideo = (videoId: string) => {
    if (videoTimeoutRef.current) clearTimeout(videoTimeoutRef.current);
    if (overlayTimeoutRef.current) clearTimeout(overlayTimeoutRef.current);

    setPlayingVideo(videoId);
    setOverlayVideo(null);

    // Timer A: Play video for 10 seconds, then show overlay
    videoTimeoutRef.current = setTimeout(() => {
      setOverlayVideo(videoId);

      // Timer B: Show overlay for 10 seconds, then reset player
      overlayTimeoutRef.current = setTimeout(() => {
        setPlayingVideo(null);
        setOverlayVideo(null);
      }, 10000); // 10 seconds
    }, 10000); // 10 seconds
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveWhySlide((prev) => (prev + 1) % whyShalomSlides.length);
    }, 6000);
    return () => {
      clearInterval(timer);
      if (videoTimeoutRef.current) clearTimeout(videoTimeoutRef.current);
      if (overlayTimeoutRef.current) clearTimeout(overlayTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (hash) {
      const tabHashes = ['#recording', '#capturing', '#mixing', '#mastering', '#instrumental', '#rental'];
      if (tabHashes.includes(hash)) {
        if (hash === '#recording') setActiveTab(0);
        else if (hash === '#capturing') setActiveTab(1);
        else if (hash === '#mixing') setActiveTab(2);
        else if (hash === '#mastering') setActiveTab(3);
        else if (hash === '#instrumental') setActiveTab(4);
        else if (hash === '#rental') setActiveTab(5);
        
        // Smooth scroll directly to the sub-navbar tabs container with sticky offset and extra depth
        setTimeout(() => {
          const element = document.getElementById('featured-tabs');
          if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            const navbarHeight = window.innerWidth >= 600 ? 112 : 64;
            // Exceed the top by 130px to scroll past the title and place the subnav perfectly under the sticky navbar
            const offsetPosition = elementPosition - navbarHeight + 130;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 80);
      } else {
        // Smooth scroll directly to the matching element ID with sticky offset
        setTimeout(() => {
          const targetId = hash.replace('#', '');
          const element = document.getElementById(targetId);
          if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            const navbarHeight = window.innerWidth >= 600 ? 112 : 64;
            const offsetPosition = elementPosition - navbarHeight;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 80);
      }
    }
  }, [hash]);

  useEffect(() => {
    // 1. Manage the visit count (using sessionStorage to avoid counting refreshes in the same session)
    const hasBeenCounted = sessionStorage.getItem('countedThisSession');
    let currentVisits = parseInt(localStorage.getItem('visitCount') || '0', 10);
    
    if (!hasBeenCounted) {
      currentVisits += 1;
      localStorage.setItem('visitCount', currentVisits.toString());
      sessionStorage.setItem('countedThisSession', 'true');
    }

    // 2. Check if this is an odd-numbered visit (1st, 3rd, 5th, etc.) and they haven't seen it this visit
    const isOddVisit = currentVisits % 2 !== 0;
    const hasSeenThisVisit = sessionStorage.getItem('hasSeenScrollPopupThisVisit');

    if (!isOddVisit || hasSeenThisVisit) {
      return;
    }

    let reached = false;

    const handleScroll = () => {
      const element = document.getElementById('featured-tabs');
      if (!element) return;

      const rect = element.getBoundingClientRect();
      
      // A. Check if they reached the section (visible in viewport)
      if (!reached && rect.top < window.innerHeight * 0.7) {
        reached = true;
      }

      // B. Check if they have scrolled past/below the section
      if (reached && rect.bottom < -100) {
        setIsScrollPopupOpen(true);
        sessionStorage.setItem('hasSeenScrollPopupThisVisit', 'true');
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
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
              alignItems: { xs: 'center', md: 'flex-start' },
              pl: { xs: 2, sm: 6, md: 8, lg: 12 }, 
              pr: { xs: 2, sm: 4, md: 4, lg: 6 }, 
              pt: { xs: 4, md: 6 },
              pb: { xs: 10, md: 6 },
              bgcolor: 'transparent',
              zIndex: 2,
            }}
          >
            <Typography 
              variant="h1" 
              sx={{ 
                fontSize: { xs: '4.8rem', sm: '6.0rem', md: '6.8rem', lg: '8.2rem' }, 
                mb: 3, 
                fontWeight: 900, 
                lineHeight: 0.82, 
                letterSpacing: '0.02em',
                fontFamily: '"Sans Superellipse Ragan 2", sans-serif',
                textAlign: { xs: 'center', md: 'left' }
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
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
                textAlign: { xs: 'center', md: 'left' },
                mx: { xs: 'auto', md: 0 }
              }}
            >
              Elite music production, studio rentals, and piano lessons.
            </Typography>

            <Box 
              sx={{ 
                display: 'flex', 
                gap: { xs: 1, sm: 2 }, 
                flexWrap: 'nowrap', 
                width: { xs: '100%', md: 'auto' },
                maxWidth: '540px',
                justifyContent: { xs: 'center', md: 'flex-start' }
              }}
            >
              <Button 
                component={RouterLink}
                to="/lessons"
                variant="contained" 
                size="large" 
                sx={{ 
                  bgcolor: '#ff2a74', 
                  color: 'white', 
                  px: { xs: 1.6, sm: 2.2 }, 
                  py: { xs: 0.8, sm: 0.6 }, 
                  fontSize: { xs: '13.5px', sm: '15.5px', md: '18px' },
                  fontWeight: 700,
                  borderRadius: 1,
                  boxShadow: 'none',
                  '&:hover': { bgcolor: '#e01b5d', transform: 'translateY(-2px)', boxShadow: 'none' },
                  transition: 'all 0.3s ease',
                  textTransform: 'none',
                  fontFamily: '"Space Grotesk", sans-serif',
                  whiteSpace: 'nowrap'
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
                  px: { xs: 1.6, sm: 2.2 }, 
                  py: { xs: 0.8, sm: 0.6 }, 
                  fontSize: { xs: '13.5px', sm: '15.5px', md: '18px' },
                  fontWeight: 700,
                  borderRadius: 1,
                  '&:hover': { borderColor: 'white', bgcolor: 'rgba(255, 255, 255, 0.05)', transform: 'translateY(-2px)' },
                  transition: 'all 0.3s ease',
                  textTransform: 'none',
                  fontFamily: '"Space Grotesk", sans-serif',
                  whiteSpace: 'nowrap'
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
                      borderRadius: 0,
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
                      borderRadius: 0,
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
                      borderRadius: 0,
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
                      borderRadius: 0,
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

      {/* Know us Section */}
      <Box 
        id="about"
        ref={sectionRef}
        sx={{ 
          bgcolor: '#000000',
          color: 'white', 
          pt: 8, // Reduced top padding
          pb: { xs: 8, sm: 10 },
          position: 'relative',
          overflow: 'hidden',
          // Force hardware acceleration to prevent flickering while scrolling
          transform: 'translate3d(0, 0, 0)',
          willChange: 'transform',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
          // Cloudy background using radial-gradients blending into pure black
          background: `
            radial-gradient(circle at 50% 10%, rgba(45, 45, 55, 0.35) 0%, transparent 60%),
            radial-gradient(circle at 10% 80%, rgba(35, 35, 45, 0.3) 0%, transparent 70%),
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
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            opacity: 0.035, 
            pointerEvents: 'none',
            zIndex: 1,
            // Hardware acceleration
            transform: 'translate3d(0, 0, 0)',
            willChange: 'transform',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          {/* Section Heading */}
          <Typography 
            variant="h2" 
            align="center" 
            sx={{ 
              mb: 2, 
              fontWeight: 800,
              fontFamily: '"AerodomeRegular-2vMGK", sans-serif',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3.2rem' },
              letterSpacing: '0.06em',
              color: 'transparent',
              WebkitTextStroke: '1.5px #ffffff',
              textTransform: 'uppercase'
            }}
          >
            Know Us
          </Typography>

          <Typography
            variant="body1"
            align="center"
            sx={{
              mb: 6,
              color: 'rgba(255, 255, 255, 0.6)',
              fontFamily: '"Space Grotesk", sans-serif',
              fontSize: { xs: '0.85rem', sm: '1rem' },
              letterSpacing: '0.05em',
              maxWidth: '650px',
              mx: 'auto'
            }}
          >
            Step inside our sanctuary of sound. Watch our journey unfold as we craft acoustic excellence and share the heart behind Shalom Music.
          </Typography>

          {/* Interactive Cinema Video Board */}
          <Box 
            sx={{ 
              position: 'relative',
              width: '100%',
              aspectRatio: '16/9',
              height: 'auto',
              maxHeight: '80vh',
              borderRadius: { xs: '8px', sm: '16px' },
              overflow: 'hidden',
              border: 'none',
              boxShadow: '0 30px 60px rgba(0, 0, 0, 0.8)',
              bgcolor: '#000000',
              // Force hardware acceleration to prevent flickering while scrolling
              transform: 'translate3d(0, 0, 0)',
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            {/* First Video */}
            <video 
              ref={video1Ref}
              src={aboutUsVideo1}
              muted
              playsInline
              autoPlay
              onEnded={handleAboutVideoEnded}
              style={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                display: 'block',
                transition: 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                opacity: activeAboutVideo === 1 ? 1 : 0,
                zIndex: activeAboutVideo === 1 ? 2 : 1,
                transform: 'translate3d(0, 0, 0)',
                willChange: 'opacity',
              }}
            />
            {/* Second Video */}
            <video 
              ref={video2Ref}
              src={aboutUsVideo2}
              muted
              playsInline
              loop
              preload="none"
              style={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                display: 'block',
                transition: 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                opacity: activeAboutVideo === 2 ? 1 : 0,
                zIndex: activeAboutVideo === 2 ? 2 : 1,
                transform: 'translate3d(0, 0, 0)',
                willChange: 'opacity',
              }}
            />            {/* Dark Cinematic Vignette Overlay */}
            <Box 
              sx={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.75) 100%)',
                bgcolor: 'rgba(0, 0, 0, 0.45)', // Guaranteed high-contrast dark overlay
                zIndex: 8,
                pointerEvents: 'none',
                display: { xs: 'none', md: 'block' }
              }}
            />

            {/* Grid Container for Cards Overlay (Desktop only) */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: { xs: '16px', sm: '20px', md: '28px' },
                right: { xs: '16px', sm: '20px', md: '28px' },
                display: { xs: 'none', md: 'grid' },
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '28px',
                alignItems: 'center', // Centers cards vertically
                zIndex: 10,
                pointerEvents: 'none'
              }}
            >
              {typingSegments.map((segment, idx) => {
                const isCurrent = typingSegmentIdx === idx;
                const isStarted = typingSegmentIdx >= idx;
                const typedTitle = idx === 0 ? typedTitle0 : idx === 1 ? typedTitle1 : typedTitle2;
                const typedText = idx === 0 ? typedText0 : idx === 1 ? typedText1 : typedText2;
                
                return (
                  <Box
                    key={idx}
                    sx={{
                      backdropFilter: 'blur(20px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                      bgcolor: 'rgba(12, 12, 15, 0.84)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: 0,
                      padding: '28px 32px',
                      boxShadow: '0 30px 60px rgba(0, 0, 0, 0.95), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                      transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2,
                      minHeight: '120px', // Baseline height, expands equally upwards and downwards
                      pointerEvents: isStarted ? 'auto' : 'none',
                      opacity: isStarted ? 1 : 0,
                      transform: isStarted ? 'translateY(0)' : 'translateY(24px)',
                      gridColumn: idx + 1,
                      '&:hover': {
                        border: '1px solid rgba(255, 255, 255, 0.16)',
                        boxShadow: '0 35px 70px rgba(0, 0, 0, 0.98)',
                        bgcolor: 'rgba(14, 14, 18, 0.9)',
                      }
                    }}
                  >
                    {/* Title */}
                    <Typography
                      sx={{
                        fontFamily: '"Linear", sans-serif',
                        fontSize: '20px',
                        fontWeight: 700,
                        color: '#ff2d55', // Pinky!
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        display: 'flex',
                        alignItems: 'center',
                        minHeight: '28px'
                      }}
                    >
                      {typedTitle}
                      {isCurrent && isTypingTitle && (
                        <Box
                          component="span"
                          sx={{
                            display: 'inline-block',
                            width: '2px',
                            height: '18px',
                            bgcolor: '#ff2d55', // Pinky cursor
                            marginLeft: '6px',
                            animation: 'blinkCursor 0.8s infinite',
                            '@keyframes blinkCursor': {
                              '0%, 100%': { opacity: 0 },
                              '50%': { opacity: 1 }
                            }
                          }}
                        />
                      )}
                    </Typography>

                    {/* Text */}
                    <Typography
                      sx={{
                        fontFamily: '"Linear", sans-serif',
                        fontSize: '16px',
                        fontWeight: 300,
                        color: 'rgba(255, 255, 255, 0.88)',
                        lineHeight: 1.75,
                        position: 'relative'
                      }}
                    >
                      {typedText}
                      {isCurrent && !isTypingTitle && typedText.length < segment.text.length && (
                        <Box
                          component="span"
                          sx={{
                            display: 'inline-block',
                            width: '2px',
                            height: '13px',
                            bgcolor: '#ffffff',
                            marginLeft: '3px',
                            verticalAlign: 'middle',
                            animation: 'blinkCursor 0.8s infinite',
                            '@keyframes blinkCursor': {
                              '0%, 100%': { opacity: 0 },
                              '50%': { opacity: 1 }
                            }
                          }}
                        />
                      )}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>

          {/* Active Card Container (Mobile/Tablet only - displayed below the video box) */}
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexDirection: 'column',
              mt: 3
            }}
          >
            {typingSegments.map((_segment, idx) => {
              const isStarted = typingSegmentIdx >= idx;
              const typedTitle = idx === 0 ? typedTitle0 : idx === 1 ? typedTitle1 : typedTitle2;
              const typedText = idx === 0 ? typedText0 : idx === 1 ? typedText1 : typedText2;
              
              return (
                <Box
                  key={idx}
                  sx={{
                    bgcolor: 'rgba(25, 25, 30, 0.6)',
                    border: isStarted ? '1px solid rgba(212, 175, 55, 0.25)' : '0px solid transparent',
                    borderRadius: 0,
                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.02)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: isStarted ? 1.5 : 0,
                    minHeight: isStarted ? '130px' : '0px',
                    maxHeight: isStarted ? '300px' : '0px',
                    padding: isStarted ? '24px 28px' : '0px 28px',
                    mb: isStarted ? 2.5 : 0,
                    opacity: isStarted ? 1 : 0,
                    transform: isStarted ? 'translateY(0)' : 'translateY(16px)',
                    transition: 'opacity 0.6s ease-in-out, transform 0.6s ease-in-out, max-height 0.6s cubic-bezier(0.4, 0, 0.2, 1), min-height 0.6s cubic-bezier(0.4, 0, 0.2, 1), padding 0.6s cubic-bezier(0.4, 0, 0.2, 1), mb 0.6s cubic-bezier(0.4, 0, 0.2, 1), border 0.6s ease-in-out',
                    overflow: 'hidden',
                  }}
                >
                  {/* Title */}
                  <Typography
                    sx={{
                      fontFamily: '"Linear", sans-serif',
                      fontSize: '18px',
                      fontWeight: 700,
                      color: '#ff2d55', // Pinky!
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase'
                    }}
                  >
                    {typedTitle}
                  </Typography>

                  {/* Text */}
                  <Typography
                    sx={{
                      fontFamily: '"Linear", sans-serif',
                      fontSize: '14.5px',
                      fontWeight: 300,
                      color: 'rgba(255, 255, 255, 0.85)',
                      lineHeight: 1.7
                    }}
                  >
                    {typedText}
                  </Typography>
                </Box>
              );
            })}
          </Box>

          {/* Action Buttons: Production Plans & Piano Lessons */}
          <Box
            sx={{
              display: 'flex',
              gap: { xs: 1.5, sm: 2 },
              flexWrap: 'nowrap',
              justifyContent: 'center',
              alignItems: 'center',
              mt: { xs: 2.5, sm: 3 },
              width: '100%',
              // Force hardware acceleration to keep smooth scrolling
              transform: 'translate3d(0, 0, 0)',
              willChange: 'transform',
            }}
          >
            <Button
              component={RouterLink}
              to="/pricing"
              variant="outlined"
              size="large"
              sx={{
                width: 'auto',
                border: '2px solid #ff2a74',
                color: '#ff2a74',
                borderRadius: '4px',
                px: { xs: 1.2, sm: 2.2 },
                py: { xs: 0.6, sm: 0.6 },
                fontSize: { xs: '12px', sm: '15px', md: '18px' },
                fontWeight: 700,
                textTransform: 'none',
                fontFamily: '"Space Grotesk", sans-serif',
                whiteSpace: 'nowrap',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  border: '2px solid #ff2a74',
                  bgcolor: '#ff2a74',
                  color: 'white',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 30px rgba(255, 42, 116, 0.25)',
                }
              }}
            >
              Discover Production Plans
            </Button>
            <Button
              component={RouterLink}
              to="/lessons"
              variant="contained"
              size="large"
              sx={{
                width: 'auto',
                bgcolor: '#ff2a74',
                color: '#ffffff',
                borderRadius: '4px',
                px: { xs: 1.2, sm: 2.2 },
                py: { xs: 0.6, sm: 0.6 },
                fontSize: { xs: '12px', sm: '15px', md: '18px' },
                fontWeight: 700,
                textTransform: 'none',
                fontFamily: '"Space Grotesk", sans-serif',
                whiteSpace: 'nowrap',
                boxShadow: '0 8px 25px rgba(255, 42, 116, 0.25)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  bgcolor: '#e01f61',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 35px rgba(255, 42, 116, 0.45)',
                }
              }}
            >
              Request Piano Lesson
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Core Services Overview */}
      <Box 
        sx={{ 
          color: 'white', 
          pt: { xs: 4, sm: 10 },
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
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
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
          pb: 8,
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
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
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
            id="featured-tabs"
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
                  onClick={() => {
                    setActiveTab(index);
                    const el = document.getElementById(`featured-service-${index}`);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                    }
                  }}
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
          <Box
            sx={{
              display: { xs: 'flex', md: 'block' },
              flexDirection: 'column',
              width: '100%',
              gap: { xs: 8, md: 0 }
            }}
          >
            {featuredServices.map((service, index) => {
              const active = activeTab === index;
              const renderContent = () => {

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
                    <TabImageWithLoader 
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
                      <Grid size={{ xs: 6, sm: 6, md: 3 }} key={i}>
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
                    <TabImageWithLoader 
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
                      <Grid size={{ xs: 6, sm: 6, md: 3 }} key={i}>
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
                    <TabImageWithLoader 
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
                      <Grid size={{ xs: 6, sm: 6, md: 3 }} key={i}>
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
                    <TabImageWithLoader 
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
                      <Grid size={{ xs: 6, sm: 6, md: 3 }} key={i}>
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

            if (index === 4) {
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
                      mb: 0, 
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

                  {/* Instrumental Creation Tab Image */}
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      mt: -5.5,
                      mb: 1, 
                      width: '100%',
                      maxWidth: '680px',
                      mx: 'auto'
                    }}
                  >
                    <TabImageWithLoader 
                      src={instrumentalCreationImg} 
                      alt="Instrumental Creation studio workspace" 
                      sx={{ 
                        width: '100%', 
                        height: 'auto', 
                        borderRadius: 1
                      }} 
                    />
                  </Box>

                  {/* Explanatory Grid of Instrumental Creation Features */}
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
                        title: 'Custom Beatmaking & Synth Compositions', 
                        desc: 'Access premium sound synthesis matrices, dynamic MIDI keyboards, and multi-layered electronic beats.' 
                      },
                      { 
                        title: 'Full Cinematic Orchestral Scores', 
                        desc: 'Arrange majestic cinematic string sections, woodwind ensembles, and high-fidelity custom orchestral soundscapes.' 
                      },
                      { 
                        title: 'Bespoke Commercial Jingle Writing', 
                        desc: 'Co-create catchy melodic hooks and unique music signatures crafted specifically for corporate brand identification.' 
                      },
                      { 
                        title: 'Unique Sonic Branding & Soundbeds', 
                        desc: 'Develop highly tailored, customized background soundbeds to set the perfect mood for your media productions.' 
                      }
                    ].map((item, i) => (
                      <Grid size={{ xs: 6, sm: 6, md: 3 }} key={i}>
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
                    onClick={() => setIsInstrumentalPopupOpen(true)}
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
                    Request Instrumental Creation Session
                  </Button>
                </Box>
              );
            }

            if (index === 5) {
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
                      mb: 0, 
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

                  {/* Studio Rental Tab Image */}
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      mt: -5.5,
                      mb: 1, 
                      width: '100%',
                      maxWidth: '680px',
                      mx: 'auto'
                    }}
                  >
                    <TabImageWithLoader 
                      src={studioRentalImg} 
                      alt="Premium Studio Space Rental Interior" 
                      sx={{ 
                        width: '100%', 
                        height: 'auto', 
                        borderRadius: 1
                      }} 
                    />
                  </Box>

                  {/* Explanatory Grid of Studio Rental Features */}
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
                        title: 'Acoustically Calibrated Recording Spaces', 
                        desc: 'Rent room environments featuring variable organic acoustics, designed specifically for transparent and clear tracking.' 
                      },
                      { 
                        title: 'Elite Analog Summing & Console Routing', 
                        desc: 'Route your tracks through vintage analog consoles, warm tube summiers, and luxury outboard racks.' 
                      },
                      { 
                        title: 'Vintage Pianos, Synths & Drum Kits', 
                        desc: 'Gain full access to our Yamaha grand piano, analog synthesizer arrays, and custom acoustic drum kits.' 
                      },
                      { 
                        title: 'Luxury Lounges & Production Suites', 
                        desc: 'Relax between takes inside highly comfortable creative lounges equipped with high-speed Wi-Fi and refreshments.' 
                      }
                    ].map((item, i) => (
                      <Grid size={{ xs: 6, sm: 6, md: 3 }} key={i}>
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
                    onClick={() => setIsRentalPopupOpen(true)}
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
                    Request Studio Space Booking
                  </Button>
                </Box>
              );
            }

            return null;
          };

          return (
            <Box
              key={index}
              id={`featured-service-${index}`}
              sx={{
                display: active ? 'block' : { xs: 'block', md: 'none' },
                width: '100%',
                scrollMarginTop: { xs: '80px', md: '0px' }
              }}
            >
              {renderContent()}
            </Box>
          );
        })}
      </Box>
        </Container>
      </Box>

      {/* Why Choose Us */}
      <Box 
        sx={{ 
          bgcolor: '#000000',
          color: 'white', 
          pt: 0,
          pb: 0,
          position: 'relative',
          overflow: 'hidden',
          // Cloudy background using radial-gradients blending into pure black
          background: `
            radial-gradient(circle at 80% 30%, rgba(45, 45, 55, 0.45) 0%, transparent 50%),
            radial-gradient(circle at 20% 70%, rgba(35, 35, 45, 0.4) 0%, transparent 60%),
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
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            opacity: 0.045, 
            pointerEvents: 'none',
            zIndex: 1
          }
        }}
      >
        {/* Full-bleed cinematic banner image touching the left and right edges */}
        <Box 
          sx={{ 
            width: '100%', 
            height: { xs: '640px', sm: '560px', md: '65vh' }, 
            overflow: 'hidden',
            position: 'relative',
            zIndex: 2,
            mb: 0,
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            bgcolor: '#000000'
          }}
        >
          {/* Slides Cross-Fade Wrapper */}
          {whyShalomSlides.map((slide, index) => (
            <Box 
              key={index}
              component="img" 
              src={slide.image}
              alt={slide.title}
              sx={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                objectPosition: index === 2 ? 'center 25%' : index === 3 ? 'center 75%' : 'top',
                opacity: index === activeWhySlide ? 1 : 0,
                transition: 'opacity 1s ease-in-out, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: index === activeWhySlide ? 'scale(1.03)' : 'scale(1.0)',
                zIndex: index === activeWhySlide ? 2 : 1
              }} 
            />
          ))}

          {/* Left-Aligned Overlaid Content - Squeezed at the top of the image with few paddings, aligned with page grid */}
          <Box 
            sx={{ 
              position: 'absolute',
              top: { xs: '32px', sm: '48px' }, // Squeezed down a bit
              left: 0,
              right: 0,
              zIndex: 4,
            }}
          >
            <Container maxWidth="lg">
              {/* Text Slide Cross-Fade Wrapper */}
              <Box sx={{ position: 'relative', minHeight: { xs: '380px', sm: '320px', md: '280px' } }}>
                {whyShalomSlides.map((slide, index) => {
                  const isRightSlide = index === 1 || index === 3; // Slide 2 (index 1) and Slide 4 (index 3) are right-aligned!
                  return (
                    <Box 
                      key={index}
                      sx={{ 
                        position: index === activeWhySlide ? 'relative' : 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        opacity: index === activeWhySlide ? 1 : 0,
                        transform: index === activeWhySlide ? 'translateY(0)' : 'translateY(15px)',
                        transition: 'opacity 0.8s ease-in-out, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                        visibility: index === activeWhySlide ? 'visible' : 'hidden',
                        zIndex: index === activeWhySlide ? 4 : 1,
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: { xs: 'flex-start', md: isRightSlide ? 'flex-end' : 'flex-start' }, // Right-aligned inside the column on desktop
                        ml: { xs: 0, md: isRightSlide ? 'auto' : 0 }, // Shifts to the right side on desktop
                        gap: 1.5
                      }}
                    >
                      {/* Title in Sans Superellipse Ragan 2 */}
                      <Typography 
                        variant="h3" 
                        sx={{ 
                          fontWeight: 900, 
                          fontSize: { xs: '2.4rem', sm: '3.6rem', md: '4.6rem', lg: '5.2rem' },
                          lineHeight: 1.0,
                          letterSpacing: '0.02em',
                          fontFamily: '"Sans Superellipse Ragan 2", sans-serif',
                          color: '#ffffff',
                          textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                          textAlign: { xs: 'left', md: isRightSlide ? 'right' : 'left' }, // Right-aligned title
                          whiteSpace: { xs: 'normal', md: 'nowrap' }
                        }}
                      >
                        {slide.title}
                      </Typography>

                      {/* Elegant Vertical Divider line */}
                      <Box 
                        sx={{ 
                          width: '1px', 
                          height: { xs: '30px', sm: '40px' }, 
                          bgcolor: 'rgba(255, 255, 255, 0.25)',
                          my: 1,
                          ml: { xs: 1, md: isRightSlide ? 0 : 1 },
                          mr: { xs: 0, md: isRightSlide ? 1 : 0 }
                        }} 
                      />

                      {/* Simple overview/summary */}
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: 'rgba(255, 255, 255, 0.85)', 
                          fontSize: { xs: '0.9rem', sm: '1rem' }, 
                          lineHeight: 1.7,
                          fontFamily: '"Linear", sans-serif',
                          fontWeight: 300,
                          textShadow: '0 2px 8px rgba(0,0,0,0.6)',
                          textAlign: { xs: 'left', md: isRightSlide ? 'justify' : 'left' }, // Justified text
                          maxWidth: { xs: '100%', md: '50%' } // restricts summary to 50% width on desktop
                        }}
                      >
                        {slide.description}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>

              {/* Premium Progress/Navigation Indicator Bars */}
              <Box sx={{ display: 'flex', gap: 1.5, mt: { xs: 4, sm: 3, md: 2 } }}>
                {whyShalomSlides.map((_, i) => (
                  <Box 
                    key={i}
                    onClick={() => setActiveWhySlide(i)}
                    sx={{ 
                      width: { xs: '32px', sm: '48px' }, 
                      height: '3px', 
                      bgcolor: i === activeWhySlide ? '#ff2a74' : 'rgba(255, 255, 255, 0.2)', 
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        bgcolor: i === activeWhySlide ? '#ff2a74' : 'rgba(255, 255, 255, 0.5)'
                      }
                    }}
                  />
                ))}
              </Box>
            </Container>
          </Box>
        </Box>


      </Box>

      {/* Testimonials */}
      <Box 
        sx={{ 
          bgcolor: '#000000',
          color: 'white', 
          py: 15,
          position: 'relative',
          overflow: 'hidden',
          // Cloudy background using radial-gradients blending into pure black
          background: `
            radial-gradient(circle at 80% 30%, rgba(45, 45, 55, 0.45) 0%, transparent 50%),
            radial-gradient(circle at 20% 70%, rgba(35, 35, 45, 0.4) 0%, transparent 60%),
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
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            opacity: 0.045, 
            pointerEvents: 'none',
            zIndex: 1
          }
        }}
      >
        <Container id="testimonials" maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Typography 
            variant="h2" 
            align="center" 
            sx={{ 
              mb: 5, 
              fontWeight: 800,
              fontFamily: '"AerodomeRegular-2vMGK", sans-serif',
              fontSize: { xs: '1.8rem', sm: '2.4rem', md: '3rem' },
              letterSpacing: '0.04em',
              color: 'transparent',
              WebkitTextStroke: '1.5px #ffffff',
              textTransform: 'uppercase'
            }}
          >
            What Our Clients Say
          </Typography>

          {/* Category Tabs */}
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 1.5, 
              mb: 5,
              animation: 'fadeIn 0.8s ease-out'
            }}
          >
            <Button
              onClick={() => setTestimonialCategory('production')}
              variant="contained"
              sx={{
                bgcolor: testimonialCategory === 'production' ? '#ff2a74' : 'rgba(255, 255, 255, 0.05)',
                color: 'white',
                fontWeight: 700,
                px: { xs: 2.5, sm: 3.5 },
                py: 1,
                borderRadius: 0,
                border: '1px solid',
                borderColor: testimonialCategory === 'production' ? '#ff2a74' : 'rgba(255, 255, 255, 0.1)',
                fontFamily: '"Space Grotesk", sans-serif',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontSize: { xs: '0.7rem', sm: '0.78rem' },
                boxShadow: testimonialCategory === 'production' ? '0 6px 20px rgba(255, 42, 116, 0.25)' : 'none',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                '&:hover': {
                  bgcolor: testimonialCategory === 'production' ? '#e01f61' : 'rgba(255, 255, 255, 0.12)',
                  borderColor: testimonialCategory === 'production' ? '#e01f61' : 'rgba(255, 255, 255, 0.2)',
                  transform: 'translateY(-1px)'
                }
              }}
            >
              Music Production
            </Button>
            <Button
              onClick={() => setTestimonialCategory('piano')}
              variant="contained"
              sx={{
                bgcolor: testimonialCategory === 'piano' ? '#ff2a74' : 'rgba(255, 255, 255, 0.05)',
                color: 'white',
                fontWeight: 700,
                px: { xs: 2.5, sm: 3.5 },
                py: 1,
                borderRadius: 0,
                border: '1px solid',
                borderColor: testimonialCategory === 'piano' ? '#ff2a74' : 'rgba(255, 255, 255, 0.1)',
                fontFamily: '"Space Grotesk", sans-serif',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontSize: { xs: '0.7rem', sm: '0.78rem' },
                boxShadow: testimonialCategory === 'piano' ? '0 6px 20px rgba(255, 42, 116, 0.25)' : 'none',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                '&:hover': {
                  bgcolor: testimonialCategory === 'piano' ? '#e01f61' : 'rgba(255, 255, 255, 0.12)',
                  borderColor: testimonialCategory === 'piano' ? '#e01f61' : 'rgba(255, 255, 255, 0.2)',
                  transform: 'translateY(-1px)'
                }
              }}
            >
              Piano Lessons
            </Button>
          </Box>

          {testimonialCategory === 'production' ? (
            <>
              <Grid container spacing={6} alignItems="center" sx={{ mt: 2 }}>
            {/* Left Column: Interactive Video Thumbnail Card */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Box 
                onClick={() => playingVideo !== 'harmony' && handlePlayVideo('harmony')}
                sx={{ 
                  display: 'block',
                  position: 'relative',
                  width: '100%',
                  height: { xs: '240px', sm: '380px', md: '440px' },
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
                  cursor: playingVideo === 'harmony' ? 'default' : 'pointer',
                  '&:hover .video-cover': {
                    transform: playingVideo === 'harmony' ? 'none' : 'scale(1.03)',
                  }
                }}
              >
                {playingVideo === 'harmony' ? (
                  <Box 
                    component="iframe"
                    src="https://www.youtube-nocookie.com/embed/TSscXIs3PLQ?autoplay=1&mute=0&rel=0&modestbranding=1"
                    title="The Harmony TZ Performance"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                    sx={{
                      width: '100%',
                      height: '100%',
                      border: 0
                    }}
                  />
                ) : (
                  <>
                    {/* Real YouTube Video Thumbnail */}
                    <Box 
                      className="video-cover"
                      component="img"
                      src={harmonyImg}
                      alt="Harmony Project Cover"
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    />

                    {/* Modern Pulsing Play Button overlay */}
                    <Box 
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: { xs: 60, sm: 80 },
                        height: { xs: 60, sm: 80 },
                        borderRadius: '50%',
                        bgcolor: 'rgba(255, 42, 116, 0.9)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 3,
                        boxShadow: '0 0 30px rgba(255, 42, 116, 0.6)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translate(-50%, -50%) scale(1.1)',
                          bgcolor: '#ff2a74',
                          boxShadow: '0 0 40px rgba(255, 42, 116, 0.8)'
                        },
                        '@keyframes harmonyPulse': {
                          '0%': {
                            transform: 'scale(1)',
                            opacity: 0.8
                          },
                          '100%': {
                            transform: 'scale(1.5)',
                            opacity: 0
                          }
                        },
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          borderRadius: '50%',
                          border: '2px solid #ff2a74',
                          animation: 'harmonyPulse 2s infinite',
                          opacity: 0.6
                        }
                      }}
                    >
                      <PlayArrowIcon sx={{ color: 'white', fontSize: { xs: 30, sm: 40 }, ml: 0.5 }} />
                    </Box>

                    {/* Dark Overlay for depth */}
                    <Box 
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)',
                        zIndex: 2
                      }}
                    />
                  </>
                )}

                {/* Continue to Watch Glassmorphism Overlay */}
                {overlayVideo === 'harmony' && (
                  <Box 
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'rgba(0, 0, 0, 0.85)',
                      backdropFilter: 'blur(12px)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: { xs: 2, sm: 3 },
                      zIndex: 10,
                      textAlign: 'center',
                      px: { xs: 2, sm: 4 },
                      '@keyframes harmonyFadeIn': {
                        from: { opacity: 0 },
                        to: { opacity: 1 }
                      },
                      animation: 'harmonyFadeIn 0.5s ease-out'
                    }}
                  >
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        color: 'white', 
                        fontWeight: 900,
                        fontSize: { xs: '2rem', sm: '3.2rem', md: '4rem' },
                        fontFamily: '"Sans Superellipse Ragan 2", sans-serif',
                        lineHeight: 1.3
                      }}
                    >
                      Enjoying the Music?
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.7)', 
                        maxWidth: '450px',
                        fontFamily: '"Space Grotesk", sans-serif',
                        fontSize: { xs: '0.8rem', sm: '0.95rem' },
                        letterSpacing: '0.05em'
                      }}
                    >
                      Continue to watch the full video on YouTube to experience their complete masterpiece!
                    </Typography>
                    <Button 
                      component="a"
                      href="https://www.youtube.com/watch?v=TSscXIs3PLQ&list=RDEMXSoe68D-7T5qMUxuCNK5ow&start_radio=1"
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="contained"
                      sx={{
                        bgcolor: '#ff2a74',
                        color: 'white',
                        fontWeight: 700,
                        px: 4,
                        py: 1.5,
                        borderRadius: 0,
                        fontFamily: '"Space Grotesk", sans-serif',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        boxShadow: '0 8px 25px rgba(255, 42, 116, 0.4)',
                        '&:hover': {
                          bgcolor: '#e01f61',
                          boxShadow: '0 8px 30px rgba(255, 42, 116, 0.6)'
                        }
                      }}
                    >
                      Continue to Watch
                    </Button>
                  </Box>
                )}
              </Box>
            </Grid>

            {/* Right Column: Testimony Content */}
            <Grid size={{ xs: 12, md: 5 }} sx={{ display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'center' }}>
              {/* Name Block */}
              <Box>
                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontWeight: 900,
                    fontFamily: '"Sans Superellipse Ragan 2", sans-serif',
                    fontSize: { xs: '1.6rem', sm: '2.8rem', md: '4.8rem' },
                    color: 'white',
                    lineHeight: 1.1,
                    mb: 1
                  }}
                >
                  The Harmony TZ
                </Typography>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    fontFamily: '"Linear", sans-serif', 
                    color: 'rgba(255,255,255,0.4)',
                    fontWeight: 400
                  }}
                >
                  Music Production & Hybrid Stereo Mix
                </Typography>
              </Box>

              {/* Testimony Block */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontFamily: '"Linear", sans-serif',
                    fontWeight: 300,
                    fontSize: { xs: '1.05rem', sm: '1.15rem' },
                    color: 'rgba(255, 255, 255, 0.85)',
                    lineHeight: 1.8,
                    position: 'relative',
                    pl: 3,
                    borderLeft: '2px solid #ff2a74',
                    textAlign: 'justify'
                  }}
                >
                  "Finding a studio with elite quality and actual heart is rare. From day one, their customer care was incredibly warm and supportive, making the entire journey so smooth and stress-free. To get this level of professional production at such a friendly price was truly a blessing for us."
                </Typography>
                
                {/* Location below testimony */}
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 0.5, 
                    color: '#ff2a74',
                    pl: 3,
                    whiteSpace: 'nowrap'
                  }}
                >
                  <LocationOnIcon sx={{ fontSize: { xs: '0.95rem', sm: '1.2rem' } }} />
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      fontFamily: '"Space Grotesk", sans-serif', 
                      fontWeight: 700, 
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      fontSize: { xs: '0.7rem', sm: '0.85rem', md: '1rem' }
                    }}
                  >
                    Chuo Kikuu SDA Church
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>

          {/* Second Testimony: The Living Light Tanzania (Swapped Position) */}
          <Grid container spacing={6} alignItems="center" sx={{ mt: 12 }}>
            {/* Left Column: Testimony Content (Swapped) */}
            <Grid 
              size={{ xs: 12, md: 5 }} 
              order={{ xs: 2, md: 1 }}
              sx={{ display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'center' }}
            >
              {/* Name Block */}
              <Box>
                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontWeight: 900,
                    fontFamily: '"Sans Superellipse Ragan 2", sans-serif',
                    fontSize: { xs: '1.6rem', sm: '2.8rem', md: '4.8rem' },
                    color: 'white',
                    lineHeight: 1.1,
                    mb: 1
                  }}
                >
                  The Living Light Tanzania
                </Typography>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    fontFamily: '"Linear", sans-serif', 
                    color: 'rgba(255,255,255,0.4)',
                    fontWeight: 400
                  }}
                >
                  Choral Recording & Hybrid Mix
                </Typography>
              </Box>

              {/* Testimony Block */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontFamily: '"Linear", sans-serif',
                    fontWeight: 300,
                    fontSize: { xs: '1.05rem', sm: '1.15rem' },
                    color: 'rgba(255, 255, 255, 0.85)',
                    lineHeight: 1.8,
                    position: 'relative',
                    pr: { xs: 0, md: 3 },
                    pl: { xs: 3, md: 0 },
                    borderRight: { xs: 'none', md: '2px solid #ff2a74' },
                    borderLeft: { xs: '2px solid #ff2a74', md: 'none' },
                    textAlign: 'justify'
                  }}
                >
                  "Shalom Music Studios is more than just a studio; they are a family that walks with you. Their team welcomed us with so much love, and their patience during our choral tracking was unmatched. They made our production process so smooth, and to receive such elite quality at an affordable price is something we are deeply grateful for."
                </Typography>
                
                {/* Location below testimony */}
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 0.5, 
                    color: '#ff2a74',
                    justifyContent: 'flex-start',
                    pl: { xs: 3, md: 0 },
                    whiteSpace: 'nowrap'
                  }}
                >
                  <LocationOnIcon sx={{ fontSize: { xs: '0.95rem', sm: '1.2rem' } }} />
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      fontFamily: '"Space Grotesk", sans-serif', 
                      fontWeight: 700, 
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      fontSize: { xs: '0.7rem', sm: '0.85rem', md: '1rem' }
                    }}
                  >
                    Chuo Kikuu SDA Church
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Right Column: Interactive Video Thumbnail Card (Swapped) */}
            <Grid size={{ xs: 12, md: 7 }} order={{ xs: 1, md: 2 }}>
              <Box 
                onClick={() => playingVideo !== 'living_light' && handlePlayVideo('living_light')}
                sx={{ 
                  display: 'block',
                  position: 'relative',
                  width: '100%',
                  height: { xs: '240px', sm: '380px', md: '440px' },
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
                  cursor: playingVideo === 'living_light' ? 'default' : 'pointer',
                  '&:hover .video-cover': {
                    transform: playingVideo === 'living_light' ? 'none' : 'scale(1.03)',
                  }
                }}
              >
                {playingVideo === 'living_light' ? (
                  <Box 
                    component="iframe"
                    src="https://www.youtube-nocookie.com/embed/4IuqGgPO7is?autoplay=1&mute=0&rel=0&modestbranding=1&list=RD4IuqGgPO7is&start_radio=1"
                    title="The Living Light Tanzania Performance"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                    sx={{
                      width: '100%',
                      height: '100%',
                      border: 0
                    }}
                  />
                ) : (
                  <>
                    {/* Real YouTube Video Thumbnail */}
                    <Box 
                      className="video-cover"
                      component="img"
                      src={livingLightImg}
                      alt="Living Light Project Cover"
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    />

                    {/* Modern Pulsing Play Button overlay */}
                    <Box 
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: { xs: 60, sm: 80 },
                        height: { xs: 60, sm: 80 },
                        borderRadius: '50%',
                        bgcolor: 'rgba(255, 42, 116, 0.9)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 3,
                        boxShadow: '0 0 30px rgba(255, 42, 116, 0.6)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translate(-50%, -50%) scale(1.1)',
                          bgcolor: '#ff2a74',
                          boxShadow: '0 0 40px rgba(255, 42, 116, 0.8)'
                        },
                        '@keyframes livingLightPulse': {
                          '0%': {
                            transform: 'scale(1)',
                            opacity: 0.8
                          },
                          '100%': {
                            transform: 'scale(1.5)',
                            opacity: 0
                          }
                        },
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          borderRadius: '50%',
                          border: '2px solid #ff2a74',
                          animation: 'livingLightPulse 2s infinite',
                          opacity: 0.6
                        }
                      }}
                    >
                      <PlayArrowIcon sx={{ color: 'white', fontSize: { xs: 30, sm: 40 }, ml: 0.5 }} />
                    </Box>

                    {/* Dark Overlay for depth */}
                    <Box 
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)',
                        zIndex: 2
                      }}
                    />
                  </>
                )}

                {/* Continue to Watch Glassmorphism Overlay */}
                {overlayVideo === 'living_light' && (
                  <Box 
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'rgba(0, 0, 0, 0.85)',
                      backdropFilter: 'blur(12px)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: { xs: 2, sm: 3 },
                      zIndex: 10,
                      textAlign: 'center',
                      px: { xs: 2, sm: 4 },
                      '@keyframes livingLightFadeIn': {
                        from: { opacity: 0 },
                        to: { opacity: 1 }
                      },
                      animation: 'livingLightFadeIn 0.5s ease-out'
                    }}
                  >
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        color: 'white', 
                        fontWeight: 900,
                        fontSize: { xs: '2rem', sm: '3.2rem', md: '4rem' },
                        fontFamily: '"Sans Superellipse Ragan 2", sans-serif',
                        lineHeight: 1.3
                      }}
                    >
                      Enjoying the Music?
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.7)', 
                        maxWidth: '450px',
                        fontFamily: '"Space Grotesk", sans-serif',
                        fontSize: { xs: '0.8rem', sm: '0.95rem' },
                        letterSpacing: '0.05em'
                      }}
                    >
                      Continue to watch the full video on YouTube to experience their complete masterpiece!
                    </Typography>
                    <Button 
                      component="a"
                      href="https://www.youtube.com/watch?v=4IuqGgPO7is&list=RD4IuqGgPO7is&start_radio=1"
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="contained"
                      sx={{
                        bgcolor: '#ff2a74',
                        color: 'white',
                        fontWeight: 700,
                        px: 4,
                        py: 1.5,
                        borderRadius: 0,
                        fontFamily: '"Space Grotesk", sans-serif',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        boxShadow: '0 8px 25px rgba(255, 42, 116, 0.4)',
                        '&:hover': {
                          bgcolor: '#e01f61',
                          boxShadow: '0 8px 30px rgba(255, 42, 116, 0.6)'
                        }
                      }}
                    >
                      Continue to Watch
                    </Button>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>

          {/* Third Testimony: Accendo Music (Style like the First Testimonial) */}
          <Grid container spacing={6} alignItems="center" sx={{ mt: 12 }}>
            {/* Left Column: Interactive Video Thumbnail Card */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Box 
                onClick={() => playingVideo !== 'accendo' && handlePlayVideo('accendo')}
                sx={{ 
                  display: 'block',
                  position: 'relative',
                  width: '100%',
                  height: { xs: '240px', sm: '380px', md: '440px' },
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
                  cursor: playingVideo === 'accendo' ? 'default' : 'pointer',
                  '&:hover .video-cover': {
                    transform: playingVideo === 'accendo' ? 'none' : 'scale(1.03)',
                  }
                }}
              >
                {playingVideo === 'accendo' ? (
                  <Box 
                    component="iframe"
                    src="https://www.youtube-nocookie.com/embed/zr4R4mmi0EU?autoplay=1&mute=0&rel=0&modestbranding=1&list=RDzr4R4mmi0EU&start_radio=1"
                    title="Accendo Music Performance"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                    sx={{
                      width: '100%',
                      height: '100%',
                      border: 0
                    }}
                  />
                ) : (
                  <>
                    {/* Real YouTube Video Thumbnail */}
                    <Box 
                      className="video-cover"
                      component="img"
                      src={accendoImg}
                      alt="Accendo Music Project Cover"
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    />

                    {/* Modern Pulsing Play Button overlay */}
                    <Box 
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: { xs: 60, sm: 80 },
                        height: { xs: 60, sm: 80 },
                        borderRadius: '50%',
                        bgcolor: 'rgba(255, 42, 116, 0.9)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 3,
                        boxShadow: '0 0 30px rgba(255, 42, 116, 0.6)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translate(-50%, -50%) scale(1.1)',
                          bgcolor: '#ff2a74',
                          boxShadow: '0 0 40px rgba(255, 42, 116, 0.8)'
                        },
                        '@keyframes accendoPulse': {
                          '0%': {
                            transform: 'scale(1)',
                            opacity: 0.8
                          },
                          '100%': {
                            transform: 'scale(1.5)',
                            opacity: 0
                          }
                        },
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          borderRadius: '50%',
                          border: '2px solid #ff2a74',
                          animation: 'accendoPulse 2s infinite',
                          opacity: 0.6
                        }
                      }}
                    >
                      <PlayArrowIcon sx={{ color: 'white', fontSize: { xs: 30, sm: 40 }, ml: 0.5 }} />
                    </Box>

                    {/* Dark Overlay for depth */}
                    <Box 
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)',
                        zIndex: 2
                      }}
                    />
                  </>
                )}

                {/* Continue to Watch Glassmorphism Overlay */}
                {overlayVideo === 'accendo' && (
                  <Box 
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'rgba(0, 0, 0, 0.85)',
                      backdropFilter: 'blur(12px)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: { xs: 2, sm: 3 },
                      zIndex: 10,
                      textAlign: 'center',
                      px: { xs: 2, sm: 4 },
                      '@keyframes accendoFadeIn': {
                        from: { opacity: 0 },
                        to: { opacity: 1 }
                      },
                      animation: 'accendoFadeIn 0.5s ease-out'
                    }}
                  >
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        color: 'white', 
                        fontWeight: 900,
                        fontSize: { xs: '2rem', sm: '3.2rem', md: '4rem' },
                        fontFamily: '"Sans Superellipse Ragan 2", sans-serif',
                        lineHeight: 1.3
                      }}
                    >
                      Enjoying the Music?
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.7)', 
                        maxWidth: '450px',
                        fontFamily: '"Space Grotesk", sans-serif',
                        fontSize: { xs: '0.8rem', sm: '0.95rem' },
                        letterSpacing: '0.05em'
                      }}
                    >
                      Continue to watch the full video on YouTube to experience their complete masterpiece!
                    </Typography>
                    <Button 
                      component="a"
                      href="https://www.youtube.com/watch?v=zr4R4mmi0EU&list=RDzr4R4mmi0EU&start_radio=1"
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="contained"
                      sx={{
                        bgcolor: '#ff2a74',
                        color: 'white',
                        fontWeight: 700,
                        px: 4,
                        py: 1.5,
                        borderRadius: 0,
                        fontFamily: '"Space Grotesk", sans-serif',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        boxShadow: '0 8px 25px rgba(255, 42, 116, 0.4)',
                        '&:hover': {
                          bgcolor: '#e01f61',
                          boxShadow: '0 8px 30px rgba(255, 42, 116, 0.6)'
                        }
                      }}
                    >
                      Continue to Watch
                    </Button>
                  </Box>
                )}
              </Box>
            </Grid>

            {/* Right Column: Testimony Content */}
            <Grid size={{ xs: 12, md: 5 }} sx={{ display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'center' }}>
              {/* Name Block */}
              <Box>
                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontWeight: 900,
                    fontFamily: '"Sans Superellipse Ragan 2", sans-serif',
                    fontSize: { xs: '1.6rem', sm: '2.8rem', md: '4.8rem' },
                    color: 'white',
                    lineHeight: 1.1,
                    mb: 1
                  }}
                >
                  Accendo Music
                </Typography>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    fontFamily: '"Linear", sans-serif', 
                    color: 'rgba(255,255,255,0.4)',
                    fontWeight: 400
                  }}
                >
                  Acapella Recording & Vocal Production
                </Typography>
              </Box>

              {/* Testimony Block */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontFamily: '"Linear", sans-serif',
                    fontWeight: 300,
                    fontSize: { xs: '1.05rem', sm: '1.15rem' },
                    color: 'rgba(255, 255, 255, 0.85)',
                    lineHeight: 1.8,
                    position: 'relative',
                    pl: 3,
                    borderLeft: '2px solid #ff2a74',
                    textAlign: 'justify'
                  }}
                >
                  "Every session at Shalom Music Studios feels like a masterclass in vocal production. They captured the true essence of our acapella harmonies with incredible clarity and warmth. Their team's guidance, exceptional hospitality, and belief in our ministry made the recording a seamless joy. It is truly the gold standard for premium music production."
                </Typography>
                
                {/* Location below testimony */}
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 0.5, 
                    color: '#ff2a74',
                    pl: 3,
                    whiteSpace: 'nowrap'
                  }}
                >
                  <LocationOnIcon sx={{ fontSize: { xs: '0.95rem', sm: '1.2rem' } }} />
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      fontFamily: '"Space Grotesk", sans-serif', 
                      fontWeight: 700, 
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      fontSize: { xs: '0.7rem', sm: '0.85rem', md: '1rem' }
                    }}
                  >
                    Chuo Kikuu SDA Church
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          </>
          ) : (
            <Grow in={testimonialCategory === 'piano'} timeout={500}>
              <Box sx={{ mt: 4 }}>
                {/* Piano Testimony 1: Ebenezer Eliamani (Image Left, Content Right) */}
                <Grid container spacing={6} alignItems="center">
                  {/* Left Column: Interactive Video Thumbnail Card */}
                  <Grid size={{ xs: 12, md: 7 }}>
                    <Box 
                      onClick={() => playingVideo !== 'piano_student_1' && handlePlayVideo('piano_student_1')}
                      sx={{ 
                        display: 'block',
                        position: 'relative',
                        width: '100%',
                        height: { xs: '240px', sm: '380px', md: '440px' },
                        overflow: 'hidden',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
                        cursor: playingVideo === 'piano_student_1' ? 'default' : 'pointer',
                        '&:hover .video-cover': {
                          transform: playingVideo === 'piano_student_1' ? 'none' : 'scale(1.03)',
                        }
                      }}
                    >
                      {playingVideo === 'piano_student_1' ? (
                        <Box 
                          component="iframe"
                          src="https://www.youtube-nocookie.com/embed/F-hD2C1aQ3U?autoplay=1&mute=0&rel=0&modestbranding=1"
                          title="Piano Student Recital - Fur Elise"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          referrerPolicy="strict-origin-when-cross-origin"
                          sx={{
                            width: '100%',
                            height: '100%',
                            border: 0
                          }}
                        />
                      ) : (
                        <>
                          {/* Real YouTube Video Thumbnail */}
                          <Box 
                            className="video-cover"
                            component="img"
                            src={pianoStudent1Img}
                            alt="Piano Student Cover"
                            sx={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                            }}
                          />

                          {/* Modern Pulsing Play Button overlay */}
                          <Box 
                            sx={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              width: { xs: 60, sm: 80 },
                              height: { xs: 60, sm: 80 },
                              borderRadius: '50%',
                              bgcolor: 'rgba(255, 42, 116, 0.9)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              zIndex: 3,
                              boxShadow: '0 0 30px rgba(255, 42, 116, 0.6)',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                transform: 'translate(-50%, -50%) scale(1.1)',
                                bgcolor: '#ff2a74',
                                boxShadow: '0 0 40px rgba(255, 42, 116, 0.8)'
                              },
                              '@keyframes pianoPulse1': {
                                '0%': {
                                  transform: 'scale(1)',
                                  opacity: 0.8
                                },
                                '100%': {
                                  transform: 'scale(1.5)',
                                  opacity: 0
                                }
                              },
                              '&::after': {
                                content: '""',
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                                border: '2px solid #ff2a74',
                                animation: 'pianoPulse1 2s infinite',
                                opacity: 0.6
                              }
                            }}
                          >
                            <PlayArrowIcon sx={{ color: 'white', fontSize: { xs: 30, sm: 40 }, ml: 0.5 }} />
                          </Box>

                          {/* Dark Overlay for depth */}
                          <Box 
                            sx={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)',
                              zIndex: 2
                            }}
                          />
                        </>
                      )}

                      {/* Continue to Watch Glassmorphism Overlay */}
                      {overlayVideo === 'piano_student_1' && (
                        <Box 
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0, 0, 0, 0.85)',
                            backdropFilter: 'blur(12px)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: { xs: 2, sm: 3 },
                            zIndex: 10,
                            textAlign: 'center',
                            px: { xs: 2, sm: 4 },
                            '@keyframes pianoFadeIn1': {
                              from: { opacity: 0 },
                              to: { opacity: 1 }
                            },
                            animation: 'pianoFadeIn1 0.5s ease-out'
                          }}
                        >
                          <Typography 
                            variant="h4" 
                            sx={{ 
                              color: 'white', 
                              fontWeight: 900,
                              fontSize: { xs: '2rem', sm: '3.2rem', md: '4rem' },
                              fontFamily: '"Sans Superellipse Ragan 2", sans-serif',
                              lineHeight: 1.3
                            }}
                          >
                            Enjoying the Music?
                          </Typography>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: 'rgba(255, 255, 255, 0.7)', 
                              maxWidth: '450px',
                              fontFamily: '"Space Grotesk", sans-serif',
                              fontSize: { xs: '0.8rem', sm: '0.95rem' },
                              letterSpacing: '0.05em'
                            }}
                          >
                            Continue to watch the full video on YouTube to experience their complete masterpiece!
                          </Typography>
                          <Button 
                            component="a"
                            href="https://www.youtube.com/watch?v=F-hD2C1aQ3U"
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="contained"
                            sx={{
                              bgcolor: '#ff2a74',
                              color: 'white',
                              fontWeight: 700,
                              px: 4,
                              py: 1.5,
                              borderRadius: 0,
                              fontFamily: '"Space Grotesk", sans-serif',
                              letterSpacing: '0.1em',
                              textTransform: 'uppercase',
                              boxShadow: '0 8px 25px rgba(255, 42, 116, 0.4)',
                              '&:hover': {
                                bgcolor: '#e01f61',
                                boxShadow: '0 8px 30px rgba(255, 42, 116, 0.6)'
                              }
                            }}
                          >
                            Continue to Watch
                          </Button>
                        </Box>
                      )}
                    </Box>
                  </Grid>

                  {/* Right Column: Testimony Content */}
                  <Grid size={{ xs: 12, md: 5 }} sx={{ display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'center' }}>
                    {/* Name Block */}
                    <Box>
                      <Typography 
                        variant="h3" 
                        sx={{ 
                          fontWeight: 900,
                          fontFamily: '"Sans Superellipse Ragan 2", sans-serif',
                          fontSize: { xs: '1.6rem', sm: '2.8rem', md: '4.8rem' },
                          color: 'white',
                          lineHeight: 1.1,
                          mb: 1
                        }}
                      >
                        Ebenezer Eliamani
                      </Typography>
                      <Typography 
                        variant="subtitle1" 
                        sx={{ 
                          fontFamily: '"Linear", sans-serif', 
                          color: 'rgba(255,255,255,0.4)',
                          fontWeight: 400
                        }}
                      >
                        Intermediate Classical & Jazz Studies
                      </Typography>
                    </Box>

                    {/* Testimony Block */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          fontFamily: '"Linear", sans-serif',
                          fontWeight: 300,
                          fontSize: { xs: '1.05rem', sm: '1.15rem' },
                          color: 'rgba(255, 255, 255, 0.85)',
                          lineHeight: 1.8,
                          position: 'relative',
                          pl: 3,
                          borderLeft: '2px solid #ff2a74',
                          textAlign: 'justify'
                        }}
                      >
                        "Learning piano at Shalom Music Studios has completely transformed my musical journey. The instructors combine rigorous classical technique with modern jazz improvisation in a way that is incredibly engaging and fun. Their patience and dedicated mentorship gave me the confidence to play in public."
                      </Typography>
                      
                      {/* Location below testimony */}
                      <Box 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 0.5, 
                          color: '#ff2a74',
                          pl: 3,
                          whiteSpace: 'nowrap'
                        }}
                      >
                        <LocationOnIcon sx={{ fontSize: { xs: '0.95rem', sm: '1.2rem' } }} />
                        <Typography 
                          variant="subtitle2" 
                          sx={{ 
                            fontFamily: '"Space Grotesk", sans-serif', 
                            fontWeight: 700, 
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            fontSize: { xs: '0.7rem', sm: '0.85rem', md: '1rem' }
                          }}
                        >
                          Chuo Kikuu SDA Church
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>

                {/* Piano Testimony 2: Grace Kalinga (Content Left, Image Right) */}
                <Grid container spacing={6} alignItems="center" sx={{ mt: 12 }}>
                  {/* Left Column: Testimony Content (Swapped) */}
                  <Grid 
                    size={{ xs: 12, md: 5 }} 
                    order={{ xs: 2, md: 1 }}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'center' }}
                  >
                    {/* Name Block */}
                    <Box>
                      <Typography 
                        variant="h3" 
                        sx={{ 
                          fontWeight: 900,
                          fontFamily: '"Sans Superellipse Ragan 2", sans-serif',
                          fontSize: { xs: '1.6rem', sm: '2.8rem', md: '4.8rem' },
                          color: 'white',
                          lineHeight: 1.1,
                          mb: 1
                        }}
                      >
                        Grace Kalinga
                      </Typography>
                      <Typography 
                        variant="subtitle1" 
                        sx={{ 
                          fontFamily: '"Linear", sans-serif', 
                          color: 'rgba(255,255,255,0.4)',
                          fontWeight: 400
                        }}
                      >
                        Beginner Piano & Creative Music Theory
                      </Typography>
                    </Box>

                    {/* Testimony Block */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          fontFamily: '"Linear", sans-serif',
                          fontWeight: 300,
                          fontSize: { xs: '1.05rem', sm: '1.15rem' },
                          color: 'rgba(255, 255, 255, 0.85)',
                          lineHeight: 1.8,
                          position: 'relative',
                          pr: { xs: 0, md: 3 },
                          pl: { xs: 3, md: 0 },
                          borderRight: { xs: 'none', md: '2px solid #ff2a74' },
                          borderLeft: { xs: '2px solid #ff2a74', md: 'none' },
                          textAlign: 'justify'
                        }}
                      >
                        "As a parent, finding a piano program that keeps a child inspired is a gift. Shalom Music Studios has created a warm, incredibly supportive environment where my daughter thrives. Their lessons are structured, yet filled with creative fun. The progress she has made in just six months is truly amazing!"
                      </Typography>
                      
                      {/* Location below testimony */}
                      <Box 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 0.5, 
                          color: '#ff2a74',
                          justifyContent: 'flex-start',
                          pl: { xs: 3, md: 0 },
                          whiteSpace: 'nowrap'
                        }}
                      >
                        <LocationOnIcon sx={{ fontSize: { xs: '0.95rem', sm: '1.2rem' } }} />
                        <Typography 
                          variant="subtitle2" 
                          sx={{ 
                            fontFamily: '"Space Grotesk", sans-serif', 
                            fontWeight: 700, 
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            fontSize: { xs: '0.7rem', sm: '0.85rem', md: '1rem' }
                          }}
                        >
                          Chuo Kikuu SDA Church
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  {/* Right Column: Interactive Video Thumbnail Card (Swapped) */}
                  <Grid size={{ xs: 12, md: 7 }} order={{ xs: 1, md: 2 }}>
                    <Box 
                      onClick={() => playingVideo !== 'piano_student_2' && handlePlayVideo('piano_student_2')}
                      sx={{ 
                        display: 'block',
                        position: 'relative',
                        width: '100%',
                        height: { xs: '240px', sm: '380px', md: '440px' },
                        overflow: 'hidden',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
                        cursor: playingVideo === 'piano_student_2' ? 'default' : 'pointer',
                        '&:hover .video-cover': {
                          transform: playingVideo === 'piano_student_2' ? 'none' : 'scale(1.03)',
                        }
                      }}
                    >
                      {playingVideo === 'piano_student_2' ? (
                        <Box 
                          component="iframe"
                          src="https://www.youtube-nocookie.com/embed/tC0QnPUsrCk?autoplay=1&mute=0&rel=0&modestbranding=1"
                          title="Young Pianist Student Recital"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          referrerPolicy="strict-origin-when-cross-origin"
                          sx={{
                            width: '100%',
                            height: '100%',
                            border: 0
                          }}
                        />
                      ) : (
                        <>
                          {/* Real YouTube Video Thumbnail */}
                          <Box 
                            className="video-cover"
                            component="img"
                            src={pianoStudent2Img}
                            alt="Young Piano Student Cover"
                            sx={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                            }}
                          />

                          {/* Modern Pulsing Play Button overlay */}
                          <Box 
                            sx={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              width: { xs: 60, sm: 80 },
                              height: { xs: 60, sm: 80 },
                              borderRadius: '50%',
                              bgcolor: 'rgba(255, 42, 116, 0.9)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              zIndex: 3,
                              boxShadow: '0 0 30px rgba(255, 42, 116, 0.6)',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                transform: 'translate(-50%, -50%) scale(1.1)',
                                bgcolor: '#ff2a74',
                                boxShadow: '0 0 40px rgba(255, 42, 116, 0.8)'
                              },
                              '@keyframes pianoPulse2': {
                                '0%': {
                                  transform: 'scale(1)',
                                  opacity: 0.8
                                },
                                '100%': {
                                  transform: 'scale(1.5)',
                                  opacity: 0
                                }
                              },
                              '&::after': {
                                content: '""',
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                                border: '2px solid #ff2a74',
                                animation: 'pianoPulse2 2s infinite',
                                opacity: 0.6
                              }
                            }}
                          >
                            <PlayArrowIcon sx={{ color: 'white', fontSize: { xs: 30, sm: 40 }, ml: 0.5 }} />
                          </Box>

                          {/* Dark Overlay for depth */}
                          <Box 
                            sx={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)',
                              zIndex: 2
                            }}
                          />
                        </>
                      )}

                      {/* Continue to Watch Glassmorphism Overlay */}
                      {overlayVideo === 'piano_student_2' && (
                        <Box 
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0, 0, 0, 0.85)',
                            backdropFilter: 'blur(12px)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: { xs: 2, sm: 3 },
                            zIndex: 10,
                            textAlign: 'center',
                            px: { xs: 2, sm: 4 },
                            '@keyframes pianoFadeIn2': {
                              from: { opacity: 0 },
                              to: { opacity: 1 }
                            },
                            animation: 'pianoFadeIn2 0.5s ease-out'
                          }}
                        >
                          <Typography 
                            variant="h4" 
                            sx={{ 
                              color: 'white', 
                              fontWeight: 900,
                              fontSize: { xs: '2rem', sm: '3.2rem', md: '4.8rem' },
                              fontFamily: '"Sans Superellipse Ragan 2", sans-serif',
                              lineHeight: 1.3
                            }}
                          >
                            Enjoying the Music?
                          </Typography>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: 'rgba(255, 255, 255, 0.7)', 
                              maxWidth: '450px',
                              fontFamily: '"Space Grotesk", sans-serif',
                              fontSize: { xs: '0.8rem', sm: '0.95rem' },
                              letterSpacing: '0.05em'
                            }}
                          >
                            Continue to watch the full video on YouTube to experience their complete masterpiece!
                          </Typography>
                          <Button 
                            component="a"
                            href="https://www.youtube.com/watch?v=tC0QnPUsrCk"
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="contained"
                            sx={{
                              bgcolor: '#ff2a74',
                              color: 'white',
                              fontWeight: 700,
                              px: 4,
                              py: 1.5,
                              borderRadius: 0,
                              fontFamily: '"Space Grotesk", sans-serif',
                              letterSpacing: '0.1em',
                              textTransform: 'uppercase',
                              boxShadow: '0 8px 25px rgba(255, 42, 116, 0.4)',
                              '&:hover': {
                                bgcolor: '#e01f61',
                                boxShadow: '0 8px 30px rgba(255, 42, 116, 0.6)'
                              }
                            }}
                          >
                            Continue to Watch
                          </Button>
                        </Box>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grow>
          )}
        </Container>
      </Box>

      {/* CTA Section */}
      <Box 
        sx={{ 
          bgcolor: '#000000',
          color: 'white', 
          py: { xs: 10, sm: 14, md: 18 },
          position: 'relative',
          overflow: 'hidden',
          // Cloudy background using radial-gradients blending into pure black
          background: `
            radial-gradient(circle at 50% 50%, rgba(15, 15, 20, 0.9) 0%, #000000 100%)
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
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            opacity: 0.03, 
            pointerEvents: 'none',
            zIndex: 1
          }
        }}
      >
        {/* Soft Ambient Neon Pink Glow Behind the Glass Card */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '320px', sm: '550px', md: '750px' },
            height: { xs: '320px', sm: '550px', md: '750px' },
            background: 'radial-gradient(circle, rgba(255, 42, 116, 0.15) 0%, transparent 65%)',
            filter: 'blur(70px)',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          {/* Floating Glassmorphic Card Container */}
          <Box
            sx={{
              position: 'relative',
              backdropFilter: 'blur(30px) saturate(210%)',
              WebkitBackdropFilter: 'blur(30px) saturate(210%)',
              bgcolor: 'rgba(10, 10, 13, 0.72)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: { xs: '16px', sm: '28px' },
              padding: { xs: '48px 24px', sm: '64px 48px', md: '80px 72px' },
              boxShadow: '0 50px 120px rgba(0, 0, 0, 0.85), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
              overflow: 'hidden',
              textAlign: 'center',
              maxWidth: '920px',
              mx: 'auto',
              transform: 'translate3d(0, 0, 0)',
              willChange: 'transform',
            }}
          >
            {/* Under Development Overlay */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                bgcolor: 'rgba(10, 10, 13, 0.85)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 10,
                p: 4
              }}
            >
              <Box 
                sx={{ 
                  bgcolor: '#ff2a74', 
                  color: 'white', 
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em',
                  px: 2.5,
                  py: 0.8,
                  borderRadius: 0,
                  textTransform: 'uppercase',
                  mb: 2,
                  boxShadow: '0 4px 15px rgba(255, 42, 116, 0.4)'
                }}
              >
                Under Development
              </Box>
              <Typography 
                sx={{ 
                  fontFamily: '"AerodomeRegular-2vMGK", sans-serif', 
                  fontSize: { xs: '1.5rem', sm: '2rem' }, 
                  fontWeight: 800, 
                  letterSpacing: '0.04em',
                  mb: 1,
                  color: 'white'
                }}
              >
                SHALOM MUSIC PORTAL
              </Typography>
              <Typography 
                sx={{ 
                  fontFamily: '"Linear", sans-serif', 
                  fontSize: '0.9rem', 
                  color: 'rgba(255, 255, 255, 0.6)', 
                  maxWidth: '380px',
                  mx: 'auto',
                  lineHeight: 1.4
                }}
              >
                Our comprehensive master portal features are undergoing active configuration and will launch shortly.
              </Typography>
            </Box>

            {/* Corner Tech Accents */}
            <Box
              sx={{
                position: 'absolute',
                top: 20,
                left: 20,
                width: '14px',
                height: '14px',
                borderTop: '2px solid rgba(255, 42, 116, 0.4)',
                borderLeft: '2px solid rgba(255, 42, 116, 0.4)',
                pointerEvents: 'none'
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: 20,
                right: 20,
                width: '14px',
                height: '14px',
                borderBottom: '2px solid rgba(255, 42, 116, 0.4)',
                borderRight: '2px solid rgba(255, 42, 116, 0.4)',
                pointerEvents: 'none'
              }}
            />

            {/* Glowing Accent Subtitle */}
            <Typography
              sx={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontSize: { xs: '11px', sm: '12px' },
                fontWeight: 700,
                color: '#ff2a74',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                mb: 2.5
              }}
            >
              Sanctuary of Sound
            </Typography>

            {/* Heading */}
            <Typography 
              variant="h2" 
              sx={{ 
                mb: 3, 
                fontWeight: 800,
                fontFamily: '"Syne", sans-serif',
                letterSpacing: '-0.02em',
                fontSize: { xs: '2.2rem', sm: '3rem', md: '3.6rem' },
                lineHeight: 1.15,
                color: '#ffffff'
              }}
            >
              Ready to Create <br />Your Masterpiece?
            </Typography>

            {/* Description */}
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 6, 
                color: 'rgba(255, 255, 255, 0.72)', 
                fontWeight: 300,
                fontFamily: '"Linear", sans-serif',
                fontSize: { xs: '0.92rem', sm: '1.05rem', md: '1.15rem' },
                lineHeight: 1.8,
                maxWidth: '620px',
                mx: 'auto'
              }}
            >
              Step into our sanctuary of sound. Whether you're looking to record in our state-of-the-art studio, craft elite music productions, or master the piano with custom lessons—we are here to elevate your art.
            </Typography>

            {/* CTA Buttons */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'center',
                alignItems: 'center',
                gap: { xs: 2.5, sm: 3 },
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
                  px: { xs: 4, sm: 5 },
                  py: 1.8,
                  fontSize: { xs: '15px', sm: '16px' },
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
                to="/lessons"
                variant="contained"
                size="large"
                sx={{
                  width: { xs: '100%', sm: 'auto' },
                  bgcolor: '#ff2a74',
                  color: '#ffffff',
                  borderRadius: '4px',
                  px: { xs: 4, sm: 5 },
                  py: 1.8,
                  fontSize: { xs: '15px', sm: '16px' },
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
          </Box>
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

      {/* Instrumental Creation Request Pricing Popup */}
      <Dialog
        open={isInstrumentalPopupOpen}
        onClose={() => setIsInstrumentalPopupOpen(false)}
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
          onClick={() => setIsInstrumentalPopupOpen(false)} 
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
            Bespoke Beatmaking & Orchestration
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
            Co-create a completely unique sonic identity with elite beatmaking and majestic cinematic orchestration.
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
              300,000 TZS
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
              299,999 TZS
            </Typography>
            <Typography 
              sx={{ 
                fontSize: '0.75rem',
                color: 'rgba(255, 255, 255, 0.5)',
                fontFamily: '"Linear", sans-serif',
                mt: 0.75
              }}
            >
              Full session production & orchestration track files included.
            </Typography>
          </Box>

          {/* Inclusions List */}
          <Box sx={{ textAlign: 'left', mb: 3, display: 'flex', flexDirection: 'column', gap: 1, px: 1 }}>
            {[
              'Full custom electronic beatmaker & synth programming matrices',
              'Multi-layered cinematic orchestral arrangement & instrumentation',
              'Tailored corporate advertising jingles & sound branding',
              'Access to advanced elite analog/digital sound synthesis systems',
              'Creative songwriting structure & composition consultation included'
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
            onClick={() => setIsInstrumentalPopupOpen(false)}
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

      {/* Studio Space Rental Request Pricing Popup */}
      <Dialog
        open={isRentalPopupOpen}
        onClose={() => setIsRentalPopupOpen(false)}
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
          onClick={() => setIsRentalPopupOpen(false)} 
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
            Elite Creative Production Spaces
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
            Rent our acoustically perfected live tracking rooms, control suites, and premium instruments.
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
              150,000 TZS
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
              149,999 TZS
            </Typography>
            <Typography 
              sx={{ 
                fontSize: '0.75rem',
                color: 'rgba(255, 255, 255, 0.5)',
                fontFamily: '"Linear", sans-serif',
                mt: 0.75
              }}
            >
              Price applies for 4-hour half-day creative studio session block.
            </Typography>
          </Box>

          {/* Inclusions List */}
          <Box sx={{ textAlign: 'left', mb: 3, display: 'flex', flexDirection: 'column', gap: 1, px: 1 }}>
            {[
              'Acoustically calibrated 400 sq ft main live room tracking space',
              'Control Room A console routing & high-end Genelec monitors',
              'Full access to Yamaha C7 grand piano, analog synths & custom drums',
              'Luxury artist lounges equipped with high-speed Wi-Fi',
              'Dedicated on-site resident tech setup assistant & runner'
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
            onClick={() => setIsRentalPopupOpen(false)}
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

      {/* Exit-Intent Scroll Promotion Dialog */}
      <Dialog
        open={isScrollPopupOpen}
        onClose={() => setIsScrollPopupOpen(false)}
        TransitionComponent={Grow}
        transitionDuration={{ enter: 450, exit: 300 }}
        PaperProps={{
          sx: {
            bgcolor: '#0c0c0e',
            border: '2px dashed rgba(255, 42, 116, 0.35)',
            borderRadius: 0, // Sharp!
            maxWidth: '520px',
            width: '100%',
            p: { xs: 4, sm: 5 },
            position: 'relative',
            boxShadow: '0 30px 70px rgba(0, 0, 0, 0.98), 0 0 30px rgba(255, 42, 116, 0.1)',
            backgroundImage: 'none',
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center'
          }
        }}
        sx={{
          backdropFilter: 'blur(12px)',
          '& .MuiBackdrop-root': {
            bgcolor: 'rgba(0, 0, 0, 0.88)'
          }
        }}
      >
        <DialogContent sx={{ p: 0, overflow: 'visible', color: 'white' }}>
          {/* Animated Glow Badge */}
          <Box 
            sx={{ 
              display: 'inline-flex',
              bgcolor: '#ff2a74',
              color: 'white',
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 800,
              fontSize: '0.72rem',
              letterSpacing: '0.12em',
              px: 2.2,
              py: 0.6,
              borderRadius: 0,
              textTransform: 'uppercase',
              mb: 3,
              boxShadow: '0 4px 12px rgba(255, 42, 116, 0.3)'
            }}
          >
            Wait! Before You Go...
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontFamily: '"AerodomeRegular-2vMGK", sans-serif',
              fontSize: { xs: '1.4rem', sm: '1.8rem' },
              fontWeight: 800,
              letterSpacing: '0.04em',
              mb: 1.5,
              color: 'white',
              textTransform: 'uppercase'
            }}
          >
            Discover Our Elite Keyboard Offerings
          </Typography>

          <Typography
            sx={{
              fontFamily: '"Linear", sans-serif',
              fontSize: '0.92rem',
              color: 'rgba(255, 255, 255, 0.6)',
              fontWeight: 300,
              lineHeight: 1.5,
              mb: 4,
              px: { xs: 0, sm: 1 }
            }}
          >
            You haven't explored our premium keyboard solutions yet! Master the keys yourself with expert lessons or book a concert-grade accompanist for your next special event.
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mb: 4 }}>
            {/* Piano Lessons Row */}
            <Box 
              sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.02)', 
                border: '1px solid rgba(255, 255, 255, 0.08)',
                p: 2.5,
                textAlign: 'left',
                borderRadius: 0,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 2,
                '&:hover': {
                  borderColor: 'rgba(255, 42, 116, 0.4)',
                  bgcolor: 'rgba(255, 42, 116, 0.02)'
                },
                transition: 'all 0.25s ease'
              }}
            >
              <Box>
                <Typography sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, color: 'white', fontSize: '1rem', mb: 0.5 }}>
                  Piano & Music Lessons
                </Typography>
                <Typography sx={{ fontFamily: '"Linear", sans-serif', fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.5)', fontWeight: 300 }}>
                  Weekly private grand lessons for all age & skill levels.
                </Typography>
              </Box>
              <Button
                component={RouterLink}
                to="/lessons"
                onClick={() => setIsScrollPopupOpen(false)}
                variant="contained"
                sx={{
                  bgcolor: '#ff2a74',
                  color: 'white',
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  borderRadius: 0,
                  px: 2.5,
                  py: 1,
                  textTransform: 'none',
                  whiteSpace: 'nowrap',
                  boxShadow: 'none',
                  '&:hover': { bgcolor: '#e01f61' }
                }}
              >
                Learn Keys
              </Button>
            </Box>

            {/* Piano Services Row */}
            <Box 
              sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.02)', 
                border: '1px solid rgba(255, 255, 255, 0.08)',
                p: 2.5,
                textAlign: 'left',
                borderRadius: 0,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 2,
                '&:hover': {
                  borderColor: 'rgba(255, 42, 116, 0.4)',
                  bgcolor: 'rgba(255, 42, 116, 0.02)'
                },
                transition: 'all 0.25s ease'
              }}
            >
              <Box>
                <Typography sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, color: 'white', fontSize: '1rem', mb: 0.5 }}>
                  Concert Accompanist Services
                </Typography>
                <Typography sx={{ fontFamily: '"Linear", sans-serif', fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.5)', fontWeight: 300 }}>
                  Performances for Sabbath, weddings, churches & recitals.
                </Typography>
              </Box>
              <Button
                component={RouterLink}
                to="/piano-services"
                onClick={() => setIsScrollPopupOpen(false)}
                variant="contained"
                sx={{
                  bgcolor: '#ff2a74',
                  color: 'white',
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  borderRadius: 0,
                  px: 2.5,
                  py: 1,
                  textTransform: 'none',
                  whiteSpace: 'nowrap',
                  boxShadow: 'none',
                  '&:hover': { bgcolor: '#e01f61' }
                }}
              >
                Book Player
              </Button>
            </Box>
          </Box>

          <Button
            onClick={() => setIsScrollPopupOpen(false)}
            sx={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 500,
              fontSize: '0.85rem',
              color: 'rgba(255, 255, 255, 0.4)',
              textTransform: 'none',
              borderRadius: 0,
              '&:hover': {
                color: 'white',
                bgcolor: 'transparent',
                textDecoration: 'underline'
              }
            }}
          >
            No thanks, keep scrolling
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Home;
