import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f4f6fb",
          100: "#e8ecf6",
          200: "#ccd6ea",
          300: "#9fb1d6",
          400: "#6b87bd",
          500: "#4867a5",
          600: "#37508a",
          700: "#2e4170",
          800: "#29385e",
          900: "#0b1220",
          950: "#060a14",
        },
        aqua: {
          50: "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
        },
        surface: {
          light: "#f7f8fb",
          dark: "#0b1220",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        glow: "0 0 60px -12px rgba(34, 211, 238, 0.35)",
        "soft-lg": "0 20px 60px -20px rgba(11, 18, 32, 0.25)",
        card: "0 1px 2px rgba(11,18,32,.04), 0 8px 24px -8px rgba(11,18,32,.12)",
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(1200px 600px at 80% -10%, rgba(34,211,238,.18), transparent 60%), radial-gradient(900px 500px at 10% 110%, rgba(72,103,165,.20), transparent 55%)",
        "cta-gradient": "linear-gradient(135deg, #06b6d4 0%, #4867a5 100%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        drum: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: ".55" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        shimmer: "shimmer 1.6s infinite",
        "fade-up": "fade-up .7s cubic-bezier(.21,.6,.35,1) both",
        drum: "drum 3.5s linear infinite",
        "pulse-soft": "pulseSoft 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
