import { useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardMedia,
  Chip,
  Container,
  Divider,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useBooks, findBook } from '../hooks/useBooks.js';
import { formatPrice, buildBalePurchaseUrl } from '../config.js';

// Detail rows for the metadata table (ISBN / pages / price).
function SpecRow({ label, value }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1.25 }}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        {value}
      </Typography>
    </Box>
  );
}

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { books, loading, error } = useBooks();

  const book = useMemo(() => findBook(books, id), [books, id]);

  // Bale deep link — recomputed when the matched book changes.
  // Build here (not inside JSX) so the anchor + button share one source.
  const baleUrl = book ? buildBalePurchaseUrl(book) : '#';

  // If the catalog finished loading and this id isn't in it → not found.
  const notFound = !loading && !error && books.length > 0 && !book;

  // Scroll to top whenever the route param changes (deep-link friendliness).
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (loading) return <BookDetailSkeleton />;

  if (notFound) {
    return (
      <Container maxWidth="md" sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ mb: 1 }}>
          کتاب موردنظر یافت نشد.
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          ممکن است این عنوان دیگر در دسترس باشد.
        </Typography>
        <Button variant="contained" color="secondary" onClick={() => navigate('/books')}>
          بازگشت به فهرست
        </Button>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ mb: 1 }}>
          بارگذاری ناموفق بود.
        </Typography>
        <Button variant="contained" color="secondary" onClick={() => navigate('/books')}>
          بازگشت به فهرست
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Button
        component={RouterLink}
        to="/books"
        color="inherit"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3, color: 'text.secondary' }}
      >
        بازگشت به فهرست
      </Button>

      <Grid container spacing={{ xs: 3, md: 6 }}>
        {/* Cover */}
        <Grid item xs={12} sm={5} md={4}>
          <Card elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <CardMedia
              component="img"
              image={book.coverUrl}
              alt={book.title}
              sx={{ width: '100%', aspectRatio: '2 / 3', objectFit: 'cover', bgcolor: 'grey.100' }}
            />
          </Card>
        </Grid>

        {/* Details + CTA */}
        <Grid item xs={12} sm={7} md={8}>
          <Stack spacing={2}>
            <Box>
              <Chip label={`کد: ${book.id}`} size="small" sx={{ mb: 1.5 }} />
              <Typography variant="h4" component="h1" sx={{ fontWeight: 800, lineHeight: 1.3 }}>
                {book.title}
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mt: 0.5 }}>
                {book.author}
              </Typography>
            </Box>

            <Divider />

            <Typography variant="body1" sx={{ lineHeight: 1.9, color: 'text.primary' }}>
              {book.description}
            </Typography>

            <Paper variant="outlined" sx={{ p: 2, mt: 1 }}>
              <SpecRow label="شناسه (ISBN)" value={book.isbn} />
              <Divider />
              <SpecRow label="تعداد صفحات" value={`${book.pages} صفحه`} />
              <Divider />
              <SpecRow label="قیمت" value={formatPrice(book.price)} />
            </Paper>

            {/* Call to action — Bale messenger */}
            <Box sx={{ pt: 1 }}>
              <Button
                href={baleUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                size="large"
                fullWidth
                startIcon={<ShoppingBagIcon />}
                endIcon={<OpenInNewIcon />}
                sx={{
                  py: 1.5,
                  fontSize: '1.05rem',
                  bgcolor: 'brand.baleGreen',
                  color: 'text.primary',
                  '&:hover': { bgcolor: '#2bc486' },
                }}
              >
                خرید از طریق بله
              </Button>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 1 }}>
                سفارش شما از طریق پیام‌رسان بله و با پیام آماده‌شده ثبت می‌شود.
              </Typography>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

function BookDetailSkeleton() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Grid container spacing={{ xs: 3, md: 6 }}>
        <Grid item xs={12} sm={5} md={4}>
          <Skeleton variant="rectangular" sx={{ borderRadius: 2, aspectRatio: '2 / 3' }} />
        </Grid>
        <Grid item xs={12} sm={7} md={8}>
          <Stack spacing={2}>
            <Skeleton variant="rectangular" height={48} width="80%" />
            <Skeleton variant="rectangular" height={24} width="40%" />
            <Skeleton variant="rectangular" height={80} />
            <Skeleton variant="rectangular" height={120} />
            <Skeleton variant="rectangular" height={56} />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
