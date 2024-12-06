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
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--primary))",
        },
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
