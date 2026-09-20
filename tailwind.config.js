/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          900: '#070b19',
          800: '#0d152e',
          700: '#142047',
          600: '#1d2e63',
          500: '#2b4491',
          accent: '#00f2fe',
          glow: '#4facfe',
        }
      }
    },
  },
  plugins: [],
}
