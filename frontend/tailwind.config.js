/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'search-bg': "url('./public/img/bg-search.webp')",
      },
    },
  },
  plugins: [],
}

