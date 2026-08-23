import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  Container,
  Divider,
  Typography,
  Stack,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { PUBLISHER } from '../config.js';
import { useLocale, parseLocalePath } from '../hooks/useLocale.js';
import LocaleLink from './LocaleLink.jsx';
import LanguageSwitcher from './LanguageSwitcher.jsx';

// Nav items — locale-agnostic `to`; LocaleLink applies the language prefix.
// Labels come from the i18n namespace so they translate with the active lang.
const NAV_ITEMS = [
  { key: 'nav.home', to: '/' },
  { key: 'nav.catalog', to: '/books' },
  { key: 'nav.contact', to: '/contact' },
];

function NavLinks({ onNavigate }) {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { rest } = parseLocalePath(pathname); // strip /ar|/ur prefix for matching

  return (
    <>
      {NAV_ITEMS.map((item) => {
        const active = rest === item.to;
        return (
          <Button
            key={item.to}
            component={LocaleLink}
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
            {t(item.key)}
          </Button>
        );
      })}
    </>
  );
}

export default function Header() {
  const { t } = useTranslation();
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
            aria-label={t('aria.menuOpen')}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo + publisher name */}
          <Box
            component={LocaleLink}
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

          {/* Desktop nav + language switcher */}
          <Stack direction="row" spacing={1} alignItems="center" sx={{ display: { xs: 'none', md: 'flex' } }}>
            <NavLinks />
            <LanguageSwitcher />
          </Stack>
        </Toolbar>
      </Container>

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={toggle(false)}
        PaperProps={{ sx: { width: 280, p: 2 } }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="subtitle2">{PUBLISHER.name}</Typography>
          <IconButton onClick={toggle(false)} aria-label={t('aria.menuClose')}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Divider sx={{ mb: 1 }} />
        <Stack spacing={0.5}>
          <NavLinks onNavigate={toggle(false)} />
        </Stack>
        <Divider sx={{ my: 2 }} />
        <LanguageSwitcher onNavigate={toggle(false)} />
      </Drawer>
    </AppBar>
  );
}
