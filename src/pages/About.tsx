import { Container, Typography, Box, Paper, Grid2 as Grid, Divider } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import GroupsIcon from '@mui/icons-material/Groups';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import FavoriteIcon from '@mui/icons-material/Favorite';

const About: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Shalom Music</title>
        <meta name="description" content="Discover the story behind Shalom Music. Our mission is to provide excellence in music production and education." />
      </Helmet>

      {/* Hero Section */}
      <Box sx={{ bgcolor: 'black', color: 'white', py: { xs: 10, md: 20 }, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h2" sx={{ fontWeight: 900, mb: 4 }}>
            Where Passion Meets Precision
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.8, fontWeight: 300, lineHeight: 1.6 }}>
            Shalom Music was founded on a simple principle: that musical excellence should be accessible to everyone, from the aspiring student to the professional recording artist.
          </Typography>
        </Container>
      </Box>

      {/* Brand Story */}
      <Container maxWidth="lg" sx={{ py: 15 }}>
        <Grid container spacing={8} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Box 
              sx={{ 
                width: '100%', 
                height: 500, 
                bgcolor: '#f5f5f5', 
                borderRadius: 2, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                border: '1px solid #eee'
              }}
            >
               <Typography variant="body2" color="text.secondary">[ Founders/Studio Legacy Image ]</Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="overline" sx={{ letterSpacing: 2, fontWeight: 700, color: 'text.secondary' }}>OUR JOURNEY</Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, mt: 1, mb: 4 }}>The Shalom Music Story</Typography>
            <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', fontSize: '1.1rem', lineHeight: 1.8 }}>
              What started as a boutique recording studio has evolved into a comprehensive musical hub. We recognized that the modern musician needs more than just a place to record—they need a community that supports their technical growth and creative vision.
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary', fontSize: '1.1rem', lineHeight: 1.8 }}>
              Today, Shalom Music stands at the intersection of traditional craftsmanship and modern innovation. Whether we are tuning a 100-year-old grand piano or mastering a contemporary electronic track, our commitment to "Excellence in Sound" remains unwavering.
            </Typography>
            <Divider sx={{ mb: 4 }} />
            <Typography variant="h6" sx={{ fontStyle: 'italic', fontWeight: 500 }}>
              "We don't just create music; we build the foundations for musical legacies."
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* Core Values */}
      <Box sx={{ bgcolor: '#f9f9f9', py: 15 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" sx={{ mb: 10, fontWeight: 800 }}>
            The Values That Drive Us
          </Typography>
          <Grid container spacing={4}>
            {[
              { title: 'Excellence', text: 'We settle for nothing less than world-class quality in every recording, lesson, and service.', icon: <WorkspacePremiumIcon sx={{ fontSize: 40 }} /> },
              { title: 'Integrity', text: 'Transparent communication and honest professional advice are the bedrock of our client relationships.', icon: <FavoriteIcon sx={{ fontSize: 40 }} /> },
              { title: 'Innovation', text: 'We continuously evolve our techniques and equipment to stay at the forefront of the music industry.', icon: <LightbulbIcon sx={{ fontSize: 40 }} /> },
              { title: 'Community', text: 'We foster a supportive environment where artists and students can grow and collaborate.', icon: <GroupsIcon sx={{ fontSize: 40 }} /> }
            ].map((value, idx) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
                <Paper elevation={0} sx={{ p: 4, height: '100%', textAlign: 'center', bgcolor: 'white', border: '1px solid #eee' }}>
                  <Box sx={{ mb: 2, color: 'black' }}>{value.icon}</Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>{value.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>{value.text}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Final Mission Statement */}
      <Container maxWidth="md" sx={{ py: 15, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 4 }}>
          Our Commitment to You
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 0, fontWeight: 400, lineHeight: 1.6 }}>
          Whether you are walking into our studio for the first time or have been a student for years, you can expect a professional, inspiring, and high-quality experience. We are here to help you achieve your musical dreams with excellence.
        </Typography>
      </Container>
    </>

);
};

export default About;
