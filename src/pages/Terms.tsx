import React, { useState } from 'react';
import { Container, Typography, Box, Paper, Grid2 as Grid, Accordion, AccordionSummary, AccordionDetails, Divider } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GavelIcon from '@mui/icons-material/Gavel';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import SchoolIcon from '@mui/icons-material/School';
import EventIcon from '@mui/icons-material/Event';

const Terms: React.FC = () => {
  const [expanded, setExpanded] = useState<string | false>('panel1');

  const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const sections = [
    {
      id: 'panel1',
      icon: <GavelIcon sx={{ color: '#ff2a74', mr: 2 }} />,
      title: '1. General Terms & Studio Rules',
      content: [
        {
          subheading: '1.1 Agreement to Terms',
          text: 'By booking any session, enrolling in our academy, renting studio space, or hiring our piano accompaniment services, you agree to be bound by these Terms and Conditions. These terms constitute a legally binding agreement between you and Shalom Music Studios.'
        },
        {
          subheading: '1.2 Studio Conduct & Safety',
          text: 'Shalom Music Studios maintains a professional, creative, and safe environment. Any form of harassment, drug use, or illicit behavior on studio premises is strictly prohibited. We reserve the right to immediately terminate any session or enrollment without a refund if a client or guest violates this code of conduct.'
        },
        {
          subheading: '1.3 Studio Equipment & Instrument Care',
          text: 'Clients are fully responsible for any damage caused to studio equipment, microphones, or instruments (especially our acoustic grand pianos) due to negligence, misuse, or food/liquid accidents. The cost of repair or replacement will be billed directly to the client.'
        }
      ]
    },
    {
      id: 'panel2',
      icon: <LibraryMusicIcon sx={{ color: '#ff2a74', mr: 2 }} />,
      title: '2. Music Production & Studio Rental',
      content: [
        {
          subheading: '2.1 Booking Deposits',
          text: 'To secure a studio recording session, mixing/mastering project, or room rental block, a 50% non-refundable booking deposit is required upfront. The remaining 50% balance must be cleared prior to the commencement of the session or the release of any final audio files.'
        },
        {
          subheading: '2.2 Cancellation & Rescheduling',
          text: 'We require at least 48 hours notice for any cancellation or rescheduling of a booked session. Cancellations made with less than 48 hours notice will result in the forfeiture of the booking deposit. A rescheduled session must be booked within 30 days of the original date.'
        },
        {
          subheading: '2.3 File Delivery & Archiving',
          text: 'Upon full payment, raw multitrack stems, mixed stems, or mastered files will be shared. Shalom Music Studios archives session folders for up to 30 days post-completion. We strongly recommend that clients download and back up all files immediately, as we do not guarantee permanent storage beyond this period.'
        },
        {
          subheading: '2.4 Production Credits',
          text: 'All commercial music recorded, mixed, or mastered at our facility must credit Shalom Music Studios in the liner notes, digital metadata, or promotional copy as: "Recorded/Mixed/Mastered at Shalom Music Studios, Dar es Salaam".'
        }
      ]
    },
    {
      id: 'panel3',
      icon: <SchoolIcon sx={{ color: '#ff2a74', mr: 2 }} />,
      title: '3. Piano Lessons & Production School',
      content: [
        {
          subheading: '3.1 Monthly Fees & Payments',
          text: 'Academy tuition and lesson packages are billed on a monthly subscription basis. All fees are due in full by the 5th of each calendar month. Late payments may incur a surcharge, and repeated delays will result in suspension of lessons.'
        },
        {
          subheading: '3.2 Attendance & Makeup Lessons',
          text: 'Students are expected to attend all scheduled weekly lessons. If you must miss a lesson, you must notify your instructor at least 24 hours in advance to qualify for a makeup lesson. Makeup lessons are subject to instructor availability and must be completed within the current semester. A maximum of 2 rollover makeup credits are allowed per semester.'
        },
        {
          subheading: '3.3 Lesson Cancellation by Studio',
          text: 'In the rare event that an instructor is unavailable, Shalom Music Studios will provide a qualified substitute instructor or reschedule the lesson at a mutually convenient time. If we cannot accommodate a makeup session, a credit will be applied to the following month\'s invoice.'
        }
      ]
    },
    {
      id: 'panel4',
      icon: <EventIcon sx={{ color: '#ff2a74', mr: 2 }} />,
      title: '4. Piano Performance & Accompaniment Bookings',
      content: [
        {
          subheading: '4.1 Event Bookings',
          text: 'For weddings, concerts, camp meetings, or church services, the booking agreement must be finalized with a signed service contract and a 50% retainer. The final balance is due 7 days before the event date.'
        },
        {
          subheading: '4.2 Travel & Accommodation',
          text: 'Pricing plans listed on our website cover events within Dar es Salaam. For locations outside Dar es Salaam, additional travel, transport of portable keyboards (if required), and accommodation expenses will be detailed separately in the custom quote.'
        },
        {
          subheading: '4.3 Piano Availability & Quality',
          text: 'For collaborative grand piano accompaniments, the event organizer must ensure a properly tuned and maintained acoustic piano is available at the venue, or make arrangements for key instrument transport from Shalom Music Studios.'
        }
      ]
    }
  ];

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
        // Cloudy background matching other pages
        background: `
          radial-gradient(circle at 15% 25%, rgba(45, 45, 55, 0.4) 0%, transparent 50%),
          radial-gradient(circle at 85% 75%, rgba(35, 35, 45, 0.35) 0%, transparent 60%),
          radial-gradient(circle at 50% 50%, rgba(25, 25, 30, 0.25) 0%, transparent 80%),
          #000000
        `,
        // Sandy noise overlay
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
        <title>Terms & Conditions | Shalom Music Studios</title>
        <meta name="description" content="Read the Terms and Conditions of Shalom Music Studios in Dar es Salaam, Tanzania. Learn about our booking, cancelation, academy, and instrument care policies." />
        <link rel="canonical" href="https://shalommusic.co.tz/terms" />
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

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ mb: 8, textAlign: 'center' }}>
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
            Terms & Conditions
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              fontFamily: '"Linear", sans-serif', 
              fontWeight: 300, 
              color: 'rgba(255, 255, 255, 0.65)', 
              lineHeight: 1.8, 
              fontSize: '1rem',
              maxWidth: '600px',
              mx: 'auto'
            }}
          >
            Please review our policies regarding studio bookings, production services, music school enrollment, instrument liability, and event piano accompanist rentals.
          </Typography>
        </Box>

        <Paper 
          elevation={0}
          sx={{ 
            p: { xs: 3, sm: 5 }, 
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            bgcolor: 'rgba(12, 12, 15, 0.84)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 0, // Sharp aesthetic
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.95), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
            mb: 5
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              fontFamily: '"Linear", sans-serif', 
              color: 'rgba(255, 255, 255, 0.45)', 
              mb: 4,
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em'
            }}
          >
            Last Updated: June 11, 2026
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {sections.map((section) => (
              <Accordion 
                key={section.id} 
                expanded={expanded === section.id} 
                onChange={handleChange(section.id)}
                elevation={0}
                sx={{ 
                  bgcolor: 'transparent',
                  backgroundImage: 'none',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '0 !important',
                  color: 'white',
                  transition: 'all 0.3s ease',
                  '&:before': { display: 'none' },
                  '&.Mui-expanded': {
                    borderColor: 'rgba(255, 42, 116, 0.35)',
                    boxShadow: '0 0 15px rgba(255, 42, 116, 0.05)'
                  }
                }}
              >
                <AccordionSummary 
                  expandIcon={<ExpandMoreIcon sx={{ color: '#ff2a74', fontSize: '1.4rem' }} />}
                  sx={{ 
                    px: 3, 
                    py: 1.5,
                    bgcolor: expanded === section.id ? 'rgba(255, 42, 116, 0.02)' : 'transparent',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.02)'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {section.icon}
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 700,
                        fontFamily: '"Space Grotesk", sans-serif',
                        fontSize: { xs: '0.95rem', sm: '1.05rem' },
                        color: expanded === section.id ? '#ff2a74' : '#ffffff',
                        letterSpacing: '0.02em',
                        transition: 'color 0.2s'
                      }}
                    >
                      {section.title}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 4, pb: 4, pt: 2, bgcolor: 'rgba(0, 0, 0, 0.2)' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {section.content.map((item, i) => (
                      <Box key={i}>
                        <Typography 
                          variant="subtitle1" 
                          sx={{ 
                            fontFamily: '"Space Grotesk", sans-serif',
                            fontWeight: 700,
                            fontSize: '0.92rem',
                            color: '#ffffff',
                            mb: 1
                          }}
                        >
                          {item.subheading}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontFamily: '"Linear", sans-serif',
                            color: 'rgba(255, 255, 255, 0.65)',
                            fontWeight: 300,
                            fontSize: '0.9rem',
                            lineHeight: 1.7
                          }}
                        >
                          {item.text}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Paper>

        <Box sx={{ textAlign: 'center' }}>
          <Typography 
            variant="body2" 
            sx={{ 
              fontFamily: '"Linear", sans-serif',
              color: 'rgba(255, 255, 255, 0.4)',
              fontSize: '0.82rem',
              lineHeight: 1.6
            }}
          >
            If you have any questions or require clarification on any of our terms,<br />
            please reach out to us at{' '}
            <a 
              href="mailto:info@shalommusic.co.tz" 
              style={{ color: '#ff2a74', textDecoration: 'none', fontWeight: 500 }}
            >
              info@shalommusic.co.tz
            </a>.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Terms;
