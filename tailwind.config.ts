import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/interactive/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      gridColumnStart: {
        "13": "13",
        "14": "14",
        "15": "15",
        "16": "16",
      },
      gridColumnEnd: {
        "13": "13",
        "14": "14",
        "15": "15",
        "16": "16",
      },
      gridTemplateColumns: {
        "3": "repeat(3, minmax(0, 1fr))",
        "6": "repeat(6, minmax(0, 1fr))",
        "13": "repeat(13, minmax(0, 1fr))",
        "16": "repeat(16, minmax(0, 1fr))",
      },
    },
    fontFamily: {
      inter: ["var(--inter)"],
    },
  },
  screens: {
    xs: "0px",
    sm: "768px",
    md: "1024px",
    lg: "1200px",
    xl: "1400px",
  },
  colors: {
    black: "#000000",
    white: "#ffffff",
  },
  plugins: [],
};
export default config;
