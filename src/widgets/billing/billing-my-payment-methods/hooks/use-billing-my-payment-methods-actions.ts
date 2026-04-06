import { useAddPaymentMethod } from "@/actions/billing/hooks/use-add-payment-method";

export function useBillingMyPaymentMethodsActions() {
  const { addPaymentMethod, isAddPaymentMethodPending } = useAddPaymentMethod();

  return {
    addPaymentMethod,
    isAddPaymentMethodPending,
  };
}
