import { useRouterState } from "@tanstack/react-router";

import { AppMenubar } from "@/features/navigation/app-menubar/components/app-menubar";

import { getBillingLayoutTitle } from "../utils/get-billing-layout-title";
import { BillingAppMenubarTabs } from "./billing-app-menubar-tabs";

export function BillingAppMenubar() {
  const pathname = useRouterState({
    select: (routerState) => routerState.location.pathname,
  });

  const title = getBillingLayoutTitle(pathname);

  return <AppMenubar title={title} right={<BillingAppMenubarTabs />} />;
}
