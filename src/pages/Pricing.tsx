import { Container, Typography, Box, Card, CardContent, Button, Divider, Grid2 as Grid, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Pricing: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Pricing Plans | Shalom Music</title>
        <meta name="description" content="Transparent pricing for music production, piano lessons, and studio rental at Shalom Music." />
      </Helmet>

      {/* Hero Section */}
      <Box sx={{ bgcolor: 'black', color: 'white', py: { xs: 8, md: 12 }, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h2" sx={{ fontWeight: 900, mb: 3 }}>
            Investment in Excellence
          </Typography>
          <Typography variant="h5" sx={{ mb: 0, opacity: 0.8, fontWeight: 300 }}>
            Transparent pricing tailored for professional results.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 15 }}>
        {/* Music Production Pricing */}
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, textAlign: 'center' }}>
          Music Production
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 8 }}>
          Turn your creative vision into a sonic reality.
        </Typography>
        <Grid container spacing={4} sx={{ mb: 15 }}>
          {[
            { title: 'Single Track', price: '$299', features: ['6 Hours Studio Time', 'Professional Mix', 'Digital Master', '1 Revision Cycle'] },
            { title: 'EP Package', price: '$999', features: ['25 Hours Studio Time', 'Full Mix & Master', 'Project Management', 'Distribution Ready'] },
            { title: 'Custom Project', price: 'Quote', features: ['Bespoke Production', 'Unlimited Revisions', 'Marketing Consultation', 'Priority Booking'] }
          ].map((plan, idx) => (
            <Grid size={{ xs: 12, md: 4 }} key={idx}>
              <Card elevation={0} sx={{ height: '100%', border: '1px solid #eee', transition: '0.3s', '&:hover': { borderColor: 'black', transform: 'translateY(-5px)' }, position: 'relative', overflow: 'visible' }}>
                {idx === 1 && <Box sx={{ position: 'absolute', top: -15, left: '50%', transform: 'translateX(-50%)', bgcolor: 'black', color: 'white', px: 3, py: 0.5, fontSize: '0.75rem', fontWeight: 700, borderRadius: 50, zIndex: 1 }}>BEST VALUE</Box>}
                <CardContent sx={{ p: 5, textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{plan.title}</Typography>
                  <Typography variant="h2" sx={{ fontWeight: 900, mb: 4 }}>{plan.price}</Typography>
                  <Divider sx={{ mb: 4 }} />
                  {plan.features.map((f, i) => (
                    <Typography key={i} variant="body2" sx={{ mb: 2, color: 'text.secondary', fontWeight: 500 }}>{f}</Typography>
                  ))}
                  <Button variant={idx === 1 ? "contained" : "outlined"} fullWidth sx={{ mt: 4, py: 1.5, bgcolor: idx === 1 ? 'black' : 'transparent', color: idx === 1 ? 'white' : 'black', borderColor: 'black', '&:hover': { bgcolor: idx === 1 ? '#333' : 'rgba(0,0,0,0.05)', borderColor: 'black' } }}>Choose Plan</Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Piano Lessons Pricing */}
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, textAlign: 'center' }}>
          Music Lessons
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 8 }}>
          Piano and Voice training for all skill levels.
        </Typography>
        <Grid container spacing={4} sx={{ mb: 15 }}>
          {[
            { title: 'Casual Learner', price: '$55', unit: '/ Session', desc: 'Flexible 45-minute lessons for busy schedules.' },
            { title: 'Weekly Progress', price: '$200', unit: '/ Month', desc: '4 x 45-minute sessions (1 per week) for consistent growth.' },
            { title: 'Performance Path', price: '$550', unit: '/ Bundle', desc: '12 x 45-minute sessions. Recommended for exam prep.' }
          ].map((plan, idx) => (
            <Grid size={{ xs: 12, md: 4 }} key={idx}>
              <Card elevation={0} sx={{ height: '100%', bgcolor: '#f9f9f9', p: 3, border: '1px solid transparent', '&:hover': { borderColor: '#ddd' } }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>{plan.title}</Typography>
                  <Typography variant="h3" sx={{ fontWeight: 900, mt: 3, mb: 1 }}>{plan.price}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>{plan.unit}</Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 4, minHeight: 60 }}>{plan.desc}</Typography>
                  <Button variant="contained" fullWidth sx={{ bgcolor: 'black', py: 1.5 }}>Enroll Now</Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* FAQ Section */}
        <Box sx={{ maxWidth: 800, mx: 'auto', mt: 10 }}>
          <Typography variant="h4" align="center" sx={{ fontWeight: 800, mb: 6 }}>
            Frequently Asked Questions
          </Typography>
          {[
            { q: 'Can I cancel my monthly subscription?', a: 'Yes, you can cancel your monthly lesson plan at any time with 2 weeks notice.' },
            { q: 'Is studio equipment included in production costs?', a: 'All standard studio equipment, including microphones, preamps, and DAWs, are included in our production packages.' },
            { q: 'Do you offer online lessons?', a: 'Yes, we provide high-quality remote lessons via Zoom or Google Meet for students globally.' },
            { q: 'How long does a typical production take?', a: 'A single track typically takes 10-15 total hours from recording to final master, depending on complexity.' }
          ].map((faq, i) => (
            <Accordion key={i} elevation={0} sx={{ '&:before': { display: 'none' }, borderBottom: '1px solid #eee' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>{faq.q}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="text.secondary">
                  {faq.a}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </>
  );
};

export default Pricing;
