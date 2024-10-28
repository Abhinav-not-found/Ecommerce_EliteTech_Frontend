/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryRed: '#E8505B',
        secondaryRed: '#b63a42',
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        // mytheme: {
        //   "primary": "#E8505B", // Use your primaryRed color here
        //   "secondary": "#E8505B", // Use your secondaryRed color here
        //   "accent": "#37cdbe",
        //   "neutral": "#3d4451",
        //   "base-100": "#ffffff",
        //   "info": "#2094f3",
        //   "success": "#009485",
        //   "warning": "#ff9900",
        //   "error": "#ff5724",
        // },
      },
      "light", // You can still include the default light theme if needed
    ],
  },
}
