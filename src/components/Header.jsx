import { useState } from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Container,
  Divider,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { PUBLISHER } from '../config.js';

// Nav items — single source for both desktop bar and mobile drawer.
const NAV_ITEMS = [
  { label: 'خانه', to: '/' },
  { label: 'فهرست کتاب‌ها', to: '/books' },
  { label: 'تماس', to: '/contact' },
];

function NavLinks({ onNavigate }) {
  const { pathname } = useLocation();
  return (
    <>
      {NAV_ITEMS.map((item) => {
        const active = pathname === item.to;
        return (
          <Button
            key={item.to}
            component={RouterLink}
            to={item.to}
            onClick={onNavigate}
            sx={{
              minWidth: 'auto',
              color: active ? 'primary.main' : 'text.primary',
              fontWeight: active ? 700 : 500,
              position: 'relative',
              '&::after': active
                ? {
                    content: '""',
                    position: 'absolute',
                    bottom: 2,
                    insetInlineStart: '12px',
                    insetInlineEnd: '12px',
                    height: 2,
                    bgcolor: 'secondary.main',
                    borderRadius: 2,
                  }
                : {},
            }}
          >
            {item.label}
          </Button>
        );
      })}
    </>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggle = (open) => () => setMobileOpen(open);

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 2, minHeight: { xs: 64, md: 72 } }}>
          {/* Mobile menu trigger (right side in RTL) */}
          <IconButton
            onClick={toggle(true)}
            sx={{ display: { md: 'none' } }}
            aria-label="باز کردن منو"
          >
            <MenuIcon />
          </IconButton>

          {/* Logo + publisher name */}
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              textDecoration: 'none',
              color: 'inherit',
              mr: 'auto',
            }}
          >
            <Box
              component="img"
              src={PUBLISHER.logoUrl}
              alt={PUBLISHER.name}
              sx={{ height: 40, width: 40, objectFit: 'contain' }}
            />
            <Typography
              variant="h6"
              component="span"
              sx={{ fontWeight: 700, display: { xs: 'none', sm: 'inline' } }}
            >
              {PUBLISHER.name}
            </Typography>
          </Box>

          {/* Desktop nav */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <NavLinks />
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={toggle(false)}
        PaperProps={{ sx: { width: 280, p: 2 } }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
          <IconButton onClick={toggle(false)} aria-label="بستن منو">
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 1 }} />
        <NavLinks onNavigate={toggle(false)} />
      </Drawer>
    </AppBar>
  );
}
