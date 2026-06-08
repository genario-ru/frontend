import { usePostApiV1CreditsPackagesInitiatePayment } from "@/codegen/api/product";

export function useInitiateCreditsPackagePayment() {
  const {
    mutate: initiateCreditsPackagePayment,
    isPending: isInitiateCreditsPackagePaymentPending,
    isError: isInitiateCreditsPackagePaymentError,
    isSuccess: isInitiateCreditsPackagePaymentSuccess,
  } = usePostApiV1CreditsPackagesInitiatePayment();

  return {
    isInitiateCreditsPackagePaymentPending,
    isInitiateCreditsPackagePaymentError,
    isInitiateCreditsPackagePaymentSuccess,
    initiateCreditsPackagePayment,
  };
}
