import { PlusIcon } from "lucide-react";

import { Button } from "@/shared/components/ui/button";

import { useBillingMyPaymentMethodsActions } from "../hooks/use-billing-my-payment-methods-actions";

export function BillingMyPaymentMethodsActions() {
  const { addPaymentMethod, isAddPaymentMethodPending } =
    useBillingMyPaymentMethodsActions();

  return (
    <div className="flex w-full items-center justify-end">
      <Button
        variant="neutral"
        priority="secondary"
        size="sm"
        icon={<PlusIcon />}
        iconPosition="right"
        state={isAddPaymentMethodPending ? "loading" : "default"}
        onClick={() =>
          addPaymentMethod({
            data: { redirectPath: window.location.pathname },
          })
        }
      >
        Привязать новую карту
      </Button>
    </div>
  );
}
