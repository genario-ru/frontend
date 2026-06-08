import { usePostApiV1SubscriptionsInitiatePayment } from "@/codegen/api/product";

export function useInitiateSubscriptionPayment() {
  const {
    mutate: initiateSubscriptionPayment,
    isPending: isInitiateSubscriptionPaymentPending,
    isError: isInitiateSubscriptionPaymentError,
    isSuccess: isInitiateSubscriptionPaymentSuccess,
  } = usePostApiV1SubscriptionsInitiatePayment();

  return {
    isInitiateSubscriptionPaymentPending,
    isInitiateSubscriptionPaymentError,
    isInitiateSubscriptionPaymentSuccess,
    initiateSubscriptionPayment,
  };
}
