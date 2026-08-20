// MUI theme for نشر مکتب ابوتراب
// RTL-aware, Vazirmatn font, brand palette: black / white + deep teal accent.
import { createTheme } from '@mui/material/styles';

// Brand palette
const palette = {
  black: '#111111',       // primary text / surfaces
  white: '#ffffff',
  teal: '#0d9488',        // deep teal (firoozeh) accent
  tealDark: '#0b7066',
  baleGreen: '#34d399',   // Bale brand green — reserved for the buy CTA
  ink: '#1f1f1f',
  muted: '#6b6b6b',
};

// If you prefer to self-host the font manually instead of @fontsource,
// uncomment this block and drop Vazirmatn.woff2 into /public/fonts:
/*
import { css } from '@emotion/react';
css`
  @font-face {
    font-family: 'Vazirmatn';
    src: url('/fonts/Vazirmatn-Regular.woff2') format('woff2');
    font-weight: 400;
    font-display: swap;
  }
`;
*/

const theme = createTheme({
  direction: 'rtl', // global RTL — paired with the RTL Emotion cache in main.jsx
  typography: {
    fontFamily: '"Vazirmatn", "Tahoma", "Segoe UI", sans-serif',
    h1: { fontWeight: 800 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { fontWeight: 600 },
    body1: { fontSize: '1rem', lineHeight: 1.8 },
  },
  palette: {
    mode: 'light',
    primary: {
      main: palette.black,
      contrastText: palette.white,
    },
    secondary: {
      main: palette.teal,
      contrastText: palette.white,
    },
    background: {
      default: palette.white,
      paper: palette.white,
    },
    text: {
      primary: palette.ink,
      secondary: palette.muted,
    },
    // Custom brand tokens exposed via theme.palette.brand
    brand: {
      teal: palette.teal,
      tealDark: palette.tealDark,
      baleGreen: palette.baleGreen,
      black: palette.black,
    },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        // Ensure the whole document is RTL + Vazirmatn, and Persian
        // digits/ligatures render correctly.
        html: { direction: 'rtl' },
        body: {
          fontFamily: '"Vazirmatn", "Tahoma", sans-serif',
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { textTransform: 'none', borderRadius: 999 },
      },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0, color: 'inherit' },
    },
  },
});

export default theme;
