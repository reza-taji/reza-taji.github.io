import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fa from './locales/fa.json';
import ar from './locales/ar.json';
import ur from './locales/ur.json';

// Supported languages — all RTL, so the existing stylis-plugin-rtl setup
// covers them. `dir` is kept for completeness/future LTR additions.
export const LANGS = [
  { code: 'fa', label: 'فارسی', dir: 'rtl' },
  { code: 'ar', label: 'العربية', dir: 'rtl' },
  { code: 'ur', label: 'اردو', dir: 'rtl' },
];

export const DEFAULT_LANG = 'fa';

export const isSupportedLang = (code) => LANGS.some((l) => l.code === code);

// Persian is the default and lives at the site root (no /fa prefix);
// ar/ur are prefixed. This keeps existing Persian URLs stable.
export const PREFIXED_LANGS = ['ar', 'ur'];

i18n.use(initReactI18next).init({
  resources: {
    fa: { translation: fa },
    ar: { translation: ar },
    ur: { translation: ur },
  },
  lng: DEFAULT_LANG,
  fallbackLng: DEFAULT_LANG,
  interpolation: { escapeValue: false },
});

export default i18n;
