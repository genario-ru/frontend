import { usePostApiV1SubscriptionsInitiatePayment } from "@/codegen/api/product";
import { useToast } from "@/shared/hooks/use-toast";

export function useInitiateSubscriptionPayment() {
  const { showErrorToast } = useToast();

  const {
    mutate: initiateSubscriptionPayment,
    isPending: isInitiateSubscriptionPaymentPending,
  } = usePostApiV1SubscriptionsInitiatePayment({
    mutation: {
      onSuccess: ({ data }) => {
        window.location.href = data.paymentLink;
      },
      onError: () => {
        showErrorToast({
          description: "Не удалось инициировать оплату. Попробуйте ещё раз",
        });
      },
    },
  });

  return {
    initiateSubscriptionPayment,
    isInitiateSubscriptionPaymentPending,
  };
}
