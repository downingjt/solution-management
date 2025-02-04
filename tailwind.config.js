/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#CD6543',
        'primary-hover': '#B85A3B',
        dark: {
          DEFAULT: '#1C1C1C',
          lighter: '#2A2A2A',
          card: '#242424'
        }
      }
    },
  },
  plugins: [],
}