import type { QueryClient } from "@tanstack/react-query";
import { createRouter as createTanstackRouter } from "@tanstack/react-router";

import { routeTree } from "@/codegen/router/route-tree.gen";
import { createSentryRouterOnCatch } from "@/lib/sentry";

import { createRouterContext } from "./create-router-context";

type CreateRouterParams = {
  queryClient: QueryClient;
};

export function createRouter({ queryClient }: CreateRouterParams) {
  const routerContext = createRouterContext({ queryClient });

  return createTanstackRouter({
    routeTree,
    context: routerContext,
    unmaskOnReload: false,
    scrollRestoration: true,
    scrollToTopSelectors: ["#root"],
    defaultPreload: "intent",
    defaultStructuralSharing: true,
    defaultPreloadStaleTime: 0,
    defaultPendingMs: 0,
    defaultPendingMinMs: 0,
    defaultOnCatch: createSentryRouterOnCatch(),
  });
}
