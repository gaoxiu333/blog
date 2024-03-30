import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";
const colors = require("tailwindcss/colors");

const config = {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
      colors: {
        primary: "hsl(var(--color-primary) / 1)",
        gray: colors.neutral,
      },
      typography: (theme: (arg0: string) => any) => ({
        DEFAULT: {
          css: {
            code: {
              fontSize: "0.75em",
              backgroundColor: "#F2F2F2",
              padding: "0.2em 0.4em",
              borderRadius: "0.3em",
              fontWeight: "400",
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
