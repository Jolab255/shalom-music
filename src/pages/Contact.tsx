import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Typography, Box, TextField, Button, MenuItem, Paper, Grid2 as Grid, CircularProgress, Link } from '@mui/material';
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

const textFieldStyles = {
  '& .MuiOutlinedInput-root': {
    color: '#ffffff',
    fontFamily: '"Space Grotesk", sans-serif',
    fontSize: '0.92rem',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.08)',
      borderRadius: 0, // Sharp!
      transition: 'all 0.25s ease'
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#ff2a74',
      borderWidth: '1px'
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.45)',
    fontFamily: '"Space Grotesk", sans-serif',
    fontSize: '0.9rem',
    '&.Mui-focused': {
      color: '#ff2a74',
    }
  },
  '& .MuiSelect-icon': {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  '& .MuiFormHelperText-root': {
    fontFamily: '"Linear", sans-serif',
    fontSize: '0.72rem'
  }
};

const Contact: React.FC = () => {
  const { showSuccess, showError, showWarning } = useNotification();
  
  // Controlled form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('Music Production');
  const [message, setMessage] = useState('');
  
  const [searchParams] = useSearchParams();
  const serviceParam = searchParams.get('service');

  useEffect(() => {
    if (serviceParam) {
      const query = serviceParam.toLowerCase().trim();
      if (query.includes('production') || query === 'music') {
        setService('Music Production');
      } else if (query.includes('lesson') || query === 'piano') {
        setService('Piano Lessons');
      } else if (query.includes('rental') || query === 'studio') {
        setService('Studio Rental');
      } else if (query.includes('service') || query === 'tuning') {
        setService('Piano Service');
      } else if (query.includes('other') || query.includes('inquiry')) {
        setService('Other Inquiries');
      }
    }
  }, [serviceParam]);
  
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
      // Simulate server error when requested (typing 'error' or 'fail')
      if (message.toLowerCase().includes('fail') || message.toLowerCase().includes('error')) {
        await new Promise((resolve) => setTimeout(resolve, 800));
        throw new Error('Internal Server Error (500): The mail dispatch service is temporarily unavailable.');
      }

      // Live submission using FormSubmit AJAX API
      const response = await fetch('https://formsubmit.co/ajax/info@shalommusic.co.tz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          service: service,
          message: message,
          _subject: `New Shalom Music Enquiry - ${service} from ${name}`
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned status code ${response.status}: Failed to transmit message.`);
      }

      const result = await response.json();
      
      if (result.success === 'false' || result.success === false) {
        throw new Error(result.message || 'The mail submission service failed to process the message.');
      }

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
    <Box 
      sx={{ 
        bgcolor: '#000000', 
        color: 'white', 
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: 15, md: 20 },
        pb: 18,
        // Cloudy background matching other pages exactly
        background: `
          radial-gradient(circle at 15% 25%, rgba(45, 45, 55, 0.4) 0%, transparent 50%),
          radial-gradient(circle at 85% 75%, rgba(35, 35, 45, 0.35) 0%, transparent 60%),
          radial-gradient(circle at 50% 50%, rgba(25, 25, 30, 0.25) 0%, transparent 80%),
          #000000
        `,
        // Sandy noise overlay matching other pages exactly
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          width: '100%', height: '100%',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: 0.035, 
          pointerEvents: 'none',
          zIndex: 1
        }
      }}
    >
      <Helmet>
        <title>Contact Us | Shalom Music Studios</title>
        <meta name="description" content="Get in touch with Shalom Music for music production, lessons, or studio rental inquiries." />
      </Helmet>

      {/* Ambient Pink Glow Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: '30%',
          left: '75%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '320px', sm: '600px', md: '800px' },
          height: { xs: '320px', sm: '600px', md: '800px' },
          background: 'radial-gradient(circle, rgba(255, 42, 116, 0.08) 0%, transparent 70%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={8} alignItems="center">
          {/* Left Column: Heading and info details */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 900, 
                fontFamily: '"Space Grotesk", sans-serif', 
                fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.2rem' }, 
                letterSpacing: '0.04em',
                lineHeight: 1.1,
                mb: 3, 
                color: 'white',
                textTransform: 'uppercase'
              }}
            >
              SECURE YOUR SESSION
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                fontFamily: '"Linear", sans-serif', 
                fontWeight: 300, 
                color: 'rgba(255, 255, 255, 0.65)', 
                lineHeight: 1.8, 
                mb: 6,
                fontSize: '1rem',
                maxWidth: '480px'
              }}
            >
              Let's collaborate on your next masterpiece. Fill out the reservation portal to secure your studio space lockout, piano course enrollment, or professional concert accompaniment.
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {[
                { icon: <EmailIcon sx={{ color: '#ff2a74', fontSize: '1.25rem' }} />, label: 'Email Enquiries', val: 'info@shalommusic.co.tz', type: 'link', link: 'mailto:info@shalommusic.co.tz' },
                { icon: <PhoneIcon sx={{ color: '#ff2a74', fontSize: '1.25rem' }} />, label: 'Direct Phone', val: '0620 319 635', type: 'link', link: 'tel:+255620319635' },
                { icon: <LocationOnIcon sx={{ color: '#ff2a74', fontSize: '1.25rem' }} />, label: 'Studio Address', val: 'Msikiti wa udongo, Dar es Salaam, Tanzania', type: 'text' }
              ].map((item, i) => (
                <Box key={i} sx={{ display: 'flex', gap: 2.5, alignItems: 'flex-start' }}>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      width: 44, 
                      height: 44, 
                      bgcolor: 'rgba(255, 42, 116, 0.04)', 
                      border: '1px solid rgba(255, 42, 116, 0.15)',
                      borderRadius: 0, // Sharp!
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      color: 'white',
                      '&:hover': {
                        bgcolor: '#ff2a74',
                        borderColor: '#ff2a74',
                        color: 'white',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(255, 42, 116, 0.3)'
                      }
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Box>
                    <Typography sx={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.45)', textTransform: 'uppercase', letterSpacing: '0.08em', mb: 0.5 }}>
                      {item.label}
                    </Typography>
                    {item.type === 'link' ? (
                      <Link 
                        href={item.link} 
                        color="inherit" 
                        underline="none"
                        sx={{ 
                          fontFamily: '"Linear", sans-serif', 
                          fontSize: '0.9rem', 
                          fontWeight: 300,
                          color: 'rgba(255, 255, 255, 0.8)',
                          transition: 'all 0.2s',
                          '&:hover': { color: '#ff2a74' }
                        }}
                      >
                        {item.val}
                      </Link>
                    ) : (
                      <Typography 
                        sx={{ 
                          fontFamily: '"Linear", sans-serif', 
                          fontSize: '0.9rem', 
                          fontWeight: 300,
                          color: 'rgba(255, 255, 255, 0.8)',
                          lineHeight: 1.5
                        }}
                      >
                        {item.val}
                      </Typography>
                    )}
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Right Column: Interactive Booking Form */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: { xs: 4, sm: 6 }, 
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                bgcolor: 'rgba(12, 12, 15, 0.84)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 0, // Sharp!
                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.95), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                '&:hover': {
                  borderColor: 'rgba(255, 42, 116, 0.25)',
                  boxShadow: '0 35px 80px rgba(0, 0, 0, 0.98), 0 0 20px rgba(255, 42, 116, 0.05)'
                }
              }}
            >
              <form onSubmit={handleSubmit} noValidate>
                <Grid container spacing={3.5}>
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
                      sx={textFieldStyles}
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
                      sx={textFieldStyles}
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
                      sx={textFieldStyles}
                      slotProps={{
                        select: {
                          MenuProps: {
                            slotProps: {
                              paper: {
                                sx: {
                                  bgcolor: '#0c0c0f',
                                  border: '1px solid rgba(255, 255, 255, 0.08)',
                                  borderRadius: 0,
                                  '& .MuiMenuItem-root': {
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    fontFamily: '"Space Grotesk", sans-serif',
                                    fontSize: '0.9rem',
                                    py: 1.5,
                                    transition: 'all 0.2s',
                                    '&:hover': {
                                      bgcolor: 'rgba(255, 42, 116, 0.1)',
                                      color: 'white'
                                    },
                                    '&.Mui-selected': {
                                      bgcolor: '#ff2a74',
                                      color: 'white',
                                      '&:hover': {
                                        bgcolor: '#e01f61',
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }}
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
                      rows={5}
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
                          color: messageError ? 'error.main' : 'rgba(255, 255, 255, 0.4)',
                          fontStyle: messageError ? 'normal' : 'italic',
                          opacity: messageError ? 1 : 0.8,
                          fontFamily: '"Linear", sans-serif'
                        }
                      }}
                      disabled={isSubmitting}
                      sx={textFieldStyles}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      sx={{ 
                        py: 2, 
                        bgcolor: '#ff2a74',
                        color: 'white',
                        fontWeight: 700,
                        fontFamily: '"Space Grotesk", sans-serif',
                        letterSpacing: '0.04em',
                        borderRadius: 0, // Sharp!
                        boxShadow: '0 6px 20px rgba(255, 42, 116, 0.25)',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        '&:hover': {
                          bgcolor: '#e01f61',
                          boxShadow: '0 8px 25px rgba(255, 42, 116, 0.4)',
                          transform: 'translateY(-1px)'
                        },
                        '&:disabled': {
                          bgcolor: 'rgba(255, 42, 116, 0.3)',
                          color: 'rgba(255, 255, 255, 0.5)'
                        }
                      }}
                      disabled={isSubmitting}
                      endIcon={!isSubmitting && <SendIcon />}
                    >
                      {isSubmitting ? (
                        <CircularProgress size={24} sx={{ color: 'white' }} />
                      ) : (
                        'Submit Reservation Request'
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;
