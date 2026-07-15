import type { APIRoute } from "astro";
import { readFile } from "fs/promises";
import { resolve } from "path";
import satori from "satori";
import sharp from "sharp";

// Design-system tokens (light theme — the canonical look)
const INK_950 = "#171522";
const INK_600 = "#565064";
const INK_400 = "#9A93A6";
const INK_200 = "#E4E0EB";
const VIOLET = "#7135D6";
const VIOLET_DEEP = "#5C28B0";
const PAPER = "#FFFFFF";

// The site-wide OpenGraph card: used as the default for every page
// that isn't a blog post (home, projects, work, about, colophon).
export const GET: APIRoute = async () => {
  const [bricolage, hanken, mono] = await Promise.all([
    readFile(
      resolve(
        "node_modules/@fontsource/bricolage-grotesque/files/bricolage-grotesque-latin-600-normal.woff",
      ),
    ),
    readFile(
      resolve(
        "node_modules/@fontsource/hanken-grotesk/files/hanken-grotesk-latin-400-normal.woff",
      ),
    ),
    readFile(
      resolve(
        "node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff",
      ),
    ),
  ]);

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          display: "flex",
          flexDirection: "column",
          width: "1200px",
          height: "630px",
          backgroundColor: PAPER,
          padding: "64px 72px 56px",
          fontFamily: "Hanken Grotesk",
        },
        children: [
          // Masthead: mono eyebrow over a strong 2px ink rule
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                paddingBottom: "22px",
                borderBottom: `2px solid ${INK_950}`,
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      fontFamily: "JetBrains Mono",
                      fontSize: "22px",
                      letterSpacing: "3.5px",
                      color: VIOLET_DEEP,
                    },
                    children: "BLOG · PROJECTS · INFO",
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      width: "14px",
                      height: "14px",
                      backgroundColor: VIOLET,
                    },
                    children: "",
                  },
                },
              ],
            },
          },
          // Center: the wordmark, big, with its violet full stop
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                flex: 1,
                justifyContent: "center",
                gap: "24px",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      fontFamily: "Bricolage Grotesque",
                      fontSize: "150px",
                      letterSpacing: "-5px",
                      lineHeight: 1,
                      color: INK_950,
                    },
                    children: [
                      { type: "span", props: { children: "davide" } },
                      {
                        type: "span",
                        props: { style: { color: VIOLET }, children: "." },
                      },
                    ],
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: "30px",
                      lineHeight: 1.45,
                      color: INK_600,
                    },
                    children: "Davide's space in the web — backend developer from Pisa, obsessively curious.",
                  },
                },
              ],
            },
          },
          // Footer: tagline + handle between a hairline rule
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: "24px",
                borderTop: `1px solid ${INK_200}`,
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      fontFamily: "JetBrains Mono",
                      fontSize: "20px",
                      letterSpacing: "3px",
                      color: INK_400,
                    },
                    children: "WHEN IN DOUBT, JDI !",
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      fontFamily: "JetBrains Mono",
                      fontSize: "20px",
                      letterSpacing: "3px",
                      color: INK_400,
                    },
                    children: "@DAVIDEBRI",
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Bricolage Grotesque", data: bricolage, weight: 600, style: "normal" },
        { name: "Hanken Grotesk", data: hanken, weight: 400, style: "normal" },
        { name: "JetBrains Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );

  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png" },
  });
};
