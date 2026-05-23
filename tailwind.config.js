/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        'sber-blue': '#005BFF',
        'sber-red': '#FF0000',
      }
    },
  },
  plugins: [require("daisyui"),
            require('@tailwindcss/typography'),
            require("daisyui")
  ],
  daisyui: {
    themes: ["light"],
  },
}