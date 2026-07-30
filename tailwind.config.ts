import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: { DEFAULT: "#BD9E30", light: "#DFC563" },
        pink: "#C94B7A",
        peach: { light: "#FED7C6", mid: "#FFC3A9" },
        dark: "#3C1A05",
        beige: "#F5EDE0",
      },
      fontFamily: {
        futura: ["Futura PT", "Futura", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
      },
      letterSpacing: {
        wider: "0.25em",
      },
    },
  },
  plugins: [],
};

export default config;
