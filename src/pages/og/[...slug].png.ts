import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { readFile } from "fs/promises";
import { resolve } from "path";
import satori from "satori";
import sharp from "sharp";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = (await getCollection("blog")).filter((p) => !p.data.draft);
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { title: post.data.title, description: post.data.description },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const { title, description } = props as { title: string; description: string };

  const fontDir = resolve("node_modules/@fontsource/inter/files");
  const [regular, bold] = await Promise.all([
    readFile(resolve(fontDir, "inter-latin-400-normal.woff")),
    readFile(resolve(fontDir, "inter-latin-600-normal.woff")),
  ]);

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          display: "flex",
          width: "1200px",
          height: "630px",
          backgroundColor: "#0a0015",
          position: "relative",
          fontFamily: "Inter",
        },
        children: [
          // Purple glow — top right
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                top: "-150px",
                right: "-100px",
                width: "700px",
                height: "700px",
                backgroundImage: "radial-gradient(ellipse, rgba(139, 58, 237, 0.45) 0%, transparent 65%)",
              },
              children: "",
            },
          },
          // Purple glow — bottom left
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                bottom: "-200px",
                left: "50px",
                width: "600px",
                height: "600px",
                backgroundImage: "radial-gradient(ellipse, rgba(109, 40, 217, 0.35) 0%, transparent 65%)",
              },
              children: "",
            },
          },
          // Left accent bar
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                top: 0,
                left: 0,
                width: "8px",
                height: "630px",
                backgroundColor: "#c4b5fd",
              },
              children: "",
            },
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "80px 80px 60px 100px",
                flex: 1,
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: { display: "flex", flexDirection: "column", gap: "20px" },
                    children: [
                      {
                        type: "div",
                        props: {
                          style: {
                            color: "#f7f6f1",
                            fontSize: "64px",
                            fontWeight: 600,
                            lineHeight: 1.2,
                            letterSpacing: "-1px",
                          },
                          children: title,
                        },
                      },
                      {
                        type: "div",
                        props: {
                          style: {
                            color: "#a09cb0",
                            fontSize: "28px",
                            fontWeight: 400,
                            lineHeight: 1.4,
                          },
                          children: description,
                        },
                      },
                    ],
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      color: "#c4b5fd",
                      fontSize: "32px",
                      fontWeight: 400,
                      letterSpacing: "3px",
                    },
                    children: "DavideBri",
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
        { name: "Inter", data: regular, weight: 400, style: "normal" },
        { name: "Inter", data: bold, weight: 600, style: "normal" },
      ],
    },
  );

  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png" },
  });
};
