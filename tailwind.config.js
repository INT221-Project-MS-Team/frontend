// import path from 'path'
// import colors from 'tailwindcss/colors'
const path = require('path');
const colors = require('tailwindcss/colors');

module.exports = {
  purge: [path.resolve(__dirname, './node_modules/litepie-datepicker/**/*.js')],
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        prompt: ['Prompt', 'sans-serif'],
        kanit: ['Kanit', 'sans-serif'],
      },
      backgroundImage: {
        home: "url('/images/home-bg-new-1.png')",
        schedules: "url('/images/schedules-bg.png')",
      },
      colors: {
        'clinic-blue-300': '#5f72ff',
        'clinic-blue-200': '#677eff',
        'clinic-blue-100': '#8da1ff',
        'clinic-blue-50': '#B7C2FF',
        'litepie-primary': colors.sky, 
      },
    },
  },
  variants: {
    extend: {
      cursor: ['disabled'],
      textOpacity: ['disabled'],
      textColor: ['disabled'],
    },
  },
  plugins: [require('flowbite/plugin')],
};
