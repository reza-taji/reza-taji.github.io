import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useBooks } from '../hooks/useBooks.js';
import { PUBLISHER } from '../config.js';
import BookCard from '../components/BookCard.jsx';

// Home: brand banner + "Latest books" preview (first N entries from catalog).
// Catalog is loaded once and sliced; on a static site "latest" === order in JSON.
const PREVIEW_COUNT = 3;

function Banner() {
  return (
    <Box
      sx={{
        bgcolor: 'text.primary',
        color: 'background.paper',
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={2} sx={{ maxWidth: 640 }}>
          <Typography variant="overline" sx={{ color: 'secondary.main', letterSpacing: 2 }}>
            {PUBLISHER.name}
          </Typography>
          <Typography variant="h2" component="h1" sx={{ fontWeight: 800 }}>
            کتاب‌هایی برای جان و اندیشه
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 400, opacity: 0.85, lineHeight: 1.9 }}>
            مجموعه‌ای از آثار پژوهشی و فرهنگی نشر مکتب ابوتراب. جستجو، مرور و سفارش
            آسان از طریق پیام‌رسان بله.
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              component={RouterLink}
              to="/books"
              startIcon={<ArrowBackIcon />}
            >
              مشاهده فهرست کتاب‌ها
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={RouterLink}
              to="/contact"
              sx={{ color: 'background.paper', borderColor: 'rgba(255,255,255,0.4)' }}
            >
              تماس با ما
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

function LatestPreview() {
  const { books, loading, error } = useBooks();

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Typography variant="h4" component="h2" sx={{ fontWeight: 700 }}>
          آخرین عناوین
        </Typography>
        <Button component={RouterLink} to="/books" color="secondary">
          مشاهده همه
        </Button>
      </Stack>

      {error && (
        <Typography color="error">بارگذاری فهرست ناموفق بود.</Typography>
      )}

      <Grid container spacing={3}>
        {loading
          ? Array.from({ length: PREVIEW_COUNT }).map((_, i) => (
              <Grid item xs={12} sm={6} md={4} key={`skeleton-${i}`}>
                <BookCardSkeleton />
              </Grid>
            ))
          : books
              .slice(0, PREVIEW_COUNT)
              .map((book) => (
                <Grid item xs={12} sm={6} md={4} key={book.id}>
                  <BookCard book={book} />
                </Grid>
              ))}
      </Grid>
    </Container>
  );
}

function BookCardSkeleton() {
  return (
    <Box
      sx={{
        height: 420,
        borderRadius: 2,
        bgcolor: 'grey.100',
        animation: 'pulse 1.5s ease-in-out infinite',
        '@keyframes pulse': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      }}
    />
  );
}

export default function HomePage() {
  return (
    <Box>
      <Banner />
      <LatestPreview />
    </Box>
  );
}
