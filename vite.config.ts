import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import rehypePrettyCode from "rehype-pretty-code";
// const rehypePrettyCode = require('rehype-pretty-code');
const fs = require("fs");
const options = {
  // Use one of Shiki's packaged themes
  theme: "one-dark-pro",
  onVisitLine(node: any) {
    // Prevent lines from collapsing in `display: grid` mode, and
    // allow empty lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  // Feel free to add classNames that suit your docs
  onVisitHighlightedLine(node: any) {
    node.properties.className.push("highlighted");
  },
  onVisitHighlightedWord(node: any) {
    node.properties.className = ["word"];
  },
};

export default defineConfig(() => {
  return {
    plugins: [
      qwikCity({
        mdxPlugins: {
          remarkGfm: false,
          rehypeSyntaxHighlight: true,
          rehypeAutolinkHeadings: false,
        },
        mdx: {
          rehypePlugins: [[rehypePrettyCode, options]],
        },
      }),
      qwikVite(),
      tsconfigPaths(),
    ],
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
    resolve:{
      alias: {
        ".prisma/client/edge": "./node_modules/.prisma/client/edge.js",
        ".prisma/client/index-browser": "./node_modules/.prisma/client/index-browser.js"
      }
    },
    envDir: "./",
    envPrefix: "VITE_"
  };
});
