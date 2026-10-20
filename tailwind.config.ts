import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        school: {
          navy: "#091A4A",
          "navy-deep": "#07143B",
          "navy-light": "#142866",
          gold: "#FFD02F",
          "gold-warm": "#F5C52E",
          "gold-light": "#FFF9E5",
          bg: "#F7F8FC",
          card: "#FFFFFF",
          text: "#18233D",
          muted: "#65708A",
          border: "#E4E8F0",
          success: "#16865C",
          warning: "#D99012",
          error: "#C83D46",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        serif: ["var(--font-merriweather)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
