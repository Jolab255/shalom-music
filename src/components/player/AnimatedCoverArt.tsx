import React, { useEffect, useRef, useState } from 'react';
import { Box, Chip } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import type { Song } from '../types/song';

interface AnimatedCoverArtProps {
  song: Song;
  isPlaying: boolean;
  isBuffering: boolean;
  audioRef?: React.RefObject<HTMLAudioElement | null>;
  aspectRatio?: string;
  borderRadius?: string | number;
}

export const AnimatedCoverArt: React.FC<AnimatedCoverArtProps> = ({
  song,
  isPlaying,
  isBuffering,
  audioRef,
  aspectRatio = '80%',
  borderRadius = '2px',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationFrameId = useRef<number | null>(null);

  // Audio analysis references (Web Audio API)
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);

  // Fallback synthetic frequency tracking
  const phaseRef = useRef<number>(0);

  // Visual metrics state (scale, glow, pitch tint)
  const [visualData, setVisualData] = useState({
    bassScale: 1,
    glowIntensity: 10,
    hueRotate: 0,
    brightness: 1,
  });

  // Attempt Web Audio API connection if audioRef is available
  useEffect(() => {
    const audioElement = audioRef?.current;
    if (!audioElement) return;

    const setupAudioContext = () => {
      try {
        if (!audioContextRef.current) {
          const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          if (AudioContextClass) {
            audioContextRef.current = new AudioContextClass();
          }
        }

        const ctx = audioContextRef.current;
        if (ctx && ctx.state === 'suspended' && isPlaying) {
          ctx.resume().catch(() => {});
        }

        if (ctx && !sourceNodeRef.current && audioElement) {
          // Note: createMediaElementSource can throw if cross-origin without CORS headers
          try {
            const source = ctx.createMediaElementSource(audioElement);
            const analyser = ctx.createAnalyser();
            analyser.fftSize = 128;
            analyser.smoothingTimeConstant = 0.8;
            source.connect(analyser);
            analyser.connect(ctx.destination);

            sourceNodeRef.current = source;
            analyserRef.current = analyser;
          } catch {
            // If cross-origin or already connected, fallback gracefully to synthetic rhythm engine
            analyserRef.current = null;
          }
        }
      } catch {
        analyserRef.current = null;
      }
    };

    if (isPlaying) {
      setupAudioContext();
    }
  }, [audioRef, isPlaying]);

  // Main rendering & rhythm animation loop
  useEffect(() => {
    let active = true;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    const dataArray = new Uint8Array(64);

    const render = () => {
      if (!active) return;

      let bass = 0;
      let mid = 0;
      let treble = 0;
      let overallVolume = 0;

      const analyser = analyserRef.current;

      if (analyser && isPlaying && !isBuffering) {
        analyser.getByteFrequencyData(dataArray);

        // Lows / Bass (frequency bins 0..6)
        let bassSum = 0;
        for (let i = 0; i < 7; i++) bassSum += dataArray[i];
        bass = bassSum / (7 * 255);

        // Mids / Rhythm (frequency bins 7..24)
        let midSum = 0;
        for (let i = 7; i < 25; i++) midSum += dataArray[i];
        mid = midSum / (18 * 255);

        // Highs / Treble (frequency bins 25..50)
        let trebleSum = 0;
        for (let i = 25; i < 51; i++) trebleSum += dataArray[i];
        treble = trebleSum / (26 * 255);

        overallVolume = (bass * 0.5) + (mid * 0.3) + (treble * 0.2);
      } else if (isPlaying && !isBuffering) {
        // High-precision synthetic dynamic rhythm engine (rise & fall of pitch and tempo)
        phaseRef.current += 0.055;
        const p = phaseRef.current;
        // Harmonic rhythm superposition
        bass = (Math.sin(p * 1.8) * 0.5 + 0.5) * 0.65 + (Math.sin(p * 3.7) * 0.5 + 0.5) * 0.35;
        mid = (Math.sin(p * 2.6 + 1.2) * 0.5 + 0.5) * 0.6 + (Math.cos(p * 4.2) * 0.5 + 0.5) * 0.4;
        treble = (Math.cos(p * 3.3) * 0.5 + 0.5) * 0.5 + (Math.sin(p * 5.1) * 0.5 + 0.5) * 0.5;
        overallVolume = (bass * 0.55 + mid * 0.3 + treble * 0.15) * 0.85;
      } else {
        bass = 0;
        mid = 0;
        treble = 0;
        overallVolume = 0;
      }

      // Update smooth visual metrics for CSS transform & filter
      const targetScale = isPlaying && !isBuffering ? 1.01 + bass * 0.045 : 1;
      const targetGlow = isPlaying && !isBuffering ? 12 + bass * 28 + mid * 15 : 6;
      const targetHue = isPlaying && !isBuffering ? (treble * 35) - (bass * 15) : 0;
      const targetBrightness = isPlaying && !isBuffering ? 1 + (overallVolume * 0.12) : 1;

      setVisualData(prev => ({
        bassScale: prev.bassScale + (targetScale - prev.bassScale) * 0.2,
        glowIntensity: prev.glowIntensity + (targetGlow - prev.glowIntensity) * 0.15,
        hueRotate: prev.hueRotate + (targetHue - prev.hueRotate) * 0.1,
        brightness: prev.brightness + (targetBrightness - prev.brightness) * 0.15,
      }));

      // Render Dynamic Graphic Equalizer Overlay on Canvas
      if (canvas && ctx) {
        const width = canvas.width;
        const height = canvas.height;
        ctx.clearRect(0, 0, width, height);

        const barCount = 28;
        const barWidth = width / barCount;
        const gap = 2;
        const usableWidth = barWidth - gap;

        for (let i = 0; i < barCount; i++) {
          let barHeightRatio = 0.08;

          if (analyser && isPlaying && !isBuffering) {
            const freqIndex = Math.min(Math.floor((i / barCount) * 48), 63);
            barHeightRatio = Math.max(0.08, dataArray[freqIndex] / 255);
          } else if (isPlaying && !isBuffering) {
            const p = phaseRef.current;
            const wave = Math.sin(p * 2.2 + i * 0.38) * 0.45 + 0.55;
            const wave2 = Math.cos(p * 1.4 - i * 0.25) * 0.35 + 0.5;
            barHeightRatio = Math.max(0.08, (wave * 0.6 + wave2 * 0.4) * (0.4 + bass * 0.6));
          } else if (isBuffering) {
            barHeightRatio = 0.2 + (Math.sin(Date.now() * 0.005 + i * 0.4) * 0.5 + 0.5) * 0.25;
          }

          const barH = barHeightRatio * (height * 0.75);
          const x = i * barWidth;
          const y = height - barH;

          // Pitch-based gradient (deep magenta to neon cyan/gold based on treble & bass)
          const grad = ctx.createLinearGradient(0, y, 0, height);
          if (isPlaying && !isBuffering) {
            grad.addColorStop(0, '#ff2a74');
            grad.addColorStop(0.5, '#ff6599');
            grad.addColorStop(1, 'rgba(255, 42, 116, 0.3)');
          } else if (isBuffering) {
            grad.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
            grad.addColorStop(1, 'rgba(255, 255, 255, 0.15)');
          } else {
            grad.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
            grad.addColorStop(1, 'rgba(255, 255, 255, 0.1)');
          }

          ctx.fillStyle = grad;
          // Draw rounded bars
          ctx.beginPath();
          if (ctx.roundRect) {
            ctx.roundRect(x, y, usableWidth, barH, [2, 2, 0, 0]);
          } else {
            ctx.rect(x, y, usableWidth, barH);
          }
          ctx.fill();

          // Pulsing glow bead on bar peak
          if (isPlaying && !isBuffering && barHeightRatio > 0.4) {
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = '#ff2a74';
            ctx.shadowBlur = 6;
            ctx.fillRect(x, y - 2, usableWidth, 2);
            ctx.shadowBlur = 0; // reset
          }
        }
      }

      animationFrameId.current = requestAnimationFrame(render);
    };

    animationFrameId.current = requestAnimationFrame(render);

    return () => {
      active = false;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isPlaying, isBuffering]);

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        width: '100%',
        paddingTop: aspectRatio,
        borderRadius: borderRadius,
        overflow: 'hidden',
        boxShadow: `0 15px 40px rgba(0, 0, 0, 0.85), 0 0 ${visualData.glowIntensity}px rgba(255, 42, 116, ${isPlaying ? 0.45 : 0.08})`,
        border: isPlaying ? '1px solid rgba(255, 42, 116, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
        transition: 'border-color 0.3s ease, box-shadow 0.1s linear',
      }}
    >
      {/* Dynamic Soundwave Rings radiating from center */}
      {isPlaying && !isBuffering && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '120%',
            height: '120%',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 1,
            background: 'radial-gradient(circle, rgba(255, 42, 116, 0.22) 0%, rgba(255, 42, 116, 0.08) 40%, transparent 70%)',
            animation: 'soundwavePulse 1.8s cubic-bezier(0.2, 0.8, 0.2, 1) infinite',
            '@keyframes soundwavePulse': {
              '0%': { transform: 'translate(-50%, -50%) scale(0.7)', opacity: 0.8 },
              '50%': { opacity: 0.35 },
              '100%': { transform: 'translate(-50%, -50%) scale(1.4)', opacity: 0 },
            },
          }}
        />
      )}

      {/* Rhythmic Vinyl Aura Vignette */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
          boxShadow: isPlaying ? 'inset 0 0 45px rgba(255, 42, 116, 0.25)' : 'none',
          transition: 'box-shadow 0.2s ease',
        }}
      />

      {/* Reactive Album Art Image with Bass Pump & Pitch Tone Shift */}
      <Box
        component="img"
        src={song.coverUrl}
        alt={song.title}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `scale(${visualData.bassScale})`,
          filter: `brightness(${visualData.brightness}) hue-rotate(${visualData.hueRotate}deg)`,
          transformOrigin: 'center center',
          transition: 'transform 0.08s linear, filter 0.15s ease',
          zIndex: 0,
        }}
      />

      {/* Ambient Gradient Overlay for text and waveform contrast */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '65%',
          background: 'linear-gradient(to top, rgba(10, 10, 13, 0.95) 0%, rgba(10, 10, 13, 0.6) 45%, transparent 100%)',
          zIndex: 2,
        }}
      />

      {/* Featured Badge Overlay */}
      {song.featuredInClientsSay && (
        <Box
          sx={{
            position: 'absolute',
            top: 14,
            left: 14,
            display: 'flex',
            gap: 1,
            zIndex: 3,
          }}
        >
          <Chip
            size="small"
            icon={<StarIcon sx={{ color: '#ffd700 !important', fontSize: '0.9rem' }} />}
            label="Clients Say Showcase"
            sx={{
              bgcolor: 'rgba(0, 0, 0, 0.75)',
              color: '#ffd700',
              fontWeight: 700,
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 215, 0, 0.4)',
              borderRadius: '2px',
            }}
          />
        </Box>
      )}

      {/* Live Audio Spectrum Equalizer Canvas */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 12,
          left: 14,
          right: 14,
          height: 44,
          zIndex: 3,
          pointerEvents: 'none',
        }}
      >
        <canvas
          ref={canvasRef}
          width={280}
          height={44}
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
          }}
        />
      </Box>
    </Box>
  );
};
