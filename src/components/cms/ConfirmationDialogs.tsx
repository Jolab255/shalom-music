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
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
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
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#ffffff', noWrap: true }}>
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
