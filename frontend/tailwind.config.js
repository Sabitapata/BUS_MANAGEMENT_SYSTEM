/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Times New Roman"', 'Times', 'Georgia', 'serif'],
        sans: ['"Times New Roman"', 'Times', 'serif'],
      },
      colors: {
        navy: {
          50: '#f0f5fb',
          100: '#dbe7f6',
          200: '#bdd3ed',
          300: '#90b7df',
          400: '#5c94cc',
          500: '#2b6cb0',
          600: '#1e4d7a',
          700: '#133e68',
          800: '#0b2545',
          900: '#07182c',
          950: '#030d17',
        },
        amber: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        primary: {
          50: '#f0f5fa',
          100: '#dbe7f6',
          200: '#bdd3ed',
          300: '#90b7df',
          400: '#5c94cc',
          500: '#2b6cb0',
          600: '#1e4d7a',
          700: '#133e68',
          800: '#0b2545',
          900: '#07182c',
        }
      }
    },
  },
  plugins: [],
}

