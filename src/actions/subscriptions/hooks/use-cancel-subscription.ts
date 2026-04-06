import { useQueryClient } from "@tanstack/react-query";

import {
  getApiV1SubscriptonsMyQueryKey,
  usePostApiV1SubscriptionsBySubscriptionIdCancel,
} from "@/codegen/api/product";
import { useToast } from "@/shared/hooks/use-toast";

export function useCancelSubscription() {
  const queryClient = useQueryClient();
  const { showSuccessToast, showErrorToast } = useToast();

  const { mutate: cancelSubscription, isPending: isCancelSubscriptionPending } =
    usePostApiV1SubscriptionsBySubscriptionIdCancel({
      mutation: {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: getApiV1SubscriptonsMyQueryKey(),
          });

          showSuccessToast({
            title: "Подписка отменена",
            description: "Подписка будет активна до конца оплаченного периода",
          });
        },
        onError: () => {
          showErrorToast({
            description: "Не удалось отменить подписку. Попробуйте ещё раз",
          });
        },
      },
    });

  return {
    cancelSubscription,
    isCancelSubscriptionPending,
  };
}
