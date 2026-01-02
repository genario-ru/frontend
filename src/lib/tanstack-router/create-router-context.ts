import type { QueryClient } from "@tanstack/react-query";

import type { RouterContext } from "./types";

type CreateRouterContextParams = {
  queryClient: QueryClient;
};

export function createRouterContext({
  queryClient,
}: CreateRouterContextParams) {
  const routerContext: RouterContext = {
    queryClient,
  };

  return routerContext;
}
