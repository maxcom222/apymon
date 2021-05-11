const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      screens: {
         sm: "100%",
         md: "100%",
         lg: "1024px",
         xl: "1300px"
      }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      blue: colors.blue,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      green: colors.green,
      pink: colors.pink,
      lime: colors.lime,
    },
    extend: {
      container: {
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '0',
          xl: '0',
        }
      },
      colors: {
        'background': '#0f0f0f',
        'dark-600': '#242428',
      },
      width: {
        22: '5.5rem',
        98: '26rem',
        100: '30rem',
        150: '45rem',
        200: '60rem',
      },
      height: {
        100: '35rem'
      },
      spacing: {
        'header-height': '4.438rem',
        0.1: '0.02rem'
      },
      padding: {

      },
      fontFamily: {
        'montserrat': 'Montserrat',
        'prompt': 'Prompt',
        'sarpanch': 'Sarpanch'
      },
      fontSize: {
        '2xs': ['0.5rem', '0.5rem'],
        'lg-sm': ['1.125rem', '1.4rem']
      },
      animation: {
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
    },
  },
  filter: { // defaults to {}
    'none': 'none',
    'grayscale': 'grayscale(1)',
    'invert': 'invert(1)',
    'sepia': 'sepia(1)',
  },
  backdropFilter: { // defaults to {}
    'none': 'none',
    'blur': 'blur(20px)',
  },
  variants: {
    extend: {
      filter: ['responsive'], // defaults to ['responsive']
      backdropFilter: ['responsive'], // defaults to ['responsive']
    },
  },
  plugins: [
    require('tailwindcss-filters'),
    require('@tailwindcss/aspect-ratio')
  ],
}
