import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

// Vazirmatn font weights (self-hosted via @fontsource)
import '@fontsource/vazirmatn/400.css';
import '@fontsource/vazirmatn/500.css';
import '@fontsource/vazirmatn/600.css';
import '@fontsource/vazirmatn/700.css';
import '@fontsource/vazirmatn/800.css';
// Nastaliq for Urdu. @font-face only declares the font; the woff2 is fetched
// lazily by the browser only when Urdu is active (body font-family references it).
import '@fontsource/noto-nastaliq-urdu/400.css';
import '@fontsource/noto-nastaliq-urdu/600.css';

// i18n init (side-effect import — registers fa/ar/ur resources).
import './i18n/index.js';

import theme from './theme.js';
import App from './App.jsx';

// RTL Emotion cache: runs stylis prefixer + rtl plugin so every Emotion
// style block is automatically mirrored for right-to-left layout.
const rtlCache = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
  // Emotion prepends <style> to <head>; insertionPoint keeps MUI styles
  // after the Vazirmatn <link> so font specificity wins.
  insertionPoint: document.querySelector('#emotion-insertion-point') || undefined,
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </CacheProvider>
  </React.StrictMode>,
);
