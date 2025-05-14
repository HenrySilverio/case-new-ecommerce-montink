/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'brand-blue': '#1f104f',
        'brand-off-white': '#fffafa',
        'brand-cart-bg': '#d3d3d3',
        // Dark theme colors
        'dark-brand-blue': '#6D5BA7',
        'dark-brand-off-white': '#18181b',
        'dark-brand-cart-bg': '#27272a',
      },
    },
  },
  plugins: [],
}

