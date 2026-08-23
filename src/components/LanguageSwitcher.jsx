import { useLocation, useNavigate } from 'react-router-dom';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { LANGS } from '../i18n/index.js';
import { useLocale, parseLocalePath, buildLocalePath } from '../hooks/useLocale.js';

// Compact fa/ar/ur switcher. Switching navigates to the localized equivalent
// of the current path (e.g. /books/abu-001 -> /ar/books/abu-001), so the
// language change preserves the page the user is on.
export default function LanguageSwitcher({ onNavigate, ...props }) {
  const { lang } = useLocale();
  const navigate = useNavigate();
  const location = useLocation();

  const switchTo = (nextLang) => {
    if (!nextLang || nextLang === lang) return;
    const { rest } = parseLocalePath(location.pathname);
    navigate(buildLocalePath(rest, nextLang));
    if (onNavigate) onNavigate();
  };

  return (
    <ToggleButtonGroup
      value={lang}
      exclusive
      size="small"
      onChange={(_, v) => switchTo(v)}
      aria-label="language"
      sx={{
        bgcolor: 'action.hover',
        borderRadius: 999,
        '& .MuiToggleButtonGroup-grouped': { border: 0, borderRadius: '999px !important', px: 1.25, py: 0.25, fontSize: '0.8rem', fontWeight: 600 },
      }}
      {...props}
    >
      {LANGS.map((l) => (
        <ToggleButton key={l.code} value={l.code}>
          {l.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
