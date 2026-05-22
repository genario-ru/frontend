import { usePostApiV1SubscriptionsInitiatePayment } from "@/codegen/api/product";
import { useToast } from "@/shared/hooks/use-toast";

export function useInitiateSubscriptionPayment() {
  const { showErrorToast } = useToast();

  const {
    mutate: initiateSubscriptionPayment,
    isPending: isInitiateSubscriptionPaymentPending,
    isError: isInitiateSubscriptionPaymentError,
    isSuccess: isInitiateSubscriptionPaymentSuccess,
  } = usePostApiV1SubscriptionsInitiatePayment({
    mutation: {
      onError: () => {
        showErrorToast({
          description:
            "Не удалось инициировать оплату. Попробуйте ещё раз чуть позже",
        });
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
