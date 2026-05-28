import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';

interface LoaderProps {
  onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [fade, setFade] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoReady) {
      // Showcase the video for 1.5 seconds before smoothly fading out to enter the site
      const dismissTimer = setTimeout(() => {
        setFade(true);
        const completeTimer = setTimeout(() => {
          onComplete();
        }, 800); // Fully unmount after fade-out transition completes
        return () => clearTimeout(completeTimer);
      }, 1500);

      return () => clearTimeout(dismissTimer);
    }
  }, [videoReady, onComplete]);

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
        justifyContent: 'center',
        alignItems: 'center',
        opacity: fade ? 0 : 1,
        visibility: fade ? 'hidden' : 'visible',
        transition: 'opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), visibility 0.8s',
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
          maxWidth: '100%',
          maxHeight: '100%',
          width: 'auto',
          height: 'auto',
          opacity: videoReady ? 1 : 0,
          transition: 'opacity 0.6s ease-out'
        }}
      />
    </Box>
  );
};

export default Loader;
