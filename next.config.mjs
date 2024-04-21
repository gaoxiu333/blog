/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "standalone",
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  webpack(config) {
    // 处理SVG：将SVG转为React组件
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
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
      }
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com", // 允许github的图片
      },
    ],
  },
};

export default nextConfig;
