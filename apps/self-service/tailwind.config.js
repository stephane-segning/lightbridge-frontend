/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,ts,tsx}',
    './src/**/*.{js,ts,tsx}',
    '../../packages/ui/**/*.{js,ts,tsx}',
  ],

  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
};
