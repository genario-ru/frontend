import { useGetApiV1BillingPaymentsByPaymentId } from "@/codegen/api/product";

const REFETCH_INTERVAL = 3000;

type UseGetPaymentParams = {
  paymentId?: string;
  refetchOnPending?: boolean;
};

export function useGetPayment({
  paymentId,
  refetchOnPending = false,
}: UseGetPaymentParams) {
  const {
    data: paymentData,
    isFetching: isPaymentFetching,
    isLoading: isPaymentLoading,
    isError: isPaymentError,
    isSuccess: isPaymentSuccess,
  } = useGetApiV1BillingPaymentsByPaymentId(
    { paymentId: paymentId as string },
    {
      query: {
        enabled: Boolean(paymentId),
        refetchInterval: (query) => {
          const isPaymentPending = query.state.data?.data.status === "pending";

          const isPaymentSubscriptionPending =
            query.state.data?.data.subscription?.status === "pending";

          const isPendingStatus =
            isPaymentPending || isPaymentSubscriptionPending;

          if (refetchOnPending && isPendingStatus) {
            return REFETCH_INTERVAL;
          }

          return false;
        },
      },
    },
  );

  return {
    paymentData,
    isPaymentFetching,
    isPaymentLoading,
    isPaymentError,
    isPaymentSuccess,
  };
}
