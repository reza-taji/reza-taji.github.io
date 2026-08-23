import { useEffect, useState } from 'react';

// Loads the public books catalog. Because the site is a static SPA with no
// backend, the catalog is fetched at runtime from /data/books.json so that
// non-technical editors can update the catalog without rebuilding the app.
// (Vite serves /public at root, so the fetch URL is /data/books.json.)
export function useBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(`${import.meta.env.BASE_URL}data/books.json`, { cache: 'no-cache' })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!cancelled) {
          setBooks(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { books, loading, error };
}

// Synchronous lookup helper for a single book by id (used by BookDetail).
// Returns the matched book or undefined. Expects the resolved books array.
export function findBook(books, id) {
  return books.find((b) => b.id === id);
}
