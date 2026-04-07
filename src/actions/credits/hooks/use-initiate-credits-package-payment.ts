import { useQueryClient } from "@tanstack/react-query";

import {
  getApiV1CreditsBatchesMyQueryKey,
  usePostApiV1CreditsPackagesInitiatePayment,
} from "@/codegen/api/product";
import { useToast } from "@/shared/hooks/use-toast";

export function useInitiateCreditsPackagePayment() {
  const queryClient = useQueryClient();
  const { showErrorToast } = useToast();

  const {
    mutate: initiateCreditsPackagePayment,
    isPending: isInitiateCreditsPackagePaymentPending,
  } = usePostApiV1CreditsPackagesInitiatePayment({
    mutation: {
      onSuccess: ({ data }) => {
        queryClient.invalidateQueries({
          queryKey: getApiV1CreditsBatchesMyQueryKey(),
        });
        queryClient.invalidateQueries({
          predicate: (q) =>
            Array.isArray(q.queryKey) &&
            (q.queryKey[0] as { url?: string })?.url ===
              "/api/v1/credits/usage/my",
        });
        window.location.href = data.paymentLink;
      },
      onError: () => {
        showErrorToast({
          description: "Не удалось перейти к оплате. Попробуйте ещё раз",
        });
      },
    },
  });

  return {
    initiateCreditsPackagePayment,
    isInitiateCreditsPackagePaymentPending,
  };
}
