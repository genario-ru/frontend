import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useCallback, useMemo } from "react";

import {
  billingAppMenubarTabsDefinition,
  billingAppMenubarTabSlugs,
} from "../constants/billing-app-menubar-tabs";

type BillingAppMenubarTabItem = {
  slug: string;
  label: string;
  active: boolean;
};

function getBillingMenubarTabActive(
  tabSlug: string,
  pathname: string,
): boolean {
  if (tabSlug === billingAppMenubarTabSlugs.credits) {
    return pathname.includes("/billing/credits");
  }

  return !pathname.includes("/billing/credits");
}

export function useBillingAppMenubarTabs() {
  const navigate = useNavigate();

  const pathname = useRouterState({
    select: (routerState) => routerState.location.pathname,
  });

  const tabs: BillingAppMenubarTabItem[] = useMemo(
    () =>
      billingAppMenubarTabsDefinition.map((tabDefinition) => ({
        slug: tabDefinition.slug,
        label: tabDefinition.label,
        active: getBillingMenubarTabActive(tabDefinition.slug, pathname),
      })),
    [pathname],
  );

  const activeTab = useMemo(() => {
    return tabs.find((tab) => tab.active);
  }, [tabs]);

  const handleTabClick = useCallback(
    (nextSlug: string) => {
      const tabDefinition = billingAppMenubarTabsDefinition.find(
        (item) => item.slug === nextSlug,
      );

      if (!tabDefinition) {
        return;
      }

      navigate({ to: tabDefinition.to });
    },
    [navigate],
  );

  return {
    tabs,
    activeTab,
    handleTabClick,
  };
}
