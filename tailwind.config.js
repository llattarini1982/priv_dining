/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['EB Garamond', 'Georgia', 'serif'],
      },
      colors: {
        'wine': {
          light: '#9b2c2c',
          DEFAULT: '#7b1f1f',
          dark: '#5c1717',
        },
        'cream': {
          light: '#fff8e7',
          DEFAULT: '#fff3d6',
          dark: '#ffe4b5',
        },
        'terracotta': {
          light: '#e67e5c',
          DEFAULT: '#d35f3b',
          dark: '#b44b2a',
        },
        'sienna': {
          light: '#a0522d',
          DEFAULT: '#8b4513',
          dark: '#753a0f',
        }
      },
    },
  },
  plugins: [],
};