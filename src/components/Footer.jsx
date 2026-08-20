import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Typography, Link, Divider } from '@mui/material';
import { PUBLISHER } from '../config.js';

export default function Footer() {
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
              تمامی حقوق محفوظ است.
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link component={RouterLink} to="/" color="inherit" underline="hover" variant="body2">
              خانه
            </Link>
            <Link component={RouterLink} to="/books" color="inherit" underline="hover" variant="body2">
              فهرست کتاب‌ها
            </Link>
            <Link
              href={PUBLISHER.baleChannelUrl}
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              underline="hover"
              variant="body2"
            >
              کانال بله
            </Link>
          </Box>
        </Box>

        <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.15)' }} />

        <Typography variant="caption" sx={{ opacity: 0.6, display: 'block', textAlign: 'center' }}>
          © {new Date().getFullYear()} {PUBLISHER.name}
        </Typography>
      </Container>
    </Box>
  );
}
