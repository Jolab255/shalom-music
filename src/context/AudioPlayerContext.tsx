import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';
import type { Song, AudioPlayerRepeatMode } from '../types/song';

interface AudioPlayerContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  repeatMode: AudioPlayerRepeatMode;
  isShuffle: boolean;
  queue: Song[];
  currentIndex: number;
  playSong: (song: Song, newQueue?: Song[]) => void;
  togglePlay: () => void;
  pause: () => void;
  resume: () => void;
  playNext: () => void;
  playPrev: () => void;
  seekTo: (seconds: number) => void;
  forward: (seconds?: number) => void;
  rewind: (seconds?: number) => void;
  setVolume: (val: number) => void;
  toggleMute: () => void;
  toggleShuffle: () => void;
  cycleRepeat: () => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | null>(null);

export const AudioPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolumeState] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [repeatMode, setRepeatMode] = useState<AudioPlayerRepeatMode>('all');
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [queue, setQueue] = useState<Song[]>([]);
  const [shuffledIndices, setShuffledIndices] = useState<number[]>([]);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Audio element once
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audioRef.current = audio;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const onDurationChange = () => {
      if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const onLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('durationchange', onDurationChange);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('durationchange', onDurationChange);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.pause();
    };
  }, []);

  const currentIndex = currentSong && queue.length > 0 ? queue.findIndex((s) => s.id === currentSong.id) : -1;

  // Sync volume & mute with audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Compute shuffle mapping whenever queue changes
  useEffect(() => {
    if (queue.length > 0) {
      const indices = queue.map((_, i) => i);
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      setShuffledIndices(indices);
    } else {
      setShuffledIndices([]);
    }
  }, [queue]);

  const playSong = useCallback((song: Song, newQueue?: Song[]) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (newQueue && newQueue.length > 0) {
      setQueue(newQueue);
    } else {
      setQueue((prev) => (prev.some((s) => s.id === song.id) ? prev : [song, ...prev]));
    }

    setCurrentSong(song);
    audio.src = song.audioUrl;
    audio.currentTime = 0;
    audio.play().then(() => {
      setIsPlaying(true);
    }).catch((err) => {
      console.warn('Audio playback interrupted or requires user gesture:', err);
    });
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!currentSong) {
      if (queue.length > 0) {
        playSong(queue[0]);
      }
      return;
    }

    if (audio.paused) {
      audio.play().then(() => setIsPlaying(true)).catch(console.warn);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, [currentSong, queue, playSong]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const resume = useCallback(() => {
    if (audioRef.current && currentSong) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(console.warn);
    }
  }, [currentSong]);

  const playNext = useCallback(() => {
    if (queue.length === 0) return;
    const curIdx = currentIndex;

    if (repeatMode === 'one' && currentSong) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(console.warn);
      }
      return;
    }

    if (isShuffle && queue.length > 1) {
      const randomIdx = Math.floor(Math.random() * queue.length);
      const nextSong = queue[randomIdx === curIdx ? (randomIdx + 1) % queue.length : randomIdx];
      playSong(nextSong);
      return;
    }

    const nextIndex = curIdx + 1;
    if (nextIndex < queue.length) {
      playSong(queue[nextIndex]);
    } else if (repeatMode === 'all') {
      playSong(queue[0]);
    } else {
      pause();
    }
  }, [queue, currentIndex, repeatMode, isShuffle, currentSong, playSong, pause]);

  const playPrev = useCallback(() => {
    if (queue.length === 0) return;
    const audio = audioRef.current;
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }

    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      playSong(queue[prevIndex]);
    } else if (repeatMode === 'all') {
      playSong(queue[queue.length - 1]);
    } else if (currentSong) {
      if (audio) audio.currentTime = 0;
    }
  }, [queue, currentIndex, repeatMode, currentSong, playSong]);

  // Handle track ending
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onEnded = () => {
      if (repeatMode === 'one') {
        audio.currentTime = 0;
        audio.play().catch(console.warn);
      } else {
        playNext();
      }
    };

    audio.addEventListener('ended', onEnded);
    return () => audio.removeEventListener('ended', onEnded);
  }, [repeatMode, playNext]);

  const seekTo = useCallback((seconds: number) => {
    if (audioRef.current && !isNaN(seconds)) {
      audioRef.current.currentTime = Math.max(0, Math.min(seconds, duration || 0));
      setCurrentTime(audioRef.current.currentTime);
    }
  }, [duration]);

  const forward = useCallback((seconds = 10) => {
    if (audioRef.current) {
      const target = Math.min((audioRef.current.currentTime || 0) + seconds, duration || 0);
      seekTo(target);
    }
  }, [duration, seekTo]);

  const rewind = useCallback((seconds = 10) => {
    if (audioRef.current) {
      const target = Math.max((audioRef.current.currentTime || 0) - seconds, 0);
      seekTo(target);
    }
  }, [seekTo]);

  const setVolume = useCallback((val: number) => {
    const clamped = Math.max(0, Math.min(1, val));
    setVolumeState(clamped);
    if (clamped > 0 && isMuted) {
      setIsMuted(false);
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const toggleShuffle = useCallback(() => {
    setIsShuffle((prev) => !prev);
  }, []);

  const cycleRepeat = useCallback(() => {
    setRepeatMode((prev) => {
      if (prev === 'off') return 'all';
      if (prev === 'all') return 'one';
      return 'off';
    });
  }, []);

  return (
    <AudioPlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        repeatMode,
        isShuffle,
        queue,
        currentIndex,
        playSong,
        togglePlay,
        pause,
        resume,
        playNext,
        playPrev,
        seekTo,
        forward,
        rewind,
        setVolume,
        toggleMute,
        toggleShuffle,
        cycleRepeat,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = (): AudioPlayerContextType => {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
  }
  return context;
};
