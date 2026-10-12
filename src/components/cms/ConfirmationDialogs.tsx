import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  Alert,
  Chip,
  LinearProgress,
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import type { Song } from '../../types/song';

interface ConfirmDeleteDialogProps {
  open: boolean;
  song: Song | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
  open,
  song,
  onConfirm,
  onCancel,
}) => {
  if (!song) return null;

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: '#14141a',
          color: '#ffffff',
          borderRadius: 0,
          border: '1px solid rgba(255, 75, 75, 0.4)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.95), 0 0 30px rgba(255, 75, 75, 0.2)',
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pb: 1 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 0,
            bgcolor: 'rgba(255, 75, 75, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ff4b4b',
          }}
        >
          <WarningAmberIcon />
        </Box>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: '"Space Grotesk", sans-serif', color: '#ff4b4b' }}>
            Delete Track
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.55)' }}>
            Destructive Action Confirmation
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            p: 1.5,
            mb: 2,
            bgcolor: '#191922',
            borderRadius: 0,
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <Box
            component="img"
            src={song.coverUrl}
            alt={song.title}
            sx={{ width: 56, height: 56, borderRadius: 0, objectFit: 'cover' }}
          />
          <Box sx={{ minWidth: 0 }}>
            <Typography noWrap variant="subtitle2" sx={{ fontWeight: 700, color: '#ffffff' }}>
              {song.title}
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', display: 'block' }}>
              {song.artist} • {song.album}
            </Typography>
            {song.featuredInClientsSay && (
              <Chip size="small" label="Featured in Showcase" sx={{ mt: 0.5, height: 18, fontSize: '0.65rem', bgcolor: 'rgba(255, 42, 116, 0.2)', color: '#ff2a74', borderRadius: 0 }} />
            )}
          </Box>
        </Box>

        <Alert severity="error" sx={{ borderRadius: 0, bgcolor: 'rgba(211, 47, 47, 0.15)', color: '#ff8a80', border: '1px solid #d32f2f', fontSize: '0.82rem' }}>
          Are you sure you want to permanently delete <b>"{song.title}"</b>? This will erase the track from both the Shalom Music Library and Client Showcase.
        </Alert>
      </DialogContent>

      <DialogActions sx={{ p: 2.5, borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <Button onClick={onCancel} sx={{ color: 'rgba(255, 255, 255, 0.65)', textTransform: 'none', borderRadius: 0 }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={onConfirm}
          startIcon={<DeleteForeverIcon />}
          sx={{
            bgcolor: '#d32f2f',
            color: '#ffffff',
            fontWeight: 700,
            borderRadius: 0,
            textTransform: 'none',
            '&:hover': { bgcolor: '#b71c1c' },
          }}
        >
          Yes, Delete Track
        </Button>
      </DialogActions>
    </Dialog>
  );
};

interface ConfirmEditDialogProps {
  open: boolean;
  songTitle: string;
  artist: string;
  album: string;
  genre: string;
  featuredInClientsSay: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const ConfirmEditDialog: React.FC<ConfirmEditDialogProps> = ({
  open,
  songTitle,
  artist,
  album,
  genre,
  featuredInClientsSay,
  onConfirm,
  onCancel,
  isLoading,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: '#14141a',
          color: '#ffffff',
          borderRadius: 0,
          border: '1px solid rgba(255, 42, 116, 0.4)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.95), 0 0 30px rgba(255, 42, 116, 0.2)',
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pb: 1 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 0,
            bgcolor: 'rgba(255, 42, 116, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ff2a74',
          }}
        >
          <CheckCircleOutlineIcon />
        </Box>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: '"Space Grotesk", sans-serif', color: '#ffffff' }}>
            Confirm Changes
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.55)' }}>
            Update Song Metadata
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
          You are about to save changes to <b>"{songTitle}"</b>:
        </Typography>

        <Box sx={{ p: 2, bgcolor: '#191922', borderRadius: 0, border: '1px solid rgba(255, 255, 255, 0.08)', mb: 2 }}>
          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)', display: 'block' }}>
            Artist: <b style={{ color: '#ffffff' }}>{artist}</b>
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)', display: 'block', mt: 0.5 }}>
            EP / Album: <b style={{ color: '#ffffff' }}>{album}</b>
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)', display: 'block', mt: 0.5 }}>
            Genre: <b style={{ color: '#ff2a74' }}>{genre}</b>
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)', display: 'block', mt: 0.5 }}>
            Client Showcase: <b style={{ color: featuredInClientsSay ? '#4caf50' : '#888' }}>{featuredInClientsSay ? 'Featured on Home Page' : 'Library Only'}</b>
          </Typography>
        </Box>

        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          These modifications will instantly reflect across the Shalom Music Library and Client Showcase.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ p: 2.5, borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <Button onClick={onCancel} disabled={isLoading} sx={{ color: 'rgba(255, 255, 255, 0.65)', textTransform: 'none', borderRadius: 0 }}>
          Back to Editing
        </Button>
        <Button
          variant="contained"
          onClick={onConfirm}
          disabled={isLoading}
          sx={{
            bgcolor: '#ff2a74',
            color: '#ffffff',
            fontWeight: 700,
            borderRadius: 0,
            textTransform: 'none',
            '&:hover': { bgcolor: '#e01b5d' },
          }}
        >
          {isLoading ? 'Saving...' : 'Confirm & Save Changes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

interface ConfirmResetDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmResetDialog: React.FC<ConfirmResetDialogProps> = ({
  open,
  onConfirm,
  onCancel,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: '#14141a',
          color: '#ffffff',
          borderRadius: 0,
          border: '1px solid rgba(255, 179, 0, 0.4)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.95), 0 0 30px rgba(255, 179, 0, 0.2)',
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pb: 1 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 0,
            bgcolor: 'rgba(255, 179, 0, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffb300',
          }}
        >
          <RestartAltIcon />
        </Box>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: '"Space Grotesk", sans-serif', color: '#ffb300' }}>
            Reset Library
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.55)' }}>
            Restore Default Studio Tracks
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        <Alert severity="warning" sx={{ borderRadius: 0, bgcolor: 'rgba(255, 179, 0, 0.12)', color: '#ffe082', border: '1px solid #ffb300', fontSize: '0.82rem' }}>
          Resetting will restore the default Shalom Music seed tracks. Any custom tracks you uploaded will be replaced. Are you sure you wish to continue?
        </Alert>
      </DialogContent>

      <DialogActions sx={{ p: 2.5, borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <Button onClick={onCancel} sx={{ color: 'rgba(255, 255, 255, 0.65)', textTransform: 'none', borderRadius: 0 }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={onConfirm}
          sx={{
            bgcolor: '#ffb300',
            color: '#000000',
            fontWeight: 800,
            borderRadius: 0,
            textTransform: 'none',
            '&:hover': { bgcolor: '#ffa000' },
          }}
        >
          Reset to Defaults
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export interface SuccessPopupDialogProps {
  open: boolean;
  title?: string;
  message: string;
  song?: {
    title?: string;
    artist?: string;
    album?: string;
    coverUrl?: string;
    duration?: number;
    fileSize?: number;
    fileFormat?: string;
    featuredInClientsSay?: boolean;
  } | null;
  onClose: () => void;
  actionText?: string;
}

export const SuccessPopupDialog: React.FC<SuccessPopupDialogProps> = ({
  open,
  title = 'Success!',
  message,
  song,
  onClose,
  actionText = 'Great, Continue',
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: '#14141a',
          color: '#ffffff',
          borderRadius: 0,
          border: '1px solid rgba(16, 185, 129, 0.45)',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.95), 0 0 35px rgba(16, 185, 129, 0.25)',
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 2, pt: 3, pb: 1 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            bgcolor: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#10b981',
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)',
            flexShrink: 0,
          }}
        >
          <CheckCircleOutlineIcon sx={{ fontSize: 30 }} />
        </Box>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: '"Space Grotesk", sans-serif', color: '#10b981', lineHeight: 1.2 }}>
            {title}
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.55)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Action Confirmed & Synced
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 1.5, pb: 2 }}>
        <Typography
          variant="body1"
          sx={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '0.98rem',
            lineHeight: 1.6,
            mb: song ? 2.5 : 1,
          }}
        >
          {message}
        </Typography>

        {song && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              p: 2,
              bgcolor: '#191922',
              borderRadius: 0,
              border: '1px solid rgba(16, 185, 129, 0.2)',
              boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.5)',
            }}
          >
            {song.coverUrl ? (
              <Box
                component="img"
                src={song.coverUrl}
                alt={song.title || 'Track cover'}
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: 0,
                  objectFit: 'cover',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  flexShrink: 0,
                }}
              />
            ) : (
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  bgcolor: '#111116',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ff2a74',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  flexShrink: 0,
                }}
              >
                <MusicNoteIcon sx={{ fontSize: 32 }} />
              </Box>
            )}

            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography noWrap variant="subtitle1" sx={{ fontWeight: 800, color: '#ffffff', fontFamily: '"Space Grotesk", sans-serif' }}>
                {song.title || 'Untitled Track'}
              </Typography>
              <Typography noWrap variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.65)' }}>
                {song.artist || 'Unknown Artist'}{song.album ? ` • ${song.album}` : ''}
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                {song.fileSize ? (
                  <Chip
                    size="small"
                    label={`${(song.fileSize / (1024 * 1024)).toFixed(2)} MB`}
                    sx={{ height: 20, fontSize: '0.68rem', bgcolor: 'rgba(255, 255, 255, 0.08)', color: '#ffffff', borderRadius: 0 }}
                  />
                ) : null}
                {song.duration ? (
                  <Chip
                    size="small"
                    label={`${Math.floor(song.duration / 60)}:${(song.duration % 60).toString().padStart(2, '0')}`}
                    sx={{ height: 20, fontSize: '0.68rem', bgcolor: 'rgba(255, 255, 255, 0.08)', color: '#ffffff', borderRadius: 0 }}
                  />
                ) : null}
                {song.featuredInClientsSay && (
                  <Chip
                    size="small"
                    label="Client Showcase"
                    sx={{ height: 20, fontSize: '0.68rem', bgcolor: 'rgba(255, 42, 116, 0.2)', color: '#ff2a74', borderRadius: 0, fontWeight: 700 }}
                  />
                )}
              </Box>
            </Box>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2.5, borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <Button
          fullWidth
          variant="contained"
          onClick={onClose}
          sx={{
            bgcolor: '#10b981',
            color: '#000000',
            fontWeight: 800,
            borderRadius: 0,
            py: 1.2,
            fontFamily: '"Space Grotesk", sans-serif',
            letterSpacing: '0.04em',
            textTransform: 'none',
            fontSize: '0.95rem',
            '&:hover': { bgcolor: '#059669', color: '#ffffff' },
          }}
        >
          {actionText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export interface UploadProgressDialogProps {
  open: boolean;
  progress: number;
  statusText: string;
  fileName?: string;
  fileSize?: number;
}

export const UploadProgressDialog: React.FC<UploadProgressDialogProps> = ({
  open,
  progress,
  statusText,
  fileName,
  fileSize,
}) => {
  return (
    <Dialog
      open={open}
      disableEscapeKeyDown
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: '#14141a',
          color: '#ffffff',
          borderRadius: 0,
          border: '1px solid rgba(255, 42, 116, 0.4)',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.95), 0 0 35px rgba(255, 42, 116, 0.25)',
          p: 1,
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 2, pb: 1, pt: 2 }}>
        <Box
          sx={{
            width: 46,
            height: 46,
            borderRadius: 0,
            bgcolor: 'rgba(255, 42, 116, 0.15)',
            border: '1px solid rgba(255, 42, 116, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ff2a74',
            animation: progress < 100 ? 'pulse 1.5s infinite ease-in-out' : 'none',
            '@keyframes pulse': {
              '0%': { transform: 'scale(1)', opacity: 0.8 },
              '50%': { transform: 'scale(1.08)', opacity: 1 },
              '100%': { transform: 'scale(1)', opacity: 0.8 },
            },
          }}
        >
          <CloudUploadIcon sx={{ fontSize: 28 }} />
        </Box>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: '"Space Grotesk", sans-serif', color: '#ffffff', lineHeight: 1.2 }}>
            {progress >= 100 ? 'Finalizing Upload...' : 'Uploading Track'}
          </Typography>
          <Typography noWrap variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', display: 'block' }}>
            {fileName ? `${fileName}${fileSize ? ` (${(fileSize / (1024 * 1024)).toFixed(2)} MB)` : ''}` : 'Transferring audio stream'}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 2, pb: 3 }}>
        {/* Large Percentage Readout */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 1.5, mt: 1 }}>
          <Typography variant="h3" sx={{ fontWeight: 900, fontFamily: '"Space Grotesk", sans-serif', color: '#ff2a74', letterSpacing: '-0.02em' }}>
            {progress}%
          </Typography>
          <Typography variant="caption" sx={{ color: progress >= 100 ? '#10b981' : '#00e5ff', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            {progress >= 100 ? 'Complete' : 'Uploading in Progress'}
          </Typography>
        </Box>

        {/* Real Progress Bar */}
        <LinearProgress
          variant="determinate"
          value={Math.min(100, Math.max(0, progress))}
          sx={{
            height: 10,
            borderRadius: 0,
            bgcolor: 'rgba(255, 255, 255, 0.08)',
            mb: 2,
            '& .MuiLinearProgress-bar': {
              background: 'linear-gradient(90deg, #ff2a74 0%, #ff6b9d 50%, #00e5ff 100%)',
              transition: 'transform 0.15s ease-out',
            },
          }}
        />

        {/* Real-time Status Details */}
        <Box sx={{ p: 1.5, bgcolor: '#191922', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 0 }}>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.85)', fontFamily: 'monospace', fontSize: '0.82rem', wordBreak: 'break-all' }}>
            {statusText || `Streaming data: ${progress}%`}
          </Typography>
        </Box>

        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.45)', display: 'block', mt: 1.5, textAlign: 'center', fontSize: '0.72rem' }}>
          Please do not close this window while audio is uploading to the server.
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

