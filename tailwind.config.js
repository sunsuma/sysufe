/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: ['var(--ff-lato)', 'sans'], // Replace 'var(--ff-lato)' with your CSS variable
      },
    },
  },
  plugins: [],
}

