/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          bg: '#FDF8FA',
          card: '#FFFFFF',
          rose: '#E2B6D5',
          pink: '#EC4899',
          purple: '#A855F7',
          text: '#2A1F35',
        },
      },
    },
  },
  plugins: [],
};
