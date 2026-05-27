import { captureException, withScope } from "@sentry/react";
import type { ErrorInfo } from "react";

import { shouldReportRouteError } from "../utils/should-report-route-error";

export function createSentryRouterOnCatch() {
  return (error: Error, errorInfo?: ErrorInfo) => {
    if (!shouldReportRouteError(error)) {
      return;
    }

    withScope((scope) => {
      scope.setTag("area", "router");

      if (errorInfo?.componentStack) {
        scope.setContext("react", {
          componentStack: errorInfo.componentStack,
        });
      }

      captureException(error);
    });
  };
}
