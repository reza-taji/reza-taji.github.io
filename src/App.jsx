import { Box } from '@mui/material';
import { LocaleProvider } from './hooks/useLocale.js';
import Layout from './components/Layout.jsx';
import AppRoutes from './components/AppRoutes.jsx';

export default function App() {
  return (
    // LocaleProvider wraps the whole tree so the header/footer (which live in
    // Layout, above the Routes) also receive the active language — the
    // language switcher needs it to highlight the current locale.
    <LocaleProvider>
      <Layout>
        <AppRoutes />
      </Layout>
    </LocaleProvider>
  );
}
