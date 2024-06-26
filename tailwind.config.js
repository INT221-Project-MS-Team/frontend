module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        prompt: ['Prompt', 'sans-serif'],
        kanit: ['Kanit', 'sans-serif'],
      },
      backgroundImage: {
        home: "url('../images/home-bg-new-1.png')",
        schedules: "url('../images/schedules-bg.png')",
        login: "url('../images/test.png')",
      },
      colors: {
        'clinic-blue-300': '#5f72ff',
        'clinic-blue-200': '#677eff',
        'clinic-blue-100': '#8da1ff',
        'clinic-blue-50': '#B7C2FF',
        'clinic-blue-30': '#c7d0ff',
        'clinic-blue-25': '#edf0ff',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
