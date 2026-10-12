import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid2 as Grid,
  TextField,
  Button,
  IconButton,
  FormControlLabel,
  Switch,
  LinearProgress,
  MenuItem,
  Alert,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
  Tooltip,
  Card,
  CardContent,
  InputAdornment,
  Dialog,
  DialogContent,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import StarIcon from '@mui/icons-material/Star';
import RefreshIcon from '@mui/icons-material/Refresh';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SecurityIcon from '@mui/icons-material/Security';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import LockResetIcon from '@mui/icons-material/LockReset';
import HistoryIcon from '@mui/icons-material/History';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import type { Song } from '../types/song';
import { songStorage, SONGS_UPDATED_EVENT } from '../services/songStorage';
import { adminAuth, type ActivityLog } from '../services/adminAuth';
import { AdminLogin } from '../components/cms/AdminLogin';
import {
  ConfirmDeleteDialog,
  ConfirmEditDialog,
  ConfirmResetDialog,
} from '../components/cms/ConfirmationDialogs';
import { useAudioPlayer } from '../context/AudioPlayerContext';

const MAX_FILE_SIZE_BYTES = 8 * 1024 * 1024; // 8 Megabytes maximum
const ALLOWED_EXTENSIONS = ['mp3', 'm4a', 'wav'];

// Stealth passkey accepted in URL query (e.g. /cms?access=shalom or /cms?key=shalom)
const STEALTH_ACCESS_KEY = 'shalom';

const GENRE_OPTIONS = [
  'Contemporary Christian',
  'Gospel & Live Band',
  'Choral & Classical',
  'Acapella & Gospel',
  'Orchestral & Cinematic',
  'Classical Instrumental',
  'Jazz & Fusion',
  'Acoustic Ballad',
  'Praise & Worship',
];

const CMSPage: React.FC = () => {
  const { currentSong, isPlaying, playSong, togglePlay } = useAudioPlayer();

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => adminAuth.isAuthenticated());

  // Stealth gate state: in-memory only (never persisted, so refreshing always returns to 404)
  const [isStealthUnlocked, setIsStealthUnlocked] = useState<boolean>(false);
  const [decoyClickCount, setDecoyClickCount] = useState<number>(0);
  const [stealthDialogOpen, setStealthDialogOpen] = useState<boolean>(false);
  const [stealthInputKey, setStealthInputKey] = useState<string>('');
  const [stealthError, setStealthError] = useState<string | null>(null);

  // Check URL query parameters for one-time stealth access key on mount
  useEffect(() => {
    // Clear any past persisted stealth flag
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('shalom_stealth_unlocked');

      const params = new URLSearchParams(window.location.search);
      const accessVal = params.get('access') || params.get('key') || params.get('pass');

      if (accessVal && accessVal.toLowerCase() === STEALTH_ACCESS_KEY.toLowerCase()) {
        setIsStealthUnlocked(true);

        // Immediately scrub secret parameter from address bar and history to prevent leak in logs/referrers
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, []);

  // Keyboard shortcut listener: Ctrl + Shift + S or Cmd + Shift + S reveals stealth unlock dialog
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'S' || e.key === 's')) {
        e.preventDefault();
        setStealthDialogOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Dashboard Tabs: 0 = + Add New Song / Form, 1 = Music Library, 2 = Showcase, 3 = Security & Logs
  const [activeTab, setActiveTab] = useState<number>(0);
  const [songs, setSongs] = useState<Song[]>([]);
  const [editingSongId, setEditingSongId] = useState<string | null>(null);

  // Search & Filter in Library tab
  const [librarySearch, setLibrarySearch] = useState('');
  const [libraryGenreFilter, setLibraryGenreFilter] = useState('All');

  // Form Fields (all mandatory)
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [genre, setGenre] = useState(GENRE_OPTIONS[0]);
  const [customGenre, setCustomGenre] = useState('');
  const [copyright, setCopyright] = useState('© 2026 Shalom Music Studios. All rights reserved.');
  const [description, setDescription] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [coverFileName, setCoverFileName] = useState('');

  // Audio file states
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioFileName, setAudioFileName] = useState('');
  const [audioFileSize, setAudioFileSize] = useState<number>(0);
  const [audioDuration, setAudioDuration] = useState<number>(180);
  const [existingAudioUrl, setExistingAudioUrl] = useState('');

  // Clients Say fields
  const [featuredInClientsSay, setFeaturedInClientsSay] = useState(false);
  const [clientSayOrder, setClientSayOrder] = useState<number>(1);
  const [clientSayQuote, setClientSayQuote] = useState('');
  const [clientSayLocation, setClientSayLocation] = useState('Chuo Kikuu SDA Church');

  // Upload Progress & Messages
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadSpeedText, setUploadSpeedText] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Confirmation Modals State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [songToDelete, setSongToDelete] = useState<Song | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);

  // Security Tab state
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [securityMessage, setSecurityMessage] = useState<string | null>(null);
  const [securityError, setSecurityError] = useState<string | null>(null);
  const [auditLogs, setAuditLogs] = useState<ActivityLog[]>([]);

  const audioInputRef = useRef<HTMLInputElement | null>(null);
  const coverInputRef = useRef<HTMLInputElement | null>(null);

  const loadSongsList = async () => {
    const list = await songStorage.getAllSongs();
    setSongs(list);
  };

  const refreshAuditLogs = () => {
    setAuditLogs(adminAuth.getActivityLogs());
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadSongsList();
      refreshAuditLogs();

      const onSongsUpdated = () => {
        loadSongsList();
        refreshAuditLogs();
      };

      window.addEventListener(SONGS_UPDATED_EVENT, onSongsUpdated);
      return () => window.removeEventListener(SONGS_UPDATED_EVENT, onSongsUpdated);
    }
  }, [isAuthenticated]);

  const resetFormToNewSong = () => {
    setEditingSongId(null);
    setTitle('');
    setArtist('');
    setAlbum('');
    setGenre(GENRE_OPTIONS[0]);
    setCustomGenre('');
    setCopyright('© 2026 Shalom Music Studios. All rights reserved.');
    setDescription('');
    setCoverUrl('');
    setCoverFileName('');
    setAudioFile(null);
    setAudioFileName('');
    setAudioFileSize(0);
    setAudioDuration(180);
    setExistingAudioUrl('');
    setFeaturedInClientsSay(false);
    setClientSayOrder(songs.length + 1);
    setClientSayQuote('');
    setClientSayLocation('Chuo Kikuu SDA Church');
    setUploadProgress(0);
    setIsUploading(false);
    setErrorMessage(null);
  };

  const handleOpenAddSongForm = () => {
    resetFormToNewSong();
    setActiveTab(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    const file = e.target.files?.[0];
    if (!file) return;

    const extension = file.name.split('.').pop()?.toLowerCase() || '';
    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      setErrorMessage(`Invalid audio format: .${extension}. Only MP3, M4A, and WAV files are allowed.`);
      if (audioInputRef.current) audioInputRef.current.value = '';
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
      setErrorMessage(`File is too large (${sizeMB} MB). Audio files must not exceed 8 MB.`);
      if (audioInputRef.current) audioInputRef.current.value = '';
      return;
    }

    setAudioFile(file);
    setAudioFileName(file.name);
    setAudioFileSize(file.size);

    const tempUrl = URL.createObjectURL(file);
    const tempAudio = new Audio(tempUrl);
    tempAudio.onloadedmetadata = () => {
      if (tempAudio.duration && !isNaN(tempAudio.duration) && isFinite(tempAudio.duration)) {
        setAudioDuration(Math.round(tempAudio.duration));
      }
      URL.revokeObjectURL(tempUrl);
    };

    if (!title) {
      const baseName = file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');
      setTitle(baseName.charAt(0).toUpperCase() + baseName.slice(1));
    }
  };

  const handleCoverFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Cover photo must be an image file (JPEG, PNG, WEBP).');
      return;
    }

    setCoverFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setCoverUrl(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleStartEdit = (song: Song) => {
    setEditingSongId(song.id);
    setTitle(song.title);
    setArtist(song.artist);
    setAlbum(song.album);
    if (GENRE_OPTIONS.includes(song.genre)) {
      setGenre(song.genre);
      setCustomGenre('');
    } else {
      setGenre('Other');
      setCustomGenre(song.genre);
    }
    setCopyright(song.copyright);
    setDescription(song.description);
    setCoverUrl(song.coverUrl);
    setCoverFileName('Existing Cover Art');
    setExistingAudioUrl(song.audioUrl);
    setAudioFileName(song.fileName || 'Existing Audio Track');
    setAudioFileSize(song.fileSize || 0);
    setAudioDuration(song.duration);
    setFeaturedInClientsSay(song.featuredInClientsSay);
    setClientSayOrder(song.clientSayOrder);
    setClientSayQuote(song.clientSayQuote || '');
    setClientSayLocation(song.clientSayLocation || '');
    setErrorMessage(null);
    setSuccessMessage(null);
    setActiveTab(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const validateForm = (): boolean => {
    if (!title.trim()) {
      setErrorMessage('Song Title is mandatory.');
      return false;
    }
    if (!artist.trim()) {
      setErrorMessage('Artist / Group who sang the song is mandatory.');
      return false;
    }
    if (!album.trim()) {
      setErrorMessage('EP / Album is mandatory.');
      return false;
    }
    const finalGenre = genre === 'Other' ? customGenre.trim() : genre;
    if (!finalGenre) {
      setErrorMessage('Genre / Category is mandatory.');
      return false;
    }
    if (!copyright.trim()) {
      setErrorMessage('Song Copyright notice is mandatory.');
      return false;
    }
    if (!coverUrl.trim()) {
      setErrorMessage('Cover photo is mandatory. Please select a cover image.');
      return false;
    }
    if (!description.trim()) {
      setErrorMessage('Song Description is mandatory (short or long).');
      return false;
    }
    if (!editingSongId && !audioFile) {
      setErrorMessage('Audio file is mandatory. Please select an MP3, M4A, or WAV file under 8MB.');
      return false;
    }
    return true;
  };

  const handleInitiateSubmit = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    if (!validateForm()) return;

    if (editingSongId) {
      setEditModalOpen(true);
    } else {
      executeSaveSong();
    }
  };

  const executeSaveSong = async () => {
    setEditModalOpen(false);
    setIsUploading(true);
    setUploadProgress(5);
    setUploadSpeedText('Analyzing audio file...');

    try {
      let finalAudioUrl = existingAudioUrl;
      let finalFormat = 'mp3';
      let finalBlob: Blob | undefined = undefined;
      let finalDuration = audioDuration;

      if (audioFile) {
        finalFormat = audioFile.name.split('.').pop()?.toLowerCase() || 'mp3';
        finalBlob = audioFile; // pass the raw File (which is a Blob subtype) to IndexedDB

        setUploadProgress(30);
        setUploadSpeedText('Reading audio metadata...');

        // Re-read duration from the file now (in case handleAudioFileChange fired before metadata loaded)
        const detectedDuration = await new Promise<number>((resolve) => {
          const tempUrl = URL.createObjectURL(audioFile);
          const tempAudio = new Audio(tempUrl);

          const cleanup = () => URL.revokeObjectURL(tempUrl);

          tempAudio.onloadedmetadata = () => {
            cleanup();
            if (tempAudio.duration && !isNaN(tempAudio.duration) && isFinite(tempAudio.duration)) {
              resolve(Math.round(tempAudio.duration));
            } else {
              resolve(audioDuration || 180);
            }
          };

          tempAudio.onerror = () => {
            cleanup();
            resolve(audioDuration || 180);
          };

          // Timeout fallback — if metadata takes too long, proceed with whatever we have
          setTimeout(() => {
            cleanup();
            resolve(audioDuration || 180);
          }, 8000);
        });

        finalDuration = detectedDuration;
        setAudioDuration(detectedDuration);

        setUploadProgress(70);
        setUploadSpeedText(`Storing audio in IndexedDB (${(audioFile.size / (1024 * 1024)).toFixed(2)} MB)...`);
      }

      setUploadProgress(90);
      setUploadSpeedText('Finalizing metadata & publishing...');

      const finalGenre = genre === 'Other' ? customGenre.trim() : genre;
      const songData: Song = {
        id: editingSongId || `song-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        title: title.trim(),
        artist: artist.trim(),
        album: album.trim(),
        genre: finalGenre,
        copyright: copyright.trim(),
        description: description.trim(),
        coverUrl,
        audioUrl: finalAudioUrl,  // empty for new uploads; resolved to blob: URL by getAllSongs()
        audioBlob: finalBlob,     // raw Blob stored in blobAudio IndexedDB store
        duration: finalDuration,
        fileSize: audioFileSize || (audioFile ? audioFile.size : 0),
        fileName: audioFileName,
        fileFormat: finalFormat,
        featuredInClientsSay,
        clientSayOrder: Number(clientSayOrder) || 1,
        clientSayQuote: clientSayQuote.trim() || undefined,
        clientSayLocation: clientSayLocation.trim() || undefined,
        createdAt: editingSongId ? (songs.find((s) => s.id === editingSongId)?.createdAt || Date.now()) : Date.now(),
        updatedAt: Date.now(),
      };

      if (editingSongId) {
        await songStorage.updateSong(songData);
        adminAuth.logActivity('Track Updated', `Updated metadata for "${songData.title}" (${songData.artist})`, 'info');
        setSuccessMessage(`Changes confirmed! "${songData.title}" updated successfully.`);
      } else {
        await songStorage.addSong(songData);
        adminAuth.logActivity('Track Added', `Uploaded and added "${songData.title}" to library`, 'success');
        setSuccessMessage(`Track confirmed! "${songData.title}" has been published to the Shalom Music Library.`);
      }

      await loadSongsList();
      refreshAuditLogs();

      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
        resetFormToNewSong();
        setActiveTab(1);
      }, 700);
    } catch (err: any) {
      setIsUploading(false);
      setUploadProgress(0);
      setErrorMessage(err?.message || 'Upload failed. Please try again.');
    }
  };

  const handlePromptDelete = (song: Song) => {
    setSongToDelete(song);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!songToDelete) return;
    const deletedTitle = songToDelete.title;
    await songStorage.deleteSong(songToDelete.id);
    adminAuth.logActivity('Track Deleted', `Permanently deleted track "${deletedTitle}"`, 'danger');
    setSongToDelete(null);
    setDeleteModalOpen(false);
    await loadSongsList();
    refreshAuditLogs();
    setSuccessMessage(`Successfully deleted "${deletedTitle}" from the library and showcase.`);
  };

  const handleToggleClientsSay = async (song: Song) => {
    const newStatus = !song.featuredInClientsSay;
    const updated = { ...song, featuredInClientsSay: newStatus };
    await songStorage.updateSong(updated);
    adminAuth.logActivity(
      newStatus ? 'Showcase Added' : 'Showcase Removed',
      `"${song.title}" ${newStatus ? 'featured in' : 'removed from'} What Our Clients Say showcase`,
      'info'
    );
    await loadSongsList();
    refreshAuditLogs();
    setSuccessMessage(`"${song.title}" is now ${newStatus ? 'featured in' : 'hidden from'} Client Showcase.`);
  };

  const clientsSayList = songs
    .filter((s) => s.featuredInClientsSay)
    .sort((a, b) => (a.clientSayOrder ?? 999) - (b.clientSayOrder ?? 999));

  const handleMoveClientsSay = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= clientsSayList.length) return;

    const newList = [...clientsSayList];
    const temp = newList[index];
    newList[index] = newList[targetIndex];
    newList[targetIndex] = temp;

    const orderedIds = newList.map((s) => s.id);
    await songStorage.reorderClientsSaySongs(orderedIds);
    adminAuth.logActivity('Showcase Reordered', 'Reordered arrangement in What Our Clients Say showcase', 'info');
    await loadSongsList();
    refreshAuditLogs();
  };

  const handleConfirmReset = async () => {
    setResetModalOpen(false);
    const res = await songStorage.resetToDefaults();
    setSongs(res);
    adminAuth.logActivity('Library Reset', 'Reset music library to default studio seed tracks', 'warning');
    refreshAuditLogs();
    setSuccessMessage('Library reset to default Shalom Music seed tracks.');
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityError(null);
    setSecurityMessage(null);

    if (newPass !== confirmPass) {
      setSecurityError('New password and confirmation do not match.');
      return;
    }

    const res = await adminAuth.updatePassword(currentPass, newPass);
    if (res.success) {
      setSecurityMessage('Password updated successfully.');
      setCurrentPass('');
      setNewPass('');
      setConfirmPass('');
      refreshAuditLogs();
    } else {
      setSecurityError(res.error || 'Failed to update password.');
    }
  };

  const handleLogout = () => {
    adminAuth.logout();
    setIsAuthenticated(false);
    setIsStealthUnlocked(false);
    sessionStorage.removeItem('shalom_stealth_unlocked');
  };

  // Stealth dialog submission on 404 decoy page (in-memory only)
  const handleStealthUnlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (stealthInputKey.trim().toLowerCase() === STEALTH_ACCESS_KEY.toLowerCase()) {
      setIsStealthUnlocked(true);
      setStealthDialogOpen(false);
      setStealthError(null);
      setStealthInputKey('');
    } else {
      setStealthError('Invalid keycode.');
    }
  };

  const handleDecoyNumberClick = () => {
    const nextCount = decoyClickCount + 1;
    setDecoyClickCount(nextCount);
    if (nextCount >= 5) {
      setDecoyClickCount(0);
      setStealthDialogOpen(true);
    }
  };

  // Filtered songs in All Songs tab
  const filteredLibrarySongs = songs.filter((s) => {
    const matchesSearch =
      librarySearch.trim() === '' ||
      s.title.toLowerCase().includes(librarySearch.toLowerCase()) ||
      s.artist.toLowerCase().includes(librarySearch.toLowerCase()) ||
      s.album.toLowerCase().includes(librarySearch.toLowerCase());
    const matchesGenre = libraryGenreFilter === 'All' || s.genre === libraryGenreFilter;
    return matchesSearch && matchesGenre;
  });

  const totalStorageBytes = songs.reduce((acc, s) => acc + (s.fileSize || 0), 0);
  const totalStorageMB = (totalStorageBytes / (1024 * 1024)).toFixed(1);

  // =========================================================================
  // CASE 1: UNTRACEABLE DECOY 404 (Presented to Burp Suite, crawlers, unauthorized visitors)
  // =========================================================================
  if (!isAuthenticated && !isStealthUnlocked) {
    return (
      <Box
        sx={{
          bgcolor: '#0a0a0d',
          color: '#ffffff',
          minHeight: '85vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 3,
          py: 8,
        }}
      >
        <Helmet>
          <title>404 Not Found</title>
          <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
        </Helmet>

        <Box sx={{ textAlign: 'center', maxWidth: 460 }}>
          {/* Subtle click trigger on 404 text for manual stealth access without URL param */}
          <Typography
            variant="h1"
            onClick={handleDecoyNumberClick}
            sx={{
              fontFamily: '"AerodomeRegular-2vMGK", sans-serif',
              fontSize: { xs: '5rem', sm: '7.5rem' },
              fontWeight: 900,
              color: 'rgba(255, 255, 255, 0.12)',
              letterSpacing: '0.05em',
              lineHeight: 1,
              mb: 1.5,
              userSelect: 'none',
              cursor: 'default',
            }}
          >
            404
          </Typography>

          <Typography
            variant="h5"
            sx={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 700,
              color: '#ffffff',
              mb: 1,
            }}
          >
            Page Not Found
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255, 255, 255, 0.5)',
              lineHeight: 1.6,
              mb: 4,
            }}
          >
            The page you are looking for does not exist, has been removed, or is temporarily unavailable.
          </Typography>

          <Button
            component={RouterLink}
            to="/"
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            sx={{
              borderRadius: 0,
              color: '#ffffff',
              borderColor: 'rgba(255, 255, 255, 0.25)',
              textTransform: 'uppercase',
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 700,
              letterSpacing: '0.05em',
              px: 3,
              py: 1,
              '&:hover': {
                borderColor: '#ff2a74',
                color: '#ff2a74',
                bgcolor: 'transparent',
              },
            }}
          >
            Return to Home
          </Button>
        </Box>

        {/* Discreet Keycode Entry Modal (Triggered by 5 clicks or Ctrl+Shift+S) */}
        <Dialog
          open={stealthDialogOpen}
          onClose={() => setStealthDialogOpen(false)}
          maxWidth="xs"
          fullWidth
          PaperProps={{
            sx: {
              bgcolor: '#0f0f14',
              color: '#ffffff',
              borderRadius: 0,
              border: '1px solid rgba(255, 255, 255, 0.15)',
              p: 2,
            },
          }}
        >
          <DialogContent sx={{ p: 2 }}>
            <Box component="form" onSubmit={handleStealthUnlockSubmit}>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', mb: 1.5 }}>
                Access Keycode
              </Typography>
              {stealthError && (
                <Alert severity="error" sx={{ mb: 2, borderRadius: 0, py: 0.5, fontSize: '0.75rem' }}>
                  {stealthError}
                </Alert>
              )}
              <TextField
                autoFocus
                fullWidth
                size="small"
                type="password"
                placeholder="Enter access code..."
                value={stealthInputKey}
                onChange={(e) => setStealthInputKey(e.target.value)}
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 0,
                    bgcolor: '#14141a',
                    color: '#ffffff',
                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 0 },
                    '&.Mui-focused fieldset': { borderColor: '#ff2a74', borderRadius: 0 },
                  },
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Button size="small" onClick={() => setStealthDialogOpen(false)} sx={{ color: 'rgba(255, 255, 255, 0.5)', borderRadius: 0 }}>
                  Cancel
                </Button>
                <Button type="submit" size="small" variant="contained" sx={{ bgcolor: '#ff2a74', borderRadius: 0, '&:hover': { bgcolor: '#e01b5d' } }}>
                  Authenticate
                </Button>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    );
  }

  // =========================================================================
  // CASE 2: STEALTH UNLOCKED, AUTHENTICATION REQUIRED (Render sharp logo login)
  // =========================================================================
  if (!isAuthenticated && isStealthUnlocked) {
    return (
      <Box sx={{ bgcolor: '#0a0a0e', color: '#ffffff', minHeight: '100vh', pt: 6, pb: 12 }}>
        <Helmet>
          <title>Access Control</title>
          <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
        </Helmet>
        <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />
      </Box>
    );
  }

  // =========================================================================
  // CASE 3: AUTHENTICATED ADMIN DASHBOARD (Strict zero border-radius everywhere)
  // =========================================================================
  return (
    <Box
      sx={{
        bgcolor: '#0a0a0e',
        color: '#ffffff',
        minHeight: '100vh',
        pt: { xs: 3, md: 5 },
        pb: 12,
        position: 'relative',
      }}
    >
      <Helmet>
        <title>Control Dashboard</title>
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
      </Helmet>

      <Container maxWidth="lg">
        {/* TOP ADMIN HEADER & STATUS BAR */}
        <Box
          sx={{
            p: { xs: 2.5, sm: 3 },
            mb: 3,
            bgcolor: '#121217',
            borderRadius: 0,
            border: '1px solid rgba(255, 42, 116, 0.35)',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.8)',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'center' },
            gap: 2.5,
          }}
        >
          {/* Brand Info */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 0,
                bgcolor: 'rgba(255, 42, 116, 0.18)',
                border: '1px solid rgba(255, 42, 116, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ff2a74',
              }}
            >
              <AdminPanelSettingsIcon sx={{ fontSize: '2rem' }} />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 800 }}>
                Shalom Music Studio Dashboard
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', mt: 0.3 }}>
                Upload & manage tracks for the Music Library and "What Our Clients Say" showcase
              </Typography>
            </Box>
          </Box>

          {/* Action Toolbar with neatly arranged buttons */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              flexWrap: 'wrap',
              width: { xs: '100%', md: 'auto' },
              justifyContent: { xs: 'flex-start', md: 'flex-end' },
            }}
          >
            <Button
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              onClick={handleOpenAddSongForm}
              sx={{
                bgcolor: '#ff2a74',
                color: '#ffffff',
                fontWeight: 700,
                textTransform: 'none',
                fontFamily: '"Space Grotesk", sans-serif',
                borderRadius: 0,
                px: 2.5,
                py: 0.85,
                boxShadow: 'none',
                '&:hover': { bgcolor: '#e01b5d', boxShadow: 'none' },
              }}
            >
              + Add New Song
            </Button>

            <Button
              component={RouterLink}
              to="/player"
              startIcon={<LibraryMusicIcon />}
              variant="outlined"
              sx={{
                borderRadius: 0,
                color: '#ffffff',
                borderColor: 'rgba(255, 255, 255, 0.25)',
                textTransform: 'none',
                fontWeight: 600,
                fontFamily: '"Space Grotesk", sans-serif',
                px: 2,
                py: 0.85,
                '&:hover': { borderColor: '#ff2a74', bgcolor: 'rgba(255, 42, 116, 0.08)' },
              }}
            >
              Public Player
            </Button>

            <Button
              variant="outlined"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{
                borderRadius: 0,
                borderColor: 'rgba(244, 67, 54, 0.45)',
                color: '#ff6b6b',
                textTransform: 'none',
                fontWeight: 600,
                fontFamily: '"Space Grotesk", sans-serif',
                px: 2,
                py: 0.85,
                '&:hover': {
                  bgcolor: 'rgba(244, 67, 54, 0.1)',
                  borderColor: '#ef5350',
                  color: '#ffffff',
                },
              }}
            >
              Sign Out
            </Button>
          </Box>
        </Box>

        {/* METRICS & QUICK STATS CARDS (3 Equal Balanced Columns) */}
        <Grid container spacing={2} sx={{ mb: 3.5 }}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Card sx={{ bgcolor: '#14141a', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 0 }}>
              <CardContent sx={{ p: 2.2, '&:last-child': { pb: 2.2 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontWeight: 700, textTransform: 'uppercase' }}>
                    Music Library
                  </Typography>
                  <AudiotrackIcon sx={{ color: '#ff2a74', fontSize: '1.2rem' }} />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#ffffff', mt: 0.5, fontFamily: '"Space Grotesk", sans-serif' }}>
                  {songs.length}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  Total published tracks
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Card sx={{ bgcolor: '#14141a', border: '1px solid rgba(255, 42, 116, 0.3)', borderRadius: 0 }}>
              <CardContent sx={{ p: 2.2, '&:last-child': { pb: 2.2 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" sx={{ color: '#ff2a74', fontWeight: 700, textTransform: 'uppercase' }}>
                    Client Showcase
                  </Typography>
                  <StarIcon sx={{ color: '#ffd700', fontSize: '1.2rem' }} />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#ff2a74', mt: 0.5, fontFamily: '"Space Grotesk", sans-serif' }}>
                  {clientsSayList.length}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  Featured on Home page
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Card sx={{ bgcolor: '#14141a', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 0 }}>
              <CardContent sx={{ p: 2.2, '&:last-child': { pb: 2.2 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontWeight: 700, textTransform: 'uppercase' }}>
                    Storage Used
                  </Typography>
                  <VolumeUpIcon sx={{ color: '#29b6f6', fontSize: '1.2rem' }} />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#ffffff', mt: 0.5, fontFamily: '"Space Grotesk", sans-serif' }}>
                  {totalStorageMB} <span style={{ fontSize: '1rem', fontWeight: 500, color: 'rgba(255, 255, 255, 0.5)' }}>MB</span>
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  IndexedDB audio cache
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* FEEDBACK BANNERS */}
        {errorMessage && (
          <Alert
            severity="error"
            onClose={() => setErrorMessage(null)}
            sx={{ mb: 3, borderRadius: 0, bgcolor: 'rgba(211, 47, 47, 0.18)', color: '#ff8a80', border: '1px solid #d32f2f' }}
          >
            {errorMessage}
          </Alert>
        )}
        {successMessage && (
          <Alert
            severity="success"
            onClose={() => setSuccessMessage(null)}
            sx={{ mb: 3, borderRadius: 0, bgcolor: 'rgba(46, 125, 50, 0.18)', color: '#a5d6a7', border: '1px solid #2e7d32' }}
          >
            {successMessage}
          </Alert>
        )}

        {/* NAVIGATION TABS */}
        <Box sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', mb: 3 }}>
          <Tabs
            value={activeTab}
            onChange={(_, val) => setActiveTab(val)}
            sx={{
              '& .MuiTabs-indicator': { backgroundColor: '#ff2a74', height: 3 },
              '& .MuiTab-root': {
                color: 'rgba(255, 255, 255, 0.65)',
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 700,
                fontSize: '0.96rem',
                textTransform: 'none',
                minHeight: 48,
                borderRadius: 0,
                '&.Mui-selected': { color: '#ff2a74' },
              },
            }}
          >
            <Tab
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AddCircleOutlineIcon sx={{ fontSize: '1.1rem' }} />
                  <span>{editingSongId ? 'Edit Track Details' : '+ Add New Song'}</span>
                </Box>
              }
            />
            <Tab
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <QueueMusicIcon sx={{ fontSize: '1.1rem' }} />
                  <span>Music Library Manager ({songs.length})</span>
                </Box>
              }
            />
            <Tab
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <StarIcon sx={{ fontSize: '1.1rem' }} />
                  <span>Client Showcase Manager ({clientsSayList.length})</span>
                </Box>
              }
            />
            <Tab
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SecurityIcon sx={{ fontSize: '1.1rem' }} />
                  <span>Security & Audit Logs</span>
                </Box>
              }
            />
          </Tabs>
        </Box>

        {/* ======================================================== */}
        {/* TAB 0: + ADD NEW SONG / EDIT TRACK FORM                 */}
        {/* ======================================================== */}
        {activeTab === 0 && (
          <Box
            sx={{
              p: { xs: 2.5, sm: 4 },
              bgcolor: '#121217',
              borderRadius: 0,
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            {/* Banner explaining additions to Library & Showcase */}
            <Box
              sx={{
                p: 2.5,
                mb: 3.5,
                bgcolor: editingSongId ? 'rgba(255, 179, 0, 0.08)' : 'rgba(255, 42, 116, 0.08)',
                border: editingSongId ? '1px solid rgba(255, 179, 0, 0.3)' : '1px solid rgba(255, 42, 116, 0.3)',
                borderRadius: 0,
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', sm: 'center' },
                gap: 2,
              }}
            >
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: editingSongId ? '#ffb300' : '#ff2a74' }}>
                  {editingSongId ? `Currently Editing: "${title || 'Track'}"` : 'Add New Track to Shalom Music'}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mt: 0.3 }}>
                  {editingSongId
                    ? 'Review and update track metadata. When you save, a confirmation prompt will ask you to confirm your changes.'
                    : 'Songs added here are published directly into the Shalom Music Library (/player). Use Section 3 below if you also want to feature this track in "What Our Clients Say" on the Home Page.'}
                </Typography>
              </Box>

              {editingSongId && (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={resetFormToNewSong}
                  sx={{
                    borderRadius: 0,
                    color: '#ffb300',
                    borderColor: '#ffb300',
                    textTransform: 'none',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    '&:hover': { bgcolor: 'rgba(255, 179, 0, 0.1)' },
                  }}
                >
                  Cancel Edit & Add New Song Instead
                </Button>
              )}
            </Box>

            {/* SECTION 1: AUDIO TRACK FILE */}
            <Typography variant="h6" sx={{ color: '#ff2a74', fontWeight: 800, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <span>1. Audio Track File (MP3, M4A, WAV • Max 8MB)</span>
            </Typography>

            <Box
              sx={{
                p: 3,
                mb: 4,
                bgcolor: '#181820',
                border: '1px dashed rgba(255, 42, 116, 0.5)',
                borderRadius: 0,
                textAlign: 'center',
              }}
            >
              <input
                ref={audioInputRef}
                type="file"
                accept=".mp3,.m4a,.wav,audio/mp3,audio/mpeg,audio/wav,audio/x-m4a"
                style={{ display: 'none' }}
                onChange={handleAudioFileChange}
              />

              <CloudUploadIcon sx={{ fontSize: 50, color: '#ff2a74', mb: 1 }} />
              <Typography variant="h6" sx={{ color: '#ffffff', mb: 0.5 }}>
                {audioFileName ? audioFileName : 'Choose audio track from your device'}
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)', display: 'block', mb: 2 }}>
                Allowed formats: <b>.mp3, .m4a, .wav</b> • Maximum size: <b>8MB</b>
              </Typography>

              <Button
                variant="outlined"
                onClick={() => audioInputRef.current?.click()}
                sx={{
                  borderRadius: 0,
                  color: '#ff2a74',
                  borderColor: '#ff2a74',
                  fontWeight: 700,
                  textTransform: 'none',
                  px: 3,
                  '&:hover': { bgcolor: 'rgba(255, 42, 116, 0.1)' },
                }}
              >
                {audioFileName ? 'Change Audio Track' : 'Browse Local Storage'}
              </Button>

              {audioFileSize > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Chip
                    size="small"
                    label={`${(audioFileSize / (1024 * 1024)).toFixed(2)} MB • ~${Math.floor(audioDuration / 60)}:${(audioDuration % 60).toString().padStart(2, '0')}`}
                    sx={{ bgcolor: 'rgba(255, 42, 116, 0.15)', color: '#ff2a74', borderRadius: 0 }}
                  />
                </Box>
              )}

              {/* Progress bar */}
              {isUploading && (
                <Box sx={{ mt: 3, width: '100%' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.8 }}>
                    <Typography variant="caption" sx={{ color: '#ff2a74', fontWeight: 700 }}>
                      {uploadSpeedText}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#ffffff', fontWeight: 800 }}>
                      {uploadProgress}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={uploadProgress}
                    sx={{
                      borderRadius: 0,
                      height: 6,
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#ff2a74',
                      },
                    }}
                  />
                </Box>
              )}
            </Box>

            {/* SECTION 2: SONG METADATA */}
            <Typography variant="h6" sx={{ color: '#ff2a74', fontWeight: 800, mb: 2 }}>
              2. Song Metadata (All Mandatory)
            </Typography>

            <Grid container spacing={2.5}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  required
                  label="Song Title / Name"
                  placeholder="e.g. Wastahili Sifa"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  size="small"
                  sx={inputStyle}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  required
                  label="Group / Artist who sang the song"
                  placeholder="e.g. The Harmony TZ"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  size="small"
                  sx={inputStyle}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  required
                  label="EP / Album of the song"
                  placeholder="e.g. Heavenly Harmonies Vol. 1"
                  value={album}
                  onChange={(e) => setAlbum(e.target.value)}
                  size="small"
                  sx={inputStyle}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  select
                  fullWidth
                  required
                  label="Genre or Category"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  size="small"
                  sx={inputStyle}
                >
                  {GENRE_OPTIONS.map((g) => (
                    <MenuItem key={g} value={g} sx={{ color: '#ffffff', bgcolor: '#1a1a22' }}>
                      {g}
                    </MenuItem>
                  ))}
                  <MenuItem value="Other" sx={{ color: '#ffffff', bgcolor: '#1a1a22' }}>
                    Other (Custom Genre)
                  </MenuItem>
                </TextField>
              </Grid>

              {genre === 'Other' && (
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    required
                    label="Custom Genre / Category"
                    placeholder="Enter custom genre..."
                    value={customGenre}
                    onChange={(e) => setCustomGenre(e.target.value)}
                    size="small"
                    sx={inputStyle}
                  />
                </Grid>
              )}

              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  required
                  label="Song Copyright"
                  placeholder="e.g. © 2026 Shalom Music Studios. All rights reserved."
                  value={copyright}
                  onChange={(e) => setCopyright(e.target.value)}
                  size="small"
                  sx={inputStyle}
                />
              </Grid>

              {/* Cover Photo */}
              <Grid size={{ xs: 12, sm: 4 }}>
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: 600, display: 'block', mb: 1 }}>
                  Cover Photo (Mandatory) *
                </Typography>
                <input
                  ref={coverInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleCoverFileChange}
                />
                <Button
                  variant="outlined"
                  onClick={() => coverInputRef.current?.click()}
                  sx={{
                    borderRadius: 0,
                    color: coverUrl ? '#4caf50' : '#ff2a74',
                    borderColor: coverUrl ? '#4caf50' : '#ff2a74',
                    textTransform: 'none',
                  }}
                >
                  {coverUrl ? '✓ Change Cover Image' : 'Select Cover Image'}
                </Button>
                {coverFileName && (
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)', display: 'block', mt: 0.5 }}>
                    {coverFileName}
                  </Typography>
                )}
              </Grid>

              <Grid size={{ xs: 12, sm: 8 }}>
                {coverUrl ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      component="img"
                      src={coverUrl}
                      alt="Cover Preview"
                      sx={{ width: 80, height: 80, borderRadius: 0, objectFit: 'cover', border: '1px solid rgba(255, 42, 116, 0.4)' }}
                    />
                    <Box>
                      <Typography variant="caption" sx={{ color: '#4caf50', fontWeight: 700, display: 'block' }}>
                        Artwork preview ready
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                        Displays in player & showcase
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      height: 80,
                      bgcolor: '#181820',
                      borderRadius: 0,
                      border: '1px dashed rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                      No cover selected yet
                    </Typography>
                  </Box>
                )}
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  required
                  multiline
                  rows={3}
                  label="Song Description (Short or Long)"
                  placeholder="Describe the production, arrangement, instruments, lyrics, recording notes..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  size="small"
                  sx={inputStyle}
                />
              </Grid>
            </Grid>

            {/* SECTION 3: WHAT OUR CLIENTS SAY SHOWCASE SETTINGS */}
            <Box
              sx={{
                mt: 4,
                p: 3,
                bgcolor: 'rgba(255, 42, 116, 0.05)',
                border: '1px solid rgba(255, 42, 116, 0.25)',
                borderRadius: 0,
              }}
            >
              <Typography variant="h6" sx={{ color: '#ff2a74', fontWeight: 800, mb: 1 }}>
                3. "What Our Clients Say" Showcase Settings
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.65)', mb: 2 }}>
                Enable this option if you want this track to be showcased on the Home Page under "What Our Clients Say".
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={featuredInClientsSay}
                    onChange={(e) => setFeaturedInClientsSay(e.target.checked)}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': { color: '#ff2a74' },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#ff2a74' },
                    }}
                  />
                }
                label={
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#ffffff' }}>
                    Feature this song in "What Our Clients Say" section on the Home Page
                  </Typography>
                }
              />

              {featuredInClientsSay && (
                <Grid container spacing={2} sx={{ mt: 1.5 }}>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Arrangement Order Index"
                      value={clientSayOrder}
                      onChange={(e) => setClientSayOrder(Number(e.target.value))}
                      size="small"
                      helperText="Lower numbers appear first (#1, #2...)"
                      sx={inputStyle}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 8 }}>
                    <TextField
                      fullWidth
                      label="Client Location / Ministry / Church Affiliation"
                      value={clientSayLocation}
                      onChange={(e) => setClientSayLocation(e.target.value)}
                      size="small"
                      placeholder="e.g. Chuo Kikuu SDA Church"
                      sx={inputStyle}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      multiline
                      rows={2}
                      label="Client Testimonial Quote (Optional)"
                      value={clientSayQuote}
                      onChange={(e) => setClientSayQuote(e.target.value)}
                      size="small"
                      placeholder="e.g. 'Finding a studio with elite quality and actual heart is rare. They walked with us with unmatched patience...'"
                      sx={inputStyle}
                    />
                  </Grid>
                </Grid>
              )}
            </Box>

            {/* FORM SUBMISSION ACTIONS */}
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              {editingSongId && (
                <Button onClick={resetFormToNewSong} sx={{ borderRadius: 0, color: 'rgba(255, 255, 255, 0.6)', textTransform: 'none' }}>
                  Cancel Edit
                </Button>
              )}
              <Button
                variant="contained"
                disabled={isUploading}
                onClick={handleInitiateSubmit}
                sx={{
                  bgcolor: '#ff2a74',
                  color: '#ffffff',
                  fontWeight: 800,
                  px: 4,
                  py: 1.2,
                  borderRadius: 0,
                  fontFamily: '"Space Grotesk", sans-serif',
                  boxShadow: 'none',
                  '&:hover': { bgcolor: '#e01b5d', boxShadow: 'none' },
                }}
              >
                {isUploading ? `Uploading ${uploadProgress}%...` : editingSongId ? 'Save Changes to Song' : 'Upload & Add to Music Library'}
              </Button>
            </Box>
          </Box>
        )}

        {/* ======================================================== */}
        {/* TAB 1: MUSIC LIBRARY MANAGER (ALL SONGS)               */}
        {/* ======================================================== */}
        {activeTab === 1 && (
          <Box>
            {/* Top Toolbar */}
            <Box
              sx={{
                p: 2.5,
                mb: 3,
                bgcolor: '#121217',
                borderRadius: 0,
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'stretch', md: 'center' },
                gap: 2,
              }}
            >
              <Box sx={{ display: 'flex', gap: 1.5, flex: 1, flexWrap: 'wrap' }}>
                <TextField
                  placeholder="Search by title, artist, or album..."
                  value={librarySearch}
                  onChange={(e) => setLibrarySearch(e.target.value)}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ ...inputStyle, minWidth: { xs: '100%', sm: 260 } }}
                />

                <TextField
                  select
                  size="small"
                  value={libraryGenreFilter}
                  onChange={(e) => setLibraryGenreFilter(e.target.value)}
                  sx={{ ...inputStyle, minWidth: 160 }}
                >
                  <MenuItem value="All" sx={{ color: '#ffffff', bgcolor: '#1a1a22' }}>
                    All Genres
                  </MenuItem>
                  {GENRE_OPTIONS.map((g) => (
                    <MenuItem key={g} value={g} sx={{ color: '#ffffff', bgcolor: '#1a1a22' }}>
                      {g}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Button
                  variant="contained"
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={handleOpenAddSongForm}
                  sx={{
                    borderRadius: 0,
                    bgcolor: '#ff2a74',
                    color: '#ffffff',
                    fontWeight: 700,
                    textTransform: 'none',
                    fontFamily: '"Space Grotesk", sans-serif',
                    '&:hover': { bgcolor: '#e01b5d' },
                  }}
                >
                  + Add New Song
                </Button>

                <Button
                  size="small"
                  startIcon={<RefreshIcon />}
                  onClick={() => setResetModalOpen(true)}
                  sx={{ borderRadius: 0, color: 'rgba(255, 255, 255, 0.55)', textTransform: 'none', '&:hover': { color: '#ffb300' } }}
                >
                  Reset Defaults
                </Button>
              </Box>
            </Box>

            {filteredLibrarySongs.length === 0 ? (
              <Box sx={{ p: 6, textAlign: 'center', bgcolor: '#121217', borderRadius: 0 }}>
                <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  {songs.length === 0 ? 'No songs in the library yet. Click "+ Add New Song" to upload your first track!' : 'No tracks match your search or filter.'}
                </Typography>
                {songs.length === 0 && (
                  <Button
                    variant="contained"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={handleOpenAddSongForm}
                    sx={{ mt: 2, borderRadius: 0, bgcolor: '#ff2a74', textTransform: 'none' }}
                  >
                    + Add New Song Now
                  </Button>
                )}
              </Box>
            ) : (
              <TableContainer component={Paper} sx={{ bgcolor: '#121217', borderRadius: 0 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ '& th': { bgcolor: '#0e0e12', color: '#ff2a74', fontWeight: 700 } }}>
                      <TableCell>Cover & Play</TableCell>
                      <TableCell>Title & Artist</TableCell>
                      <TableCell>EP / Album</TableCell>
                      <TableCell>Genre</TableCell>
                      <TableCell align="center">Client Showcase</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredLibrarySongs.map((song) => {
                      const isSongPlaying = isPlaying && currentSong?.id === song.id;
                      return (
                        <TableRow key={song.id} hover sx={{ '&:hover': { bgcolor: 'rgba(255, 42, 116, 0.05)' } }}>
                          <TableCell>
                            <Box sx={{ position: 'relative', width: 44, height: 44 }}>
                              <Box
                                component="img"
                                src={song.coverUrl}
                                alt={song.title}
                                sx={{ width: 44, height: 44, borderRadius: 0, objectFit: 'cover' }}
                              />
                              <IconButton
                                size="small"
                                onClick={() => {
                                  if (currentSong?.id === song.id) togglePlay();
                                  else playSong(song, songs);
                                }}
                                sx={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  width: 44,
                                  height: 44,
                                  bgcolor: isSongPlaying ? 'rgba(255, 42, 116, 0.85)' : 'rgba(0, 0, 0, 0.5)',
                                  color: '#ffffff',
                                  borderRadius: 0,
                                  opacity: isSongPlaying ? 1 : 0.8,
                                  '&:hover': { opacity: 1 },
                                }}
                              >
                                {isSongPlaying ? <PauseIcon fontSize="small" /> : <PlayArrowIcon fontSize="small" />}
                              </IconButton>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 700, color: '#ffffff' }}>
                              {song.title}
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                              {song.artist}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                              {song.album}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip size="small" label={song.genre} sx={{ height: 22, fontSize: '0.72rem', bgcolor: 'rgba(255, 255, 255, 0.08)', color: '#ff2a74', borderRadius: 0 }} />
                          </TableCell>
                          <TableCell align="center">
                            <Tooltip title={song.featuredInClientsSay ? `Featured (#${song.clientSayOrder}). Click to unfeature.` : 'Click to feature in "What Our Clients Say"'}>
                              <IconButton
                                size="small"
                                onClick={() => handleToggleClientsSay(song)}
                                sx={{ color: song.featuredInClientsSay ? '#ffd700' : 'rgba(255, 255, 255, 0.2)' }}
                              >
                                <StarIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            {song.featuredInClientsSay && (
                              <Typography variant="caption" sx={{ display: 'block', color: '#ffd700', fontSize: '0.68rem', fontWeight: 700 }}>
                                #{song.clientSayOrder}
                              </Typography>
                            )}
                          </TableCell>
                          <TableCell align="right">
                            <Tooltip title="Edit Track Details">
                              <IconButton
                                size="small"
                                onClick={() => handleStartEdit(song)}
                                sx={{ color: 'rgba(255, 255, 255, 0.7)', '&:hover': { color: '#ff2a74' } }}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete Track with Confirmation">
                              <IconButton
                                size="small"
                                onClick={() => handlePromptDelete(song)}
                                sx={{ color: 'rgba(255, 255, 255, 0.4)', '&:hover': { color: '#ff4b4b' } }}
                              >
                                <DeleteOutlineIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        )}

        {/* ======================================================== */}
        {/* TAB 2: ARRANGE "WHAT OUR CLIENTS SAY" SHOWCASE           */}
        {/* ======================================================== */}
        {activeTab === 2 && (
          <Box>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#ff2a74' }}>
                Home Page Showcase Arrangement
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                These tracks appear directly in the <b>"What Our Clients Say"</b> showcase on the home page. Use the arrow buttons to arrange their display order, or edit their testimonials and location.
              </Typography>
            </Box>

            {clientsSayList.length === 0 ? (
              <Box sx={{ p: 6, textAlign: 'center', bgcolor: '#121217', borderRadius: 0 }}>
                <StarIcon sx={{ fontSize: 44, color: 'rgba(255, 255, 255, 0.2)', mb: 1 }} />
                <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  No songs are currently featured in the showcase.
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.4)', display: 'block', mt: 0.5 }}>
                  Go to "Music Library Manager" and click the Star icon on any song, or check Section 3 when adding a song.
                </Typography>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {clientsSayList.map((song, idx) => (
                  <Box
                    key={song.id}
                    sx={{
                      p: 2.5,
                      bgcolor: '#171720',
                      border: '1px solid rgba(255, 42, 116, 0.25)',
                      borderRadius: 0,
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      justifyContent: 'space-between',
                      alignItems: { xs: 'flex-start', sm: 'center' },
                      gap: 2,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box
                        sx={{
                          width: 38,
                          height: 38,
                          borderRadius: 0,
                          bgcolor: 'rgba(255, 42, 116, 0.15)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#ff2a74',
                          fontWeight: 800,
                          fontSize: '1rem',
                        }}
                      >
                        #{idx + 1}
                      </Box>
                      <Box
                        component="img"
                        src={song.coverUrl}
                        alt={song.title}
                        sx={{ width: 56, height: 56, borderRadius: 0, objectFit: 'cover' }}
                      />
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#ffffff' }}>
                          {song.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          {song.artist} • <span style={{ color: '#ff2a74' }}>{song.clientSayLocation || 'Chuo Kikuu SDA Church'}</span>
                        </Typography>
                        {song.clientSayQuote && (
                          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.55)', fontStyle: 'italic', display: 'block', mt: 0.5 }}>
                            "{song.clientSayQuote.slice(0, 95)}..."
                          </Typography>
                        )}
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Tooltip title="Move Up">
                        <span>
                          <IconButton
                            disabled={idx === 0}
                            onClick={() => handleMoveClientsSay(idx, 'up')}
                            sx={{ borderRadius: 0, color: idx === 0 ? 'rgba(255, 255, 255, 0.15)' : '#ffffff', bgcolor: 'rgba(255, 255, 255, 0.05)' }}
                          >
                            <ArrowUpwardIcon fontSize="small" />
                          </IconButton>
                        </span>
                      </Tooltip>
                      <Tooltip title="Move Down">
                        <span>
                          <IconButton
                            disabled={idx === clientsSayList.length - 1}
                            onClick={() => handleMoveClientsSay(idx, 'down')}
                            sx={{ borderRadius: 0, color: idx === clientsSayList.length - 1 ? 'rgba(255, 255, 255, 0.15)' : '#ffffff', bgcolor: 'rgba(255, 255, 255, 0.05)' }}
                          >
                            <ArrowDownwardIcon fontSize="small" />
                          </IconButton>
                        </span>
                      </Tooltip>
                      <Tooltip title="Edit Quote & Track Details">
                        <IconButton
                          onClick={() => handleStartEdit(song)}
                          sx={{ borderRadius: 0, color: '#ff2a74', bgcolor: 'rgba(255, 42, 116, 0.1)' }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Remove from Showcase">
                        <IconButton
                          onClick={() => handleToggleClientsSay(song)}
                          sx={{ borderRadius: 0, color: 'rgba(255, 255, 255, 0.4)', '&:hover': { color: '#ff4b4b' } }}
                        >
                          <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        )}

        {/* ======================================================== */}
        {/* TAB 3: SECURITY CONTROLS & AUDIT ACTIVITY LOGS          */}
        {/* ======================================================== */}
        {activeTab === 3 && (
          <Box>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 5 }}>
                <Box sx={{ p: 3, bgcolor: '#121217', borderRadius: 0, border: '1px solid rgba(255, 255, 255, 0.08)', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#ffffff', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LockResetIcon sx={{ color: '#ff2a74' }} /> Change Admin Password
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', mb: 2.5 }}>
                    Update your admin access password. Password must be at least 8 characters.
                  </Typography>

                  {securityMessage && (
                    <Alert severity="success" sx={{ mb: 2, borderRadius: 0, bgcolor: 'rgba(46, 125, 50, 0.15)', color: '#a5d6a7' }}>
                      {securityMessage}
                    </Alert>
                  )}
                  {securityError && (
                    <Alert severity="error" sx={{ mb: 2, borderRadius: 0, bgcolor: 'rgba(211, 47, 47, 0.15)', color: '#ff8a80' }}>
                      {securityError}
                    </Alert>
                  )}

                  <Box component="form" onSubmit={handlePasswordUpdate}>
                    <TextField
                      fullWidth
                      required
                      type={showPasswordChange ? 'text' : 'password'}
                      label="Current Password"
                      value={currentPass}
                      onChange={(e) => setCurrentPass(e.target.value)}
                      size="small"
                      sx={{ ...inputStyle, mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      required
                      type={showPasswordChange ? 'text' : 'password'}
                      label="New Password (min 8 chars)"
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      size="small"
                      sx={{ ...inputStyle, mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      required
                      type={showPasswordChange ? 'text' : 'password'}
                      label="Confirm New Password"
                      value={confirmPass}
                      onChange={(e) => setConfirmPass(e.target.value)}
                      size="small"
                      sx={{ ...inputStyle, mb: 2 }}
                    />

                    <FormControlLabel
                      control={
                        <Switch
                          checked={showPasswordChange}
                          onChange={(e) => setShowPasswordChange(e.target.checked)}
                          size="small"
                          sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#ff2a74' } }}
                        />
                      }
                      label={<Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>Show passwords</Typography>}
                      sx={{ mb: 2, display: 'block' }}
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      sx={{
                        borderRadius: 0,
                        bgcolor: '#ff2a74',
                        color: '#ffffff',
                        fontWeight: 700,
                        textTransform: 'none',
                        '&:hover': { bgcolor: '#e01b5d' },
                      }}
                    >
                      Update Password
                    </Button>
                  </Box>
                </Box>

                <Box sx={{ p: 2.5, bgcolor: '#121217', borderRadius: 0, border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#ffffff', mb: 1 }}>
                    Session Information
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)', display: 'block' }}>
                    Active User: <b style={{ color: '#ffffff' }}>admin</b>
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)', display: 'block', mt: 0.5 }}>
                    Route Security: <b style={{ color: '#4caf50' }}>Stealth Decoy Shielded</b>
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)', display: 'block', mt: 0.5 }}>
                    Rate Limiting: <b style={{ color: '#4caf50' }}>5 attempts max with lockout</b>
                  </Typography>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, md: 7 }}>
                <Box sx={{ p: 3, bgcolor: '#121217', borderRadius: 0, border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: 1 }}>
                      <HistoryIcon sx={{ color: '#ff2a74' }} /> Activity & Security Audit Log
                    </Typography>
                    <Button
                      size="small"
                      onClick={() => {
                        adminAuth.clearActivityLogs();
                        refreshAuditLogs();
                      }}
                      sx={{ borderRadius: 0, color: 'rgba(255, 255, 255, 0.45)', textTransform: 'none', fontSize: '0.75rem' }}
                    >
                      Clear Logs
                    </Button>
                  </Box>

                  {auditLogs.length === 0 ? (
                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                      No activity logs recorded yet in this session.
                    </Typography>
                  ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, maxHeight: 450, overflowY: 'auto' }}>
                      {auditLogs.map((log) => {
                        const dateStr = new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                        const badgeColor =
                          log.type === 'danger'
                            ? '#ff4b4b'
                            : log.type === 'warning'
                            ? '#ffb300'
                            : log.type === 'success'
                            ? '#4caf50'
                            : '#29b6f6';

                        return (
                          <Box
                            key={log.id}
                            sx={{
                              p: 1.5,
                              bgcolor: '#171720',
                              borderRadius: 0,
                              borderLeft: `3px solid ${badgeColor}`,
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'flex-start',
                              gap: 1.5,
                            }}
                          >
                            <Box>
                              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#ffffff', fontSize: '0.82rem' }}>
                                {log.action}
                              </Typography>
                              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.65)', display: 'block' }}>
                                {log.details}
                              </Typography>
                            </Box>
                            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.4)', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                              {dateStr}
                            </Typography>
                          </Box>
                        );
                      })}
                    </Box>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </Container>

      {/* CONFIRMATION DIALOGS */}
      <ConfirmDeleteDialog
        open={deleteModalOpen}
        song={songToDelete}
        onCancel={() => {
          setDeleteModalOpen(false);
          setSongToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
      />

      <ConfirmEditDialog
        open={editModalOpen}
        songTitle={title}
        artist={artist}
        album={album}
        genre={genre === 'Other' ? customGenre : genre}
        featuredInClientsSay={featuredInClientsSay}
        onCancel={() => setEditModalOpen(false)}
        onConfirm={executeSaveSong}
        isLoading={isUploading}
      />

      <ConfirmResetDialog
        open={resetModalOpen}
        onCancel={() => setResetModalOpen(false)}
        onConfirm={handleConfirmReset}
      />
    </Box>
  );
};

const inputStyle = {
  '& .MuiOutlinedInput-root': {
    color: '#ffffff',
    bgcolor: '#191922',
    borderRadius: 0,
    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.15)', borderRadius: 0 },
    '&:hover fieldset': { borderColor: 'rgba(255, 42, 116, 0.5)', borderRadius: 0 },
    '&.Mui-focused fieldset': { borderColor: '#ff2a74', borderRadius: 0 },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
    '&.Mui-focused': { color: '#ff2a74' },
  },
  '& .MuiFormHelperText-root': {
    color: 'rgba(255, 255, 255, 0.45)',
  },
};

export default CMSPage;
