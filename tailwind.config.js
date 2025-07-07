/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.6s ease-out forwards',
      },
      colors: {
        primary: '#008C95',
        'primary-light': '#9AD4D0',
        'primary-extraLight': '#EAF6F7',
        'text-dark': '#0A0D14',
        'text-muted': '#354A4A',
        highlight: '#FFE07D',
      },
      fontFamily: {
        sans: ['var(--font-poppins)'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
