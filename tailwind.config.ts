import type { Config } from "tailwindcss";

// Every color points at a CSS variable in src/app/globals.css.
// To re-brand the site, change --brand there (one line).
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "var(--brand)",
        "brand-soft": "var(--brand-soft)",
        "brand-line": "var(--brand-line)",
        "on-brand": "var(--on-brand)",
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        line: "var(--line)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: { xl2: "var(--radius-lg)" },
      boxShadow: {
        glow: "var(--shadow-glow)",
        card: "var(--shadow-card)",
      },
    },
  },
  plugins: [],
};
export default config;
