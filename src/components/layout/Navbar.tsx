import React from 'react';
import { AppBar, Toolbar, Button, Box, IconButton, Drawer, List, ListItem, ListItemText, InputBase, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';

// Categories in the top slim bar
const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Production', path: '/production' },
  { label: 'Piano Lessons', path: '/lessons' },
  { label: 'Studio Rental', path: '/rental' },
  { label: 'Piano Service', path: '/piano-service' },
  { label: 'About', path: '/about' },
];

// Expanded navigation items for mobile drawer
const drawerNavItems = [
  { label: 'Home', path: '/' },
  { label: 'Production', path: '/production' },
  { label: 'Piano Lessons', path: '/lessons' },
  { label: 'Studio Rental', path: '/rental' },
  { label: 'Piano Service', path: '/piano-service' },
  { label: 'About', path: '/about' },
  { label: "Today's", path: '/offers' },
  { label: 'View Plans', path: '/pricing' },
  { label: 'Testimonies', path: '/#testimonials' },
  { label: 'Contact Us', path: '/contact' },
];

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', py: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Brand logo in Drawer */}
      <Box sx={{ py: 2, px: 3, borderBottom: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', justifyContent: 'center' }}>
        <Box 
          component="img" 
          src={logo} 
          alt="Shalom Music Logo" 
          sx={{ 
            height: '70px', 
            objectFit: 'contain',
            display: 'block'
          }} 
        />
      </Box>
      <List sx={{ pt: 2 }}>
        {drawerNavItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.label} disablePadding>
              <ListItemText sx={{ my: 0.5 }}>
                <Button 
                  component={RouterLink} 
                  to={item.path} 
                  fullWidth 
                  sx={{ 
                    color: isActive ? '#ff2a74' : 'rgba(255, 255, 255, 0.85)',
                    fontFamily: '"Space Grotesk", sans-serif',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '1rem',
                    py: 1.2,
                    letterSpacing: '0.03em',
                    textTransform: 'none',
                    whiteSpace: 'nowrap',
                    position: 'relative',
                    '&::before': isActive ? {
                      content: '""',
                      position: 'absolute',
                      left: 12,
                      width: 4,
                      height: 18,
                      borderRadius: 2,
                      backgroundColor: '#ff2a74',
                    } : {},
                    '&:hover': {
                      color: '#ff2a74',
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    },
                  }}
                >
                  {item.label}
                </Button>
              </ListItemText>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="sticky" 
        sx={{ 
          boxShadow: 'none',
          backgroundColor: 'transparent',
          borderBottom: 'none'
        }}
      >
        {/* Top Slim 40px Bar */}
        <Box 
          sx={{ 
            height: 40, 
            minHeight: '40px !important', 
            display: 'flex', 
            justifyContent: 'center',
            backgroundColor: '#161616',
            px: { xs: 2, sm: 4, md: '60px', lg: '100px' },
            width: '100%',
            boxSizing: 'border-box',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
          }}
        >
          <Toolbar 
            disableGutters 
            sx={{ 
              justifyContent: 'flex-start', 
              minHeight: '40px !important', 
              height: 40,
              padding: 0,
              boxSizing: 'border-box',
              width: '100%'
            }}
          >
            {isMobile ? (
              <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end', height: 40, alignItems: 'center' }}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={handleDrawerToggle}
                  sx={{ p: 0.5 }}
                >
                  <MenuIcon sx={{ fontSize: '1.3rem' }} />
                </IconButton>
              </Box>
            ) : (
              <Box 
                sx={{ 
                  display: 'flex', 
                  gap: { md: 0.5, lg: 1 }, 
                  justifyContent: 'flex-start', 
                  flexWrap: 'nowrap', 
                  width: '100%', 
                  height: 40, 
                  alignItems: 'center' 
                }}
              >
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Button
                      key={item.label}
                      component={RouterLink}
                      to={item.path}
                      sx={{ 
                        color: isActive ? '#ff2a74' : 'rgba(255, 255, 255, 0.9)', 
                        fontWeight: isActive ? 700 : 600,
                        fontFamily: '"Space Grotesk", sans-serif',
                        fontSize: '0.82rem',
                        letterSpacing: '0.04em',
                        py: 0,
                        px: 1, 
                        height: '100%',
                        minHeight: 0,
                        position: 'relative',
                        textTransform: 'none',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.3s ease',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          width: isActive ? '80%' : '0%',
                          height: '1.5px',
                          bottom: '5px', 
                          left: '50%',
                          transform: 'translateX(-50%)',
                          backgroundColor: '#ff2a74',
                          transition: 'width 0.3s ease, background-color 0.3s ease',
                        },
                        '&:hover': {
                          color: '#ff2a74',
                          backgroundColor: 'transparent',
                          '&::after': {
                            width: '80%',
                            backgroundColor: '#ff2a74',
                          },
                        },
                      }}
                    >
                      {item.label}
                    </Button>
                  );
                })}
              </Box>
            )}
          </Toolbar>
        </Box>

        {/* Second Bar (Total Black) */}
        <Box
          sx={{
            height: { xs: 64, sm: 72 },
            minHeight: { xs: '64px !important', sm: '72px !important' },
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#000000', // Total Black background
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            px: { xs: 2, sm: 4, md: '60px', lg: '100px' },
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          {/* Logo */}
          <Box component={RouterLink} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <Box 
              component="img" 
              src={logo} 
              alt="Shalom Music Logo" 
              sx={{ 
                height: { xs: '72px', sm: '86px' }, 
                objectFit: 'contain',
                display: 'block',
                position: 'relative',
                zIndex: 2,
                mt: { xs: -0.5, sm: -1 },
                mb: { xs: -0.5, sm: -1 }
              }} 
            />
          </Box>

          {/* Search Input Field (Dark Mode styled for black bar) */}
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              bgcolor: '#1a1a1a', // Lighter dark gray for contrast on black
              borderRadius: '4px', 
              px: 2, 
              py: 0.5,
              ml: { xs: 2, md: 4 },
              width: { xs: '120px', sm: '180px', md: '280px' },
              transition: 'all 0.3s ease',
              border: '1px solid transparent',
              '&:focus-within': {
                bgcolor: '#121212',
                borderColor: '#ff2a74',
                boxShadow: '0 0 8px rgba(255, 42, 116, 0.25)'
              }
            }}
          >
            <SearchIcon sx={{ color: '#aaa', mr: 1, fontSize: '1.2rem' }} />
            <InputBase 
              placeholder="Discover your sound..." 
              sx={{ 
                fontSize: '1.05rem', 
                fontFamily: '"Space Grotesk", sans-serif',
                width: '100%',
                color: '#ffffff', // White text
                '& input::placeholder': {
                  color: 'rgba(255, 255, 255, 0.5)',
                  opacity: 1
                }
              }} 
            />
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* Right Action Items */}
          {isMobile ? (
            <Button
              component={RouterLink}
              to="/contact"
              variant="contained"
              sx={{
                bgcolor: '#ff2a74',
                color: '#ffffff',
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 700,
                fontSize: '0.85rem', // Increased font size from 0.78rem
                px: 2.2,
                py: 0.7,
                borderRadius: '4px',
                textTransform: 'none',
                boxShadow: '0 4px 8px rgba(255, 42, 116, 0.3)',
                '&:hover': {
                  bgcolor: '#e01b5d',
                  transform: 'translateY(-1px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Contact
            </Button>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { md: 0.5, lg: 0.75 } }}>
              <Button
                component={RouterLink}
                to="/offers"
                sx={{
                  color: location.pathname === '/offers' ? '#ff2a74' : '#ffffff',
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontWeight: 600,
                  fontSize: '0.95rem', // Increased font size from 0.85rem
                  textTransform: 'none',
                  whiteSpace: 'nowrap',
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  px: 0.75,
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: location.pathname === '/offers' ? '60%' : '0%',
                    height: '1.5px',
                    bottom: '-4px', 
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#ff2a74',
                    transition: 'width 0.3s ease',
                  },
                  '&:hover': { 
                    bgcolor: 'transparent'
                  }
                }}
              >
                Today's
                <Box 
                  component="span" 
                  sx={{ 
                    ml: 0.8, 
                    bgcolor: '#ff2a74', 
                    color: '#ffffff', 
                    fontSize: '0.62rem', 
                    px: 0.6, 
                    py: 0.15, 
                    borderRadius: '2px', 
                    fontWeight: 900,
                    letterSpacing: '0.03em',
                    textTransform: 'uppercase',
                    lineHeight: 1.2,
                    animation: 'blink 1.5s infinite ease-in-out',
                    '@keyframes blink': {
                      '0%, 100%': { 
                        opacity: 1,
                        backgroundColor: '#ff2a74',
                        boxShadow: '0 0 4px #ff2a74'
                      },
                      '50%': { 
                        opacity: 0.3,
                        backgroundColor: 'rgba(255, 42, 116, 0.4)',
                        boxShadow: 'none'
                      }
                    }
                  }}
                >
                  OFFER
                </Box>
              </Button>
              <Button
                component={RouterLink}
                to="/pricing"
                sx={{
                  color: location.pathname === '/pricing' ? '#ff2a74' : '#ffffff',
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontWeight: 600,
                  fontSize: '0.95rem', // Increased font size from 0.85rem
                  textTransform: 'none',
                  whiteSpace: 'nowrap',
                  position: 'relative',
                  px: 0.75,
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: location.pathname === '/pricing' ? '60%' : '0%',
                    height: '1.5px',
                    bottom: '-4px', 
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#ff2a74',
                    transition: 'width 0.3s ease',
                  },
                  '&:hover': { 
                    bgcolor: 'transparent'
                  }
                }}
              >
                View Plans
              </Button>
              <Button
                component={RouterLink}
                to="/#testimonials"
                sx={{
                  color: (location.pathname === '/' && location.hash === '#testimonials') ? '#ff2a74' : '#ffffff',
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontWeight: 600,
                  fontSize: '0.95rem', // Increased font size from 0.85rem
                  textTransform: 'none',
                  whiteSpace: 'nowrap',
                  position: 'relative',
                  px: 0.75,
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: (location.pathname === '/' && location.hash === '#testimonials') ? '60%' : '0%',
                    height: '1.5px',
                    bottom: '-4px', 
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#ff2a74',
                    transition: 'width 0.3s ease',
                  },
                  '&:hover': { 
                    bgcolor: 'transparent'
                  }
                }}
              >
                Testimonies
              </Button>
              <Button
                component={RouterLink}
                to="/contact"
                variant="contained"
                sx={{
                  bgcolor: '#ff2a74',
                  color: '#ffffff',
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontWeight: 700,
                  fontSize: '0.95rem', // Increased font size from 0.85rem
                  px: 3.2,
                  py: 0.9,
                  borderRadius: '4px',
                  textTransform: 'none',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 4px 10px rgba(255, 42, 116, 0.35)',
                  '&:hover': {
                    bgcolor: '#e01b5d',
                    boxShadow: '0 6px 15px rgba(255, 42, 116, 0.45)',
                    transform: 'translateY(-1px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Contact Us
              </Button>
            </Box>
          )}
        </Box>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 240,
            backgroundColor: '#121212',
            color: '#ffffff',
            borderRight: '1px solid rgba(255, 255, 255, 0.08)'
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
