/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        black: "hsl(var(--black))",
        white: "hsl(var(--white))",
        background: "hsl(var(--background))",
        error: "hsl(var(--error))",
        primary: "hsl(var(--primary))", // Corrected to refer to primary color
        secondary: "hsl(var(--secondary))",
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
