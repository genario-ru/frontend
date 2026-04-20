import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { BillingMyPaymentMethods } from "@/widgets/billing/billing-my-payment-methods/components/billing-my-payment-methods";
import { BillingMyRecentOperations } from "@/widgets/billing/billing-my-recent-operations/components/billing-my-recent-operations";
import { BillingMySubscriptions } from "@/widgets/billing/billing-my-subscriptions/components/billing-my-subscriptions";

export function BillingComponent() {
  return (
    <ContentLayout size="md" className="gap-2">
      <BillingMySubscriptions />
      <BillingMyPaymentMethods />
      <BillingMyRecentOperations />
    </ContentLayout>
  );
}
