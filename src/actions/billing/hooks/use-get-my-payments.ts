import { useGetApiV1BillingPaymentsMy } from "@/codegen/api/product";

export function useGetMyPayments() {
  const {
    data: myPaymentsData,
    isLoading: isMyPaymentsLoading,
    isError: isMyPaymentsError,
  } = useGetApiV1BillingPaymentsMy();

  return {
    myPaymentsData,
    isMyPaymentsLoading,
    isMyPaymentsError,
  };
}
