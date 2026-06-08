import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import loaderVideo from '../../assets/loader-video.mp4';

const PageTransitionLoader: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastPathRef = useRef<string>(pathname);

  // Helper to seek video safely only when metadata is loaded
  const setVideoTime = (time: number) => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (video.readyState >= 1) {
        video.currentTime = time;
      } else {
        const handleMetadata = () => {
          video.currentTime = time;
          video.removeEventListener('loadedmetadata', handleMetadata);
        };
        video.addEventListener('loadedmetadata', handleMetadata);
      }
    } catch (err) {
      console.log("Error seeking transition video:", err);
    }
  };

  // Play video helper
  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Video playback start error:", err);
      });
    }
  };

  // Prime video to 1 second immediately on component load
  useEffect(() => {
    setVideoTime(1);
  }, []);

  // 1. Listen to global internal link clicks to trigger loader instantly
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor) {
        const href = anchor.getAttribute('href');
        
        // Ensure it's an internal route navigation link (not external, hash, tel, mailto, or blank tab)
        if (
          href && 
          (href.startsWith('/') || !href.includes(':')) && 
          !href.startsWith('#') &&
          anchor.target !== '_blank'
        ) {
          const cleanHref = href.split('?')[0].split('#')[0] || '/';
          const currentPath = window.location.pathname;

          // If the link points to a hash anchor on the same page, do not trigger loader
          if (href.includes('#') && cleanHref === currentPath) {
            return;
          }

          e.preventDefault(); // Intercept instant navigation to prevent concurrent render lag
          
          setVisible(true);
          // Play instantly
          playVideo();

          // Wait 200ms for the loader to fade in completely on GPU before initiating heavy React route loading
          setTimeout(() => {
            navigate(href);
          }, 200);
        }
      }
    };

    window.addEventListener('click', handleGlobalClick, { passive: false });
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [navigate]);

  // 2. When pathname changes (page transition finishes), fade out smoothly
  useEffect(() => {
    if (pathname !== lastPathRef.current) {
      lastPathRef.current = pathname;
      
      // Delay slightly (e.g. 450ms) to ensure the loader remains visible for a premium, smooth transition
      const timer = setTimeout(() => {
        setVisible(false);
      }, 450);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  // 3. When overlay becomes hidden, pause and re-prime video for next navigation
  useEffect(() => {
    if (!visible) {
      if (videoRef.current) {
        videoRef.current.pause();
        setVideoTime(1); // Keep it primed at 1s for the next click
      }
    }
  }, [visible]);

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
        zIndex: 99999, // On top of everything
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: visible ? 1 : 0,
        visibility: visible ? 'visible' : 'hidden',
        pointerEvents: visible ? 'all' : 'none', // Allow clicking through elements when hidden
        // GPU acceleration styling
        willChange: 'opacity',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        // High-end smooth cubic-bezier transition for better fade
        transition: 'opacity 0.45s cubic-bezier(0.25, 1, 0.5, 1), visibility 0.45s cubic-bezier(0.25, 1, 0.5, 1)',
      }}
    >
      <video
        ref={videoRef}
        src={loaderVideo}
        muted
        playsInline
        loop
        preload="auto"
        style={{
          maxWidth: '280px',
          width: '70%',
          height: 'auto',
          opacity: 1 // Always visible inside the parent Box wrapper
        }}
      />
    </Box>
  );
};

export default PageTransitionLoader;
