import { Link as RouterLink } from 'react-router-dom';
import { useLocale, buildLocalePath } from '../hooks/useLocale.js';

// RouterLink wrapper that prefixes `to` with the active locale (e.g.
// "/books" -> "/ar/books"). Use as the `component` prop on MUI elements:
//   <Button component={LocaleLink} to="/books"> ... </Button>
// `to` stays locale-agnostic in JSX; the prefix is applied at render time.
export default function LocaleLink({ to, ...props }) {
  const { lang } = useLocale();
  return <RouterLink to={buildLocalePath(to, lang)} {...props} />;
}
