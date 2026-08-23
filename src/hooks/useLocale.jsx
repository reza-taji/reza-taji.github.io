import { createContext, useContext, useEffect, useMemo } from 'react';
import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import i18n, { DEFAULT_LANG, isSupportedLang, PREFIXED_LANGS } from '../i18n/index.js';

const LocaleContext = createContext({ lang: DEFAULT_LANG, dir: 'rtl' });

export function useLocale() {
  return useContext(LocaleContext);
}

// Split a pathname into { lang, rest }. Persian (default) lives at the root
// with no prefix; ar/ur carry a leading segment. `rest` always starts with '/'.
export function parseLocalePath(pathname) {
  const segs = pathname.split('/').filter(Boolean);
  if (segs.length && PREFIXED_LANGS.includes(segs[0])) {
    return { lang: segs[0], rest: '/' + segs.slice(1).join('/') };
  }
  return { lang: DEFAULT_LANG, rest: pathname || '/' };
}

// Localize a locale-agnostic `to` (e.g. "/books/:id", "/") for the given lang.
// Persian keeps the clean root URL; ar/ur get a prefix.
export function buildLocalePath(to, lang = DEFAULT_LANG) {
  const target = to || '/';
  if (lang === DEFAULT_LANG || !PREFIXED_LANGS.includes(lang)) return target;
  if (target === '/') return `/${lang}`;
  return `/${lang}${target}`;
}

// Font family per language. Urdu uses Nastaliq for authentic rendering;
// fa/ar use Vazirmatn (covers both Perso-Arabic scripts well). Applied as an
// inline style on <body>, which overrides the CssBaseline body rule and is
// inherited by every MUI component (none of our components pin a font-family).
const FONT_BY_LANG = {
  fa: '"Vazirmatn", "Tahoma", "Segoe UI", sans-serif',
  ar: '"Vazirmatn", "Tahoma", "Segoe UI", sans-serif',
  ur: '"Noto Nastaliq Urdu", "Vazirmatn", "Tahoma", serif',
};

export function fontFamilyFor(lang) {
  return FONT_BY_LANG[lang] || FONT_BY_LANG.fa;
}

// Top-level provider: derives the active language from the URL pathname (so it
// wraps Layout/Header/Footer too, not just routed pages), syncs i18next +
// <html lang/dir> + body font, and exposes the lang via context.
export function LocaleProvider({ children }) {
  const location = useLocation();
  const parsed = parseLocalePath(location.pathname);
  const effective = isSupportedLang(parsed.lang) ? parsed.lang : DEFAULT_LANG;

  useEffect(() => {
    if (i18n.language !== effective) i18n.changeLanguage(effective);
  }, [effective]);

  useEffect(() => {
    document.documentElement.lang = effective;
    document.documentElement.dir = 'rtl';
    document.body.style.fontFamily = fontFamilyFor(effective);
  }, [effective]);

  const value = useMemo(() => ({ lang: effective, dir: 'rtl' }), [effective]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

// Guard for the prefixed (/:lang) route group: redirect unsupported single-
// segments to the Persian root instead of rendering a bogus locale.
export function LocaleGuard() {
  const { lang } = useParams();
  if (lang && !isSupportedLang(lang)) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
