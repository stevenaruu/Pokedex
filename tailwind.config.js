/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'home': "url('./assets/image/background.jpg')",
        // 'detail'
      },
    },
  },
  plugins: [],
}
