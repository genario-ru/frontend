import { Island } from "@/shared/components/ui/island";
import { ScrollContainer } from "@/shared/components/ui/scroll-container";

import { useBillingMyPaymentMethods } from "../hooks/use-billing-my-payment-methods";
import { BillingMyPaymentMethodsActions } from "./billing-my-payment-methods-actions";
import { BillingMyPaymentMethodsHeader } from "./billing-my-payment-methods-header";
import { BillingMyPaymentMethodsList } from "./billing-my-payment-methods-list";

export function BillingMyPaymentMethods() {
  const { isScrolled, scrollContainerRef } = useBillingMyPaymentMethods();

  return (
    <ScrollContainer
      outerProps={{ className: "rounded-4 flex-1 bg-neutral-1" }}
      innerProps={{ ref: scrollContainerRef }}
    >
      <BillingMyPaymentMethodsHeader hasShadow={isScrolled} />
      <Island grow roundedBottom={false} roundedTop={false} className="pt-0">
        <BillingMyPaymentMethodsList />
        <BillingMyPaymentMethodsActions />
      </Island>
    </ScrollContainer>
  );
}
