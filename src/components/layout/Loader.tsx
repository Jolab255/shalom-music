import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface LoaderProps {
  onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [fade, setFade] = useState(false);
  const [percent, setPercent] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Smooth loading progress simulation
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Increment faster initially, then slow down to wait for video ready
        const increment = prev < 70 ? 3 : 1;
        return prev + increment;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Dismiss loading overlay only when progress hits 100% and video is fully ready to play
    if (percent === 100 && videoReady) {
      const dismissTimer = setTimeout(() => {
        setFade(true);
        const completeTimer = setTimeout(() => {
          onComplete();
        }, 800); // Fully unmount after fade transition completes
        return () => clearTimeout(completeTimer);
      }, 500); // Elegant brief pause at 100%

      return () => clearTimeout(dismissTimer);
    }
  }, [percent, videoReady, onComplete]);

  const handleVideoCanPlay = () => {
    setVideoReady(true);
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay policy restriction or video load error:", err);
        // Fallback to avoid locking the screen if browser blocks autoplay
        setVideoReady(true);
      });
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        bgcolor: '#000000',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: fade ? 0 : 1,
        visibility: fade ? 'hidden' : 'visible',
        transition: 'opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), visibility 0.8s',
        // Premium cloudy backdrop
        background: `
          radial-gradient(circle at 50% 50%, rgba(45, 45, 55, 0.28) 0%, transparent 60%),
          #000000
        `,
        // Dynamic sandy grain texture overlay
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: 0.045,
          pointerEvents: 'none',
          zIndex: 1
        }
      }}
    >
      <Box 
        sx={{ 
          position: 'relative', 
          zIndex: 2, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          gap: { xs: 3, sm: 4 }
        }}
      >
        {/* Instant Equalizer Loader - shown while video is buffer-loading */}
        {!videoReady && (
          <Box sx={{ display: 'flex', gap: 0.75, alignItems: 'flex-end', height: '48px', mb: 2 }}>
            {[0.4, 0.7, 0.9, 0.5, 0.8, 0.6, 0.9].map((h, i) => (
              <Box 
                key={i} 
                sx={{ 
                  width: '6px', 
                  height: '100%', 
                  bgcolor: '#ff2a74', 
                  borderRadius: '3px',
                  animation: 'growBar 1s ease-in-out infinite alternate',
                  animationDelay: `${i * 0.1}s`,
                  '@keyframes growBar': {
                    '0%': { height: '15%' },
                    '100%': { height: `${h * 100}%` }
                  }
                }} 
              />
            ))}
          </Box>
        )}

        {/* Video Circle Container */}
        <Box
          sx={{
            width: { xs: '240px', sm: '320px', md: '360px' },
            height: { xs: '240px', sm: '320px', md: '360px' },
            borderRadius: '50%',
            overflow: 'hidden',
            border: '2px solid rgba(255, 42, 116, 0.18)',
            boxShadow: '0 0 45px rgba(255, 42, 116, 0.22)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: '#030303',
            opacity: videoReady ? 1 : 0,
            transform: videoReady ? 'scale(1)' : 'scale(0.92)',
            transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            position: 'relative'
          }}
        >
          <video
            ref={videoRef}
            src="/loader-video.mp4"
            muted
            playsInline
            loop
            onCanPlayThrough={handleVideoCanPlay}
            onLoadedData={handleVideoCanPlay}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </Box>

        {/* Brand Copywriting & Status */}
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography
            sx={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 700,
              fontSize: { xs: '0.9rem', sm: '1.05rem' },
              color: 'rgba(255, 255, 255, 0.95)',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              mb: 0.75,
              animation: 'pulseText 2s infinite alternate',
              '@keyframes pulseText': {
                '0%': { opacity: 0.65 },
                '100%': { opacity: 1 }
              }
            }}
          >
            Shalom Music
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Linear", sans-serif',
              fontWeight: 300,
              fontSize: { xs: '0.78rem', sm: '0.84rem' },
              color: '#ff2a74',
              letterSpacing: '0.15em',
              mb: 2.5
            }}
          >
            DISCOVER YOUR SOUND...
          </Typography>

          {/* Glowing Linear Progress Bar */}
          <Box 
            sx={{ 
              width: '160px', 
              height: '2px', 
              bgcolor: 'rgba(255, 255, 255, 0.08)', 
              borderRadius: '2px',
              mx: 'auto',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Box 
              sx={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: `${percent}%`,
                bgcolor: '#ff2a74',
                boxShadow: '0 0 10px #ff2a74',
                transition: 'width 0.1s linear'
              }}
            />
          </Box>
          <Typography
            sx={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontSize: '0.75rem',
              fontWeight: 500,
              color: 'rgba(255, 255, 255, 0.38)',
              mt: 1.5,
              letterSpacing: '0.04em'
            }}
          >
            {percent}%
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Loader;
