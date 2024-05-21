/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "main-color": '#F3F4F7',

      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}