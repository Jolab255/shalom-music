import React, { useState } from 'react';
import { Container, Typography, Box, Button, Divider, Grid2 as Grid, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
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
        originalPrice: '80,000 TZS',
        promoPrice: '79,999 TZS', 
        unit: 'per studio tracking session',
        desc: 'Professional multi-track studio recording utilizing premium valve preamps and custom microphones.',
        features: ['Acoustically calibrated recording rooms', 'Premium valve & condenser microphone vault', 'Ultra-low noise analog console signal path', 'Dedicated tech setup assistant & runner'],
        popular: false 
      },
      { 
        title: 'Audio Mixing', 
        originalPrice: '100,000 TZS',
        promoPrice: '99,999 TZS', 
        unit: 'per multi-track song',
        desc: 'Balance your tracks with an elite three-dimensional soundstage and deep frequency separation.',
        features: ['Hybrid analog/digital board console mixing', 'Warm, rich frequency separation & panning', 'Stereo imaging & high-definition calibration', 'Bespoke hardware effects sends routing'],
        popular: false 
      },
      { 
        title: 'Complete Recording Package', 
        originalPrice: '250,000 TZS',
        promoPrice: '249,999 TZS', 
        unit: 'per full song project',
        desc: 'Our premier all-in-one package comprising recording, professional mixing, and high-fidelity mastering.',
        features: ['Complete multi-track studio recording (up to 8 hours)', 'Multi-dimensional audio mixing with elite console panning', 'Pristine industry-standard stereo mastering', 'Full access to concert grand piano & high-end microphone vault', '2 complimentary project revision cycles'],
        popular: true 
      },
      { 
        title: 'Audio Mastering', 
        originalPrice: '100,000 TZS',
        promoPrice: '99,999 TZS', 
        unit: 'per mixed stereo master',
        desc: 'Industry-standard loudness, transient preservation, and sonic balance for global streaming.',
        features: ['Loudness maximization for Spotify & Apple', 'Subtle harmonic saturation & high-end air', 'Full analog signal processing path', 'Distribution-ready DDP and WAV formats'],
        popular: false 
      },
      { 
        title: 'Instrumental Creation', 
        originalPrice: '300,000 TZS',
        promoPrice: '299,999 TZS', 
        unit: 'per custom composition',
        desc: 'Bespoke custom beats, arrangements, and multi-track song arrangements.',
        features: ['Custom rhythmic arrangements', 'Vintage synthesizers & grand piano tracking', 'Exclusive full commercial rights licensing', 'Tailored to your specific vocal range'],
        popular: false 
      },
      { 
        title: 'Audio Capturing', 
        originalPrice: '400,000 TZS',
        promoPrice: '399,999 TZS', 
        unit: 'per location recording project',
        desc: 'High-fidelity ambient sound capture and location sound for film overlays.',
        features: ['Specialized field recording modules', 'Stereo microphone array configurations', 'Organic background soundscape documenting', 'High-definition raw multitrack delivery'],
        popular: false 
      }
    ]
  },
  lessons: {
    headline: 'PIANO & MUSIC LESSONS',
    subtitle: 'Unlock your potential at the keyboard with tailored private instruction for all levels.',
    plans: [
      { 
        title: 'Casual Learner', 
        originalPrice: '60,000 TZS',
        promoPrice: '49,999 TZS', 
        unit: 'per single private session',
        desc: 'Flexible booking tailored for busy modern schedules and recreational goals.',
        features: ['45-Minute privategrand piano lesson', 'No rigid long-term commitments', 'Custom digitized practice assignments', 'All age and skill levels welcome', 'Acoustic concert grand practice access'],
        popular: false 
      },
      { 
        title: 'Weekly Progress', 
        originalPrice: '220,000 TZS',
        promoPrice: '179,999 TZS', 
        unit: 'per 4-session monthly package',
        desc: 'Consistent guidance to establish robust technique foundations and reading habits.',
        features: ['4 x 45-Minute weekly Grand lessons', 'Accelerated scale & velocity exercises', 'Personalized homework check portfolios', 'Bi-weekly virtual practice consultations', 'Recital performance program eligibility'],
        popular: true 
      },
      { 
        title: 'Performance Path', 
        originalPrice: '600,000 TZS',
        promoPrice: '499,999 TZS', 
        unit: 'per 12-session course bundle',
        desc: 'Bespoke advanced curriculum targeted for board exams, auditions, and recitals.',
        features: ['12 x 45-Minute flexible lessons', 'Advanced grand repertoire voicing', 'Board exam, audition & recital prep', '24/7 direct instructor messaging channel', 'Complex music theory & harmony modules'],
        popular: false 
      }
    ]
  },
  rental: {
    headline: 'STUDIO ROOM RENTALS',
    subtitle: 'Rent our world-class acoustically calibrated tracking rooms for your private sessions.',
    plans: [
      { 
        title: '4-Hour Half-Day Lockout', 
        originalPrice: '150,000 TZS',
        promoPrice: '149,999 TZS', 
        unit: 'per 4-hour creative lockout',
        desc: 'Exclusive half-day session lockout block for tracking vocals or grand piano.',
        features: ['400 sq ft main live room tracking space', 'Control Room A Genelec monitor routing', 'Yamaha C7 concert grand piano access', 'Luxury artist lounges with high-speed Wi-Fi', 'Dedicated on-site tech setup assistant'],
        popular: true 
      },
      { 
        title: 'Full Day Lockout', 
        originalPrice: '400,000 TZS',
        promoPrice: '349,999 TZS', 
        unit: 'per 10-hour full lockout',
        desc: 'Unleash your creative projects with zero timing or session interruptions.',
        features: ['10-Hour complete lockout pass', 'Unrestricted live & control room access', 'Assigned in-house recording engineer', 'Complimentary VIP studio refreshments', 'Full multi-track session files bounce'],
        popular: false 
      },
      { 
        title: 'Monthly Resident Pack', 
        originalPrice: '1,500,000 TZS',
        promoPrice: '1,299,999 TZS', 
        unit: 'per 40-hour monthly resident package',
        desc: 'Your creative home with locked-in priority lockout rates and equipment.',
        features: ['40 Hours of priority studio booking', 'Private secure locker equipment storage', 'Priority overnight multi-project backups', 'Control Desk preamp routing customization', '4 complimentary guest session hours'],
        popular: false 
      }
    ]
  },
  pianoServices: {
    headline: 'CONCERT PIANO SERVICES',
    subtitle: 'Preserve the action mechanism accuracy and soundboard depth of grand instruments.',
    plans: [
      { 
        title: 'Standard Tuning', 
        originalPrice: '200,000 TZS',
        promoPrice: '149,999 TZS', 
        unit: 'per standard grand tuning service',
        desc: 'Keep your instrument pitch-perfect and structurally calibrated.',
        features: ['Professional Pitch Raise and Tuning', 'Comprehensive action mechanism inspection', 'Soundboard, bridge & pinblock checks', 'Relative humidity consulting', '2-Hour dedicated concert grand work'],
        popular: false 
      },
      { 
        title: 'Touch Regulation', 
        originalPrice: '480,000 TZS',
        promoPrice: '399,999 TZS', 
        unit: 'per key regulation overhaul',
        desc: 'Calibrate key responsiveness, velocity touch, and velocity balance.',
        features: ['Complete grand key mechanism calibration', 'Key leveling & key dip depth adjustments', 'Hammer blow & escapement alignments', 'Highly recommended every 2 years', 'Complete damper action alignments'],
        popular: true 
      },
      { 
        title: 'Hammer Voicing', 
        originalPrice: '300,000 TZS',
        promoPrice: '249,999 TZS', 
        unit: 'per concert voicing service',
        desc: 'Unlock deep mellow warmth or brilliant concert power from your hammers.',
        features: ['Needle hammer felt voicing adjust', 'Concert tone balance key-by-key alignment', 'String seating & string leveling', 'Highly recommended before sessions', 'Acoustic voicing to specific room profile'],
        popular: false 
      }
    ]
  }
};

const Pricing: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'production' | 'lessons' | 'rental' | 'pianoServices'>('production');

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
        <title>Pricing Plans & Rates | Shalom Music</title>
        <meta name="description" content="Transparent, glassmorphic pricing options for music production, professional piano lessons, concert tuning, and high-end studio room rentals." />
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
            justifyContent: 'center', 
            flexWrap: 'wrap',
            gap: 1.5,
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            pb: 2,
            maxWidth: '820px',
            mx: 'auto'
          }}
        >
          {[
            { id: 'production', label: 'Music Production' },
            { id: 'lessons', label: 'Piano Lessons' },
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
                      textTransform: 'uppercase',
                      animation: 'pulseGlow 2s infinite alternate',
                      '@keyframes pulseGlow': {
                        '0%': { boxShadow: '0 0 8px rgba(255, 42, 116, 0.3)' },
                        '100%': { boxShadow: '0 0 16px rgba(255, 42, 116, 0.6)' }
                      }
                    }}
                  >
                    LIMITED OFFER
                  </Box>

                  {/* Original line-through price */}
                  <Typography 
                    sx={{ 
                      textDecoration: 'line-through', 
                      color: 'rgba(255, 255, 255, 0.45)', 
                      fontSize: '1.05rem',
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
                      fontSize: { xs: '1.6rem', sm: '1.9rem', md: '2.1rem' },
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
                  to="/contact"
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
                  Book Professional Package
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
            { q: 'Do you offer hybrid or completely remote online lessons?', a: 'Yes. We provide high-definition, multi-camera virtual piano and music theory instruction via Zoom or Google Meet. Students globally can study using our custom digitized sheet modules.' },
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
