/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        jio: {
          green: '#008542',
          dark: '#006633',
          light: '#E8F5E9',
          accent: '#00A650'
        }
      }
    },
  },
  plugins: [],
}
