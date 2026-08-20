import { Box } from '@mui/material';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

// Global layout shell: sticky AppBar + scrollable main + sticky footer.
// `main` grows (flex: 1 0 auto) so the footer always sits at the bottom
// even on short pages like BookDetail.
export default function Layout({ children }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <Header />
      <Box component="main" sx={{ flex: '1 0 auto' }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
}
