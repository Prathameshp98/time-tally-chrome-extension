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
        'brand': '#fc546c',
        'dark-grey': '#808080',
        'grey-text': '#A9A9A9',
        'light-grey': '#f9f9f9'
      },
      gap: {
        '13': '3.25rem'
      },
      borderWidth: {
        '1': '1px'
      }
    },
  },
  plugins: [],
}

