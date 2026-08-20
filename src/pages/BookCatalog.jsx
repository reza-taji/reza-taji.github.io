import { Container, Grid, Typography, Box, Stack, Alert } from '@mui/material';
import { useBooks } from '../hooks/useBooks.js';
import BookCard from '../components/BookCard.jsx';

export default function BookCatalog() {
  const { books, loading, error } = useBooks();

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
      <Stack spacing={1} sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          فهرست کتاب‌ها
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {loading ? 'در حال بارگذاری…' : `${books.length} عنوان`}
        </Typography>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          بارگذاری فهرست ناموفق بود. لطفاً دوباره تلاش کنید.
        </Alert>
      )}

      <Grid container spacing={3}>
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Grid item xs={12} sm={6} md={4} key={`skel-${i}`}>
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
              </Grid>
            ))
          : books.map((book) => (
              <Grid item xs={12} sm={6} md={4} key={book.id}>
                <BookCard book={book} />
              </Grid>
            ))}
      </Grid>
    </Container>
  );
}
