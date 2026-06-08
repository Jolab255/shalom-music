import React, { useState } from 'react';
import { Container, Typography, Box, Button, Divider, Grid2 as Grid, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';

// Search database catalog for all pricing options matching homepage popups exactly
const pricingData = {
  production: {
    headline: 'MUSIC PRODUCTION & ENGINEERING',
    subtitle: 'Professional multi-track capture, locations recording, and hybrid mixing/mastering solutions.',
    plans: [
      { 
        title: 'Audio Recording', 
        originalPrice: '80,000 TZS ($60 USD)',
        promoPrice: '79,999 TZS ($50 USD)', 
        unit: 'per studio tracking session',
        desc: 'Professional multi-track studio recording utilizing premium valve preamps and custom microphones.',
        features: ['Acoustically calibrated recording rooms', 'Premium valve & condenser microphone vault', 'Ultra-low noise analog console signal path', 'Dedicated tech setup assistant & runner'],
        popular: false 
      },
      { 
        title: 'Audio Mixing', 
        originalPrice: '100,000 TZS ($70 USD)',
        promoPrice: '99,999 TZS ($60 USD)', 
        unit: 'per multi-track song',
        desc: 'Balance your tracks with an elite three-dimensional soundstage and deep frequency separation.',
        features: ['Hybrid analog/digital board console mixing', 'Warm, rich frequency separation & panning', 'Stereo imaging & high-definition calibration', 'Bespoke hardware effects sends routing'],
        popular: false 
      },
      { 
        title: 'Complete Recording Package', 
        originalPrice: '250,000 TZS ($180 USD)',
        promoPrice: '249,999 TZS ($150 USD)', 
        unit: 'per full song project',
        desc: 'Our premier all-in-one package comprising recording, professional mixing, and high-fidelity mastering.',
        features: ['Complete multi-track studio recording (up to 8 hours)', 'Multi-dimensional audio mixing with elite console panning', 'Pristine industry-standard stereo mastering', 'Full access to concert grand piano & high-end microphone vault', '2 complimentary project revision cycles'],
        popular: true 
      },
      { 
        title: 'Audio Mastering', 
        originalPrice: '100,000 TZS ($70 USD)',
        promoPrice: '99,999 TZS ($60 USD)', 
        unit: 'per mixed stereo master',
        desc: 'Industry-standard loudness, transient preservation, and sonic balance for global streaming.',
        features: ['Loudness maximization for Spotify & Apple', 'Subtle harmonic saturation & high-end air', 'Full analog signal processing path', 'Distribution-ready DDP and WAV formats'],
        popular: false 
      },
      { 
        title: 'Audio Capturing', 
        originalPrice: '400,000 TZS ($280 USD)',
        promoPrice: '399,999 TZS ($250 USD)', 
        unit: 'per location recording project',
        desc: 'High-fidelity ambient sound capture and location sound for film overlays.',
        features: ['Specialized field recording modules', 'Stereo microphone array configurations', 'Organic background soundscape documenting', 'High-definition raw multitrack delivery'],
        popular: false 
      }
    ]
  },
  instrumental: {
    headline: 'INSTRUMENTAL CREATION',
    subtitle: 'Custom beatmaking, classical arrangements, and cinematic orchestral compositions.',
    plans: [
      { 
        title: 'Simple Track Instrumental', 
        originalPrice: '80,000 TZS ($60 USD)',
        promoPrice: '70,000 TZS ($50 USD)', 
        unit: 'per custom simple beat / track',
        desc: 'High-quality custom electronic beatmaking and straightforward rhythm arrangements.',
        features: ['Custom basic drum patterns & percussion', 'HQ stereo audio wave output', 'Standard commercial rights licensing', 'Up to 2 dynamic instrumentation layers'],
        popular: false 
      },
      { 
        title: 'Classical Instrumental', 
        originalPrice: '120,000 TZS ($90 USD)',
        promoPrice: '100,000 TZS ($70 USD)', 
        unit: 'per custom classical composition',
        desc: 'Traditional arrangement including acoustic grand piano, strings, and solo instruments.',
        features: ['Acoustic grand piano recording session', 'High-definition multitrack WAV delivery', 'Extended commercial licensing rights', 'Custom velocity dynamic touch balance'],
        popular: false 
      },
      { 
        title: 'Orchestral Instrumental', 
        originalPrice: '250,000 TZS ($180 USD)',
        promoPrice: '200,000 TZS ($140 USD)', 
        unit: 'per cinematic orchestral score',
        desc: 'Epic multi-layered symphonic scores, dramatic pads, brass sections, and complex polyphonic dynamics.',
        features: ['Colossal symphonic orchestral arrangement', 'Comprehensive string, brass & woodwind matrix', 'Exclusive full buyout commercial rights', 'Complete track files session folder bounce'],
        popular: true 
      }
    ]
  },
  lessons: {
    headline: 'PIANO & MUSIC LESSONS',
    subtitle: 'Unlock your potential at the keyboard with tailored private instruction for all levels.',
    plans: [
      { 
        title: 'Young Keys Academy', 
        originalPrice: '240,000 TZS ($170 USD)',
        promoPrice: '200,000 TZS ($140 USD)', 
        unit: 'per month (8 sessions / 25k per session)',
        desc: 'Interactive private keyboard adventures custom-tailored for younger attention spans. 8 sessions per month.',
        features: ['8 x 30-Minute private grand piano lessons', 'Complimentary Faber Adventures method books', 'Gamified visual notation & rhythmic cards', 'Acoustic grand practice room access (1 hr/week)', 'Secure student progress portfolio & practice logs', 'Monthly junior progress achievement certificate', 'Performance slot in seasonal recitals & showcases'],
        popular: false 
      },
      { 
        title: 'Beginner Foundations', 
        originalPrice: '320,000 TZS ($220 USD)',
        promoPrice: '280,000 TZS ($195 USD)', 
        unit: 'per month (8 sessions / 35k per session)',
        desc: 'Comprehensive starting point for teens and adults to master piano basics with solid techniques. 8 sessions per month.',
        features: ['8 x 50-Minute private grand piano lessons', 'Professional hand posture & finger articulation basics', 'Dual-clef note reading & common time signatures', 'Introductory repertoire including basic classical & pop', 'Single acoustic grand practice session access', '24/7 direct chat support with your instructor'],
        popular: false 
      },
      { 
        title: 'Intermediate Artistry', 
        originalPrice: '400,000 TZS ($280 USD)',
        promoPrice: '360,000 TZS ($250 USD)', 
        unit: 'per month (8 sessions / 45k per session)',
        desc: 'Consistent guidance to establish robust technique foundations and reading habits. 8 sessions per month.',
        features: ['8 x 1-Hour weekly grand piano lessons', 'ABRSM / Trinity graded syllabus integrated', 'Complimentary core lesson books & sheet music', 'Acoustic grand practice room access (2 hrs/week)', 'Secure student progress portfolio & practice tracker', 'Direct 24/7 instructor messaging support', '2 makeup lesson rollover credits per semester', 'Performance slot in seasonal showcases (including HD video recording of your play)'],
        popular: true 
      },
      { 
        title: 'Advanced Concert Mastery', 
        originalPrice: '480,000 TZS ($340 USD)',
        promoPrice: '400,000 TZS ($280 USD)', 
        unit: 'per month (8 sessions / 50k per session)',
        desc: 'Bespoke advanced curriculum targeted for board exams, auditions, and recitals. 8 sessions per month.',
        features: ['8 x 1-Hour flexible private lessons', 'Elite board exam preparation (ABRSM Grades 1-8)', 'All advanced curriculum books & materials included', 'Acoustic grand practice room access (4 hrs/week)', 'Secure student progress portfolio & physical performance feedback', 'Priority scheduling for all lessons', 'Unlimited makeup lesson self-rescheduling', 'VIP recital performance slot with multi-camera HD recording', 'Advanced music theory & multi-voice harmony workshops'],
        popular: false 
      }
    ]
  },
  rental: {
    headline: 'STUDIO ROOM RENTALS',
    subtitle: 'Rent our world-class acoustically calibrated tracking rooms for your private sessions.',
    plans: [
      { 
        title: 'Hourly Lockout', 
        originalPrice: '35,000 TZS ($25 USD)',
        promoPrice: '25,000 TZS ($18 USD)', 
        unit: 'per hour of studio time',
        desc: 'Flexible hourly room rental block for tracking, rehearsals, or practicing.',
        features: ['Acoustically calibrated room access', 'Yamaha C7 concert grand piano access', 'High-speed guest Wi-Fi connection', 'Dedicated tech setup assistant'],
        popular: false 
      },
      { 
        title: 'Daily Lockout', 
        originalPrice: '250,000 TZS ($180 USD)',
        promoPrice: '200,000 TZS ($140 USD)', 
        unit: 'per day of studio time (10-hr block)',
        desc: 'Exclusive full-day lockout block with zero timing or session interruptions.',
        features: ['10-Hour complete lockout pass', 'Unrestricted live & control room access', 'Assigned in-house recording engineer', 'Complimentary VIP studio refreshments', 'Full multi-track session files bounce'],
        popular: true 
      },
      { 
        title: 'Weekly Lockout', 
        originalPrice: '900,000 TZS ($640 USD)',
        promoPrice: '700,000 TZS ($490 USD)', 
        unit: 'per week of studio time (6-day block)',
        desc: 'Unleash your creative projects with complete weekly priority access.',
        features: ['6 Full days of priority studio booking', 'Private secure locker equipment storage', 'Control Desk preamp routing customization', 'Priority overnight multi-project backups', '24/7 building access privileges'],
        popular: false 
      }
    ]
  },
  pianoServices: {
    headline: 'PIANO ACCOMPANIST & PERFORMANCE BOOKINGS',
    subtitle: 'Book concert-grade grand piano performances and professional accompaniment for your special events.',
    plans: [
      { 
        title: 'Church Service Booking', 
        originalPrice: '150,000 TZS ($110 USD)',
        promoPrice: '120,000 TZS ($85 USD)', 
        unit: 'per service session',
        desc: 'Professional live piano accompaniment for worship services, Sabbath convocations, and choir rehearsals.',
        features: ['Liturgical worship accompaniment', 'Hymnal harmonizations & service playing', 'Choir support & rehearsal guidance', 'Prelude & postlude sacred music playing'],
        popular: false 
      },
      { 
        title: 'Camp Meeting Booking', 
        originalPrice: '500,000 TZS ($360 USD)',
        promoPrice: '399,999 TZS ($280 USD)', 
        unit: 'per day (multi-session)',
        desc: 'Dedicated all-day performance and accompaniment coverage for camp meetings, spiritual conventions, and outdoor retreats.',
        features: ['Up to 8 hours of live performance', 'Accompaniment for mass choirs & solos', 'Real-time transposition flexibility', 'Backup digital keyboard setup option'],
        popular: true 
      },
      { 
        title: 'Music Concert Booking', 
        originalPrice: '800,000 TZS ($580 USD)',
        promoPrice: '699,999 TZS ($490 USD)', 
        unit: 'per concert event',
        desc: 'Concert-grade piano recitals, collaborative classical accompanying for soloists, and chamber ensemble backing.',
        features: ['Virtuoso solo piano recitals', 'Collaborative sonata & aria performance', 'Chamber orchestra/ensemble backing', 'Direct stage setup & sound coordination'],
        popular: false 
      },
      { 
        title: 'Wedding Ceremony Booking', 
        originalPrice: '250,000 TZS ($180 USD)',
        promoPrice: '199,999 TZS ($140 USD)', 
        unit: 'per wedding event',
        desc: 'Score the special moments of your union with gorgeous live piano music for your processional, registry, and cocktail hour.',
        features: ['Custom bridal march processional', 'Registry signing background underscores', 'Elegant cocktail hour jazz/pop standards', 'Custom romantic song arrangements'],
        popular: false 
      },
      { 
        title: 'Function Booking', 
        originalPrice: '350,000 TZS ($250 USD)',
        promoPrice: '299,999 TZS ($210 USD)', 
        unit: 'per event session',
        desc: 'Polished background piano standards and walk-up fanfare playing for corporate banquets, award ceremonies, and grand launches.',
        features: ['Sophisticated ambient piano music', 'Official walk-up/theme fanfares', 'Flexible playlist curation', 'Seamless high-fidelity sound coordination'],
        popular: false 
      },
      { 
        title: 'Other Places Booking', 
        originalPrice: '200,000 TZS ($150 USD)',
        promoPrice: '149,999 TZS ($110 USD)', 
        unit: 'per booking session',
        desc: 'Versatile piano accompaniment for funerals, private home gatherings, academic masterclasses, and community events.',
        features: ['Solemn memorial service hymns', 'Academic masterclass demonstrations', 'High-end private home sessions', 'Flexible time block allocation'],
        popular: false 
      }
    ]
  },
  academy: {
    headline: 'AUDIO PRODUCTION SCHOOL',
    subtitle: 'Comprehensive 4-Grade curriculum from foundational sound to professional engineering mastery.',
    plans: [
      { 
        title: 'Grade 1 – Foundation', 
        originalPrice: '400,000 TZS ($180 USD)',
        promoPrice: '350,000 TZS ($150 USD)', 
        unit: 'per 3-month certificate course',
        desc: 'Introduce yourself to the fundamentals of sound, computer software (FL Studio/Cubase), and rhythmic composition.',
        features: [
          'Introduction to Music Production & Theory',
          'DAW Mechanics (FL Studio / Cubase Pro)',
          'MIDI Programming & Beat Making Basics',
          'Basic Audio Recording Foundations',
          'Final Project: Create a simple instrumental beat'
        ],
        popular: false 
      },
      { 
        title: 'Grade 2 – Intermediate', 
        originalPrice: '750,000 TZS ($320 USD)',
        promoPrice: '650,000 TZS ($280 USD)', 
        unit: 'per 3-month diploma program',
        desc: 'Build practical production skills in arrangement, chord progressions, and professional vocal capture techniques.',
        features: [
          'Advanced Beat Production & Chords',
          'Virtual Instruments & Sound Selection',
          'Vocal Recording & Mic Techniques',
          'Arrangement & Song Structure',
          'Final Project: Produce & record a complete song'
        ],
        popular: false 
      },
      { 
        title: 'Grade 3 – Advanced', 
        originalPrice: '1,100,000 TZS ($470 USD)',
        promoPrice: '950,000 TZS ($400 USD)', 
        unit: 'per 3-month advanced diploma',
        desc: 'Develop elite engineering ears with deep dives into mixing fundamentals, dynamic processing, and studio workflows.',
        features: [
          'Mixing Fundamentals & Signal Flow',
          'Surgical EQ & Dynamic Compression',
          'Spatial Reverb, Delay & Automation',
          'Advanced Choir & Group Production',
          'Final Project: Mix a full song professionally'
        ],
        popular: true 
      },
      { 
        title: 'Grade 4 – Professional', 
        originalPrice: '1,500,000 TZS ($640 USD)',
        promoPrice: '1,250,000 TZS ($530 USD)', 
        unit: 'per 3-month masterclass',
        desc: 'Master commercial delivery, professional mastering, music distribution, and the business of engineering.',
        features: [
          'Elite Mastering & LUFS Standards',
          'Live Tracking & Commercial Production',
          'Sound Design & Foley for Media',
          'Music Business: Royalties & Copyrights',
          'Final Project: Complete Commercial Release'
        ],
        popular: false 
      }
    ]
  }
};

const Pricing: React.FC = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'production';
  const initialCategory = ['production', 'instrumental', 'lessons', 'academy', 'rental', 'pianoServices'].includes(categoryParam)
    ? (categoryParam as any)
    : 'production';

  const [activeCategory, setActiveCategory] = useState<'production' | 'instrumental' | 'lessons' | 'academy' | 'rental' | 'pianoServices'>(initialCategory);

  React.useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && ['production', 'instrumental', 'lessons', 'academy', 'rental', 'pianoServices'].includes(cat)) {
      setActiveCategory(cat as any);
    }
  }, [searchParams]);

  const currentCategory = pricingData[activeCategory];

  return (
    <Box 
      sx={{ 
        bgcolor: '#000000', 
        color: 'white', 
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        pb: 15,
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
      <Helmet>
        <title>Pricing Plans & Rates | Shalom Music Studios</title>
        <meta name="description" content="Transparent, glassmorphic pricing options for music production, professional piano lessons, concert tuning, and high-end studio room rentals." />
        <link rel="canonical" href="https://shalommusic.co.tz/pricing" />
      </Helmet>

      {/* Ambient Pink Glow Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: '25%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '320px', sm: '600px', md: '800px' },
          height: { xs: '320px', sm: '600px', md: '800px' },
          background: 'radial-gradient(circle, rgba(255, 42, 116, 0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Category Tab Selectors */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3, pt: { xs: 3, md: 5 }, mb: { xs: 6, md: 8 } }}>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: { xs: 'flex-start', sm: 'center' }, 
            flexWrap: 'nowrap',
            gap: 1.5,
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            pb: 2,
            maxWidth: '100%',
            mx: 'auto',
            overflowX: 'auto',
            '-ms-overflow-style': 'none',
            'scrollbarWidth': 'none',
            '&::-webkit-scrollbar': {
              display: 'none'
            }
          }}
        >
          {[
            { id: 'production', label: 'Music Production' },
            { id: 'instrumental', label: 'Instrumental Creation' },
            { id: 'lessons', label: 'Piano Lessons' },
            { id: 'academy', label: 'Production School' },
            { id: 'rental', label: 'Studio Rental' },
            { id: 'pianoServices', label: 'Piano Services' }
          ].map((cat) => {
            const active = activeCategory === cat.id;
            return (
              <Button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                variant="contained"
                sx={{
                  flexShrink: 0,
                  bgcolor: active ? '#ff2a74' : 'rgba(255, 255, 255, 0.04)',
                  color: 'white',
                  fontWeight: 700,
                  px: { xs: 2.2, sm: 3 },
                  py: 1.2,
                  borderRadius: 0, // Sharp!
                  border: '1px solid',
                  borderColor: active ? '#ff2a74' : 'rgba(255, 255, 255, 0.08)',
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontSize: { xs: '0.78rem', sm: '0.88rem' },
                  letterSpacing: '0.04em',
                  boxShadow: active ? '0 6px 20px rgba(255, 42, 116, 0.25)' : 'none',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  '&:hover': {
                    bgcolor: active ? '#e01f61' : 'rgba(255, 255, 255, 0.1)',
                    borderColor: active ? '#e01f61' : 'rgba(255, 255, 255, 0.16)',
                    transform: 'translateY(-1px)'
                  }
                }}
              >
                {cat.label}
              </Button>
            );
          })}
        </Box>
      </Container>

      {/* Grid of Dynamic Cards */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        {/* Active Section Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              fontFamily: '"AerodomeRegular-2vMGK", sans-serif', // Correct heading font
              fontSize: { xs: '1.8rem', sm: '2.4rem', md: '2.8rem' },
              letterSpacing: '0.04em',
              mb: 1.5,
              color: '#ffffff'
            }}
          >
            {currentCategory.headline}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: '"Linear", sans-serif', // Correct paragraph font
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: { xs: '0.9rem', sm: '1.05rem' },
              maxWidth: '550px',
              mx: 'auto'
            }}
          >
            {currentCategory.subtitle}
          </Typography>
        </Box>

        {/* Pricing Cards Grid */}
        <Grid container spacing={4} alignItems="stretch" justifyContent="center" sx={{ mb: 15 }}>
          {currentCategory.plans.map((plan, idx) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx} sx={{ display: 'flex' }}>
              <Box 
                sx={{ 
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  bgcolor: 'rgba(12, 12, 15, 0.84)',
                  border: '1px solid',
                  borderColor: plan.popular ? '#ff2a74' : 'rgba(255, 255, 255, 0.08)',
                  borderRadius: 0, // Sharp corners!
                  borderTop: plan.popular ? '3px solid #ff2a74' : '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 30px 60px rgba(0, 0, 0, 0.95), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative', 
                  overflow: 'visible',
                  p: { xs: 4, sm: 5 },
                  '&:hover': { 
                    borderColor: '#ff2a74',
                    transform: 'translateY(-4px)',
                    boxShadow: '0 35px 80px rgba(0, 0, 0, 0.98), 0 0 15px rgba(255, 42, 116, 0.15)'
                  }
                }}
              >
                {/* Popularity BEST VALUE Badge */}
                {plan.popular && (
                  <Box 
                    sx={{ 
                      position: 'absolute', 
                      top: -14, 
                      left: '50%', 
                      transform: 'translateX(-50%)', 
                      bgcolor: '#ff2a74', 
                      color: 'white', 
                      px: 2.5, 
                      py: 0.5, 
                      fontSize: '0.7rem', 
                      fontWeight: 800, 
                      letterSpacing: '0.08em',
                      borderRadius: 0, // Sharp!
                      zIndex: 3,
                      boxShadow: '0 4px 15px rgba(255, 42, 116, 0.4)',
                      fontFamily: '"Space Grotesk", sans-serif',
                      textTransform: 'uppercase'
                    }}
                  >
                    BEST VALUE
                  </Box>
                )}

                {/* Card Title */}
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 700, 
                    fontFamily: '"Space Grotesk", sans-serif', // Correct sub-indicator font
                    fontSize: '1.2rem',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: '#ffffff',
                    mb: 1.5 
                  }}
                >
                  {plan.title}
                </Typography>

                {/* Card Description */}
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontFamily: '"Linear", sans-serif', // Correct paragraph font
                    color: 'rgba(255, 255, 255, 0.6)', 
                    fontWeight: 300,
                    lineHeight: 1.6,
                    minHeight: '66px',
                    mb: 3
                  }}
                >
                  {plan.desc}
                </Typography>

                {/* LIMITED OFFER - Pricing Panel */}
                <Box 
                  sx={{ 
                    bgcolor: 'rgba(255, 42, 116, 0.03)',
                    border: '1px dashed rgba(255, 42, 116, 0.25)',
                    borderRadius: 0, // Sharp!
                    py: 2.2,
                    px: 2,
                    mb: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}
                >
                  {/* Glowing Offer Badge */}
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
                      borderRadius: 0, // Sharp!
                      textTransform: 'uppercase'
                    }}
                  >
                    LIMITED OFFER
                  </Box>

                  {/* Original line-through price */}
                  <Typography 
                    sx={{ 
                      textDecoration: 'line-through', 
                      color: 'rgba(255, 255, 255, 0.45)', 
                      fontSize: '0.78rem',
                      fontFamily: '"Space Grotesk", sans-serif',
                      fontWeight: 500,
                      mb: 0.25,
                      mt: 0.5
                    }}
                  >
                    {plan.originalPrice}
                  </Typography>

                  {/* Promo discounted price */}
                  <Typography 
                    sx={{ 
                      color: '#ff2a74', 
                      fontWeight: 900, 
                      fontSize: { xs: '1.05rem', sm: '1.2rem', md: '1.3rem' },
                      fontFamily: '"Space Grotesk", sans-serif',
                      lineHeight: 1
                    }}
                  >
                    {plan.promoPrice}
                  </Typography>

                  {/* Pricing Unit text */}
                  <Typography 
                    sx={{ 
                      fontSize: '0.72rem',
                      color: 'rgba(255, 255, 255, 0.5)',
                      fontFamily: '"Linear", sans-serif',
                      mt: 0.8
                    }}
                  >
                    Price applies {plan.unit}
                  </Typography>
                </Box>

                <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)', mb: 4 }} />

                {/* Features List */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 5, flexGrow: 1 }}>
                  {plan.features.map((f, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <CheckIcon sx={{ color: '#ff2a74', mr: 1.5, fontSize: '1.1rem', mt: 0.15, flexShrink: 0 }} />
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontFamily: '"Linear", sans-serif', // Correct paragraph font
                          color: 'rgba(255, 255, 255, 0.82)', 
                          fontWeight: 300,
                          lineHeight: 1.45
                        }}
                      >
                        {f}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                {/* Custom Branded Tab Action Button */}
                <Button 
                  component={RouterLink}
                  to={`/contact?service=${activeCategory}`}
                  variant={plan.popular ? "contained" : "outlined"} 
                  fullWidth 
                  sx={{ 
                    py: 1.5, 
                    bgcolor: plan.popular ? '#ff2a74' : 'transparent', 
                    color: plan.popular ? 'white' : '#ff2a74', 
                    border: '2px solid #ff2a74',
                    borderRadius: 0, // Sharp!
                    fontFamily: '"Space Grotesk", sans-serif', // Correct button font
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    textTransform: 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': { 
                      bgcolor: plan.popular ? '#e01f61' : '#ff2a74', 
                      color: 'white',
                      borderColor: plan.popular ? '#e01f61' : '#ff2a74',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 24px rgba(255, 42, 116, 0.35)'
                    } 
                  }}
                >
                  {activeCategory === 'academy' ? 'Inquire About Course' : 'Book Professional Package'}
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Dynamic FAQ Section */}
        <Box sx={{ maxWidth: 850, mx: 'auto', mt: { xs: 8, md: 12 }, position: 'relative', zIndex: 2 }}>
          <Typography 
            variant="h4" 
            align="center" 
            sx={{ 
              fontWeight: 800, 
              fontFamily: '"AerodomeRegular-2vMGK", sans-serif', // Correct heading font
              fontSize: { xs: '1.8rem', sm: '2.4rem' },
              letterSpacing: '0.04em',
              mb: 6,
              color: '#ffffff'
            }}
          >
            FREQUENTLY ASKED QUESTIONS
          </Typography>
          {[
            { q: 'Can I cancel or pause my monthly lessons package?', a: 'Yes. You can cancel or pause your weekly lessons subscription at any time with a 2-week written notice. Unused sessions in a billing cycle can be rescheduled with 24-hour advance warning.' },
            { q: 'Is professional studio gear and engineering included in the production cost?', a: 'Absolutely. All pricing packages include access to our complete high-end microphone vault, calibrated tracking environments, analog/digital hardware desks, and a dedicated in-house professional audio engineer.' },
            { q: 'Do you offer remote or online virtual classes?', a: 'No, all piano lessons are held physically in our world-class studio classrooms. We believe in the power of direct physical guidance, hands-on hand posture alignment, and direct mechanical experience on our real acoustic grand pianos.' },
            { q: 'What is the turnaround time for mixing and mastering projects?', a: 'A standard single track production takes 5-7 business days from the final recording date. Complete EPs take approximately 2-3 weeks, depending on review and revision speed.' },
            { q: 'How often should a grand or upright piano receive tuning services?', a: 'To maintain the best soundboard health and tuning stability, residential pianos should be calibrated twice a year. High-use teaching grand pianos or recording studio grand pianos receive monthly maintenance tunings.' }
          ].map((faq, i) => (
            <Accordion 
              key={i} 
              elevation={0} 
              sx={{ 
                bgcolor: 'transparent',
                backgroundImage: 'none',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                color: 'white',
                '&:before': { display: 'none' },
                py: 1
              }}
            >
              <AccordionSummary 
                expandIcon={<ExpandMoreIcon sx={{ color: '#ff2a74', fontSize: '1.6rem' }} />}
                sx={{ px: 1 }}
              >
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600,
                    fontFamily: '"Space Grotesk", sans-serif',
                    fontSize: { xs: '0.98rem', sm: '1.1rem' },
                    color: '#ffffff'
                  }}
                >
                  {faq.q}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 1, pb: 3 }}>
                <Typography 
                  sx={{ 
                    fontFamily: '"Linear", sans-serif', // Correct paragraph font
                    color: 'rgba(255, 255, 255, 0.65)',
                    fontWeight: 300,
                    fontSize: '0.95rem',
                    lineHeight: 1.7
                  }}
                >
                  {faq.a}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Pricing;
