import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';

interface LoaderProps {
  onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [fade, setFade] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [resourcesLoaded, setResourcesLoaded] = useState(
    typeof window !== 'undefined' ? document.readyState === 'complete' : false
  );
  const [minTimeReached, setMinTimeReached] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // 1. Listen for window load event to track resource loading status
    if (resourcesLoaded) return;

    const handleLoad = () => {
      setResourcesLoaded(true);
    };

    window.addEventListener('load', handleLoad);
    return () => window.removeEventListener('load', handleLoad);
  }, [resourcesLoaded]);

  useEffect(() => {
    // 2. Establish the mandatory 10-second minimum playtime timer
    const timer = setTimeout(() => {
      setMinTimeReached(true);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleVideoCanPlay = () => {
    setVideoReady(true);
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay policy restriction or video load error:", err);
        setVideoReady(true);
      });
    }
  };

  const handleVideoEnded = () => {
    // 3. When video ends, verify if resources have finished loading AND 10s timer is complete
    if (resourcesLoaded && minTimeReached) {
      setFade(true);
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 800); // Unmount after fade-out transition finishes
      return () => clearTimeout(completeTimer);
    } else {
      // Replay the loading video from the beginning
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch((err) => {
          console.log("Video replay error:", err);
        });
      }
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
        onCanPlayThrough={handleVideoCanPlay}
        onLoadedData={handleVideoCanPlay}
        onEnded={handleVideoEnded}
        style={{
          maxWidth: '280px',
          width: '70%',
          height: 'auto',
          opacity: videoReady ? 1 : 0,
          transition: 'opacity 0.6s ease-out'
        }}
      />
    </Box>
  );
};

export default Loader;
