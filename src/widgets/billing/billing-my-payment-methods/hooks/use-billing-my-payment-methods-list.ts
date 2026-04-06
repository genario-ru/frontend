import { useDeletePaymentMethod } from "@/actions/billing/hooks/use-delete-payment-method";
import { useGetMyPaymentMethods } from "@/actions/billing/hooks/use-get-my-payment-methods";

export function useBillingMyPaymentMethodsList() {
  const {
    myPaymentMethodsData,
    isMyPaymentMethodsLoading,
    isMyPaymentMethodsError,
  } = useGetMyPaymentMethods();

  const { deletePaymentMethod, isDeletePaymentMethodPending } =
    useDeletePaymentMethod();

  const paymentMethods = myPaymentMethodsData?.data ?? [];

  return {
    paymentMethods,
    isMyPaymentMethodsLoading,
    isMyPaymentMethodsError,
    deletePaymentMethod,
    isDeletePaymentMethodPending,
  };
}
