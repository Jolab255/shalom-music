import { Container, Typography, Box, TextField, Button, MenuItem, Paper, Grid2 as Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const services = [
  'Music Production',
  'Piano Lessons',
  'Studio Rental',
  'Piano Service',
  'Other Inquiries'
];

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for form submission would go here
    alert('Thank you for your message. We will get back to you soon!');
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Shalom Music</title>
        <meta name="description" content="Get in touch with Shalom Music for music production, lessons, or studio rental inquiries." />
      </Helmet>

      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={8}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 4 }}>Get in Touch</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
              Have a project in mind or want to start your musical journey? Fill out the form, and our team will get back to you within 24 hours.
            </Typography>

            <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
              <EmailIcon color="primary" />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Email</Typography>
                <Typography variant="body2" color="text.secondary">info@shalommusic.com</Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
              <PhoneIcon color="primary" />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Phone</Typography>
                <Typography variant="body2" color="text.secondary">+1 (234) 567-890</Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 3 }}>
              <LocationOnIcon color="primary" />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Office</Typography>
                <Typography variant="body2" color="text.secondary">123 Music Lane, Harmony City</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Paper elevation={0} sx={{ p: { xs: 3, md: 6 }, border: '1px solid #eee', borderRadius: 4 }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField fullWidth label="Full Name" variant="outlined" required />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField fullWidth label="Email Address" variant="outlined" type="email" required />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField fullWidth select label="Service Interested In" variant="outlined" defaultValue="Music Production">
                      {services.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField fullWidth label="Your Message" variant="outlined" multiline rows={4} required />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Button type="submit" variant="contained" size="large" fullWidth sx={{ py: 2 }}>
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Contact;
