import { useGetApiV1BillingPaymentMethodsMy } from "@/codegen/api/product";

export function useGetMyPaymentMethods() {
  const {
    data: myPaymentMethodsData,
    isLoading: isMyPaymentMethodsLoading,
    isError: isMyPaymentMethodsError,
  } = useGetApiV1BillingPaymentMethodsMy();

  return {
    myPaymentMethodsData,
    isMyPaymentMethodsLoading,
    isMyPaymentMethodsError,
  };
}
