import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        arena: {
          50: "#F0FDF4",
          100: "#D4EDDA",
          200: "#A8D5B5",
          300: "#6DBF8A",
          400: "#3DA864",
          500: "#1B8A4C",
          600: "#157A3F",
          700: "#0F6033",
          800: "#0A4826",
          900: "#062E18"
        }
      },
      borderRadius: {
        "4xl": "2rem"
      },
      fontFamily: {
        sans: ["var(--font-nunito)", "Nunito", "sans-serif"]
      },
      boxShadow: {
        soft: "0 16px 40px rgb(15 96 51 / 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
