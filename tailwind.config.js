/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'light-bg': '#F8FAFC',
        'primary': '#2563EB',
        'accent': '#0EA5E9',
        'warning': '#F97316',
        'dark-text': '#0F172A', // slate-900
        'medium-text': '#334155', // slate-700
        'light-text': '#64748B', // slate-500
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      boxShadow: {
        'floating': '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
        'floating-lg': '0 35px 60px -15px rgba(0, 0, 0, 0.2)',
        'glow-primary': '0 0 20px rgba(37, 99, 235, 0.5)',
        'glow-accent': '0 0 20px rgba(14, 165, 233, 0.5)',
      },
      animation: {
        'pulse-light': 'pulse-light 5s infinite ease-in-out',
      },
      keyframes: {
        'pulse-light': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}