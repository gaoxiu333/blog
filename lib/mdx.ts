import { bundleMDX } from "mdx-bundler";

// mdx plugins
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrism from "rehype-prism-plus";
import remarkGfm from "remark-gfm";
import remarkSmartypants from "remark-smartypants";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeToc from "./rehypeToc";
import path from "path";
import rehypeShiki from "@shikijs/rehype";
import {
  transformerNotationDiff,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
  transformerCompactLineOptions,
} from "@shikijs/transformers";

export async function getBundleMDXData(fullPath: string) {
  if (process.platform === "win32") {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      "node_modules",
      "esbuild",
      "esbuild.exe"
    );
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      "node_modules",
      "esbuild",
      "bin",
      "esbuild"
    );
  }
  let TOC: any[] = [];
  const result = await bundleMDX({
    file: fullPath,
    mdxOptions: (options) => {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkGfm, // github 风格的 Markdown
        remarkSmartypants, // 更聪明的标点符号
      ];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug, // 给标题添加id属性
        rehypeAutolinkHeadings, // 给标题添加锚点
        [rehypeToc, { TOC }],
        rehypeCodeTitles, // 代码块增加标题
        // rehypePrism, // 代码高亮
        // [rehypePrettyCode, options],
        [
          rehypeShiki,
          {
            themes: {
              light: "slack-ochin",
              dark: "synthwave-84",
            },
            // defaultColor: false,
            transformers: [
              transformerNotationDiff(),
              transformerNotationHighlight(),
              transformerNotationWordHighlight(),
              transformerNotationFocus(),
              transformerCompactLineOptions(),
            ],
          },
        ],
      ];
      return options;
    },
  });
  return { ...result, TOC };
}
