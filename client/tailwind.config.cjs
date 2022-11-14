/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'productGrid': 'repeat(auto-fit, minmax(200px, 1fr))'
      },
      rotate: {
        '135': '135deg',
        '-135': '-135deg'
      }
    },
  },
  plugins: [],
};