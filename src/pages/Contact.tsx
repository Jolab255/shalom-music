import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, MenuItem, Paper, Grid2 as Grid, CircularProgress } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';
import { useNotification } from '../components/common/NotificationContext';

const services = [
  'Music Production',
  'Piano Lessons',
  'Studio Rental',
  'Piano Service',
  'Other Inquiries'
];

const Contact: React.FC = () => {
  const { showSuccess, showError, showWarning } = useNotification();
  
  // Controlled form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('Music Production');
  const [message, setMessage] = useState('');
  
  // Field validation error states
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [messageError, setMessageError] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    let isValid = true;
    
    if (!name.trim()) {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError('');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!message.trim()) {
      setMessageError('Message is required');
      isValid = false;
    } else if (message.trim().length < 10) {
      setMessageError('Message must be at least 10 characters long');
      isValid = false;
    } else {
      setMessageError('');
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      showWarning('Please correct the validation errors in the form.', 'Validation Alert');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate network API request with potential mock error triggers
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // If message contains the word 'fail' or 'error', simulate a server error to demonstrate error boundary / toast error handling!
          if (message.toLowerCase().includes('fail') || message.toLowerCase().includes('error')) {
            reject(new Error('Internal Server Error (500): The mail dispatch service is temporarily unavailable.'));
          } else {
            resolve(true);
          }
        }, 1500);
      });

      showSuccess('Your inquiry has been successfully transmitted. Our team will contact you shortly!', 'Message Dispatched');
      
      // Reset form on success
      setName('');
      setEmail('');
      setService('Music Production');
      setMessage('');
    } catch (err: any) {
      showError(err.message || 'An error occurred during communication with the server.', 'Transmission Failed');
    } finally {
      setIsSubmitting(false);
    }
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
              <form onSubmit={handleSubmit} noValidate>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      variant="outlined"
                      required
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (e.target.value.trim()) setNameError('');
                      }}
                      error={!!nameError}
                      helperText={nameError}
                      disabled={isSubmitting}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      variant="outlined"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (e.target.value.trim()) setEmailError('');
                      }}
                      error={!!emailError}
                      helperText={emailError}
                      disabled={isSubmitting}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      select
                      label="Service Interested In"
                      variant="outlined"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      disabled={isSubmitting}
                    >
                      {services.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Your Message"
                      variant="outlined"
                      multiline
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (e.target.value.trim().length >= 10) setMessageError('');
                      }}
                      error={!!messageError}
                      helperText={messageError || "Tip: Type 'error' or 'fail' in your message to test our error handlers!"}
                      FormHelperTextProps={{
                        sx: {
                          color: messageError ? 'error.main' : 'text.secondary',
                          fontStyle: messageError ? 'normal' : 'italic',
                          opacity: messageError ? 1 : 0.8
                        }
                      }}
                      disabled={isSubmitting}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      sx={{ py: 2, position: 'relative' }}
                      disabled={isSubmitting}
                      endIcon={!isSubmitting && <SendIcon />}
                    >
                      {isSubmitting ? (
                        <CircularProgress size={24} sx={{ color: 'primary.contrastText' }} />
                      ) : (
                        'Send Message'
                      )}
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
