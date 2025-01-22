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
        primary: "#2563eb",
        "gradient-start": "#2563eb",
        "gradient-end": "#1d4ed8",
        "text-primary": "#333333",
        "text-secondary": "#4b5563",
        background: "#ffffff",
      },
      fontFamily: {
        arimo: ["Arimo", "system-ui", "sans-serif"],
        sans: ["system-ui", "Helvetica", "Arial", "sans-serif"],
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        }
      },
      animation: {
        "scroll": "scroll 20s linear infinite"
      }
    },
  },
  plugins: [],
};
export default config;
