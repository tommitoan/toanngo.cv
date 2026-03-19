import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#050816",
        violet: "#915eff",
        "violet-soft": "#2a1d4c",
        cyan: "#56ccf2",
        steel: "#a9acc6"
      },
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
        brand: ["Dancing Script", "cursive"]
      },
      boxShadow: {
        panel: "0 24px 80px rgba(2, 6, 23, 0.32)",
        glow: "0 0 40px rgba(145, 94, 255, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
