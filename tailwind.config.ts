/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./client/src/**/*.{js,jsx,ts,tsx}", // Scan client/src/ for Tailwind classes
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))", // Default border color (uses CSS variable)
      },
    },
  },
  plugins: [],
};