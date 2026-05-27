import { init, tanstackRouterBrowserTracingIntegration } from "@sentry/react";
import type { AnyRouter } from "@tanstack/react-router";

import { envs } from "@/shared/constants/envs";

import { getSentryAllowUrls } from "../utils/get-sentry-allow-urls";
import { isSentryEnabled } from "../utils/is-sentry-enabled";

/**
 * @see https://docs.sentry.io/platforms/javascript/guides/react/features/tanstack-router/
 * Router must exist before init — integration is passed into `integrations`.
 */
export function initSentry(router: AnyRouter) {
  if (!isSentryEnabled()) {
    return;
  }

  init({
    dsn: envs.VITE_GLITCHTIP_DSN,
    environment: envs.VITE_GLITCHTIP_ENVIRONMENT ?? envs.MODE,
    release: envs.VITE_GLITCHTIP_RELEASE,
    sendDefaultPii: false,
    tracesSampleRate: 0.1,
    integrations: [tanstackRouterBrowserTracingIntegration(router)],
    allowUrls: getSentryAllowUrls(),
  });
}
