/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: '#0A0A10',
          light: '#F7F5F0',
        },
        surface: {
          DEFAULT: '#131319',
          2: '#1B1B24',
          light: '#FFFFFF',
          'light-2': '#F0EDE5',
        },
        ink: {
          DEFAULT: '#F1EEE6',
          muted: '#A6A2B3',
          light: '#16151C',
          'light-muted': '#5C5870',
        },
        gold: {
          DEFAULT: '#E3B23C',
          dim: '#8A6A24',
          bright: '#F5CB63',
        },
        marquee: '#E1444B',
      },
      fontFamily: {
        display: ['"Bebas Neue"', '"Oswald"', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(227, 178, 60, 0.35)',
      },
      backgroundImage: {
        'film-grain': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        riseIn: {
          '0%': { opacity: 0, transform: 'translateY(14px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: 0, transform: 'scale(0.96)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.6s infinite linear',
        fadeIn: 'fadeIn 0.4s ease-out both',
        riseIn: 'riseIn 0.5s ease-out both',
        scaleIn: 'scaleIn 0.2s ease-out both',
      },
    },
  },
  plugins: [],
}
