/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}", // Ensure Tailwind scans all components
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        dejaVuMono: ["DejaVu Mono", "monospace"], // Add custom font
      },
    },
  },
  plugins: [],
};
