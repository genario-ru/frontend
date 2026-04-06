import { useQueryClient } from "@tanstack/react-query";

import {
  getApiV1BillingPaymentMethodsMyQueryKey,
  useDeleteApiV1BillingPaymentMethodsByPaymentMethodId,
} from "@/codegen/api/product";
import { useToast } from "@/shared/hooks/use-toast";

export function useDeletePaymentMethod() {
  const queryClient = useQueryClient();
  const { showSuccessToast, showErrorToast } = useToast();

  const {
    mutate: deletePaymentMethod,
    isPending: isDeletePaymentMethodPending,
  } = useDeleteApiV1BillingPaymentMethodsByPaymentMethodId({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: getApiV1BillingPaymentMethodsMyQueryKey(),
        });

        showSuccessToast({
          title: "Способ оплаты удалён",
          description: "Способ оплаты был успешно удалён",
        });
      },
      onError: () => {
        showErrorToast({
          description: "Не удалось удалить способ оплаты. Попробуйте ещё раз",
        });
      },
    },
  });

  return {
    deletePaymentMethod,
    isDeletePaymentMethodPending,
  };
}
