import { Island } from "@/shared/components/ui/island";

import { BillingMySubscriptionsActions } from "./billing-my-subscriptions-actions";
import { BillingMySubscriptionsList } from "./billing-my-subscriptions-list";

export function BillingMySubscriptions() {
  return (
    <Island title="Мой тариф">
      <BillingMySubscriptionsList />
      <BillingMySubscriptionsActions />
    </Island>
  );
}
