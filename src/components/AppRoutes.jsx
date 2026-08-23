import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { LocaleGuard } from '../hooks/useLocale.js';
import { isSupportedLang } from '../i18n/index.js';
import HomePage from '../pages/HomePage.jsx';
import BookCatalog from '../pages/BookCatalog.jsx';
import BookDetail from '../pages/BookDetail.jsx';
import Contact from '../pages/Contact.jsx';

// Redirects an unknown sub-path of a locale (e.g. /ar/foo) to that locale's
// home, so broken deep links fall back gracefully instead of 404-ing.
function LocaleRedirect() {
  const { lang } = useParams();
  const target = lang && isSupportedLang(lang) ? `/${lang}` : '/';
  return <Navigate to={target} replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Persian (default) at the root — clean URLs, no /fa prefix. */}
      <Route path="/">
        <Route index element={<HomePage />} />
        <Route path="books" element={<BookCatalog />} />
        <Route path="books/:id" element={<BookDetail />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>

      {/* Prefixed locales: /ar/*, /ur/*. The guard redirects unsupported
          single-segments (e.g. /xyz) to the Persian root. React Router ranks
          the dynamic :lang below static segments, so "/books" still resolves
          to the Persian group above and "/ar/books" resolves here. */}
      <Route path=":lang" element={<LocaleGuard />}>
        <Route index element={<HomePage />} />
        <Route path="books" element={<BookCatalog />} />
        <Route path="books/:id" element={<BookDetail />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<LocaleRedirect />} />
      </Route>
    </Routes>
  );
}
