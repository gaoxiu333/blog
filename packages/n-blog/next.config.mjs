import remarkGfm from "remark-gfm";
import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  // 处理SVG：将SVG转为React组件
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg"),
    );
    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ },
        use: ["@svgr/webpack"],
      },
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
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
