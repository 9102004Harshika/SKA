/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "hsl(var(--black))",
        background: "hsl(var(--background))",
        error: "hsl(var(--error))",
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        tertiary: "hsl(var(--tertiary))",
        accent: "hsl(var(--accent))",
      },
      fontFamily: {
        header: ['"Vidaloka"', "serif"],
        body: ['"Nunito"', "serif"],
        highlight: ['"Cabin Sketch"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
