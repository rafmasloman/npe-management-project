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
        third: '#F79F1A',
        secondary: '#153B6F',
        success: '#3ABC6B',
        todo: '#F79F1A',
        onprogress: '#0891B2',
        completed: '#16a34a',
        yellow: '#FFD600',
        maroon: '#DF135C',
      },
      fontFamily: {
        poppins: 'poppins',
      },
    },
  },
  plugins: [],
};
