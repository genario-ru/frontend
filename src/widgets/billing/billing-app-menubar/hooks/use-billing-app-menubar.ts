import { useRouterState } from "@tanstack/react-router";

import { useBreakpoints } from "@/shared/hooks/use-breakpoints";

import { getBillingLayoutTitle } from "../utils/get-billing-layout-title";

export function useBillingAppMenubar() {
  const { isMobile } = useBreakpoints();

  const pathname = useRouterState({
    select: (routerState) => routerState.location.pathname,
  });

  const title = getBillingLayoutTitle(pathname);

  return {
    title,
    isMobile,
  };
}
