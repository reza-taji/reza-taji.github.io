import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import { formatPrice } from '../config.js';

// Reusable book card — used by the HomePage preview and the catalog grid.
// The whole card is a link to /books/:id for easy tapping on mobile.
export default function BookCard({ book }) {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
      }}
    >
      <CardActionArea
        component={RouterLink}
        to={`/books/${book.id}`}
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <CardMedia
          component="img"
          image={book.coverUrl}
          alt={book.title}
          sx={{
            height: 320,
            width: '100%',
            objectFit: 'cover',
            bgcolor: 'grey.100',
          }}
        />
        <CardContent sx={{ flex: 1, p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="h6" component="h3" sx={{ fontWeight: 700, lineHeight: 1.4 }}>
            {book.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {book.author}
          </Typography>
          <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Chip label={formatPrice(book.price)} color="secondary" size="small" sx={{ fontWeight: 600 }} />
            <Typography variant="caption" color="text.secondary">
              {book.pages} صفحه
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
