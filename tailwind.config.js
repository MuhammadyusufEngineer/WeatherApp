/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        'low-dark': '#939CB0',
        'blue': '#4793FF',
        'low-blue': 'rgba(71, 147, 255, .2)'
      },
      screens: {
        'sm': '400px'
      }
    },
  },
  plugins: [],
}