/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#1F2BFF',        // Primary electric blue
          blueDeep: '#161EC7',    // Slightly deeper electric blue
          navy: '#0B1240',        // Deep navy tile faces & text
          navyLight: '#141E55',   // Secondary navy
          mint: '#14F5B0',        // Accent mint/teal hero headline
          amber: '#FFB300',       // Warm amber cards
          orangeRed: '#F0552B',   // Playful red/orange
          sky: '#6ECFE0',         // Sky blue campus backdrop
          green: '#00A651',       // Grass green campus ground
          lime: '#C8F560',        // Secondary CTA buttons
          cream: '#FDF0E1',       // Neo-brutalist panel background
          bg: '#F5F7FF',          // Page background
          border: '#0B1240',      // Neo-brutalist border
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'Anton', 'sans-serif'],
        sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'soft': '0 10px 30px -4px rgba(11, 18, 64, 0.08), 0 4px 12px -2px rgba(11, 18, 64, 0.04)',
        'soft-lg': '0 20px 40px -6px rgba(31, 43, 255, 0.12), 0 8px 16px -4px rgba(11, 18, 64, 0.06)',
        'neo': '4px 4px 0px 0px #0B1240',
        'neo-sm': '3px 3px 0px 0px #0B1240',
        'neo-lg': '6px 6px 0px 0px #0B1240',
        'neo-hover': '2px 2px 0px 0px #0B1240',
        'neo-mint': '4px 4px 0px 0px #14F5B0',
        'glow-mint': '0 0 24px rgba(20, 245, 176, 0.45)',
        'glow-blue': '0 0 24px rgba(31, 43, 255, 0.45)',
      },
      borderRadius: {
        'card': '20px',
        'card-lg': '28px',
        'pill': '9999px',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 3s',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
