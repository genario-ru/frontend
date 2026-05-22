import { usePostApiV1CreditsPackagesInitiatePayment } from "@/codegen/api/product";
import { useToast } from "@/shared/hooks/use-toast";

export function useInitiateCreditsPackagePayment() {
  const { showErrorToast } = useToast();

  const {
    mutate: initiateCreditsPackagePayment,
    isPending: isInitiateCreditsPackagePaymentPending,
    isError: isInitiateCreditsPackagePaymentError,
    isSuccess: isInitiateCreditsPackagePaymentSuccess,
  } = usePostApiV1CreditsPackagesInitiatePayment({
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
    isInitiateCreditsPackagePaymentPending,
    isInitiateCreditsPackagePaymentError,
    isInitiateCreditsPackagePaymentSuccess,
    initiateCreditsPackagePayment,
  };
}
