/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        chakra: {
          blue: '#2234BC',
          white: '#FEFFFF',
          leaf: '#45BE55',
          bg: '#00261B', // Bottle green
          dark: '#001a12', // Slightly darker variant for contrast
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
