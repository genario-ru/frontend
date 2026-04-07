import { Outlet } from "@tanstack/react-router";

import { PageLayout } from "@/shared/components/layouts/page-layout";
import { BillingAppMenubar } from "@/widgets/billing/billing-app-menubar/components/billing-app-menubar";

export function BillingLayoutComponent() {
  return (
    <>
      <BillingAppMenubar />
      <PageLayout className="flex-1">
        <Outlet />
      </PageLayout>
    </>
  );
}
