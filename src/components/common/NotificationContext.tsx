import React, { createContext, useContext, useState, useEffect } from 'react';
import { Snackbar, Alert, AlertTitle, Slide, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type Severity = 'success' | 'error' | 'warning' | 'info';

interface NotificationMessage {
  id: number;
  message: string;
  severity: Severity;
  title?: string;
}

interface NotificationContextType {
  showNotification: (message: string, severity?: Severity, title?: string) => void;
  showSuccess: (message: string, title?: string) => void;
  showError: (message: string, title?: string) => void;
  showWarning: (message: string, title?: string) => void;
  showInfo: (message: string, title?: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

function SlideTransition(props: any) {
  return <Slide {...props} direction="up" />;
}

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState<NotificationMessage | null>(null);

  const showNotification = (message: string, severity: Severity = 'info', title?: string) => {
    setNotification({
      id: Date.now(),
      message,
      severity,
      title: title || (severity === 'error' ? 'Error' : severity === 'success' ? 'Success' : severity === 'warning' ? 'Warning' : 'Information'),
    });
    setOpen(true);
  };

  const showSuccess = (message: string, title?: string) => showNotification(message, 'success', title);
  const showError = (message: string, title?: string) => showNotification(message, 'error', title);
  const showWarning = (message: string, title?: string) => showNotification(message, 'warning', title);
  const showInfo = (message: string, title?: string) => showNotification(message, 'info', title);

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  // Register global window error and unhandled rejection handlers
  useEffect(() => {
    const handleGlobalError = (event: ErrorEvent) => {
      // Don't show system/extension errors that are irrelevant to our app
      if (event.message && !event.message.includes('ResizeObserver') && !event.message.includes('Script error')) {
        showError(event.message, 'Application Error');
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      const message = reason instanceof Error ? reason.message : String(reason);
      showError(message || 'An unhandled asynchronous operation failed.', 'Network / Async Error');
    };

    window.addEventListener('error', handleGlobalError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleGlobalError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification, showSuccess, showError, showWarning, showInfo }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        TransitionComponent={SlideTransition}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        sx={{
          zIndex: 9999,
          bottom: { xs: 16, sm: 24 },
          right: { xs: 16, sm: 24 },
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 400 }}>
          {notification && (
            <Alert
              severity={notification.severity}
              variant="filled"
              onClose={handleClose}
              sx={{
                width: '100%',
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                border: '1px solid',
                backgroundColor:
                  notification.severity === 'error'
                    ? '#121212'
                    : notification.severity === 'success'
                    ? '#000000'
                    : notification.severity === 'warning'
                    ? '#1e1b15'
                    : '#1a1a1a',
                color: '#ffffff',
                borderColor:
                  notification.severity === 'error'
                    ? 'rgba(239, 83, 80, 0.3)'
                    : notification.severity === 'success'
                    ? 'rgba(255, 255, 255, 0.2)'
                    : notification.severity === 'warning'
                    ? 'rgba(255, 167, 38, 0.3)'
                    : 'rgba(255, 255, 255, 0.1)',
                '& .MuiAlert-icon': {
                  color:
                    notification.severity === 'error'
                      ? '#ef5350'
                      : notification.severity === 'success'
                      ? '#4caf50'
                      : notification.severity === 'warning'
                      ? '#ffa726'
                      : '#29b6f6',
                  fontSize: '1.5rem',
                  alignSelf: 'center',
                },
                '& .MuiAlert-message': {
                  width: '100%',
                  fontFamily: '"Space Grotesk", sans-serif',
                  pr: 2,
                },
                '& .MuiAlert-action': {
                  alignSelf: 'center',
                  color: '#ffffff',
                },
              }}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={handleClose}
                  sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              }
            >
              <AlertTitle
                sx={{
                  fontWeight: 700,
                  fontFamily: '"Syne", sans-serif',
                  fontSize: '0.95rem',
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                  mb: 0.5,
                  color:
                    notification.severity === 'error'
                      ? '#ef5350'
                      : notification.severity === 'success'
                      ? '#ffffff'
                      : notification.severity === 'warning'
                      ? '#ffa726'
                      : '#29b6f6',
                }}
              >
                {notification.title}
              </AlertTitle>
              <Box sx={{ fontSize: '0.875rem', fontWeight: 400, opacity: 0.9 }}>
                {notification.message}
              </Box>
            </Alert>
          )}
        </Box>
      </Snackbar>
    </NotificationContext.Provider>
  );
};
