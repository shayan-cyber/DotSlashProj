module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      colors: {
        'offBlack': '#292929',
        'grey': '#B5B5B5',
        'offWhite': '#c8c8c8',
        'base': '#121212',
        'success': '#03DAC5',
        'primary': '#09f',
        'offPrimary': '#0af',
        'bgBlack': '#1A1A1A',
        'offgrey': '#343434',
        'offgreyer': '#353535',
        'expblue' : '#0099FF',
        'exppurple':'#8463d0'
      
      },

    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}