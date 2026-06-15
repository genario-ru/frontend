import { usePostApiV1SubscriptionsInitiatePayment } from "@/codegen/api/product";
import { useReachGoal } from "@/lib/yandex-metrika";

export function useInitiateSubscriptionPayment() {
  const reachGoal = useReachGoal();

  const {
    mutate: initiateSubscriptionPayment,
    isPending: isInitiateSubscriptionPaymentPending,
    isError: isInitiateSubscriptionPaymentError,
    isSuccess: isInitiateSubscriptionPaymentSuccess,
  } = usePostApiV1SubscriptionsInitiatePayment({
    mutation: {
      onSuccess: (_data, variables) => {
        const goal = variables.data.trialTariffSlug
          ? "trial-payment-start"
          : "subscription-payment-start";

        reachGoal(goal);
      },
    },
  });

  return {
    isInitiateSubscriptionPaymentPending,
    isInitiateSubscriptionPaymentError,
    isInitiateSubscriptionPaymentSuccess,
    initiateSubscriptionPayment,
  };
}
