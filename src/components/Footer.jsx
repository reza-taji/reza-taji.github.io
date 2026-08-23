import { Box, Container, Typography, Link, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PUBLISHER } from '../config.js';
import LocaleLink from './LocaleLink.jsx';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: 4,
        bgcolor: 'text.primary',
        color: 'background.paper',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            textAlign: { xs: 'center', md: 'inherit' },
          }}
        >
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {PUBLISHER.name}
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.7 }}>
              {t('footer.rights')}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link component={LocaleLink} to="/" color="inherit" underline="hover" variant="body2">
              {t('nav.home')}
            </Link>
            <Link component={LocaleLink} to="/books" color="inherit" underline="hover" variant="body2">
              {t('nav.catalog')}
            </Link>
            <Link
              href={PUBLISHER.baleChannelUrl}
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              underline="hover"
              variant="body2"
            >
              {t('footer.channel')}
            </Link>
          </Box>
        </Box>

        <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.15)' }} />

        <Typography variant="caption" sx={{ opacity: 0.6, display: 'block', textAlign: 'center' }}>
          {t('common.copyright', { year: new Date().getFullYear(), name: PUBLISHER.name })}
        </Typography>
      </Container>
    </Box>
  );
}
