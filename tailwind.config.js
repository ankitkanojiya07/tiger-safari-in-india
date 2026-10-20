/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Deep teal brand system built around primary #123438
        ink: '#0c1f22', // body text — near-black with teal undertone
        bark: '#0a2528', // dark surfaces (footer, heroes, drawers)
        stone: '#f2f6f6', // main cool off-white background
        sand: '#e3ecec', // alternate section background
        line: '#c5d3d4', // hairlines on light backgrounds
        primary: '#123438', // brand primary
        primaryDark: '#0a2528',
        ochre: '#123438', // accent alias (buttons, eyebrows on light)
        ochreDark: '#0a2528', // hover / pressed
        mist: '#8fb5b8', // light teal accent on dark surfaces
        moss: '#3d666b', // muted mid-teal for secondary details
        danger: '#a8483a', // form / validation errors
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', '"Times New Roman"', 'serif'],
        sans: ['Jost', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      letterSpacing: {
        eyebrow: '0.28em',
      },
      maxWidth: {
        site: '1320px',
      },
    },
  },
  plugins: [],
}
