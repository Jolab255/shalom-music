import React from 'react';
import { AppBar, Toolbar, Button, Box, IconButton, Drawer, List, ListItem, ListItemText, InputBase, useMediaQuery, useTheme, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.webp';

// Categories in the top slim bar
const navItems = [
  { label: 'Audio Recording', path: '/#recording' },
  { label: 'Audio Capturing', path: '/#capturing' },
  { label: 'Audio Mixing', path: '/#mixing' },
  { label: 'Audio Mastering', path: '/#mastering' },
  { label: 'Instrumental Creation', path: '/#instrumental' },
  { label: 'Studio Rental', path: '/#rental' },
  { label: 'About', path: '/#about' },
];

// Expanded navigation items for mobile drawer
const drawerNavItems = [
  { label: 'Home', path: '/' },
  { label: 'Audio Recording', path: '/#recording' },
  { label: 'Audio Capturing', path: '/#capturing' },
  { label: 'Audio Mixing', path: '/#mixing' },
  { label: 'Audio Mastering', path: '/#mastering' },
  { label: 'Instrumental Creation', path: '/#instrumental' },
  { label: 'Studio Rental', path: '/#rental' },
  { label: 'About', path: '/#about' },
  { label: 'Piano Lessons', path: '/lessons' },
  { label: 'Piano Services', path: '/piano-services' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Testimonials', path: '/#testimonials' },
  { label: 'Contact Us', path: '/contact' },
];

const searchDatabase = [
  { title: 'Audio Recording', description: 'Pristine multi-track studio recording', path: '/#recording', category: 'Services' },
  { title: 'Audio Capturing', description: 'High-fidelity ambient sound capture', path: '/#capturing', category: 'Services' },
  { title: 'Audio Mixing', description: 'Multi-dimensional audio mixing', path: '/#mixing', category: 'Services' },
  { title: 'Audio Mastering', description: 'Industry-standard mastering', path: '/#mastering', category: 'Services' },
  { title: 'Instrumental Creation', description: 'Custom beats, arrangements & composition', path: '/#instrumental', category: 'Services' },
  { title: 'Complete Recording Package', description: 'All-in-one recording, mixing, and mastering', path: '/pricing', category: 'Pricing' },
  { title: 'Studio Rental', description: 'Book premium studio spaces & rooms', path: '/#rental', category: 'Studios' },
  { title: 'Piano Lessons', description: 'Personalized piano & music instruction', path: '/lessons', category: 'Lessons' },
  { title: 'Piano Services', description: 'Accompanist and performance bookings', path: '/piano-services', category: 'Services' },
  { title: 'Pricing & Plans', description: 'Explore rates and packages', path: '/pricing', category: 'Pricing' },
  { title: 'Testimonials', description: 'Client feedback and reviews', path: '/#testimonials', category: 'About' },
  { title: 'About Shalom Music', description: 'Our history and legacy', path: '/#about', category: 'About' },
  { title: 'Contact Us', description: 'Get in touch with our team', path: '/contact', category: 'Contact' }
];

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isFocused, setIsFocused] = React.useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const [hideTopBar, setHideTopBar] = React.useState(false);
  const [isFeaturedActive, setIsFeaturedActive] = React.useState(false);
  const lastScrollY = React.useRef(0);

  const filteredResults = searchQuery.trim() === ''
    ? []
    : searchDatabase.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Detect if the Featured Services section is active in the viewport (using hysteresis buffer to prevent boundary flickering)
      const featuredEl = document.getElementById('featured');
      if (featuredEl) {
        const rect = featuredEl.getBoundingClientRect();
        setIsFeaturedActive((prevActive) => {
          if (prevActive) {
            // Stay active until scrolled past bottom OR scrolled up past 60px buffer
            return rect.top <= 60 && rect.bottom > 48;
          } else {
            // Become active only when Section 3 hits the top (top <= 0)
            return rect.top <= 0 && rect.bottom > 48;
          }
        });
      } else {
        setIsFeaturedActive(false);
      }

      if (currentScrollY > 40) {
        if (currentScrollY > lastScrollY.current) {
          setHideTopBar(true);
        } else {
          setHideTopBar(false);
        }
      } else {
        setHideTopBar(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          backgroundColor: '#161616',
          borderBottom: 'none',
          transform: isFeaturedActive 
            ? 'translateY(-120px)' 
            : hideTopBar 
              ? 'translateY(-40px)' 
              : 'translateY(0)',
          transition: isFeaturedActive
            ? 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1)'
            : hideTopBar
              ? 'transform 250ms cubic-bezier(0.3, 0, 0.8, 0.15)'
              : 'transform 350ms cubic-bezier(0.05, 0.7, 0.1, 1)',
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
            pointerEvents: hideTopBar ? 'none' : 'auto',
          }}
        >
          <Toolbar 
            disableGutters 
            sx={{ 
              justifyContent: 'center', 
              minHeight: '40px !important', 
              height: 40,
              padding: 0,
              boxSizing: 'border-box',
              width: '100%',
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
                  justifyContent: 'center', 
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
              position: 'relative', // Relative position for matching autocomplete dropdown positioning
              '&:focus-within': {
                bgcolor: '#121212',
                borderColor: '#ff2a74',
                boxShadow: '0 0 8px rgba(255, 42, 116, 0.25)'
              }
            }}
          >
            <SearchIcon sx={{ color: '#aaa', mr: 1, fontSize: '1.2rem' }} />
            <InputBase 
              placeholder="Search services, lessons, pricing..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
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

            {/* Live Autocomplete Dropdown List */}
            {isFocused && searchQuery.trim() !== '' && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  left: { xs: '-80px', sm: 0 },
                  width: { xs: '280px', sm: '320px', md: '360px' },
                  bgcolor: 'rgba(15, 15, 18, 0.96)',
                  backdropFilter: 'blur(25px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(25px) saturate(180%)',
                  border: '1px solid rgba(255, 42, 116, 0.25)',
                  borderRadius: '6px',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.95), 0 0 15px rgba(255, 42, 116, 0.15)',
                  zIndex: 9999,
                  maxHeight: '340px',
                  overflowY: 'auto',
                  p: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.5,
                  '&::-webkit-scrollbar': {
                    width: '6px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    bgcolor: 'rgba(255, 42, 116, 0.3)',
                    borderRadius: '3px',
                  }
                }}
              >
                {filteredResults.length === 0 ? (
                  <Box sx={{ p: 2, textAlign: 'center' }}>
                    <Typography
                      sx={{
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontFamily: '"Space Grotesk", sans-serif',
                        fontSize: '0.9rem',
                      }}
                    >
                      No matching sounds found...
                    </Typography>
                  </Box>
                ) : (
                  filteredResults.map((item, idx) => (
                    <Button
                      key={idx}
                      component={RouterLink}
                      to={item.path}
                      onClick={() => {
                        setSearchQuery('');
                        setIsFocused(false);
                      }}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        textAlign: 'left',
                        p: 1.5,
                        width: '100%',
                        borderRadius: '4px',
                        textTransform: 'none',
                        bgcolor: 'transparent',
                        color: '#ffffff',
                        borderBottom: idx === filteredResults.length - 1 ? 'none' : '1px solid rgba(255, 255, 255, 0.05)',
                        '&:hover': {
                          bgcolor: 'rgba(255, 42, 116, 0.08)',
                          color: '#ff2a74',
                        },
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 0.5 }}>
                        <Typography
                          sx={{
                            fontFamily: '"Space Grotesk", sans-serif',
                            fontWeight: 700,
                            fontSize: '0.95rem',
                            lineHeight: 1.2
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: '"Space Grotesk", sans-serif',
                            fontSize: '0.65rem',
                            fontWeight: 900,
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                            bgcolor: 'rgba(255, 42, 116, 0.15)',
                            color: '#ff2a74',
                            px: 1,
                            py: 0.2,
                            borderRadius: '3px',
                            lineHeight: 1.2
                          }}
                        >
                          {item.category}
                        </Typography>
                      </Box>
                      <Typography
                        sx={{
                          fontFamily: '"Linear", sans-serif',
                          fontSize: '0.8rem',
                          color: 'rgba(255, 255, 255, 0.6)',
                          fontWeight: 300,
                          lineHeight: 1.4,
                        }}
                      >
                        {item.description}
                      </Typography>
                    </Button>
                  ))
                )}
              </Box>
            )}
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
                to="/lessons"
                sx={{
                  color: location.pathname === '/lessons' ? '#ff2a74' : '#ffffff',
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
                    width: location.pathname === '/lessons' ? '60%' : '0%',
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
                Piano Lessons
              </Button>
              <Button
                component={RouterLink}
                to="/piano-services"
                sx={{
                  color: location.pathname === '/piano-services' ? '#ff2a74' : '#ffffff',
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  textTransform: 'none',
                  whiteSpace: 'nowrap',
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  px: 0.75,
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: location.pathname === '/piano-services' ? '60%' : '0%',
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
                Piano Services
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
                Pricing
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
                Testimonials
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
