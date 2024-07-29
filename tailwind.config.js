/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        yes: '#3fb68b',
        no: '#ff5353',
        info: '#00b2ff',
        main: 'var(--text-main)',
        secondary: 'var(--text-secondary)',
        active: 'var(--bg-active)',
        customGreen: '#c9f31d',
        customBlack: '#373834',
        customLime: '#DCE828',
        customChocko: '#141413',
        customBg: '#E5F79B',
        customMilk: '#eaf7f6',
        customDark: '#000000'
      }
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
    
    ],
  },
};
