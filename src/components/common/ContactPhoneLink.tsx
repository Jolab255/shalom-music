import React, { useState } from 'react';
import { Link, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

interface ContactPhoneLinkProps {
  phone: string; // e.g. "+255746180419"
  label: string; // e.g. "0746 180 419"
  sx?: any;
}

export const ContactPhoneLink: React.FC<ContactPhoneLinkProps> = ({ phone, label, sx }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Clean phone number for WhatsApp wa.me link: e.g. "255746180419"
  const cleanPhone = phone.replace(/[^\d]/g, '');

  return (
    <>
      <Link
        href={`tel:${phone}`}
        onClick={handleClick}
        color="inherit"
        underline="none"
        sx={{
          cursor: 'pointer',
          ...sx
        }}
      >
        {label}
      </Link>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            sx: {
              bgcolor: '#0c0c0f',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: 0, // Sharp aesthetic matching Shalom Music's style
              mt: 0.5,
              boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
              '& .MuiMenuItem-root': {
                color: 'rgba(255, 255, 255, 0.8)',
                fontFamily: '"Space Grotesk", sans-serif',
                fontSize: '0.85rem',
                py: 1.2,
                px: 2.5,
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: 'rgba(255, 42, 116, 0.1)',
                  color: 'white',
                },
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        <MenuItem
          component="a"
          href={`tel:${phone}`}
          onClick={handleClose}
        >
          <ListItemIcon sx={{ minWidth: '32px !important', color: '#ff2a74' }}>
            <PhoneIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText 
            primary="Direct Voice Call" 
            primaryTypographyProps={{ 
              fontFamily: '"Space Grotesk", sans-serif',
              fontSize: '0.85rem',
              fontWeight: 500
            }} 
          />
        </MenuItem>
        <MenuItem
          component="a"
          href={`https://wa.me/${cleanPhone}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClose}
        >
          <ListItemIcon sx={{ minWidth: '32px !important', color: '#25D366' }}>
            <WhatsAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText 
            primary="Chat on WhatsApp" 
            primaryTypographyProps={{ 
              fontFamily: '"Space Grotesk", sans-serif',
              fontSize: '0.85rem',
              fontWeight: 500
            }} 
          />
        </MenuItem>
      </Menu>
    </>
  );
};
