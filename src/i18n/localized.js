// Resolves a localized book field with graceful fallback.
//
// books.json is currently flat (Persian strings), e.g. { title: "..." }.
// To localize book content later, an editor simply converts a field to an
// object: { title: { fa: "...", ar: "...", ur: "..." } }. This helper picks
// the requested language, falls back to Persian, then to any available
// value, and finally returns the flat string unchanged. So migrating books
// incrementally requires NO code change here.
export function pick(book, field, lang) {
  if (!book) return '';
  const value = book[field];
  if (value == null) return '';
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object') {
    if (value[lang]) return value[lang];
    if (value.fa) return value.fa;
    const first = Object.values(value)[0];
    if (first) return first;
  }
  return '';
}
