import { withSentryConfig } from '@sentry/nextjs';

import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';

/**
 * Next.js 配置文件
 *
 * @todo
 * - CSP: 内容安全策略
 *   参考: https://chris.lu/web_development/tutorials/next-js-static-first-mdx-starterkit/content-security-policy
 */

const nextConfig = (phase) => {
  switch (phase) {
    case PHASE_DEVELOPMENT_SERVER:
      console.log(
        '\x1b[36m%s\x1b[0m',
        `🚀 当前环境：开发模式 ${PHASE_DEVELOPMENT_SERVER}`,
      );
      break;
    default:
      console.log('\x1b[33m%s\x1b[0m', `⚙️  当前 Next.js 配置阶段: ${phase}`);
  }
  const nextConfigOptions = {
    allowedDevOrigins: ['*'], // 允许的开发环境来源
    reactStrictMode: true, // 启用 React 严格模式，帮助发现潜在问题
    poweredByHeader: false, // 禁用 "X-Powered-By: Next.js" HTTP 响应头
    experimental: {
      typedRoutes: true, // 启用类型安全的路由系统
    },
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx', 'md'], // 定义页面文件的扩展名
    eslint: {
      ignoreDuringBuilds: true, // 构建时忽略 ESLint 错误
    },
    transpilePackages: ['next-mdx-remote'], // 需要被 Next.js 编译的外部依赖包
  };
  return nextConfigOptions;
};

/**
 * Sentry 配置选项
 * 详细文档：https://docs.sentry.io/platforms/javascript/guides/nextjs/
 *
 * - org: 基础配置
 * - project: 项目名称
 * - silent: 仅在 CI 环境中显示源码映射上传日志
 * - widenClientFileUpload: 上传更多源码映射以获得更详细的堆栈跟踪
 * - reactComponentAnnotation: 自动注释组件名称，优化面包屑和回放展示
 * - tunnelRoute: 通过重写路由绕过广告拦截器（可能增加服务器负载）
 * - disableLogger: 移除 Sentry 日志语句以减小包体积
 * - automaticVercelMonitors: 启用 Vercel Cron 监控自动检测
 */
export default withSentryConfig(nextConfig, {
  org: 'xiu-cg',
  project: 'blog',
  silent: !process.env.CI,
  widenClientFileUpload: true,
  reactComponentAnnotation: {
    enabled: true,
  },
  tunnelRoute: '/monitoring',
  disableLogger: true,
  automaticVercelMonitors: true,
});
