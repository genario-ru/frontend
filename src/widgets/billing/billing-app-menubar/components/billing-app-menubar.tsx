import { useMemo } from "react";

import { AppMenubar } from "@/features/navigation/app-menubar/components/app-menubar";
import { AppDrawer } from "@/widgets/navigation/app-drawer/components/app-drawer";

import { useBillingAppMenubar } from "../hooks/use-billing-app-menubar";
import { BillingAppMenubarTabs } from "./billing-app-menubar-tabs";

export function BillingAppMenubar() {
  const { title, isMobile } = useBillingAppMenubar();

  const actions = useMemo(() => {
    if (isMobile) {
      return <AppDrawer />;
    }
  }, [isMobile]);

  const right = useMemo(() => {
    if (!isMobile) {
      return <BillingAppMenubarTabs />;
    }
  }, [isMobile]);

  const bottom = useMemo(() => {
    if (isMobile) {
      return <BillingAppMenubarTabs expand />;
    }
  }, [isMobile]);

  return (
    <AppMenubar actions={actions} title={title} right={right} bottom={bottom} />
  );
}
