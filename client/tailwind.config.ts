/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scan files in client/src/
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border, #e5e7eb))", // Default gray if --border isn’t set
        background: "hsl(var(--background, #ffffff))", // White fallback
        foreground: "hsl(var(--foreground, #000000))", // Black fallback
      },
    },
  },
  plugins: [],
};