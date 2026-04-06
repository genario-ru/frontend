import { Island } from "@/shared/components/ui/island";

import { BillingMyPaymentMethodsActions } from "./billing-my-payment-methods-actions";
import { BillingMyPaymentMethodsList } from "./billing-my-payment-methods-list";

export function BillingMyPaymentMethods() {
  return (
    <Island title="Способы оплаты">
      <BillingMyPaymentMethodsList />
      <BillingMyPaymentMethodsActions />
    </Island>
  );
}
