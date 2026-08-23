import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Books collection — one Markdown file per book in src/content/books/.
// Body (Markdown below the frontmatter) holds the long description /
// table of contents; frontmatter holds the structured metadata.
const books = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/books' }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    // Path under /public (e.g. /images/covers/book-1.webp) — kept as a plain
    // string rather than image() so covers can be managed outside src/.
    coverImage: z.string(),
    description: z.string(),
    price: z.number().int().positive(), // Toman
    // Iranian calendar (Hijri Shamsi) year — e.g. 1403. Range covers the
    // plausible publishing era of the press; NOT the Gregorian year.
    publishYear: z.number().int().min(1300).max(1500),
    pages: z.number().int().positive(),
    // Optional niceties (rendered when present, hidden otherwise):
    isbn: z.string().optional(),
    translator: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { books };
