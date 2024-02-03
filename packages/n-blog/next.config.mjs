import remarkGfm from "remark-gfm";
import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
};

// 这里的配置针对哪个依赖？现在设置似乎无效，尤其是代码高亮那段。
// TODO 目录
const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    // rehypePlugins: [rehypeHighlight],
  },
});

export default withMDX(nextConfig);
