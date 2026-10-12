import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  LinearProgress,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import logo from '../../assets/logo.webp';
import { adminAuth } from '../../services/adminAuth';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lockoutSeconds, setLockoutSeconds] = useState<number>(0);

  // Lockout countdown timer
  useEffect(() => {
    if (lockoutSeconds <= 0) return;
    const interval = setInterval(() => {
      setLockoutSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setErrorMessage(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutSeconds]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutSeconds > 0) return;

    if (!username.trim() || !password.trim()) {
      setErrorMessage('Please enter your credentials.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    setTimeout(async () => {
      const res = await adminAuth.login(username, password, rememberMe);
      setIsLoading(false);

      if (res.success) {
        onLoginSuccess();
      } else {
        setErrorMessage(res.error || 'Authentication failed.');
        if (res.remainingSeconds) {
          setLockoutSeconds(res.remainingSeconds);
        }
      }
    }, 350);
  };

  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        py: 4,
      }}
    >
      <Card
        sx={{
          maxWidth: 440,
          width: '100%',
          bgcolor: '#0f0f14',
          color: '#ffffff',
          borderRadius: 0,
          border: '1px solid rgba(255, 42, 116, 0.4)',
          boxShadow: '0 30px 90px rgba(0, 0, 0, 0.95), 0 0 40px rgba(255, 42, 116, 0.12)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            bgcolor: '#ff2a74',
          },
        }}
      >
        {isLoading && (
          <LinearProgress
            sx={{
              borderRadius: 0,
              bgcolor: 'rgba(255, 255, 255, 0.05)',
              '& .MuiLinearProgress-bar': { bgcolor: '#ff2a74' },
            }}
          />
        )}

        <CardContent sx={{ p: { xs: 3.5, sm: 5 } }}>
          {/* Logo Header - Replaces Lock Icon */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              component="img"
              src={logo}
              alt="Shalom Music Logo"
              sx={{
                height: 64,
                maxWidth: '100%',
                objectFit: 'contain',
                display: 'block',
                mx: 'auto',
                mb: 2.5,
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontSize: '1rem',
                color: '#ffffff',
              }}
            >
              Control Portal
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: 'rgba(255, 255, 255, 0.5)',
                letterSpacing: '0.04em',
                display: 'block',
                mt: 0.5,
              }}
            >
              Authorized Personnel Only
            </Typography>
          </Box>

          {errorMessage && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: 0,
                bgcolor: 'rgba(211, 47, 47, 0.18)',
                color: '#ff8a80',
                border: '1px solid rgba(211, 47, 47, 0.5)',
                fontSize: '0.84rem',
              }}
            >
              {errorMessage}
            </Alert>
          )}

          {lockoutSeconds > 0 && (
            <Alert
              severity="warning"
              sx={{
                mb: 3,
                borderRadius: 0,
                bgcolor: 'rgba(237, 108, 2, 0.15)',
                color: '#ffb74d',
                border: '1px solid rgba(237, 108, 2, 0.4)',
                fontSize: '0.84rem',
              }}
            >
              System locked. Retry in <b>{lockoutSeconds}</b> seconds.
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Box sx={{ mb: 2.5 }}>
              <TextField
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading || lockoutSeconds > 0}
                variant="outlined"
                size="small"
                autoComplete="off"
                sx={loginInputStyle}
              />
            </Box>

            <Box sx={{ mb: 2.5 }}>
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading || lockoutSeconds > 0}
                variant="outlined"
                size="small"
                autoComplete="off"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        size="small"
                        sx={{ color: 'rgba(255, 255, 255, 0.5)' }}
                      >
                        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={loginInputStyle}
              />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    size="small"
                    sx={{
                      borderRadius: 0,
                      color: 'rgba(255, 255, 255, 0.4)',
                      '&.Mui-checked': { color: '#ff2a74' },
                    }}
                  />
                }
                label={
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.65)' }}>
                    Keep session active
                  </Typography>
                }
              />
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading || lockoutSeconds > 0}
              sx={{
                borderRadius: 0,
                bgcolor: '#ff2a74',
                color: '#ffffff',
                fontWeight: 800,
                py: 1.3,
                fontSize: '0.92rem',
                fontFamily: '"Space Grotesk", sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                boxShadow: 'none',
                '&:hover': { bgcolor: '#e01b5d', boxShadow: 'none' },
                '&:disabled': { bgcolor: 'rgba(255, 42, 116, 0.3)', color: 'rgba(255, 255, 255, 0.4)' },
              }}
            >
              {isLoading ? 'Authenticating...' : 'Sign In'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

const loginInputStyle = {
  '& .MuiOutlinedInput-root': {
    color: '#ffffff',
    bgcolor: '#14141a',
    borderRadius: 0,
    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.18)', borderRadius: 0 },
    '&:hover fieldset': { borderColor: 'rgba(255, 42, 116, 0.6)', borderRadius: 0 },
    '&.Mui-focused fieldset': { borderColor: '#ff2a74', borderRadius: 0 },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.65)',
    '&.Mui-focused': { color: '#ff2a74' },
  },
};
