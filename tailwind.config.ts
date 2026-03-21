import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#133C7B",
          hover: "#1A4E9F",
          tint: "#EEF3FB",
        },
        text: "#333333",
        muted: "#8498B9",
        "bg-soft": "#F9FAFB",
        border: "#E5EAF2",
        success: "#00B870",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Desktop / Mobile sizes defined inline via responsive prefixes
        "h1-desktop": ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "h1-mobile": ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "h2-desktop": ["2.5rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "h2-mobile": ["1.75rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        "h3-desktop": ["1.5rem", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
        "h3-mobile": ["1.25rem", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
        body: ["1.125rem", { lineHeight: "1.6" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
      },
      spacing: {
        // 8px grid enforcement already natural in Tailwind
        // Adding named aliases for documentation clarity
        18: "4.5rem",   // 72px
        22: "5.5rem",   // 88px
        30: "7.5rem",   // 120px
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0,0,0,0.05)",
        md: "0 4px 12px rgba(19,60,123,0.08)",
        lg: "0 8px 24px rgba(19,60,123,0.12)",
        phone: "0 16px 48px rgba(19,60,123,0.18)",
      },
      maxWidth: {
        site: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
