import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Hanken Grotesk"', ...defaultTheme.fontFamily.sans],
        display: ['"Bricolage Grotesque Variable"', '"Bricolage Grotesque"', '"Hanken Grotesk"', ...defaultTheme.fontFamily.sans],
        mono: ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono],
        // Legacy alias — the old body font class now points at Hanken Grotesk
        noto: ['"Hanken Grotesk"', 'sans-serif'],
      },
      colors: {
        // Plum-tinted neutrals from the design system (static scale)
        gray: {
          50: "#F8F6FB",
          100: "#F0EDF4",
          200: "#E4E0EB",
          300: "#C6C0D0",
          400: "#9A93A6",
          500: "#726B80",
          600: "#565064",
          700: "#423D52",
          800: "#2F2B3D",
          900: "#211E2E",
          950: "#171522",
        },
        ink: {
          50: "#F8F6FB",
          100: "#F0EDF4",
          200: "#E4E0EB",
          300: "#C6C0D0",
          400: "#9A93A6",
          500: "#726B80",
          600: "#565064",
          700: "#423D52",
          800: "#2F2B3D",
          900: "#211E2E",
          950: "#171522",
        },
        // The signature violet
        violet: {
          50: "#F4F1FE",
          100: "#E9E2FD",
          200: "#D5C7FB",
          300: "#B79EF6",
          400: "#9A74F0",
          500: "#8250E6",
          600: "#7135D6",
          700: "#5C28B0",
          800: "#47208A",
          900: "#351763",
        },
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
          subtle: "var(--accent-subtle)",
          text: "var(--text-accent)",
        },
        marker: "var(--marker)",
        charcoal: "#14121c",
        paper: "#ffffff",
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
