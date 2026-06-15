import { usePostApiV1CreditsPackagesInitiatePayment } from "@/codegen/api/product";
import { useReachGoal } from "@/lib/yandex-metrika";

export function useInitiateCreditsPackagePayment() {
  const reachGoal = useReachGoal();

  const {
    mutate: initiateCreditsPackagePayment,
    isPending: isInitiateCreditsPackagePaymentPending,
    isError: isInitiateCreditsPackagePaymentError,
    isSuccess: isInitiateCreditsPackagePaymentSuccess,
  } = usePostApiV1CreditsPackagesInitiatePayment({
    mutation: {
      onSuccess: () => reachGoal("credits-package-payment-start"),
    },
  });

  return {
    isInitiateCreditsPackagePaymentPending,
    isInitiateCreditsPackagePaymentError,
    isInitiateCreditsPackagePaymentSuccess,
    initiateCreditsPackagePayment,
  };
}
