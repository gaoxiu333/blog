import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";
const colors = require("tailwindcss/colors");

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "960px",
      },
    },

    extend: {
      // 继承可以保留tailwind原有的 theme
      fontFamily: {
        sans: [
          "-apple-system",
          "system-ui",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Helvetica",
          "Arial",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
        ],
      },
      colors: {
        primary: "hsl(var(--color-primary) / 1)",
        gray: colors.neutral,
        accent: {
          main: colors.pink[400],
          start: colors.purple[500],
          end: colors.pink[400],
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    nextui({
      themes: {
        light: {
          colors: {
            background: "DEFAULT",
          },
        },
        dark: {
          colors: {
            background: `rgb(28 25 23/1)`,
          },
        },
      },
    }),
  ],
} satisfies Config;

export default config;
