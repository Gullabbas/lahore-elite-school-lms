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
      boxShadow: {
        "gold-glow": "0 0 35px -5px rgba(255, 208, 47, 0.45)",
        "gold-glow-lg": "0 0 60px -10px rgba(255, 208, 47, 0.6)",
        "navy-glow": "0 10px 40px -10px rgba(9, 26, 74, 0.25)",
        "3d-card": "0 20px 40px -15px rgba(9, 26, 74, 0.08), 0 0 1px 1px rgba(9, 26, 74, 0.05)",
        "3d-hover": "0 30px 60px -15px rgba(9, 26, 74, 0.16), 0 0 0 1px rgba(255, 208, 47, 0.35)",
        "glass": "0 8px 32px 0 rgba(9, 26, 74, 0.08)",
      },
      animation: {
        "float": "float 4s ease-in-out infinite",
        "float-delayed": "float 5s ease-in-out 2s infinite",
        "pulse-glow": "pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "spin-slow": "spin 35s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.05)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(200%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
