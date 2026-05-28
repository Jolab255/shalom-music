import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000000', // Black
    },
    secondary: {
      main: '#666666', // Gray
    },
    background: {
      default: '#ffffff', // White
      paper: '#f5f5f5', // Light Gray
    },
    text: {
      primary: '#000000',
      secondary: '#424242',
    },
  },
  typography: {
    fontFamily: '"Space Grotesk", "Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Syne", sans-serif',
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: '"Syne", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: '"Syne", sans-serif',
      fontWeight: 700,
    },
    h4: {
      fontFamily: '"Syne", sans-serif',
      fontWeight: 700,
    },
    h5: {
      fontFamily: '"Syne", sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 600,
    },
    button: {
      fontFamily: '"Space Grotesk", sans-serif',
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '10px 24px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#161616', // Blackish
          backdropFilter: 'blur(8px)',
          color: '#ffffff', // White
          boxShadow: 'none',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        },
      },
    },
  },
});

export default theme;
