import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { Box, Container, Typography, Button, Paper, Collapse, IconButton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import RefreshIcon from '@mui/icons-material/Refresh';
import HomeIcon from '@mui/icons-material/Home';
import BugReportIcon from '@mui/icons-material/BugReport';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  showDetails: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
    showDetails: false,
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    // Log the error to console or external logging services
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false,
    });
  };

  private handleRefresh = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    this.handleReset();
    window.location.href = '/';
  };

  private toggleDetails = () => {
    this.setState((prevState) => ({ showDetails: !prevState.showDetails }));
  };

  public render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0a0a0a',
            color: '#ffffff',
            py: 8,
            px: 2,
            fontFamily: '"Space Grotesk", sans-serif',
          }}
        >
          <Container maxWidth="md">
            <Box
              sx={{
                textAlign: 'center',
                mb: 6,
                position: 'relative',
              }}
            >
              {/* Premium abstract background glow */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '300px',
                  height: '300px',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0) 70%)',
                  zIndex: 0,
                  pointerEvents: 'none',
                }}
              />

              <Box sx={{ zIndex: 1, position: 'relative' }}>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '6rem', md: '10rem' },
                    fontWeight: 900,
                    letterSpacing: '-0.05em',
                    lineHeight: 1,
                    background: 'linear-gradient(180deg, #ffffff 30%, #444444 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 2,
                    fontFamily: '"Syne", sans-serif',
                  }}
                >
                  Oops
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    mb: 3,
                    fontFamily: '"Syne", sans-serif',
                    letterSpacing: '0.02em',
                  }}
                >
                  Something Out of Tune Occurred
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    maxWidth: '550px',
                    margin: '0 auto',
                    mb: 5,
                    fontSize: '1.1rem',
                    lineHeight: 1.6,
                  }}
                >
                  We encountered an unexpected error while rendering this page. Our audio engineers have been notified, but in the meantime, try resetting or reloading the application.
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: 2,
                    mb: 6,
                  }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    onClick={this.handleReset}
                    sx={{
                      backgroundColor: '#ffffff',
                      color: '#000000',
                      px: 4,
                      py: 1.5,
                      borderRadius: 100,
                      fontWeight: 700,
                      '&:hover': {
                        backgroundColor: '#e0e0e0',
                      },
                    }}
                  >
                    Try Again
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={this.handleRefresh}
                    startIcon={<RefreshIcon />}
                    sx={{
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                      color: '#ffffff',
                      px: 4,
                      py: 1.5,
                      borderRadius: 100,
                      fontWeight: 600,
                      '&:hover': {
                        borderColor: '#ffffff',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      },
                    }}
                  >
                    Reload Page
                  </Button>
                  <Button
                    variant="text"
                    size="large"
                    onClick={this.handleGoHome}
                    startIcon={<HomeIcon />}
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      px: 3,
                      py: 1.5,
                      borderRadius: 100,
                      fontWeight: 600,
                      '&:hover': {
                        color: '#ffffff',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      },
                    }}
                  >
                    Go Home
                  </Button>
                </Box>
              </Box>
            </Box>

            {/* Premium, collapsable advanced debug panel */}
            <Paper
              elevation={0}
              sx={{
                backgroundColor: '#121212',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 4,
                overflow: 'hidden',
                maxWidth: '700px',
                margin: '0 auto',
              }}
            >
              <Box
                onClick={this.toggleDetails}
                sx={{
                  p: 2.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  userSelect: 'none',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <BugReportIcon sx={{ color: 'rgba(255,255,255,0.4)' }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, letterSpacing: '0.05em', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', fontSize: '0.8rem' }}>
                    Diagnostic details for developers
                  </Typography>
                </Box>
                <IconButton size="small" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                  {this.state.showDetails ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </Box>
              <Collapse in={this.state.showDetails}>
                <Box
                  sx={{
                    p: 3,
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    backgroundColor: '#0c0c0c',
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#ef5350',
                      fontWeight: 700,
                      mb: 2,
                      fontFamily: 'monospace',
                      fontSize: '0.9rem',
                    }}
                  >
                    {this.state.error && this.state.error.toString()}
                  </Typography>
                  <Box
                    sx={{
                      maxHeight: '250px',
                      overflowY: 'auto',
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      p: 2,
                      borderRadius: 2,
                      border: '1px solid rgba(255,255,255,0.05)',
                      fontFamily: 'monospace',
                      fontSize: '0.75rem',
                      color: 'rgba(255, 255, 255, 0.5)',
                      whiteSpace: 'pre-wrap',
                      '&::-webkit-scrollbar': {
                        width: '6px',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '4px',
                      },
                    }}
                  >
                    {this.state.errorInfo && this.state.errorInfo.componentStack}
                  </Box>
                </Box>
              </Collapse>
            </Paper>
          </Container>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
