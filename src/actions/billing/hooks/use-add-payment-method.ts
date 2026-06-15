import { usePostApiV1BillingPaymentMethods } from "@/codegen/api/product";
import { useReachGoal } from "@/lib/yandex-metrika";
import { useToast } from "@/shared/hooks/use-toast";

export function useAddPaymentMethod() {
  const reachGoal = useReachGoal();
  const { showErrorToast } = useToast();

  const { mutate: addPaymentMethod, isPending: isAddPaymentMethodPending } =
    usePostApiV1BillingPaymentMethods({
      mutation: {
        onSuccess: ({ data }) => {
          reachGoal("payment-method-add");
          window.location.href = data.confirmationUrl;
        },
        onError: () => {
          showErrorToast({
            description:
              "Не удалось начать привязку способа оплаты. Попробуйте ещё раз",
          });
        },
      },
    });

  return {
    addPaymentMethod,
    isAddPaymentMethodPending,
  };
}
