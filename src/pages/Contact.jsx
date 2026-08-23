import { Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

// Placeholder Contact page — wired so the nav/footer link doesn't 404.
// (Rendered inside Layout by App, so no chrome here.) Real contact content
// (address, Bale channel, social) to be added later.
export default function Contact() {
  const { t } = useTranslation();
  return (
    <Container maxWidth="md" sx={{ py: { xs: 6, md: 8 } }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 2 }}>
        {t('nav.contact')}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        —
      </Typography>
    </Container>
  );
}
