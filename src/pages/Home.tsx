import { Container, Typography, Box, Button, Card, CardContent, Grid2 as Grid, Avatar } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import PianoIcon from '@mui/icons-material/Piano';
import MicIcon from '@mui/icons-material/Mic';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import StarIcon from '@mui/icons-material/Star';

const Home: React.FC = () => {
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
          pt: { xs: 12, md: 24 }, 
          pb: { xs: 12, md: 22 },
          position: 'relative',
          overflow: 'hidden',
          backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.85) 100%), url("/assets/hero.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          display: 'flex',
          alignItems: 'center',
          minHeight: '85vh',
        }}
      >
        {/* Subtle decorative glow overlay */}
        <Box 
          sx={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: '30%',
            height: '40%',
            background: 'radial-gradient(circle, rgba(255,215,0,0.15) 0%, rgba(0,0,0,0) 70%)',
            filter: 'blur(50px)',
            zIndex: 1,
            pointerEvents: 'none'
          }}
        />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={4} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 8 }}>
              {/* Premium Badge */}
              <Box 
                sx={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: 1, 
                  px: 2, 
                  py: 0.75, 
                  borderRadius: 50, 
                  border: '1px solid rgba(255,255,255,0.2)', 
                  backdropFilter: 'blur(10px)', 
                  bgcolor: 'rgba(255,255,255,0.05)', 
                  mb: 4,
                  boxShadow: '0 4px 30px rgba(0,0,0,0.1)'
                }}
              >
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#d4af37', boxShadow: '0 0 10px #d4af37' }} />
                <Typography variant="caption" sx={{ letterSpacing: '0.15em', fontWeight: 700, color: '#e0e0e0', textTransform: 'uppercase' }}>
                  Premium Studio Experience
                </Typography>
              </Box>

              <Typography variant="h1" sx={{ fontSize: { xs: '3.5rem', md: '5.5rem' }, mb: 2, fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                Excellence in <span style={{ color: '#d4af37' }}>Sound</span>
              </Typography>
              <Typography variant="h5" sx={{ mb: 6, opacity: 0.9, fontWeight: 300, letterSpacing: '0.08em', maxW: '600px', lineHeight: 1.6 }}>
                Crafting world-class recordings, cultivating musical talent, and providing expert piano services in an acoustically optimized environment.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2.5, flexWrap: 'wrap' }}>
                <Button 
                  variant="contained" 
                  size="large" 
                  sx={{ 
                    bgcolor: '#d4af37', 
                    color: 'black', 
                    px: 4.5, 
                    py: 1.8, 
                    fontWeight: 700,
                    borderRadius: 2,
                    boxShadow: '0 10px 20px rgba(212,175,55,0.2)',
                    '&:hover': { bgcolor: '#f3cf5e', boxShadow: '0 12px 24px rgba(212,175,55,0.35)', transform: 'translateY(-2px)' },
                    transition: 'all 0.3s ease'
                  }}
                >
                  View Our Services
                </Button>
                <Button 
                  variant="outlined" 
                  size="large" 
                  sx={{ 
                    borderColor: 'rgba(255,255,255,0.4)', 
                    color: 'white', 
                    px: 4.5, 
                    py: 1.8, 
                    borderRadius: 2,
                    backdropFilter: 'blur(5px)',
                    '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.08)', transform: 'translateY(-2px)' },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Book a Consultation
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Core Services Overview */}
      <Container maxWidth="lg" sx={{ py: 15 }}>
        <Typography variant="h2" align="center" sx={{ mb: 2, fontWeight: 800 }}>
          Our Expertise
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 8, fontWeight: 400 }}>
          Comprehensive musical solutions tailored to your unique vision.
        </Typography>
        <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
          {[
            { title: 'Music Production', icon: <MicIcon sx={{ fontSize: 40 }} />, desc: 'From initial recording to final mastering, we provide a complete production cycle for artists of all genres.' },
            { title: 'Piano Lessons', icon: <PianoIcon sx={{ fontSize: 40 }} />, desc: 'Expert piano instruction for all ages, focusing on technique, theory, and performance excellence.' }
          ].map((service, idx) => (
            <Grid size={{ xs: 12, md: 6 }} key={idx} sx={{ maxWidth: 500 }}>
              <Card elevation={0} sx={{ height: '100%', textAlign: 'center', p: 4, border: '1px solid #f0f0f0', transition: '0.3s', '&:hover': { transform: 'translateY(-10px)', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' } }}>
                <CardContent>
                  <Box sx={{ mb: 3, color: 'primary.main' }}>{service.icon}</Box>
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>{service.title}</Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {service.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

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
    </>
  );
};

export default Home;
