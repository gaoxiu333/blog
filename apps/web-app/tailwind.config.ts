import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";
const colors = require("tailwindcss/colors");

const config = {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  theme: {
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
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "960px",
      },
    },

    extend: {
      // 继承可以保留tailwind原有的 theme
      colors: {
        primary: "hsl(var(--color-primary) / 1)",
        gray: colors.neutral,
      },
      typography: () => ({
        DEFAULT: {
          css: {
            lineHeight: 1.7,
            "p,code,pre,ul": {
              marginTop: 0,
              marginBottom: "1em !important",
            },

            li: {
              marginTop: 0,
              marginBottom: "0",
            },
            code: {
              fontSize: "0.75em",
              backgroundColor: "#F2F2F2",
              padding: "0.2em 0.4em",
              borderRadius: "0.3em",
              fontWeight: "400",
            },
            blockquote: {
              quotes: "none",
              fontSize: "14px",
              fontWeight: "400",
              color: "var(--nextui-colors-gray)",
              fontStyle: "normal",
            },
            "code::before": {
              content: "none",
            },
            "code::after": {
              content: "none",
            },
          },
        },
        invert: {
          css: {
            code: {
              backgroundColor: "#f2f2f23b",
            },
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
    nextui(),
  ],
} satisfies Config;

export default config;
