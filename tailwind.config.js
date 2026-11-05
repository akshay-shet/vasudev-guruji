/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: 'rgb(var(--c-cream) / <alpha-value>)',
        paper: 'rgb(var(--c-paper) / <alpha-value>)',
        gold: '#C58B2D',
        goldlight: '#ECC46E',
        golddark: '#93600F',
        maroon: 'rgb(var(--c-maroon) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
      },
      fontFamily: {
        marcellus: ['Marcellus', '"Tiro Kannada"', '"Tiro Telugu"', '"Tiro Tamil"', '"Noto Serif Malayalam"', '"Tiro Devanagari Hindi"', 'serif'],
        cormorant: ['"Cormorant Garamond"', '"Tiro Kannada"', '"Tiro Telugu"', '"Tiro Tamil"', '"Noto Serif Malayalam"', '"Tiro Devanagari Hindi"', 'serif'],
        cinzel: ['Cinzel', '"Tiro Kannada"', '"Tiro Telugu"', '"Tiro Tamil"', '"Noto Serif Malayalam"', '"Tiro Devanagari Hindi"', 'serif'],
        deva: ['"Tiro Kannada"', '"Tiro Telugu"', '"Tiro Tamil"', '"Noto Serif Malayalam"', '"Tiro Devanagari Hindi"', '"Noto Sans Kannada"', '"Tiro Devanagari Sanskrit"', 'serif'],
        kn: ['"Tiro Kannada"', '"Tiro Telugu"', '"Tiro Tamil"', '"Noto Serif Malayalam"', '"Tiro Devanagari Hindi"', '"Noto Sans Kannada"', 'serif'],
      },
      boxShadow: {
        gold: '0 6px 18px -6px rgba(197,139,45,.45), 0 2px 6px -2px rgba(147,96,15,.25)',
        glow: '0 0 0 1px rgba(236,196,110,.6), 0 10px 30px -10px rgba(197,139,45,.55)',
      },
    },
  },
  plugins: [],
}
