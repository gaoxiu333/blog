// 此文件配置了 Sentry 在服务器端的初始化。
// 当代码在服务器上运行时，这里的配置将被使用。
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
import * as Sentry from '@sentry/nextjs';

// 在生产环境中启用跟踪采样，在开发环境中禁用
const tracesSampleRate = process.env.NODE_ENV === 'production' ? 0.1 : 0;

Sentry.init({
  dsn: 'https://a40e7d7594b92de658ceb16927818d02@o4507161283854336.ingest.us.sentry.io/4508984892063744',

  // 定义采样跟踪的可能性。在生产环境中调整此值，或使用 tracesSampler 以获得更好的控制。
  tracesSampleRate,

  // 将此选项设置为 true 将在设置 Sentry 时在控制台打印有用的信息
  debug: false,
  environment: process.env.NODE_ENV ? process.env.NODE_ENV : '',
});
