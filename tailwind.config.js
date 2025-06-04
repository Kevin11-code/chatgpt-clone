/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'inner-sm': 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
        'custom': '0 4px 20px -2px rgba(0, 0, 0, 0.2)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      scale: {
        '98': '0.98',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
