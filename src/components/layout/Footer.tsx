import { Box, Container, Typography, IconButton, Divider, Link, Grid2 as Grid } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link as RouterLink } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', pt: 8, pb: 4, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
              SHALOM MUSIC
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>
              High-end music production, professional piano lessons, and premium piano services. Excellence in every note.
            </Typography>
            <Box>
              <IconButton color="inherit" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="YouTube">
                <YouTubeIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link component={RouterLink} to="/production" color="inherit" underline="hover">Music Production</Link>
              <Link component={RouterLink} to="/lessons" color="inherit" underline="hover">Piano Lessons</Link>
              <Link component={RouterLink} to="/voice" color="inherit" underline="hover">Voice Training</Link>
              <Link component={RouterLink} to="/pricing" color="inherit" underline="hover">Pricing Plans</Link>
              <Link component={RouterLink} to="/contact" color="inherit" underline="hover">Contact Us</Link>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Contact
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
              Email: info@shalommusic.com
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
              Phone: +1 (234) 567-890
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Address: 123 Music Lane, Harmony City
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
        <Typography variant="body2" align="center" sx={{ opacity: 0.6 }}>
          © {new Date().getFullYear()} Shalom Music. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
