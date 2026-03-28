import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { PageLayout } from "@/shared/components/layouts/page-layout";
import { BillingAppMenubar } from "@/widgets/billing/billing-app-menubar/components/billing-app-menubar";

export function BillingComponent() {
  return (
    <>
      <BillingAppMenubar />
      <PageLayout>
        <ContentLayout className="flex-1">Billing content</ContentLayout>
      </PageLayout>
    </>
  );
}
