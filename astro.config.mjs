import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import expressiveCode from "astro-expressive-code";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import rehypeMermaid from "rehype-mermaid";
import { remarkAlert } from "remark-github-blockquote-alert";
import remarkFlexibleMarkers from "remark-flexible-markers";

export default defineConfig({
  site: "https://davidebri.github.io",
  integrations: [
    // expressiveCode must run before mdx
    expressiveCode({
      themes: ["material-theme-palenight"],
      plugins: [pluginLineNumbers()],
      defaultProps: {
        showLineNumbers: true,
        // no line numbers on terminal-ish blocks
        overridesByLang: {
          "bash,sh,shell,zsh": { showLineNumbers: false },
        },
      },
      styleOverrides: {
        // crisp editorial frame on the ink slab, matching the site tokens
        borderRadius: "2px",
        borderColor: "var(--border)",
        codeBackground: "#171522",
        codeFontFamily: "var(--font-mono)",
        codeFontSize: "0.85rem",
        uiFontFamily: "var(--font-mono)",
        frames: {
          editorActiveTabBackground: "#171522",
          editorActiveTabForeground: "#C6C0D0",
          editorActiveTabIndicatorTopColor: "#8250E6",
          editorActiveTabIndicatorBottomColor: "transparent",
          editorTabBarBackground: "#211E2E",
          editorTabBarBorderBottomColor: "#2F2B3D",
          editorBackground: "#171522",
          terminalBackground: "#171522",
          terminalTitlebarBackground: "#211E2E",
          terminalTitlebarForeground: "#C6C0D0",
          terminalTitlebarBorderBottomColor: "#2F2B3D",
          frameBoxShadowCssValue: "none",
          inlineButtonBackground: "#423D52",
          inlineButtonForeground: "#E4E0EB",
          tooltipSuccessBackground: "#7135D6",
        },
        lineNumbers: {
          foreground: "#565064",
        },
      },
    }),
    mdx(),
    sitemap(),
    tailwind(),
  ],
  markdown: {
    remarkPlugins: [remarkAlert, remarkFlexibleMarkers],
    rehypePlugins: [rehypeMermaid],
  },
});
