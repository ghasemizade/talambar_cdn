module.exports = {
  purge: {
    enabled: true,
    mode: 'all',
    content: [
      '../purge/samples/*.html',
      '../purge/**/*.html'
      ],
    options: {
      keyframes: true,
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
