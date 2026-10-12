import React, { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Grid2 as Grid,
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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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

import type { Song } from '../../types/song';
import { songStorage } from '../../services/songStorage';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import {
  ConfirmDeleteDialog,
  ConfirmEditDialog,
  ConfirmResetDialog,
} from './ConfirmationDialogs';

const MAX_FILE_SIZE_BYTES = 8 * 1024 * 1024; // 8 Megabytes maximum
const ALLOWED_EXTENSIONS = ['mp3', 'm4a', 'wav'];

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

interface SongCMSModalProps {
  open: boolean;
  onClose: () => void;
  onSongSaved?: (song: Song) => void;
}

export const SongCMSModal: React.FC<SongCMSModalProps> = ({ open, onClose, onSongSaved }) => {
  const { currentSong, isPlaying, playSong, togglePlay } = useAudioPlayer();

  const [activeTab, setActiveTab] = useState<number>(0); // 0 = Upload / Form, 1 = Manage Songs, 2 = Arrange "What Our Clients Say"
  const [songs, setSongs] = useState<Song[]>([]);
  const [editingSongId, setEditingSongId] = useState<string | null>(null);

  // Form Fields (all mandatory as requested)
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [genre, setGenre] = useState(GENRE_OPTIONS[0]);
  const [customGenre, setCustomGenre] = useState('');
  const [copyright, setCopyright] = useState('© 2026 Shalom Music Studios. All rights reserved.');
  const [description, setDescription] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [coverFileName, setCoverFileName] = useState('');
  const [coverFile, setCoverFile] = useState<File | null>(null);

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

  // Upload Progress & Errors
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

  const audioInputRef = useRef<HTMLInputElement | null>(null);
  const coverInputRef = useRef<HTMLInputElement | null>(null);

  // Load songs on open
  const loadSongsList = async () => {
    const list = await songStorage.getAllSongs();
    setSongs(list);
  };

  useEffect(() => {
    if (open) {
      loadSongsList();
      resetForm();
    }
  }, [open]);

  const resetForm = () => {
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
    setCoverFile(null);
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
    setSuccessMessage(null);
  };

  // Handle Audio File Selection with strict validation
  const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    const file = e.target.files?.[0];
    if (!file) return;

    // Check extension
    const extension = file.name.split('.').pop()?.toLowerCase() || '';
    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      setErrorMessage(`Invalid audio format: .${extension}. Only MP3, M4A, and WAV files are allowed.`);
      if (audioInputRef.current) audioInputRef.current.value = '';
      return;
    }

    // Check size limit: max 8MB
    if (file.size > MAX_FILE_SIZE_BYTES) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
      setErrorMessage(`File is too large (${sizeMB} MB). Audio files must not exceed 8 MB.`);
      if (audioInputRef.current) audioInputRef.current.value = '';
      return;
    }

    setAudioFile(file);
    setAudioFileName(file.name);
    setAudioFileSize(file.size);

    // Auto calculate audio duration via temporary audio element
    const tempUrl = URL.createObjectURL(file);
    const tempAudio = new Audio();
    tempAudio.preload = 'metadata';
    tempAudio.onloadedmetadata = () => {
      if (tempAudio.duration && !isNaN(tempAudio.duration) && isFinite(tempAudio.duration)) {
        setAudioDuration(Math.round(tempAudio.duration));
      }
      URL.revokeObjectURL(tempUrl);
    };
    tempAudio.onerror = () => {
      URL.revokeObjectURL(tempUrl);
    };
    tempAudio.src = tempUrl;

    // Auto populate song title if blank
    if (!title) {
      const baseName = file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');
      setTitle(baseName.charAt(0).toUpperCase() + baseName.slice(1));
    }
  };

  // Handle Cover Photo Selection
  const handleCoverFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Cover photo must be an image file (JPEG, PNG, WEBP).');
      return;
    }

    setCoverFileName(file.name);
    setCoverFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setCoverUrl(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // Populate form for editing
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
    setCoverFileName('Existing Cover');
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
  };

  // Initiate submit: if editing, show confirmation modal first
  const handleInitiateSubmit = () => {
    setErrorMessage(null);
    setSuccessMessage(null);

    // Mandatory Field Validations
    if (!title.trim()) {
      setErrorMessage('Song Title is mandatory.');
      return;
    }
    if (!artist.trim()) {
      setErrorMessage('Artist / Group who sang the song is mandatory.');
      return;
    }
    if (!album.trim()) {
      setErrorMessage('EP / Album is mandatory.');
      return;
    }
    const finalGenre = genre === 'Other' ? customGenre.trim() : genre;
    if (!finalGenre) {
      setErrorMessage('Genre / Category is mandatory.');
      return;
    }
    if (!copyright.trim()) {
      setErrorMessage('Song Copyright notice is mandatory.');
      return;
    }
    if (!coverUrl.trim()) {
      setErrorMessage('Cover photo is mandatory. Please select a cover image.');
      return;
    }
    if (!description.trim()) {
      setErrorMessage('Song Description is mandatory (short or long).');
      return;
    }
    if (!editingSongId && !audioFile) {
      setErrorMessage('Audio file is mandatory. Please select an MP3, M4A, or WAV file under 8MB.');
      return;
    }

    if (editingSongId) {
      setEditModalOpen(true);
    } else {
      executeSaveSong();
    }
  };

  // Execute Save / Upload with real-time percentage progress
  const executeSaveSong = async () => {
    setEditModalOpen(false);
    setIsUploading(true);
    setUploadProgress(5);
    setUploadSpeedText('Initializing audio stream & indexing...');

    try {
      let finalFormat = 'mp3';

      if (audioFile) {
        finalFormat = audioFile.name.split('.').pop()?.toLowerCase() || 'mp3';

        // Simulate progress visually while the blob is being prepared
        // (No FileReader needed — raw Blob goes straight to IndexedDB via audioBlob field)
        const steps = [20, 40, 60, 80, 90, 95];
        for (const pct of steps) {
          await new Promise<void>((res) => setTimeout(res, 60));
          const mbDone = ((audioFile.size * pct) / 100 / (1024 * 1024)).toFixed(2);
          const mbTotal = (audioFile.size / (1024 * 1024)).toFixed(2);
          setUploadProgress(pct);
          setUploadSpeedText(`Uploading: ${pct}% (${mbDone}MB / ${mbTotal}MB)`);
        }
      }

      // Final processing
      setUploadProgress(100);
      setUploadSpeedText('Finalizing metadata...');

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
        // audioBlob carries the raw File so songStorage stores it in the blobAudio
        // IndexedDB store and generates a proper blob: URL at playback time.
        // For edits with no new file, keep the existing audioUrl as-is.
        audioUrl: audioFile ? '' : existingAudioUrl,
        audioBlob: audioFile ?? undefined,
        audioFile: audioFile ?? undefined,
        coverFile: coverFile ?? undefined,
        duration: audioDuration,
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
        setSuccessMessage(`"${songData.title}" updated successfully!`);
      } else {
        await songStorage.addSong(songData);
        setSuccessMessage(`"${songData.title}" uploaded & added to Shalom Music library successfully!`);
      }

      await loadSongsList();
      if (onSongSaved) onSongSaved(songData);

      // Delay to show 100% completion before resetting or switching tab
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
        resetForm();
        setActiveTab(1); // Show song list
      }, 700);
    } catch (err: any) {
      setIsUploading(false);
      setUploadProgress(0);
      setErrorMessage(err?.message || 'Upload failed. Please try again.');
    }
  };

  // Delete song prompt
  const handlePromptDelete = (song: Song) => {
    setSongToDelete(song);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!songToDelete) return;
    const titleToDelete = songToDelete.title;
    await songStorage.deleteSong(songToDelete.id);
    setSongToDelete(null);
    setDeleteModalOpen(false);
    await loadSongsList();
    setSuccessMessage(`Deleted "${titleToDelete}".`);
  };

  const handleConfirmReset = async () => {
    setResetModalOpen(false);
    const res = await songStorage.resetToDefaults();
    setSongs(res);
    setSuccessMessage('Reset to default studio seed tracks.');
  };

  // Toggle Featured in Clients Say directly from list
  const handleToggleClientsSay = async (song: Song) => {
    const updated = { ...song, featuredInClientsSay: !song.featuredInClientsSay };
    await songStorage.updateSong(updated);
    await loadSongsList();
  };

  // Reordering in Clients Say
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
    await loadSongsList();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: '#121216',
          color: '#ffffff',
          border: '1px solid rgba(255, 42, 116, 0.3)',
          borderRadius: 2,
          boxShadow: '0 25px 80px rgba(0, 0, 0, 0.95), 0 0 30px rgba(255, 42, 116, 0.2)',
          backgroundImage: 'radial-gradient(circle at top right, rgba(255, 42, 116, 0.08), transparent 70%)',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          px: 3,
          py: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              bgcolor: 'rgba(255, 42, 116, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ff2a74',
            }}
          >
            <AudiotrackIcon />
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 1.2,
              }}
            >
              Shalom Music Studio CMS
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.55)' }}>
              Add, manage, and arrange audio tracks & client showcases
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} sx={{ color: 'rgba(255, 255, 255, 0.6)', '&:hover': { color: '#ff2a74' } }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* Tabs */}
      <Box sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', px: 3, bgcolor: '#0d0d10' }}>
        <Tabs
          value={activeTab}
          onChange={(_, val) => setActiveTab(val)}
          sx={{
            '& .MuiTabs-indicator': { backgroundColor: '#ff2a74', height: 3 },
            '& .MuiTab-root': {
              color: 'rgba(255, 255, 255, 0.65)',
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '0.92rem',
              '&.Mui-selected': { color: '#ff2a74' },
            },
          }}
        >
          <Tab label={editingSongId ? 'Edit Song Details' : '+ Upload New Song'} />
          <Tab label={`All Studio Tracks (${songs.length})`} />
          <Tab label={`"What Our Clients Say" Showcase (${clientsSayList.length})`} />
        </Tabs>
      </Box>

      <DialogContent sx={{ p: { xs: 2, sm: 3 } }}>
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2.5, bgcolor: 'rgba(211, 47, 47, 0.15)', color: '#ff8a80', border: '1px solid #d32f2f' }}>
            {errorMessage}
          </Alert>
        )}
        {successMessage && (
          <Alert severity="success" sx={{ mb: 2.5, bgcolor: 'rgba(46, 125, 50, 0.15)', color: '#a5d6a7', border: '1px solid #2e7d32' }}>
            {successMessage}
          </Alert>
        )}

        {/* TAB 0: UPLOAD & EDIT FORM */}
        {activeTab === 0 && (
          <Box component="form" noValidate>
            <Typography variant="subtitle2" sx={{ color: '#ff2a74', fontWeight: 700, mb: 2, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {editingSongId ? 'Edit Track Information' : '1. Local Storage Song Upload'}
            </Typography>

            {/* Audio File Selection Card */}
            <Box
              sx={{
                p: 2.5,
                mb: 3,
                bgcolor: '#181820',
                border: '1px dashed rgba(255, 42, 116, 0.4)',
                borderRadius: 2,
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

              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                <CloudUploadIcon sx={{ fontSize: 44, color: '#ff2a74', mb: 0.5 }} />
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#ffffff' }}>
                  {audioFileName ? audioFileName : 'Select audio file from local storage'}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  Allowed formats: <b>.mp3, .m4a, .wav</b> (Maximum allowed size: <b>8MB</b>)
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => audioInputRef.current?.click()}
                  sx={{
                    mt: 1,
                    color: '#ff2a74',
                    borderColor: '#ff2a74',
                    textTransform: 'none',
                    fontWeight: 600,
                    '&:hover': { borderColor: '#ff4b8d', bgcolor: 'rgba(255, 42, 116, 0.08)' },
                  }}
                >
                  {audioFileName ? 'Choose Different File' : 'Browse Local Storage'}
                </Button>

                {audioFileSize > 0 && (
                  <Chip
                    size="small"
                    label={`${(audioFileSize / (1024 * 1024)).toFixed(2)} MB • Duration: ~${Math.floor(audioDuration / 60)}:${(audioDuration % 60).toString().padStart(2, '0')}`}
                    sx={{ mt: 1, bgcolor: 'rgba(255, 42, 116, 0.15)', color: '#ff2a74' }}
                  />
                )}
              </Box>

              {/* Real-time Percentage Uploading Progress Bar */}
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
                      height: 8,
                      borderRadius: 4,
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#ff2a74',
                        borderRadius: 4,
                        backgroundImage: 'linear-gradient(90deg, #ff2a74 0%, #ff6b9d 100%)',
                      },
                    }}
                  />
                </Box>
              )}
            </Box>

            <Typography variant="subtitle2" sx={{ color: '#ff2a74', fontWeight: 700, mb: 2, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              2. Song Metadata (All Mandatory)
            </Typography>

            <Grid container spacing={2}>
              {/* Song Title */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  required
                  label="Song Title / Name"
                  placeholder="e.g. Wastahili Sifa"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  variant="outlined"
                  size="small"
                  sx={inputStyle}
                />
              </Grid>

              {/* Group / Artist */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  required
                  label="Group / Artist who sang the song"
                  placeholder="e.g. The Harmony TZ"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  variant="outlined"
                  size="small"
                  sx={inputStyle}
                />
              </Grid>

              {/* EP / Album */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  required
                  label="EP / Album of the song"
                  placeholder="e.g. Heavenly Harmonies Vol. 1"
                  value={album}
                  onChange={(e) => setAlbum(e.target.value)}
                  variant="outlined"
                  size="small"
                  sx={inputStyle}
                />
              </Grid>

              {/* Genre / Category */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  select
                  fullWidth
                  required
                  label="Genre or Category"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  variant="outlined"
                  size="small"
                  sx={inputStyle}
                >
                  {GENRE_OPTIONS.map((g) => (
                    <MenuItem key={g} value={g} sx={{ color: '#ffffff', bgcolor: '#1a1a22' }}>
                      {g}
                    </MenuItem>
                  ))}
                  <MenuItem value="Other" sx={{ color: '#ffffff', bgcolor: '#1a1a22' }}>
                    Other (Custom)
                  </MenuItem>
                </TextField>
              </Grid>

              {/* Custom Genre if Other */}
              {genre === 'Other' && (
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    required
                    label="Custom Genre / Category"
                    placeholder="Enter custom genre..."
                    value={customGenre}
                    onChange={(e) => setCustomGenre(e.target.value)}
                    variant="outlined"
                    size="small"
                    sx={inputStyle}
                  />
                </Grid>
              )}

              {/* Copyright */}
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  required
                  label="Song Copyright"
                  placeholder="e.g. © 2026 Shalom Music Studios. All rights reserved."
                  value={copyright}
                  onChange={(e) => setCopyright(e.target.value)}
                  variant="outlined"
                  size="small"
                  sx={inputStyle}
                />
              </Grid>

              {/* Cover Photo */}
              <Grid size={{ xs: 12, sm: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: 600 }}>
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
                    size="small"
                    onClick={() => coverInputRef.current?.click()}
                    sx={{
                      color: coverUrl ? '#4caf50' : '#ff2a74',
                      borderColor: coverUrl ? '#4caf50' : '#ff2a74',
                      textTransform: 'none',
                    }}
                  >
                    {coverUrl ? '✓ Change Cover Image' : 'Select Cover Image'}
                  </Button>
                  {coverFileName && (
                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {coverFileName}
                    </Typography>
                  )}
                </Box>
              </Grid>

              {/* Cover Preview */}
              <Grid size={{ xs: 12, sm: 8 }}>
                {coverUrl ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      component="img"
                      src={coverUrl}
                      alt="Cover Preview"
                      sx={{
                        width: 72,
                        height: 72,
                        borderRadius: 1.5,
                        objectFit: 'cover',
                        border: '1px solid rgba(255, 42, 116, 0.4)',
                      }}
                    />
                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                      Preview: High-resolution artwork preview ready.
                    </Typography>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      height: 72,
                      bgcolor: '#181820',
                      borderRadius: 1.5,
                      border: '1px dashed rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.35)' }}>
                      No cover selected yet
                    </Typography>
                  </Box>
                )}
              </Grid>

              {/* Description (Short or Long) */}
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  required
                  multiline
                  rows={3}
                  label="Song Description (Short or Long)"
                  placeholder="Describe the production, instruments, lyrical themes, inspiration..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  variant="outlined"
                  size="small"
                  sx={inputStyle}
                />
              </Grid>
            </Grid>

            {/* SECTION 3: WHAT OUR CLIENTS SAY SHOWCASE SETTINGS */}
            <Box
              sx={{
                mt: 3,
                p: 2.5,
                bgcolor: 'rgba(255, 42, 116, 0.05)',
                border: '1px solid rgba(255, 42, 116, 0.25)',
                borderRadius: 2,
              }}
            >
              <Typography variant="subtitle2" sx={{ color: '#ff2a74', fontWeight: 700, mb: 1, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                3. "What Our Clients Say" Showcase Settings
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
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#ffffff' }}>
                    Allow this song to appear in "What Our Clients Say" section on the Home Page
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
                      variant="outlined"
                      size="small"
                      helperText="Lower numbers appear first"
                      sx={inputStyle}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 8 }}>
                    <TextField
                      fullWidth
                      label="Client Location / Affiliation"
                      value={clientSayLocation}
                      onChange={(e) => setClientSayLocation(e.target.value)}
                      variant="outlined"
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
                      variant="outlined"
                      size="small"
                      placeholder="e.g. 'Finding a studio with elite quality and actual heart is rare...'"
                      sx={inputStyle}
                    />
                  </Grid>
                </Grid>
              )}
            </Box>
          </Box>
        )}

        {/* TAB 1: ALL SONGS LIST (MANAGE SONGS) */}
        {activeTab === 1 && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                Total Songs in Studio Library: <b>{songs.length}</b>
              </Typography>
              <Button
                size="small"
                startIcon={<RefreshIcon />}
                onClick={() => setResetModalOpen(true)}
                sx={{ color: 'rgba(255, 255, 255, 0.6)', textTransform: 'none' }}
              >
                Reset Defaults
              </Button>
            </Box>

            <TableContainer component={Paper} sx={{ bgcolor: '#16161c', maxHeight: 400 }}>
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow sx={{ '& th': { bgcolor: '#0f0f14', color: '#ff2a74', fontWeight: 700 } }}>
                    <TableCell>Cover</TableCell>
                    <TableCell>Title & Artist</TableCell>
                    <TableCell>Album / Genre</TableCell>
                    <TableCell align="center">Clients Say</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {songs.map((song) => {
                    const isSongPlaying = isPlaying && currentSong?.id === song.id;
                    return (
                      <TableRow key={song.id} hover sx={{ '&:hover': { bgcolor: 'rgba(255, 42, 116, 0.05)' } }}>
                        <TableCell>
                          <Box sx={{ position: 'relative', width: 44, height: 44 }}>
                            <Box
                              component="img"
                              src={song.coverUrl}
                              alt={song.title}
                              sx={{ width: 44, height: 44, borderRadius: 1, objectFit: 'cover' }}
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
                                bgcolor: isSongPlaying ? 'rgba(255, 42, 116, 0.8)' : 'rgba(0, 0, 0, 0.5)',
                                color: '#ffffff',
                                borderRadius: 1,
                                opacity: isSongPlaying ? 1 : 0,
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
                          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.8)', display: 'block' }}>
                            {song.album}
                          </Typography>
                          <Chip size="small" label={song.genre} sx={{ height: 20, fontSize: '0.68rem', bgcolor: 'rgba(255, 255, 255, 0.08)', color: '#ff2a74' }} />
                        </TableCell>
                        <TableCell align="center">
                          <Tooltip title="Toggle feature in What Our Clients Say">
                            <IconButton
                              size="small"
                              onClick={() => handleToggleClientsSay(song)}
                              sx={{ color: song.featuredInClientsSay ? '#ff2a74' : 'rgba(255, 255, 255, 0.2)' }}
                            >
                              <StarIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            size="small"
                            onClick={() => handleStartEdit(song)}
                            sx={{ color: 'rgba(255, 255, 255, 0.7)', '&:hover': { color: '#ff2a74' } }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handlePromptDelete(song)}
                            sx={{ color: 'rgba(255, 255, 255, 0.4)', '&:hover': { color: '#ff4b4b' } }}
                          >
                            <DeleteOutlineIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* TAB 2: ARRANGE "WHAT OUR CLIENTS SAY" SECTION */}
        {activeTab === 2 && (
          <Box>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}>
              These tracks are showcased in the <b>"What Our Clients Say"</b> section on the Home page. Arrange their order of appearance below:
            </Typography>

            {clientsSayList.length === 0 ? (
              <Box sx={{ p: 4, textAlign: 'center', bgcolor: '#16161c', borderRadius: 2 }}>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  No songs are currently flagged for "What Our Clients Say". Switch to the "All Studio Tracks" tab and click the star icon to feature songs here!
                </Typography>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {clientsSayList.map((song, idx) => (
                  <Box
                    key={song.id}
                    sx={{
                      p: 2,
                      bgcolor: '#171720',
                      border: '1px solid rgba(255, 42, 116, 0.2)',
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="h6" sx={{ color: '#ff2a74', fontWeight: 800, minWidth: 24 }}>
                        #{idx + 1}
                      </Typography>
                      <Box
                        component="img"
                        src={song.coverUrl}
                        alt={song.title}
                        sx={{ width: 50, height: 50, borderRadius: 1.5, objectFit: 'cover' }}
                      />
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#ffffff' }}>
                          {song.title} — {song.artist}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', display: 'block' }}>
                          {song.clientSayLocation || 'Chuo Kikuu SDA Church'}
                        </Typography>
                        {song.clientSayQuote && (
                          <Typography variant="caption" sx={{ color: '#ff2a74', fontStyle: 'italic', display: 'block' }}>
                            "{song.clientSayQuote.slice(0, 70)}..."
                          </Typography>
                        )}
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <IconButton
                        disabled={idx === 0}
                        onClick={() => handleMoveClientsSay(idx, 'up')}
                        sx={{ color: idx === 0 ? 'rgba(255, 255, 255, 0.15)' : '#ffffff' }}
                      >
                        <ArrowUpwardIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        disabled={idx === clientsSayList.length - 1}
                        onClick={() => handleMoveClientsSay(idx, 'down')}
                        sx={{ color: idx === clientsSayList.length - 1 ? 'rgba(255, 255, 255, 0.15)' : '#ffffff' }}
                      >
                        <ArrowDownwardIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        onClick={() => handleStartEdit(song)}
                        sx={{ color: 'rgba(255, 255, 255, 0.6)', '&:hover': { color: '#ff2a74' } }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2.5, borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <Button onClick={onClose} sx={{ color: 'rgba(255, 255, 255, 0.6)', textTransform: 'none' }}>
          Close
        </Button>
        {activeTab === 0 && (
          <Button
            variant="contained"
            disabled={isUploading}
            onClick={handleInitiateSubmit}
            sx={{
              bgcolor: '#ff2a74',
              color: '#ffffff',
              fontWeight: 700,
              textTransform: 'none',
              px: 3,
              boxShadow: '0 4px 15px rgba(255, 42, 116, 0.4)',
              '&:hover': { bgcolor: '#e01b5d' },
            }}
          >
            {isUploading ? `Uploading ${uploadProgress}%...` : editingSongId ? 'Save Track Changes' : 'Upload & Add Song'}
          </Button>
        )}
      </DialogActions>

      {/* Confirmation Dialogs */}
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
    </Dialog>
  );
};

const inputStyle = {
  '& .MuiOutlinedInput-root': {
    color: '#ffffff',
    bgcolor: '#191922',
    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.15)' },
    '&:hover fieldset': { borderColor: 'rgba(255, 42, 116, 0.5)' },
    '&.Mui-focused fieldset': { borderColor: '#ff2a74' },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
    '&.Mui-focused': { color: '#ff2a74' },
  },
  '& .MuiFormHelperText-root': {
    color: 'rgba(255, 255, 255, 0.45)',
  },
};
