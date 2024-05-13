/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      width: {
        'full': '27rem',
        'component': '25rem',
        'component-half': '12.25rem'
      },
      height: {
        'full': '35rem',
      },
      colors: {
        'brand': '#F25220',
      }
    },
  },
  plugins: [],
}

