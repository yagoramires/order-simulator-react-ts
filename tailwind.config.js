/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    screens: {
      md: '768px',
      // tablet
      lg: '1024px',
      // tablet grande e notebook pequeno
      xl: '1280px',
      // notebook
    },
    boxShadow: {
      sm: '0 0 10px 0 rgba(0, 0, 0, 0.3)',
      md: '0 0 5px 0 rgba(0, 0, 0, 0.5)',
    },
    colors: {
      'gray-50': '#FAFAFA',
      'gray-100': '#F5F5F5',
      'gray-200': '#EEEEEE',
      'gray-300': '#E0E0E0',
      'gray-400': '#BDBDBD',
      'gray-500': '#9E9E9E',
      'gray-600': '#757575',
      'gray-700': '#616161',
      'gray-800': '#424242',
      'gray-900': '#212121',
      'dark-100': '#121212',
      'blue-600': 'rgb(37 99 235)',
    },
  },
  plugins: [],
}
