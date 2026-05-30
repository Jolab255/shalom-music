import { Box, Container, Typography, IconButton, Divider, Link, Grid2 as Grid } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link as RouterLink } from 'react-router-dom';
import logo from '../../assets/logo.webp';

const Footer: React.FC = () => {
  return (
    <Box 
      sx={{ 
        bgcolor: '#08080a', 
        color: 'white', 
        pt: { xs: 8, sm: 10 }, 
        pb: 4, 
        mt: 'auto',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255, 42, 116, 0.15)',
        // Sandy texture overlay matching other sections exactly
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: 0.035, 
          pointerEvents: 'none',
          zIndex: 1
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={5}>
          {/* Brand/Logo Column */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3.5 }}>
              <Box 
                component="img" 
                src={logo} 
                alt="Shalom Music Logo" 
                sx={{ 
                  height: 44, 
                  width: 'auto',
                  filter: 'brightness(1)' 
                }} 
              />
              <Typography 
                sx={{ 
                  fontFamily: '"Sans Superellipse Ragan 2", sans-serif', 
                  fontWeight: 900, 
                  fontSize: '1.25rem',
                  letterSpacing: '0.04em',
                  color: 'white'
                }}
              >
                SHALOM MUSIC
              </Typography>
            </Box>
            <Typography 
              variant="body2" 
              sx={{ 
                fontFamily: '"Linear", sans-serif',
                fontWeight: 300,
                color: 'rgba(255, 255, 255, 0.65)', 
                lineHeight: 1.8,
                mb: 4, 
                maxWidth: '380px' 
              }}
            >
              High-end music production, master-grade recording studios, professional piano lessons, and premium concert piano accompaniment. Elevating local and global sound structures from Dar es Salaam, Tanzania.
            </Typography>
            
            {/* Social Icons */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              {[
                { icon: <FacebookIcon fontSize="small" />, label: 'Facebook', url: '#' },
                { icon: <InstagramIcon fontSize="small" />, label: 'Instagram', url: '#' },
                { icon: <YouTubeIcon fontSize="small" />, label: 'YouTube', url: 'https://www.youtube.com/watch?v=tC0QnPUsrCk' }
              ].map((social, i) => (
                <IconButton 
                  key={i}
                  component="a"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.6)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.25s ease',
                    '&:hover': { 
                      color: 'white', 
                      bgcolor: '#ff2a74', 
                      borderColor: '#ff2a74',
                      transform: 'translateY(-2px)'
                    } 
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Quick Links Column */}
          <Grid size={{ xs: 12, sm: 6, md: 3.5 }}>
            <Typography 
              sx={{ 
                fontFamily: '"Space Grotesk", sans-serif', 
                fontWeight: 700, 
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontSize: '0.85rem',
                color: '#ff2a74',
                mb: 3.5 
              }}
            >
              Services & Portals
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                { label: 'Audio Production', path: '/#recording' },
                { label: 'Piano & Music Lessons', path: '/lessons' },
                { label: 'Concert Accompanist', path: '/piano-services' },
                { label: 'Studio Space Rental', path: '/#rental' },
                { label: 'Pricing Plans', path: '/pricing' }
              ].map((link, i) => (
                <Link 
                  key={i}
                  component={RouterLink} 
                  to={link.path} 
                  color="inherit" 
                  underline="none"
                  sx={{
                    fontFamily: '"Linear", sans-serif',
                    fontSize: '0.86rem',
                    fontWeight: 300,
                    color: 'rgba(255, 255, 255, 0.7)',
                    transition: 'all 0.25s ease',
                    display: 'inline-flex',
                    alignSelf: 'flex-start',
                    '&:hover': { 
                      color: '#ff2a74', 
                      transform: 'translateX(4px)' 
                    }
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Contact Details Column */}
          <Grid size={{ xs: 12, sm: 6, md: 3.5 }}>
            <Typography 
              sx={{ 
                fontFamily: '"Space Grotesk", sans-serif', 
                fontWeight: 700, 
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontSize: '0.85rem',
                color: '#ff2a74',
                mb: 3.5 
              }}
            >
              Contact Sanctuary
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <Box>
                <Typography sx={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.45)', textTransform: 'uppercase', letterSpacing: '0.08em', mb: 0.5 }}>
                  Enquiries
                </Typography>
                <Link 
                  href="mailto:info@shalommusic.com" 
                  color="inherit" 
                  underline="none"
                  sx={{ 
                    fontFamily: '"Linear", sans-serif', 
                    fontSize: '0.86rem', 
                    fontWeight: 300,
                    color: 'rgba(255, 255, 255, 0.75)',
                    transition: 'all 0.2s',
                    '&:hover': { color: '#ff2a74' }
                  }}
                >
                  info@shalommusic.com
                </Link>
              </Box>
              <Box>
                <Typography sx={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.45)', textTransform: 'uppercase', letterSpacing: '0.08em', mb: 0.5 }}>
                  Direct Phone
                </Typography>
                <Link 
                  href="tel:+255700000000" 
                  color="inherit" 
                  underline="none"
                  sx={{ 
                    fontFamily: '"Linear", sans-serif', 
                    fontSize: '0.86rem', 
                    fontWeight: 300,
                    color: 'rgba(255, 255, 255, 0.75)',
                    transition: 'all 0.2s',
                    '&:hover': { color: '#ff2a74' }
                  }}
                >
                  +255 700 000 000
                </Link>
              </Box>
              <Box>
                <Typography sx={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.45)', textTransform: 'uppercase', letterSpacing: '0.08em', mb: 0.5 }}>
                  Studio Address
                </Typography>
                <Typography 
                  sx={{ 
                    fontFamily: '"Linear", sans-serif', 
                    fontSize: '0.86rem', 
                    fontWeight: 300,
                    color: 'rgba(255, 255, 255, 0.75)',
                    lineHeight: 1.5
                  }}
                >
                  Chuo Kikuu SDA Road, <br />
                  Dar es Salaam, Tanzania
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 5, borderColor: 'rgba(255, 255, 255, 0.06)' }} />

        {/* Footer Bottom copyright and credit */}
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' }, 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            gap: 2 
          }}
        >
          <Typography 
            sx={{ 
              fontFamily: '"Linear", sans-serif',
              fontSize: '0.78rem',
              color: 'rgba(255, 255, 255, 0.4)',
              fontWeight: 300 
            }}
          >
            © {new Date().getFullYear()} Shalom Music. All rights reserved.
          </Typography>
          <Typography 
            sx={{ 
              fontFamily: '"Linear", sans-serif',
              fontSize: '0.78rem',
              color: 'rgba(255, 255, 255, 0.4)',
              fontWeight: 300,
              textAlign: { xs: 'center', sm: 'right' }
            }}
          >
            Designed & Crafted with Passion in Dar es Salaam, Tanzania.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
