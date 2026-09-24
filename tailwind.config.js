/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        educhain: {
          blue: '#1F2BFF',
          blueDeep: '#1A22CC',
          teal: '#00F0B5',
          navy: '#0B0F3B',
          bg: '#F5F7FF',
          white: '#FFFFFF',
          // Playful secondary palette
          sky: '#6FCFDD',
          green: '#00A550',
          yellow: '#FFB000',
          orangeRed: '#F2603A',
          cream: '#FCEFE0',
          borderDark: '#10142B',
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
        sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'educhain-soft': '0 10px 25px -3px rgba(11, 15, 59, 0.06), 0 4px 10px -2px rgba(11, 15, 59, 0.03)',
        'educhain-hover': '0 20px 35px -5px rgba(31, 43, 255, 0.12), 0 8px 16px -4px rgba(11, 15, 59, 0.06)',
        'educhain-nav': '0 4px 20px -2px rgba(11, 15, 59, 0.05)',
        'playful-hard': '4px 4px 0px 0px #10142B',
        'playful-hard-lg': '6px 6px 0px 0px #10142B',
      },
      borderRadius: {
        'card': '18px',
        'pill': '9999px',
      },
      animation: {
        'float-slow': 'float 5s ease-in-out infinite',
        'float-delayed': 'float 5s ease-in-out infinite 2.5s',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(1deg)' },
        },
      },
    },
  },
  plugins: [],
}
