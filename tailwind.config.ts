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
        peach: { light: "#FFD8CF", mid: "#FF917F" },
        dark: "#3C1A05",
        beige: "#F5EDE0",
      },
      fontFamily: {
        futura: ["Futura PT", "Futura", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
        // Google renamed Source Serif Pro to Source Serif 4; the old name is
        // kept as a fallback for anyone who has the original installed. The
        // quotes are written in on purpose: Tailwind passes the name through
        // as-is, and unquoted `Source Serif 4` is not a valid CSS identifier,
        // so the browser would throw the whole declaration away.
        "source-serif": ["'Source Serif 4'", "'Source Serif Pro'", "serif"],
      },
      letterSpacing: {
        wider: "0.25em",
      },
    },
  },
  plugins: [],
};

export default config;
