/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md}'],
  theme: {
    extend: {
      fontFamily: {
        // Self-hosted Vazirmatn — imported in the global CSS via @fontsource.
        sans: ['"Vazirmatn"', 'Tahoma', 'sans-serif'],
      },
      colors: {
        // Brand: black / white + deep teal accent; Bale green reserved for buy CTAs.
        brand: {
          black: '#111111',
          teal: '#0d9488',
          tealDark: '#0b7066',
          bale: '#34d399',
        },
      },
      borderRadius: {
        xl2: '1rem',
      },
    },
  },
  plugins: [],
};
