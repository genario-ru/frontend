import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { PageLayout } from "@/shared/components/layouts/page-layout";
import { BillingAppMenubar } from "@/widgets/billing/billing-app-menubar/components/billing-app-menubar";
import { BillingMyPaymentMethods } from "@/widgets/billing/billing-my-payment-methods/components/billing-my-payment-methods";
import { BillingMyRecentOperations } from "@/widgets/billing/billing-my-recent-operations/components/billing-my-recent-operations";
import { BillingMySubscriptions } from "@/widgets/billing/billing-my-subscriptions/components/billing-my-subscriptions";

export function BillingComponent() {
  return (
    <>
      <BillingAppMenubar />
      <PageLayout>
        <ContentLayout size="md" className="gap-4">
          <BillingMySubscriptions />
          <BillingMyPaymentMethods />
          <BillingMyRecentOperations />
        </ContentLayout>
      </PageLayout>
    </>
  );
}
