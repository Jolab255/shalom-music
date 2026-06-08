import React from 'react';
import { Container, Typography, Box, Paper, Divider, Grid2 as Grid, Button, List, ListItem, ListItemIcon, ListItemText, IconButton, Dialog, DialogContent, Grow } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import audioRecordingImg from '../assets/audio-recording.webp';
import audioEditingImg from '../assets/audio-editing.webp';
import audioMasteringImg from '../assets/audio-mastering.webp';
import instrumentalCreationImg from '../assets/instrumental-creation.webp';
import shalomCtaVideo from '../assets/shalom-cta.mp4';

// Academy Tuition Packages data
const academyPackages = [
  {
    id: 0,
    num: '01',
    title: 'Grade 1 – Foundation Level',
    duration: '3 Months (Certificate)',
    price: '350,000 TZS ($150 USD)',
    originalPrice: '400,000 TZS ($180 USD)',
    description: 'Perfect for beginners. Introduce yourself to the fundamentals of sound, software, and rhythmic composition.',
    objective: 'Introduce students to music production basics.',
    image: audioRecordingImg,
    subjects: [
      { name: 'Introduction to Music Production', desc: 'Overview of the production process and the role of the modern producer.' },
      { name: 'Basic Music Theory', desc: 'Foundations of rhythm, scales, and chords necessary for composing music.' },
      { name: 'Computer & DAW Basics', desc: 'Understanding audio hardware, file structures, and software setup.' },
      { name: 'Introduction to FL Studio / Cubase pro', desc: 'Comprehensive walkthrough of DAW interfaces and essential toolsets.' },
      { name: 'Rhythm and Beat Making', desc: 'Crafting drum patterns and rhythmic grooves for various musical styles.' },
      { name: 'MIDI Programming', desc: 'Master virtual instrument sequencing and MIDI editing techniques.' },
      { name: 'Basic Audio Recording', desc: 'Introduction to microphone types, placement, and signal path basics.' }
    ],
    finalProject: 'Create a simple instrumental beat.',
    inclusions: [
      'Digital Audio Workstation (DAW) configuration',
      'Fundamentals of acoustics & frequency spectrums',
      'Basic MIDI arrangement & beat sequencing',
      'Essential recording techniques for vocals',
      'Basic EQ, compression, & track balancing',
      'Official Shalom Music Foundation Certificate'
    ]
  },
  {
    id: 1,
    num: '02',
    title: 'Grade 2 – Intermediate Level',
    duration: '3 Months (Diploma)',
    price: '650,000 TZS ($280 USD)',
    originalPrice: '750,000 TZS ($320 USD)',
    description: 'Build practical skills in arrangement, vocal capture, and multi-track production.',
    objective: 'Build practical production skills.',
    image: audioEditingImg,
    subjects: [
      { name: 'Advanced Beat Production', desc: 'Complex drum layers, syncopation, and advanced rhythmic variations.' },
      { name: 'Chord Progressions', desc: 'Theory of emotional harmony and building professional song foundations.' },
      { name: 'Virtual Instruments', desc: 'Expert use of synths, samplers, and orchestral libraries for rich sounds.' },
      { name: 'Vocal Recording Techniques', desc: 'Professional mic selection and environment setup for high-quality vocals.' },
      { name: 'Audio Editing', desc: 'Surgical timing correction, pitch alignment, and noise cleanup workflows.' },
      { name: 'Arrangement and Song Structure', desc: 'Navigating verse-chorus dynamics and building effective song energy.' },
      { name: 'Choir Recording Basics', desc: 'Specialized techniques for capturing multi-voice ensembles and harmonies.' }
    ],
    finalProject: 'Produce and record a complete song.',
    inclusions: [
      'Advanced music production in Ableton & Pro Tools',
      'Vocal editing, pitch correction (Melodyne/Autotune)',
      'Subtractive & Wavetable sound synthesis design',
      'Creative arrangement & custom beatmaking templates',
      'Industry-standard dynamic & spatial mixing techniques',
      'Complete portfolio development & Mix Diploma'
    ]
  },
  {
    id: 2,
    num: '03',
    title: 'Grade 3 – Advanced Production',
    duration: '3 Months (Advanced Diploma)',
    price: '950,000 TZS ($400 USD)',
    originalPrice: '1,100,000 TZS ($470 USD)',
    description: 'Develop professional engineering ears with deep dives into mixing and studio workflows.',
    objective: 'Develop professional production skills.',
    image: instrumentalCreationImg,
    subjects: [
      { name: 'Mixing Fundamentals', desc: 'The art of balancing volume, pan, and depth in a multi-track session.' },
      { name: 'Equalization (EQ)', desc: 'Frequency management to create clarity and remove sonic conflicts.' },
      { name: 'Compression', desc: 'Dynamic range control for consistency, punch, and professional presence.' },
      { name: 'Reverb and Delay', desc: 'Building three-dimensional space and atmospheric depth in your tracks.' },
      { name: 'Automation', desc: 'Dynamic parameter control to add movement and excitement to the mix.' },
      { name: 'Advanced Choir Production', desc: 'Mixing large vocal stacks and complex choral arrangements.' },
      { name: 'Studio Workflow', desc: 'Professional project management and speed-optimized engineering habits.' }
    ],
    finalProject: 'Mix a full song professionally.',
    inclusions: [
      'Concert-grade analog hardware console signal flow',
      'Advanced surround mixing & audio-post for video',
      'Mid-Side EQ processing & surgical multi-band control',
      'Commercial loudness matching (LUFS) for DSPs',
      'Music business, copyrights, & studio management',
      'Elite Studio Engineer Masterclass graduation badge'
    ]
  },
  {
    id: 3,
    num: '04',
    title: 'Grade 4 – Professional Engineering',
    duration: '3 Months (Elite masterclass)',
    price: '1,250,000 TZS ($530 USD)',
    originalPrice: '1,500,000 TZS ($640 USD)',
    description: 'Master commercial delivery, mastering, and the business of being a professional engineer.',
    objective: 'Prepare students for commercial work.',
    image: audioMasteringImg,
    subjects: [
      { name: 'Mastering Techniques', desc: 'Final sonic polish, stereo enhancement, and loudness optimization.' },
      { name: 'Live Recording Sessions', desc: 'Managing full band or ensemble sessions in real-time environments.' },
      { name: 'Commercial Music Production', desc: 'Standards for radio, film, and global streaming platforms.' },
      { name: 'Sound Design', desc: 'Synthesis and foley techniques for custom sound creation and media.' },
      { name: 'Music Distribution', desc: 'Navigating DSPs (Spotify/Apple) and digital release strategies.' },
      { name: 'Copyright and Royalties', desc: 'Understanding legal protection, publishing, and revenue streams.' },
      { name: 'Client Management', desc: 'Professional communication and business practices for studio engineers.' }
    ],
    finalProject: 'Produce, mix, and master a commercial-quality track.',
    inclusions: [
      'Mastering Techniques & LUFS Standards',
      'Live Recording Sessions (Bands/Choirs)',
      'Commercial Music Production Standards',
      'Sound Design & Foley for Media',
      'Music Distribution, Copyright & Royalties',
      'Official Shalom Music Elite Engineering Badge'
    ]
  }
];

// Academy Modules
const academyModules = [
  {
    num: 'M01',
    title: 'DAW & Foundation',
    desc: 'Master the core mechanics of FL Studio or Cubase Pro. Learn setup, signal routing, and essential software shortcuts.'
  },
  {
    num: 'M02',
    title: 'Beat & MIDI Design',
    desc: 'Deep dive into rhythmic sequencing, groove creation, and MIDI orchestration using premium virtual instruments.'
  },
  {
    num: 'M03',
    title: 'Vocal & Instrument Capture',
    desc: 'Learn professional microphone placement and gain staging for vocals, choirs, and acoustic instruments.'
  },
  {
    num: 'M04',
    title: 'The Art of the Mix',
    desc: 'Master frequency balance, dynamic control, and spatial positioning to make your tracks sound huge and clear.'
  },
  {
    num: 'M05',
    title: 'Mastering & Polish',
    desc: 'Learn the final stage of production: loudness optimization, stereo field correction, and high-end sonic polish.'
  },
  {
    num: 'M06',
    title: 'Business & Publishing',
    desc: 'Navigate copyrights, royalties, digital distribution, and professional client management for a sustainable career.'
  }
];

const Academy: React.FC = () => {
  const [isPricingOpen, setIsPricingOpen] = React.useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);
  const [selectedPkgId, setSelectedPkgId] = React.useState<number | null>(null);

  const handleInquirePackage = (pkgId: number) => {
    setSelectedPkgId(pkgId);
    setIsDetailsOpen(false); // Close details if open
    setIsPricingOpen(true);
  };

  const handleReadMore = (pkgId: number) => {
    setSelectedPkgId(pkgId);
    setIsDetailsOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Professional Audio Production School | Shalom Music Studios</title>
        <meta name="description" content="Certified music production, sound engineering, vocal editing, mixing, and mastering courses in Dar es Salaam, Tanzania. Elevate your sound with hands-on academy training." />
        <link rel="canonical" href="https://shalommusic.co.tz/academy" />
      </Helmet>

      {/* Main Page Wrapper */}
      <Box 
        sx={{ 
          bgcolor: '#08080a', 
          color: 'white', 
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
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
            height: { xs: 'auto', md: '80vh' },
            minHeight: { xs: '550px', md: '80vh' },
            pt: { xs: 12, sm: 14, md: 16 },
            pb: { xs: 12, sm: 14, md: 16 },
            position: 'relative',
            overflow: 'hidden',
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
            src={audioRecordingImg}
            alt="Audio production school student mixing tracks"
            initial={{ scale: 1.0 }}
            animate={{ scale: 1.15 }}
            transition={{
              duration: 30,
              ease: 'linear',
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

          {/* Ambient Glow */}
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
                Audio Production School
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
                Master the art of recording, sound design, vocal editing, mixing, and mastering. Learn in our state-of-the-art studio with 1-on-1 mentorship from certified engineers. Break into the industry with an elite portfolio of commercial-grade tracks.
              </Typography>

              <Box sx={{ display: 'flex', gap: 2.5, flexWrap: 'wrap' }}>
                <Button 
                  onClick={() => {
                    const element = document.getElementById('academy-pricing');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
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
                  Enroll Now
                </Button>
                <Button 
                  onClick={() => {
                    const element = document.getElementById('academy-modules');
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
                  Explore Modules
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Why Choose Us Section */}
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
            <Typography 
              variant="h3" 
              align="center" 
              sx={{ 
                mb: 10, 
                fontWeight: 800,
                fontFamily: '"AerodomeRegular-2vMGK", sans-serif',
                fontSize: { xs: '1.8rem', sm: '2.5rem', md: '2.8rem' },
                letterSpacing: '0.04em',
                color: '#ffffff',
                textTransform: 'uppercase'
              }}
            >
              The Academy Standards
            </Typography>

            <Grid container spacing={4}>
              {[
                { title: 'Concert-Grade Studios', desc: 'Work directly on state-of-the-art studio monitors, hybrid digital-analog consoles, and professional recording booths.' },
                { title: '1-on-1 Mentorship', desc: 'No crowded classrooms. Get direct guidance, mix feedbacks, and specialized mentorship sessions tailored to your pace.' },
                { title: 'Portfolio Development', desc: 'Focus strictly on creating a body of work. Graduate with 3 fully produced, mixed, and mastered commercial-grade tracks.' },
                { title: 'Music Business Ready', desc: 'Master publishing, metadata templates, copyrights licensing, DSP distribution setups, and personal producer branding.' }
              ].map((item, idx) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
                  <Paper 
                    elevation={0}
                    sx={{
                      p: 4,
                      height: '100%',
                      bgcolor: 'rgba(255, 255, 255, 0.01)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      borderRadius: '0px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 700, 
                        fontFamily: '"Space Grotesk", sans-serif',
                        color: '#ff2a74',
                        textTransform: 'uppercase',
                        fontSize: '1rem',
                        letterSpacing: '0.05em'
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.65)', 
                        fontFamily: '"Linear", sans-serif',
                        lineHeight: 1.6
                      }}
                    >
                      {item.desc}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Modules Section */}
        <Container id="academy-modules" maxWidth="lg" sx={{ py: 15, position: 'relative', zIndex: 2 }}>
          <Typography 
            variant="h3" 
            align="center" 
            sx={{ 
              mb: 2, 
              fontWeight: 800,
              fontFamily: '"AerodomeRegular-2vMGK", sans-serif',
              fontSize: { xs: '1.8rem', sm: '2.5rem', md: '2.8rem' },
              letterSpacing: '0.04em',
              color: '#ffffff',
              textTransform: 'uppercase'
            }}
          >
            Curriculum Modules
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
            Our industry-aligned tracks cover the complete lifecycle of audio engineering. Learn core modules sequentially to form a competitive, practical sound baseline.
          </Typography>

          <Grid container spacing={3}>
            {academyModules.map((item, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 4, 
                    bgcolor: 'rgba(255, 255, 255, 0.02)', 
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '0px', 
                    backdropFilter: 'blur(5px)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    minHeight: '210px'
                  }}
                >
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      color: '#ff2a74', 
                      fontFamily: '"Space Grotesk", sans-serif',
                      fontWeight: 900,
                      fontSize: '0.82rem',
                      letterSpacing: '0.1em'
                    }}
                  >
                    {item.num}
                  </Typography>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 700,
                      fontFamily: '"Space Grotesk", sans-serif',
                      fontSize: '1.1rem',
                      lineHeight: 1.25,
                      textTransform: 'uppercase',
                      color: 'white'
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontFamily: '"Linear", sans-serif',
                      color: 'rgba(255, 255, 255, 0.65)',
                      lineHeight: 1.5,
                      fontSize: '0.85rem'
                    }}
                  >
                    {item.desc}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Pricing / Admission Section */}
        <Box 
          id="academy-pricing"
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
                color: '#ffffff'
              }}
            >
              Programs & Tuition Rates
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
              Enroll in a program tailored to your career milestones, from short foundational bootcamps to comprehensive, elite multi-month audio diplomas.
            </Typography>

            <Grid container spacing={4} alignItems="stretch">
              {academyPackages.map((pkg, idx) => (
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
                      borderRadius: '0px',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.02)',
                      p: 4
                    }}
                  >
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
                      {pkg.duration}
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

                    {/* Inclusion Box */}
                    <Box 
                      sx={{ 
                        bgcolor: 'rgba(255, 255, 255, 0.01)',
                        border: '1px solid rgba(255, 255, 255, 0.03)',
                        p: 3,
                        mb: 2,
                        flexGrow: 1
                      }}
                    >
                      <List sx={{ p: 0, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        {pkg.inclusions.slice(0, 5).map((item, i) => (
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

                    <Typography 
                      onClick={() => handleReadMore(pkg.id)}
                      sx={{ 
                        color: '#ff2a74', 
                        cursor: 'pointer', 
                        textDecoration: 'underline',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        mb: 4,
                        textAlign: 'center',
                        display: 'block',
                        fontFamily: '"Space Grotesk", sans-serif',
                      }}
                    >
                      Read More & Syllabus
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
                        Inquire Program
                      </Button>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Final CTA with Video background */}
        <Box
          sx={{
            bgcolor: '#000000',
            borderTop: '1px solid rgba(255, 255, 255, 0.04)',
            position: 'relative',
            overflow: 'hidden',
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
          <Box
            sx={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              width: '100%', height: '100%',
              overflow: 'hidden',
              zIndex: 1,
              pointerEvents: 'none',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
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
                color: '#ffffff',
                mb: 3
              }}
            >
              Ready to Control the Board?
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
              Schedule a personal studio tour or speak with our lead program advisor to customize your learning schedule. Classes open monthly.
            </Typography>
            <Button 
              component={RouterLink}
              to="/contact?service=school&package=Audio%20Production%20School%20Enrollment"
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
              Book Studio Tour & Apply
            </Button>
          </Container>
        </Box>

        {/* Read More / Detailed Information Modal */}
        <Dialog
          open={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          TransitionComponent={Grow}
          transitionDuration={{ enter: 450, exit: 250 }}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              bgcolor: '#0a0a0a',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '0px',
              backgroundImage: 'none',
              color: 'white',
              overflowY: 'auto',
              '&::-webkit-scrollbar': { display: 'none' },
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }
          }}
          sx={{
            backdropFilter: 'blur(10px)',
            '& .MuiBackdrop-root': { bgcolor: 'rgba(0, 0, 0, 0.88)' }
          }}
        >
          <IconButton 
            onClick={() => setIsDetailsOpen(false)} 
            sx={{ position: 'absolute', top: 16, right: 16, zIndex: 10, color: 'white', bgcolor: 'rgba(0,0,0,0.4)', '&:hover': { bgcolor: '#ff2a74' } }}
          >
            <CloseIcon />
          </IconButton>

          {selectedPkgId !== null && (() => {
            const pkg = academyPackages[selectedPkgId];
            if (!pkg) return null;
            return (
              <DialogContent 
                sx={{ 
                  p: 0,
                  overflowY: 'auto',
                  '&::-webkit-scrollbar': { display: 'none' },
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}
              >
                <Grid container>
                  {/* Modal Header Image */}
                  <Grid size={{ xs: 12 }}>
                    <Box sx={{ width: '100%', height: { xs: '200px', sm: '320px' }, position: 'relative', overflow: 'hidden' }}>
                      <Box 
                        component="img" 
                        src={pkg.image} 
                        alt={pkg.title} 
                        sx={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, transparent 0%, #0a0a0a 100%)' }} />
                      <Box sx={{ position: 'absolute', bottom: 24, left: { xs: 24, sm: 40 } }}>
                        <Typography variant="overline" sx={{ color: '#ff2a74', fontWeight: 800, letterSpacing: '0.2em' }}>{pkg.duration}</Typography>
                        <Typography variant="h3" sx={{ fontWeight: 900, fontFamily: '"AerodomeRegular-2vMGK", sans-serif', textTransform: 'uppercase', mt: 1 }}>{pkg.title}</Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Box sx={{ p: { xs: 4, sm: 6 }, pt: 2 }}>
                      <Grid container spacing={6}>
                        {/* Left Side: Overview & Project */}
                        <Grid size={{ xs: 12, md: 7 }}>
                          <Box sx={{ mb: 6 }}>
                            <Typography variant="h6" sx={{ color: '#ff2a74', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, mb: 1.5, textTransform: 'uppercase', fontSize: '0.9rem' }}>Academic Objective</Typography>
                            <Typography sx={{ fontFamily: '"Linear", sans-serif', color: 'rgba(255,255,255,0.85)', lineHeight: 1.8, fontSize: '1.05rem' }}>
                              {pkg.objective}
                            </Typography>
                          </Box>

                          <Box sx={{ mb: 6 }}>
                            <Typography variant="h6" sx={{ color: '#ff2a74', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, mb: 2.5, textTransform: 'uppercase', fontSize: '0.9rem' }}>Core Subjects & Syllabus</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                              {pkg.subjects.map((subj, sIdx) => (
                                <Box key={sIdx} sx={{ display: 'flex', gap: 2.5 }}>
                                  <Box sx={{ mt: 0.5 }}>
                                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#ff2a74', flexShrink: 0 }} />
                                  </Box>
                                  <Box>
                                    <Typography sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: '1rem', color: 'white', mb: 0.5 }}>
                                      {subj.name}
                                    </Typography>
                                    <Typography sx={{ fontFamily: '"Linear", sans-serif', fontSize: '0.88rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
                                      {subj.desc}
                                    </Typography>
                                  </Box>
                                </Box>
                              ))}
                            </Box>
                          </Box>

                          <Box sx={{ bgcolor: 'rgba(255, 42, 116, 0.04)', borderLeft: '3px solid #ff2a74', p: 4, mb: 4 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
                              <StarIcon sx={{ color: '#ff2a74', fontSize: '1.4rem' }} />
                              <Typography variant="h6" sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 800, fontSize: '1rem', textTransform: 'uppercase' }}>Final Graduation Project</Typography>
                            </Box>
                            <Typography sx={{ fontFamily: '"Linear", sans-serif', color: 'rgba(255,255,255,0.85)', fontSize: '1rem', fontStyle: 'italic' }}>
                              "{pkg.finalProject}"
                            </Typography>
                          </Box>
                        </Grid>

                        {/* Right Side: Price & Inquiry */}
                        <Grid size={{ xs: 12, md: 5 }}>
                          <Box sx={{ bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', p: 4, position: 'sticky', top: 24 }}>
                             <Typography variant="h6" sx={{ color: 'white', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, mb: 4, textTransform: 'uppercase', fontSize: '0.85rem', textAlign: 'center' }}>Tuition & Enrollment</Typography>
                             
                             {/* Dashed Pricing Box matching the app's premium style */}
                             <Box 
                               sx={{ 
                                 bgcolor: 'rgba(255, 42, 116, 0.04)',
                                 border: '1px dashed rgba(255, 42, 116, 0.25)',
                                 borderRadius: '0px',
                                 py: 3,
                                 px: 2,
                                 mb: 4,
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
                                   top: -12,
                                   bgcolor: '#ff2a74',
                                   color: 'white',
                                   fontFamily: '"Space Grotesk", sans-serif',
                                   fontWeight: 800,
                                   fontSize: '0.65rem',
                                   letterSpacing: '0.15em',
                                   px: 2,
                                   py: 0.4,
                                   borderRadius: '0px',
                                   textTransform: 'uppercase'
                                 }}
                               >
                                 LIMITED OFFER
                               </Box>

                               <Typography 
                                 sx={{ 
                                   textDecoration: 'line-through', 
                                   color: 'rgba(255, 255, 255, 0.3)', 
                                   fontSize: '0.85rem',
                                   fontFamily: '"Space Grotesk", sans-serif',
                                   fontWeight: 500,
                                   mb: 0.5,
                                   mt: 0.5,
                                   textAlign: 'center'
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
                                   lineHeight: 1,
                                   textAlign: 'center'
                                 }}
                               >
                                 {pkg.price}
                               </Typography>

                               <Typography 
                                 sx={{ 
                                   fontSize: '0.72rem',
                                   color: 'rgba(255, 255, 255, 0.5)',
                                   fontFamily: '"Linear", sans-serif',
                                   mt: 1,
                                   textTransform: 'uppercase',
                                   letterSpacing: '0.05em',
                                   textAlign: 'center'
                                 }}
                               >
                                 {pkg.duration}
                               </Typography>
                             </Box>

                              {/* Inclusions List */}
                              <Box sx={{ textAlign: 'left', mb: 4, display: 'flex', flexDirection: 'column', gap: 1.75, px: 1 }}>
                                {pkg.inclusions.map((text, i) => (
                                  <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25 }}>
                                    <CheckCircleIcon sx={{ color: '#ff2a74', fontSize: 16, mt: 0.3 }} />
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

                             <Button
                                onClick={() => handleInquirePackage(pkg.id)}
                                variant="contained"
                                fullWidth
                                sx={{
                                  bgcolor: '#ff2a74',
                                  color: 'white',
                                  fontFamily: '"Space Grotesk", sans-serif',
                                  fontWeight: 800,
                                  py: 2,
                                  borderRadius: 0,
                                  textTransform: 'none',
                                  fontSize: '1rem',
                                  mb: 2,
                                  '&:hover': { bgcolor: '#e01b5d' }
                                }}
                             >
                                Inquire Program
                             </Button>

                             <Typography variant="body2" sx={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', fontFamily: '"Linear", sans-serif' }}>
                                Limited seats available for next intake. Contact us for studio tours and physical demos.
                             </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </DialogContent>
            );
          })()}
        </Dialog>

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

          {selectedPkgId !== null && (() => {
            const pkg = academyPackages[selectedPkgId];
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
                  {pkg.description}
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
                    LIMITED SEATS
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
                    {pkg.price}
                  </Typography>
                  <Typography 
                    sx={{ 
                      fontSize: '0.75rem',
                      color: 'rgba(255, 255, 255, 0.5)',
                      fontFamily: '"Linear", sans-serif',
                      mt: 0.75
                    }}
                  >
                    {pkg.duration}
                  </Typography>
                </Box>

                {/* Inclusions List */}
                <Box sx={{ textAlign: 'left', mb: 3.5, display: 'flex', flexDirection: 'column', gap: 1.5, px: 1 }}>
                  {pkg.inclusions.map((text, i) => (
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
                    to={`/contact?service=school&package=${encodeURIComponent(pkg.title)}`}
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

export default Academy;
