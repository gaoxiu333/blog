import { withSentryConfig } from "@sentry/nextjs";
import createMdx from "@next/mdx";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeMDXImportMedia from "rehype-mdx-import-media";
import rehypeSlug from "rehype-slug";
import { remarkTableOfContents } from "remark-table-of-contents";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

const nextConfig = (phase) => {
  /** @type {import('rehype-pretty-code').Options} */
  const rehypePrettyCodeOptions = {
    theme: "github-dark", // 自定义主题：https://chris.lu/web_development/tutorials/next-js-static-first-mdx-starterkit/code-highlighting-plugin#using-a-vscode-theme-from-a-git-repository
    keepBackground: false,
  };

  /** @type {import('remark-table-of-contents').IRemarkTableOfContentsOptions} */
  const remarkTableOfContentsOptions = {
    containerAttributes: {
      id: "articleToc",
    },
    navAttributes: {
      "aria-label": "table of contents",
    },
    maxDepth: 3,
  };

  const withMDX = createMdx({
    extension: /\.mdx?$/,
    options: {
      remarkPlugins: [
        remarkFrontmatter,
        remarkMdxFrontmatter,
        remarkGfm,
        [remarkTableOfContents, remarkTableOfContentsOptions],
      ],

      rehypePlugins: [
        [rehypePrettyCode, rehypePrettyCodeOptions],
        rehypeSlug,

        rehypeMDXImportMedia,
      ],
    },
  });
  switch (phase) {
    case PHASE_DEVELOPMENT_SERVER:
      console.log("开发环境");
      break;
    default:
      console.log("next config mode:", phase);
  }
  const nextConfigOptions = {
    reactStrictMode: true,

    poweredByHeader: false,
    experimental: {
      typedRoutes: true,
      // mdxRs: true, // 启用 rust 编译 mdx
      // mdxRs: {
      //   mdxType: "gfm",
      // },
    },
    pageExtensions: ["js", "jsx", "ts", "tsx", "mdx", "md"],

    // headers: async () => {
    //   return [
    //     {
    //       source: "/(*)",
    //       headers: securityHeadersConfig(phase),
    //     },
    //   ];
    // },
    eslint: {
      ignoreDuringBuilds: true,
    },
  };
  return withMDX(nextConfigOptions);
};

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options
  // 拓展：https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#extend-your-nextjs-configuration

  org: "xiu-cg",
  project: "blog",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Automatically annotate React components to show their full name in breadcrumbs and session replay
  reactComponentAnnotation: {
    enabled: true,
  },

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/monitoring",

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});

// CSP: 内容安全策略->https://chris.lu/web_development/tutorials/next-js-static-first-mdx-starterkit/content-security-policy
