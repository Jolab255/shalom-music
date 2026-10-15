import React, { useState, useEffect, useMemo } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid2 as Grid,
  IconButton,
  Button,
  Slider,
  InputBase,
  Chip,
  Paper,
  Tooltip,
  Divider,
  CircularProgress,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
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
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import StarIcon from '@mui/icons-material/Star';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

import type { Song } from '../types/song';
import { songStorage, SongSearchCache, SONGS_UPDATED_EVENT } from '../services/songStorage';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { AnimatedCoverArt } from '../components/player/AnimatedCoverArt';

const formatTime = (time: number) => {
  if (isNaN(time) || !isFinite(time)) return '0:00';
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const MediaPlayer: React.FC = () => {

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
    playSong,
    loadSong,
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
    audioRef,
  } = useAudioPlayer();

  const [allSongs, setAllSongs] = useState<Song[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Initialize and load songs
  const fetchSongs = async () => {
    const list = await songStorage.getAllSongs();
    setAllSongs(list);
  };

  useEffect(() => {
    fetchSongs();

    const onSongsUpdated = () => {
      fetchSongs();
    };

    window.addEventListener(SONGS_UPDATED_EVENT, onSongsUpdated);
    return () => window.removeEventListener(SONGS_UPDATED_EVENT, onSongsUpdated);
  }, []);

  // Initialize cached search engine
  const searchCache = useMemo(() => new SongSearchCache(allSongs), [allSongs]);

  // Extract unique genres for filter pills
  const genres = useMemo(() => {
    const set = new Set<string>();
    allSongs.forEach((s) => set.add(s.genre));
    return ['All', ...Array.from(set)];
  }, [allSongs]);

  // Real-time cached search suggestions for typeahead dropdown
  const searchSuggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchCache.search(searchQuery).slice(0, 6);
  }, [searchQuery, searchCache]);

  // Filtered list based on genre filter and search query
  const filteredSongs = useMemo(() => {
    let list = allSongs;
    if (searchQuery.trim()) {
      list = searchCache.search(searchQuery);
    }
    if (selectedGenre !== 'All') {
      list = list.filter((s) => s.genre === selectedGenre);
    }
    return list;
  }, [allSongs, searchQuery, selectedGenre, searchCache]);

  // Stage first song in deck ready to play without browser autoplay blockage
  useEffect(() => {
    if (!currentSong && allSongs.length > 0) {
      loadSong(allSongs[0], allSongs);
    }
  }, [allSongs, currentSong, loadSong]);

  const activeSong = currentSong || allSongs[0] || null;

  return (
    <Box
      sx={{
        bgcolor: '#0a0a0d',
        color: '#ffffff',
        minHeight: '100vh',
        pt: { xs: 3, md: 5 },
        pb: { xs: 14, md: 12 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Helmet>
        <title>Online Media Player & Studio Tracks | Shalom Music</title>
        <meta
          name="description"
          content="Listen to master recordings, live acoustic sessions, and custom arrangements created at Shalom Music Studios."
        />
      </Helmet>

      {/* Ambient background studio glow */}
      <Box
        sx={{
          position: 'absolute',
          top: '-15%',
          left: '30%',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 42, 116, 0.09) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Top Header Bar */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 2,
            mb: 4,
          }}
        >
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <GraphicEqIcon sx={{ color: '#ff2a74', fontSize: '2rem' }} />
              <Typography
                variant="h3"
                sx={{
                  fontFamily: '"AerodomeRegular-2vMGK", sans-serif',
                  fontWeight: 400,
                  fontSize: { xs: '1.8rem', sm: '2.4rem', md: '2.8rem' },
                  letterSpacing: '0.04em',
                  color: '#ffffff',
                }}
              >
                Studio Media Player
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{
                fontFamily: '"Space Grotesk", sans-serif',
                color: 'rgba(255, 255, 255, 0.6)',
                mt: 0.5,
              }}
            >
              Stream high-fidelity acoustic, choral, and cinematic productions direct from Shalom Music
            </Typography>
          </Box>
        </Box>

        {/* Main Grid: Player Deck on Left, Tracklist & Search on Right */}
        <Grid container spacing={{ xs: 3, lg: 5 }}>
          {/* ================= LEFT COLUMN: LUXURY AUDIO CONSOLE ================= */}
          <Grid size={{ xs: 12, lg: 5 }}>
            <Box
              sx={{
                bgcolor: '#121217',
                border: '1px solid rgba(255, 42, 116, 0.25)',
                borderRadius: '2px',
                p: { xs: 2.5, sm: 4 },
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9), 0 0 30px rgba(255, 42, 116, 0.12)',
                position: 'sticky',
                top: 100,
              }}
            >
              {activeSong ? (
                <>
                  {/* Animated Cover Art with Real-Time Audio Rhythm & Equalizer */}
                  <Box sx={{ mb: 3 }}>
                    <AnimatedCoverArt
                      song={activeSong}
                      isPlaying={isPlaying}
                      isBuffering={isBuffering}
                      audioRef={audioRef}
                      aspectRatio="80%"
                      borderRadius="2px"
                    />
                  </Box>

                  {/* Song Title & Artist Details */}
                  <Box sx={{ mb: 2.5 }}>
                    <Typography
                      variant="h4"
                      sx={{
                        fontFamily: '"Space Grotesk", sans-serif',
                        fontWeight: 800,
                        fontSize: { xs: '1.4rem', sm: '1.8rem' },
                        color: '#ffffff',
                        lineHeight: 1.2,
                        mb: 0.5,
                      }}
                    >
                      {activeSong.title}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: '"Space Grotesk", sans-serif',
                        color: '#ff2a74',
                        fontWeight: 600,
                        fontSize: { xs: '1.05rem', sm: '1.2rem' },
                        mb: 0.5,
                      }}
                    >
                      {activeSong.artist}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: '"Space Grotesk", sans-serif',
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontSize: '0.88rem',
                      }}
                    >
                      Album: <b>{activeSong.album}</b>
                    </Typography>
                  </Box>

                  {/* Scrubbable Seek Bar */}
                  <Box sx={{ mb: 2 }}>
                    <Slider
                      value={currentTime}
                      max={duration || 100}
                      onChange={(_, val) => seekTo(val as number)}
                      sx={{
                        color: '#ff2a74',
                        height: 6,
                        '& .MuiSlider-thumb': {
                          width: 14,
                          height: 14,
                          transition: '0.2s',
                          '&:hover, &.Mui-active': {
                            width: 18,
                            height: 18,
                            boxShadow: '0 0 12px #ff2a74',
                          },
                        },
                        '& .MuiSlider-rail': {
                          bgcolor: 'rgba(255, 255, 255, 0.15)',
                        },
                      }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: -0.5 }}>
                      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontFamily: 'monospace' }}>
                        {formatTime(currentTime)}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontFamily: 'monospace' }}>
                        {formatTime(duration)}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Primary Playback Deck Controls */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: { xs: 1, sm: 2 },
                      mb: 3,
                    }}
                  >
                    {/* Shuffle */}
                    <Tooltip title={isShuffle ? 'Shuffle On' : 'Shuffle Off'}>
                      <IconButton
                        onClick={toggleShuffle}
                        sx={{
                          color: isShuffle ? '#ff2a74' : 'rgba(255, 255, 255, 0.4)',
                          bgcolor: isShuffle ? 'rgba(255, 42, 116, 0.12)' : 'transparent',
                        }}
                      >
                        <ShuffleIcon />
                      </IconButton>
                    </Tooltip>

                    {/* Rewind 10s */}
                    <Tooltip title="Rewind 10s">
                      <IconButton onClick={() => rewind(10)} sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                        <Replay10Icon fontSize="medium" />
                      </IconButton>
                    </Tooltip>

                    {/* Previous Track */}
                    <Tooltip title="Previous Track">
                      <IconButton onClick={playPrev} sx={{ color: '#ffffff' }}>
                        <SkipPreviousIcon sx={{ fontSize: '1.9rem' }} />
                      </IconButton>
                    </Tooltip>

                    {/* Giant Play/Pause button */}
                    <IconButton
                      onClick={isBuffering ? undefined : togglePlay}
                      sx={{
                        width: 64,
                        height: 64,
                        bgcolor: '#ff2a74',
                        color: '#ffffff',
                        boxShadow: '0 0 25px rgba(255, 42, 116, 0.6)',
                        '&:hover': {
                          bgcolor: isBuffering ? '#ff2a74' : '#e01b5d',
                          transform: isBuffering ? 'none' : 'scale(1.06)',
                          boxShadow: isBuffering ? '0 0 25px rgba(255, 42, 116, 0.6)' : '0 0 35px rgba(255, 42, 116, 0.85)',
                        },
                        transition: 'all 0.25s ease',
                        position: 'relative',
                      }}
                    >
                      {isBuffering ? (
                        <CircularProgress size={28} sx={{ color: '#ffffff' }} />
                      ) : isPlaying ? (
                        <PauseIcon sx={{ fontSize: '2.4rem' }} />
                      ) : (
                        <PlayArrowIcon sx={{ fontSize: '2.4rem', ml: 0.5 }} />
                      )}
                    </IconButton>

                    {/* Next Track */}
                    <Tooltip title="Next Track">
                      <IconButton onClick={playNext} sx={{ color: '#ffffff' }}>
                        <SkipNextIcon sx={{ fontSize: '1.9rem' }} />
                      </IconButton>
                    </Tooltip>

                    {/* Forward 10s */}
                    <Tooltip title="Forward 10s">
                      <IconButton onClick={() => forward(10)} sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                        <Forward10Icon fontSize="medium" />
                      </IconButton>
                    </Tooltip>

                    {/* Repeat */}
                    <Tooltip title={`Repeat: ${repeatMode}`}>
                      <IconButton
                        onClick={cycleRepeat}
                        sx={{
                          color: repeatMode !== 'off' ? '#ff2a74' : 'rgba(255, 255, 255, 0.4)',
                          bgcolor: repeatMode !== 'off' ? 'rgba(255, 42, 116, 0.12)' : 'transparent',
                        }}
                      >
                        {repeatMode === 'one' ? <RepeatOneIcon /> : <RepeatIcon />}
                      </IconButton>
                    </Tooltip>
                  </Box>

                  {/* Volume Slider Control */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      px: 2,
                      py: 1,
                      bgcolor: 'rgba(255, 255, 255, 0.03)',
                      borderRadius: '2px',
                      mb: 2.5,
                    }}
                  >
                    <IconButton size="small" onClick={toggleMute} sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      {isMuted || volume === 0 ? <VolumeOffIcon /> : <VolumeUpIcon />}
                    </IconButton>
                    <Slider
                      size="small"
                      value={isMuted ? 0 : volume * 100}
                      onChange={(_, val) => setVolume((val as number) / 100)}
                      sx={{
                        color: '#ff2a74',
                        '& .MuiSlider-thumb': { width: 12, height: 12 },
                      }}
                    />
                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)', minWidth: 32 }}>
                      {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
                    </Typography>
                  </Box>

                  {/* Song Description & Studio Copyright */}
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: '#0e0e13',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      borderRadius: '2px',
                    }}
                  >
                    <Typography variant="caption" sx={{ color: '#ff2a74', fontWeight: 700, display: 'block', mb: 0.5 }}>
                      ABOUT THIS RECORDING:
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: '"Linear", sans-serif',
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontSize: '0.88rem',
                        lineHeight: 1.6,
                        mb: 1.5,
                      }}
                    >
                      {activeSong.description}
                    </Typography>
                    <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.06)', mb: 1 }} />
                    <Typography
                      variant="caption"
                      sx={{ color: 'rgba(255, 255, 255, 0.45)', display: 'block', fontStyle: 'italic' }}
                    >
                      {activeSong.copyright}
                    </Typography>
                  </Box>
                </>
              ) : (
                <Box
                  sx={{
                    py: 8,
                    px: 3,
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      bgcolor: 'rgba(255, 42, 116, 0.1)',
                      border: '1px solid rgba(255, 42, 116, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                      color: '#ff2a74',
                    }}
                  >
                    <MusicNoteIcon sx={{ fontSize: 32 }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#ffffff', mb: 0.8 }}>
                    No Songs Loaded
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)', maxWidth: 280, fontSize: '0.85rem' }}>
                    There are currently no songs in the library. Upload new tracks in the studio CMS to play them here in real time.
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>

          {/* ================= RIGHT COLUMN: SEARCH, FILTERS & TRACKLIST ================= */}
          <Grid size={{ xs: 12, lg: 7 }}>
            {/* Live Cache Search Bar with Dropdown Suggestions */}
            <Box sx={{ position: 'relative', mb: 3 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  bgcolor: '#14141a',
                  border: isSearchFocused ? '1px solid #ff2a74' : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 0,
                  px: 2,
                  py: 1,
                  boxShadow: isSearchFocused ? '0 0 15px rgba(255, 42, 116, 0.25)' : 'none',
                  transition: 'all 0.3s ease',
                }}
              >
                <SearchIcon sx={{ color: isSearchFocused ? '#ff2a74' : 'rgba(255, 255, 255, 0.5)', mr: 1.5 }} />
                <InputBase
                  fullWidth
                  placeholder="Instant Cache Search by song title, artist, album, genre, or lyrics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 250)}
                  sx={{
                    color: '#ffffff',
                    fontFamily: '"Space Grotesk", sans-serif',
                    fontSize: { xs: '0.92rem', sm: '1.02rem' },
                    '& input::placeholder': { color: 'rgba(255, 255, 255, 0.4)', opacity: 1 },
                  }}
                />
                {searchQuery && (
                  <IconButton size="small" onClick={() => setSearchQuery('')} sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>

              {/* Instant Typeahead Suggestion Dropdown */}
              {isSearchFocused && searchQuery.trim() !== '' && (
                <Paper
                  sx={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    left: 0,
                    right: 0,
                    zIndex: 20,
                    bgcolor: 'rgba(18, 18, 24, 0.98)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 42, 116, 0.4)',
                    borderRadius: 0,
                    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.95), 0 0 20px rgba(255, 42, 116, 0.2)',
                    overflow: 'hidden',
                  }}
                >
                  <Box sx={{ p: 1.5, borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <Typography variant="caption" sx={{ color: '#ff2a74', fontWeight: 700, textTransform: 'uppercase' }}>
                      Fast Cache Search Results ({searchSuggestions.length} found)
                    </Typography>
                  </Box>

                  {searchSuggestions.length === 0 ? (
                    <Box sx={{ p: 3, textAlign: 'center' }}>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                        No matching tracks found
                      </Typography>
                    </Box>
                  ) : (
                    searchSuggestions.map((song) => (
                      <Box
                        key={song.id}
                        onClick={() => {
                          playSong(song, allSongs);
                          setIsSearchFocused(false);
                        }}
                        sx={{
                          p: 1.5,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          cursor: 'pointer',
                          transition: 'background 0.2s ease',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                          '&:hover': { bgcolor: 'rgba(255, 42, 116, 0.12)' },
                        }}
                      >
                        <Box
                          component="img"
                          src={song.coverUrl}
                          alt={song.title}
                          sx={{ width: 44, height: 44, borderRadius: '2px', objectFit: 'cover' }}
                        />
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: '#ffffff' }}>
                            {song.title}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                            {song.artist} • <span style={{ color: '#ff2a74' }}>{song.genre}</span>
                          </Typography>
                        </Box>
                        <Chip size="small" label="Select & Play" sx={{ bgcolor: '#ff2a74', color: '#ffffff', fontWeight: 600 }} />
                      </Box>
                    ))
                  )}
                </Paper>
              )}
            </Box>

            {/* Genre Filter Pills */}
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                overflowX: 'auto',
                pb: 1.5,
                mb: 3,
                '&::-webkit-scrollbar': { height: 4 },
                '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(255, 42, 116, 0.3)', borderRadius: 2 },
              }}
            >
              {genres.map((g) => {
                const isSelected = selectedGenre === g;
                return (
                  <Chip
                    key={g}
                    label={g}
                    onClick={() => setSelectedGenre(g)}
                    sx={{
                      bgcolor: isSelected ? '#ff2a74' : 'rgba(255, 255, 255, 0.06)',
                      color: isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.8)',
                      fontWeight: isSelected ? 700 : 500,
                      fontFamily: '"Space Grotesk", sans-serif',
                      border: isSelected ? '1px solid #ff2a74' : '1px solid rgba(255, 255, 255, 0.08)',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      '&:hover': {
                        bgcolor: isSelected ? '#e01b5d' : 'rgba(255, 42, 116, 0.15)',
                        color: '#ff2a74',
                      },
                      transition: 'all 0.2s ease',
                    }}
                  />
                );
              })}
            </Box>

            {/* Track Count and Current Filter status */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                Showing <b>{filteredSongs.length}</b> tracks {selectedGenre !== 'All' ? `in ${selectedGenre}` : ''}
              </Typography>
              {searchQuery && (
                <Button
                  size="small"
                  onClick={() => setSearchQuery('')}
                  sx={{ color: '#ff2a74', textTransform: 'none', fontSize: '0.8rem' }}
                >
                  Clear search filter
                </Button>
              )}
            </Box>

            {/* Song Cards List */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {filteredSongs.length === 0 ? (
                <Box
                  sx={{
                    p: 6,
                    textAlign: 'center',
                    bgcolor: '#121217',
                    borderRadius: '2px',
                    border: '1px dashed rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <MusicNoteIcon sx={{ fontSize: 48, color: 'rgba(255, 255, 255, 0.2)', mb: 1 }} />
                  <Typography variant="h5" sx={{ color: '#ffffff', mb: 1, fontWeight: 700 }}>
                    No Songs in Library Yet
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                    Check back soon for new studio master recordings.
                  </Typography>
                </Box>
              ) : (
                filteredSongs.map((song, index) => {
                  const isCurrent = currentSong?.id === song.id;
                  const isTrackPlaying = isCurrent && isPlaying;

                  return (
                    <Box
                      key={song.id}
                      onClick={() => {
                        if (isCurrent) togglePlay();
                        else playSong(song, allSongs);
                      }}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: { xs: 1.5, sm: 2 },
                        bgcolor: isCurrent ? 'rgba(255, 42, 116, 0.08)' : '#121217',
                        border: isCurrent ? '1px solid rgba(255, 42, 116, 0.5)' : '1px solid rgba(255, 255, 255, 0.05)',
                        borderRadius: '2px',
                        cursor: 'pointer',
                        transition: 'all 0.25s ease',
                        boxShadow: isCurrent ? '0 4px 20px rgba(255, 42, 116, 0.15)' : 'none',
                        '&:hover': {
                          bgcolor: 'rgba(255, 42, 116, 0.12)',
                          borderColor: '#ff2a74',
                          transform: 'translateX(4px)',
                        },
                      }}
                    >
                      {/* Left: Index, Cover, Titles */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2.5 }, minWidth: 0 }}>
                        {/* Number / Play Indicator */}
                        <Typography
                          variant="body2"
                          sx={{
                            fontFamily: 'monospace',
                            color: isCurrent ? '#ff2a74' : 'rgba(255, 255, 255, 0.4)',
                            fontWeight: 700,
                            minWidth: 22,
                            textAlign: 'center',
                          }}
                        >
                          {isTrackPlaying ? (
                            <Box component="span" sx={{ display: 'inline-block', animation: 'spin 2s linear infinite' }}>
                              ♫
                            </Box>
                          ) : (
                            (index + 1).toString().padStart(2, '0')
                          )}
                        </Typography>

                        {/* Cover Image with play overlay */}
                        <Box sx={{ position: 'relative', width: 52, height: 52, flexShrink: 0 }}>
                          <Box
                            component="img"
                            src={song.coverUrl}
                            alt={song.title}
                            sx={{
                              width: 52,
                              height: 52,
                              borderRadius: '2px',
                              objectFit: 'cover',
                              border: isCurrent ? '1px solid #ff2a74' : '1px solid rgba(255, 255, 255, 0.1)',
                            }}
                          />
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: 52,
                              height: 52,
                              borderRadius: '2px',
                              bgcolor: isCurrent ? 'rgba(255, 42, 116, 0.7)' : 'rgba(0, 0, 0, 0.4)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              opacity: isTrackPlaying ? 1 : 0,
                              '&:hover': { opacity: 1 },
                              transition: 'opacity 0.2s ease',
                            }}
                          >
                            {isTrackPlaying ? (
                              <PauseIcon sx={{ color: '#ffffff', fontSize: 24 }} />
                            ) : (
                              <PlayArrowIcon sx={{ color: '#ffffff', fontSize: 24 }} />
                            )}
                          </Box>
                        </Box>

                        {/* Title, Artist, Album */}
                        <Box sx={{ minWidth: 0 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography
                              variant="subtitle1"
                              sx={{
                                fontFamily: '"Space Grotesk", sans-serif',
                                fontWeight: 700,
                                color: isCurrent ? '#ff2a74' : '#ffffff',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                fontSize: { xs: '0.95rem', sm: '1.05rem' },
                              }}
                            >
                              {song.title}
                            </Typography>
                            {song.featuredInClientsSay && (
                              <Tooltip title="Featured in 'What Our Clients Say' section on Home">
                                <StarIcon sx={{ color: '#ffd700', fontSize: '1rem', flexShrink: 0 }} />
                              </Tooltip>
                            )}
                          </Box>

                          <Typography
                            variant="body2"
                            sx={{
                              fontFamily: '"Space Grotesk", sans-serif',
                              color: 'rgba(255, 255, 255, 0.65)',
                              fontSize: { xs: '0.8rem', sm: '0.9rem' },
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {song.artist} • <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>{song.album}</span>
                          </Typography>
                        </Box>
                      </Box>

                      {/* Right: Genre Pill & Duration */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 }, flexShrink: 0, ml: 1 }}>
                        <Chip
                          size="small"
                          label={song.genre}
                          sx={{
                            display: { xs: 'none', sm: 'inline-flex' },
                            bgcolor: 'rgba(255, 255, 255, 0.05)',
                            color: isCurrent ? '#ff2a74' : 'rgba(255, 255, 255, 0.7)',
                            fontSize: '0.72rem',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                          }}
                        />
                        <Typography
                          variant="caption"
                          sx={{
                            fontFamily: 'monospace',
                            color: isCurrent ? '#ff2a74' : 'rgba(255, 255, 255, 0.5)',
                            fontWeight: 600,
                            minWidth: 42,
                            textAlign: 'right',
                          }}
                        >
                          {formatTime(song.duration)}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MediaPlayer;
