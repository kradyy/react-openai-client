/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    //"./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['Roboto', 'sans-serif'],
      'roboto': ['Roboto', 'sans-serif'],
    },
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '100%' },
        },
        shake: {
          '0%': { marginLeft: '0rem' },
          '25%': { marginLeft: '0.5rem' },
          '75%': { marginLeft: '-0.5rem' },
          '100%': { marginLeft: '0rem' },
        }
      },
      animation: {
        'fadeIn': 'fadeIn 1s linear',
        'shake': 'shake 0.2s ease-in-out 0s 2',
      },
      colors: {
        primary: "#00bfa5",
      }
    },
  },
  plugins: [],
}