// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
import * as Sentry from '@sentry/nextjs';

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

  // Add optional integrations for additional features
  integrations: [Sentry.replayIntegration()],

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: tracesSampleRate,

  // Define how likely Replay events are sampled.
  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: replaysOnErrorSampleRate,

  // Define how likely Replay events are sampled when an error occurs.
  replaysOnErrorSampleRate: 0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
  environment: process.env.NODE_ENV ? process.env.NODE_ENV : '',
});
