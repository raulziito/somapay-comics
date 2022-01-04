module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      textColor: {
        'primary': '#3490dc',
        'secondary': '#ffed4a',
        'danger': '#e3342f',
        'azul': '#58D4CF',
        'currentDark': '#111827',

      },

      minWidth: {
        '0': '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
        'boxsize': '194px'
       },
    },
  },
  variants: {
    extend: {

      backgroundColor: ['even','odd','first', 'last'],
    },
  },
  plugins: []
}