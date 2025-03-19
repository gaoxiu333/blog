import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";
import createMdx from "@next/mdx";

import { PHASE_DEVELOPMENT_SERVER } from "next/dist/shared/lib/constants";

const nextConfig: NextConfig = (phase: string) => {
  const withMDX = createMdx({
    extension: /\.mdx?$/,
    options: {
      remarkPlugins: [],
      rehypePlugins: [],
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
  } as NextConfig;
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
const securityHeadersConfig = (phase: string) => {
  const cspReportOnly = true;

  const cspHeader = () => {
    const upgradeInsecure =
      phase !== PHASE_DEVELOPMENT_SERVER && !cspReportOnly
        ? "upgrade-insecure-requests;"
        : "";

    // worker-src is for sentry replay
    // child-src is because safari <= 15.4 does not support worker-src
    const defaultCSPDirectives = `
            default-src 'none';
            media-src 'self';
            object-src 'none';
            worker-src 'self' blob:;
            child-src 'self' blob:;
            manifest-src 'self';
            base-uri 'none';
            form-action 'none';
            frame-ancestors 'none';
            ${upgradeInsecure}
        `;

    // when environment is preview enable unsafe-inline scripts for vercel preview feedback/comments feature
    // and allow vercel's domains based on:
    // https://vercel.com/docs/workflow-collaboration/comments/specialized-usage#using-a-content-security-policy
    // and allow also vitals.vercel-insights
    // based on: https://vercel.com/docs/speed-insights#content-security-policy
    if (process.env.VERCEL_ENV === "preview") {
      return `
                ${defaultCSPDirectives}
                font-src 'self' https://vercel.live/ https://assets.vercel.com https://fonts.gstatic.com;
                style-src 'self' 'unsafe-inline' https://vercel.live/fonts;
                script-src 'self' 'unsafe-inline' https://vercel.live/;
                connect-src 'self' https://vercel.live/ https://vitals.vercel-insights.com https://*.pusher.com/ wss://*.pusher.com/;
                img-src 'self' data: https://vercel.com/ https://vercel.live/;
                frame-src 'self' https://vercel.live/;
            `;
    }

    // for production environment allowing vitals.vercel-insights.com
    // based on: https://vercel.com/docs/speed-insights#content-security-policy
    if (process.env.VERCEL_ENV === "production") {
      return `
                ${defaultCSPDirectives}
                font-src 'self';
                style-src 'self' 'unsafe-inline';
                script-src 'self' 'unsafe-inline';
                connect-src 'self' https://vitals.vercel-insights.com;
                img-src 'self' data:;
                frame-src 'none';
            `;
    }

    // for dev environment enable unsafe-eval for hot-reload
    return `
            ${defaultCSPDirectives}
            font-src 'self';
            style-src 'self' 'unsafe-inline';
            script-src 'self' 'unsafe-inline' 'unsafe-eval';
            connect-src 'self';
            img-src 'self' data:;
            frame-src 'none';
        `;
  };
  const headers = [
    {
      key: cspReportOnly
        ? "Content-Security-Policy-Report-Only"
        : "Content-Security-Policy",
      value: cspHeader().replace(/\n/g, ""),
    },
  ];

  return headers;
};
