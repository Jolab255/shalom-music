import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Slider,
  Tooltip,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import Forward10Icon from '@mui/icons-material/Forward10';
import Replay10Icon from '@mui/icons-material/Replay10';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatIcon from '@mui/icons-material/Repeat';
import RepeatOneIcon from '@mui/icons-material/RepeatOne';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseIcon from '@mui/icons-material/Close';
import { Link as RouterLink, useLocation } from 'react-router-dom';

import { useAudioPlayer } from '../../context/AudioPlayerContext';

const formatTime = (time: number) => {
  if (isNaN(time) || !isFinite(time)) return '0:00';
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

export const MiniPlayer: React.FC = () => {
  const {
    currentSong,
    isPlaying,
    isBuffering,
    currentTime,
    duration,
    volume,
    isMuted,
    repeatMode,
    isShuffle,
    togglePlay,
    playNext,
    playPrev,
    seekTo,
    forward,
    rewind,
    setVolume,
    toggleMute,
    toggleShuffle,
    cycleRepeat,
    pause,
    closePlayer,
  } = useAudioPlayer();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();

  // If no song is loaded or user is already on the dedicated player page, we can hide or keep minimal
  if (!currentSong) return null;
  const isPlayerPage = location.pathname === '/player';
  if (isPlayerPage) return null; // Player page has its own full deck

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1300,
        bgcolor: 'rgba(14, 14, 18, 0.94)',
        backdropFilter: 'blur(20px) saturate(180%)',
        borderTop: '1px solid rgba(255, 42, 116, 0.3)',
        boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 42, 116, 0.15)',
        px: { xs: 1.5, sm: 3, md: 4 },
        py: { xs: 0.8, sm: 1 },
      }}
    >
      {/* Top Seek Progress Bar */}
      <Box sx={{ width: '100%', mt: -1.2, mb: 0.5, px: 0 }}>
        <Slider
          size="small"
          value={currentTime}
          max={duration || 100}
          onChange={(_, val) => seekTo(val as number)}
          sx={{
            p: 0,
            height: 3,
            color: '#ff2a74',
            '& .MuiSlider-thumb': {
              width: 10,
              height: 10,
              transition: '0.2s',
              '&:hover, &.Mui-active': {
                width: 14,
                height: 14,
                boxShadow: '0 0 10px #ff2a74',
              },
            },
            '& .MuiSlider-rail': {
              bgcolor: 'rgba(255, 255, 255, 0.2)',
            },
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Left: Song Meta */}
        <Box
          component={RouterLink}
          to="/player"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            textDecoration: 'none',
            maxWidth: { xs: '180px', sm: '260px', md: '320px' },
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: { xs: 40, sm: 48 },
              height: { xs: 40, sm: 48 },
              flexShrink: 0,
            }}
          >
            <Box
              component="img"
              src={currentSong.coverUrl}
              alt={currentSong.title}
              sx={{
                width: '100%',
                height: '100%',
                borderRadius: 1.2,
                objectFit: 'cover',
                border: isPlaying ? '1px solid #ff2a74' : '1px solid rgba(255, 42, 116, 0.3)',
                boxShadow: isPlaying ? '0 0 12px rgba(255, 42, 116, 0.6)' : '0 4px 12px rgba(0, 0, 0, 0.5)',
                transform: isPlaying ? 'scale(1.04)' : 'scale(1)',
                animation: isPlaying ? 'miniCoverRhythm 1.6s ease-in-out infinite alternate' : 'none',
                transition: 'all 0.3s ease',
                '@keyframes miniCoverRhythm': {
                  '0%': { transform: 'scale(1)', filter: 'brightness(1)' },
                  '50%': { transform: 'scale(1.06)', filter: 'brightness(1.12)' },
                  '100%': { transform: 'scale(1.02)', filter: 'brightness(1.04)' },
                },
              }}
            />
          </Box>
          <Box sx={{ overflow: 'hidden' }}>
            <Typography
              variant="body2"
              sx={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 700,
                color: '#ffffff',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                fontSize: { xs: '0.85rem', sm: '0.95rem' },
              }}
            >
              {currentSong.title}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontFamily: '"Space Grotesk", sans-serif',
                color: 'rgba(255, 255, 255, 0.6)',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                display: 'block',
              }}
            >
              {currentSong.artist}
            </Typography>
          </Box>
        </Box>

        {/* Center: Playback Controls */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1.2 } }}>
          {!isMobile && (
            <Tooltip title={isShuffle ? 'Shuffle Enabled' : 'Shuffle Off'}>
              <IconButton
                size="small"
                onClick={toggleShuffle}
                sx={{ color: isShuffle ? '#ff2a74' : 'rgba(255, 255, 255, 0.5)' }}
              >
                <ShuffleIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}

          {!isMobile && (
            <Tooltip title="Rewind 10 seconds">
              <IconButton size="small" onClick={() => rewind(10)} sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                <Replay10Icon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}

          <IconButton size="small" onClick={playPrev} sx={{ color: '#ffffff' }}>
            <SkipPreviousIcon />
          </IconButton>

          <IconButton
            onClick={isBuffering ? undefined : togglePlay}
            sx={{
              width: { xs: 38, sm: 44 },
              height: { xs: 38, sm: 44 },
              bgcolor: '#ff2a74',
              color: '#ffffff',
              boxShadow: '0 0 15px rgba(255, 42, 116, 0.5)',
              '&:hover': { bgcolor: isBuffering ? '#ff2a74' : '#e01b5d', transform: isBuffering ? 'none' : 'scale(1.05)' },
              transition: 'all 0.2s ease',
              position: 'relative',
            }}
          >
            {isBuffering ? (
              <CircularProgress size={20} sx={{ color: '#ffffff' }} />
            ) : isPlaying ? (
              <PauseIcon />
            ) : (
              <PlayArrowIcon />
            )}
          </IconButton>

          <IconButton size="small" onClick={playNext} sx={{ color: '#ffffff' }}>
            <SkipNextIcon />
          </IconButton>

          {!isMobile && (
            <Tooltip title="Fast forward 10 seconds">
              <IconButton size="small" onClick={() => forward(10)} sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                <Forward10Icon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}

          {!isMobile && (
            <Tooltip title={`Repeat: ${repeatMode}`}>
              <IconButton
                size="small"
                onClick={cycleRepeat}
                sx={{ color: repeatMode !== 'off' ? '#ff2a74' : 'rgba(255, 255, 255, 0.5)' }}
              >
                {repeatMode === 'one' ? <RepeatOneIcon fontSize="small" /> : <RepeatIcon fontSize="small" />}
              </IconButton>
            </Tooltip>
          )}
        </Box>

        {/* Right: Time, Volume & Full Page Link */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {!isMobile && (
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', minWidth: 70, textAlign: 'right' }}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </Typography>
          )}

          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', width: 100, ml: 1 }}>
              <IconButton size="small" onClick={toggleMute} sx={{ color: 'rgba(255, 255, 255, 0.7)', p: 0.5 }}>
                {isMuted || volume === 0 ? <VolumeOffIcon fontSize="small" /> : <VolumeUpIcon fontSize="small" />}
              </IconButton>
              <Slider
                size="small"
                value={isMuted ? 0 : volume * 100}
                onChange={(_, val) => setVolume((val as number) / 100)}
                sx={{
                  color: '#ff2a74',
                  height: 3,
                  '& .MuiSlider-thumb': { width: 8, height: 8 },
                }}
              />
            </Box>
          )}

          <Tooltip title="Open Full Media Player">
            <IconButton
              component={RouterLink}
              to="/player"
              size="small"
              sx={{ color: 'rgba(255, 255, 255, 0.7)', '&:hover': { color: '#ff2a74' } }}
            >
              <OpenInFullIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Close Player">
            <IconButton
              size="small"
              onClick={closePlayer}
              sx={{ color: 'rgba(255, 255, 255, 0.4)', '&:hover': { color: '#ffffff' } }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};
