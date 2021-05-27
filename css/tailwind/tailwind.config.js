module.exports = {
  purge: {
    mode: 'all',
    content: [
      './purge/samples/*.html',
      './purge/**/*.html'
      ],
    options: {
      keyframes: true,
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans': '"LatoLatinWeb", IRANYekan, ui-sans-serif, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
      'siftal': 'siftal',
      'IRANSansX': 'IRANSansX',
      'IRANYekan': 'IRANYekan',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-rtl'),
  ],
}
