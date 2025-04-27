// 此文件配置了 Sentry 在客户端的初始化。
// 当用户在浏览器中加载页面时，这里的配置将被使用。
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
import * as Sentry from '@sentry/nextjs';

console.log('🚀 sentry.client.config.ts 执行了！');
let replaysOnErrorSampleRate = 0;
let tracesSampleRate = 0.1;

if (process.env.NODE_ENV === 'production') {
  replaysOnErrorSampleRate = 1;
}

if (process.env.NODE_ENV === 'development') {
  tracesSampleRate = 0;
}

Sentry.init({
  dsn: 'https://a40e7d7594b92de658ceb16927818d02@o4507161283854336.ingest.us.sentry.io/4508984892063744',

  // 添加可选的集成以获得额外功能
  integrations: [Sentry.replayIntegration()],

  // 定义采样跟踪的可能性。在生产环境中调整此值，或使用 tracesSampler 以获得更好的控制。
  tracesSampleRate: tracesSampleRate,

  // 定义 Replay 事件被采样的可能性。
  // 这将采样率设置为10%。在开发环境中你可能希望将其设置为100%，
  // 而在生产环境中使用较低的采样率
  replaysSessionSampleRate: replaysOnErrorSampleRate,

  // 定义发生错误时 Replay 事件被采样的可能性
  replaysOnErrorSampleRate: 0,

  // 将此选项设置为 true 将在设置 Sentry 时在控制台打印有用的信息
  debug: false,
  environment: process.env.NODE_ENV ? process.env.NODE_ENV : '',
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
