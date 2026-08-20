import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Layout from './components/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import BookCatalog from './pages/BookCatalog.jsx';
import BookDetail from './pages/BookDetail.jsx';

function Contact() {
  return <Box sx={{ p: 4 }}>تماس با ما</Box>;
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books" element={<BookCatalog />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Layout>
  );
}
