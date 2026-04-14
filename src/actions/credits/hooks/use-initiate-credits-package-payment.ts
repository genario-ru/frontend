import { usePostApiV1CreditsPackagesInitiatePayment } from "@/codegen/api/product";
import { useToast } from "@/shared/hooks/use-toast";

export function useInitiateCreditsPackagePayment() {
  const { showErrorToast } = useToast();

  const {
    mutate: initiateCreditsPackagePayment,
    isPending: isInitiateCreditsPackagePaymentPending,
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
    initiateCreditsPackagePayment,
    isInitiateCreditsPackagePaymentPending,
  };
}
