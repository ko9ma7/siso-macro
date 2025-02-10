/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        bounce: 'bounce 1s ease-in-out infinte',
        rebounce: 'rebounce 1s ease-in-out infinte',
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(-8px)' },
          '50%': { transform: 'translateY(0)' },
        },
        rebounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
  // darkMode: 'dark',
}

