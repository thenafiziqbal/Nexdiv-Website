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
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          blue: "#0a84ff",
          deep: "#0033a0",
          night: "#020617",
          neon: "#39ff14",
          mint: "#00ffa3",
          accent: "#5eead4",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      animation: {
        "gradient-x": "gradient-x 15s ease infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 20s linear infinite",
        "glow": "glow 2.5s ease-in-out infinite",
        "marquee": "marquee 30s linear infinite",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(57, 255, 20, 0.4), 0 0 40px rgba(10, 132, 255, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(57, 255, 20, 0.7), 0 0 80px rgba(10, 132, 255, 0.5)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, rgba(94, 234, 212, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(94, 234, 212, 0.08) 1px, transparent 1px)",
        "radial-fade":
          "radial-gradient(ellipse at center, rgba(10,132,255,0.25) 0%, rgba(2,6,23,0) 70%)",
      },
    },
  },
  plugins: [],
};
export default config;
