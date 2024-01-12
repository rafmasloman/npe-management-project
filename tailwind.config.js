/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#005BD8',
        yellow: '#FFD600',
      },
      fontFamily: {
        poppins: 'poppins',
      },
    },
  },
  plugins: [],
};
