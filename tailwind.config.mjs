import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        noto: ['"Noto Sans"', 'sans-serif'],
      },
      colors: {
        charcoal: "#18191bff",
        paper: "#f7f6f1ff",
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
