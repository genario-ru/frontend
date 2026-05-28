import * as Sentry from "@sentry/react";
import type { ErrorInfo } from "react";

import { isSentryEnabled } from "../utils/is-sentry-enabled";

type SentryRouterOnCatch = (error: Error, errorInfo: ErrorInfo) => void;
type OptionalSentryRouterOnCatch = SentryRouterOnCatch | undefined;

export function getSentryRouterOnCatch(): OptionalSentryRouterOnCatch {
  if (isSentryEnabled()) {
    return Sentry.reactErrorHandler();
  }
}
