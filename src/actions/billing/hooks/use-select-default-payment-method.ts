import { useQueryClient } from "@tanstack/react-query";

import {
  getApiV1BillingPaymentMethodsMyQueryKey,
  type GetApiV1BillingPaymentMethodsMyQueryResponse,
  usePatchApiV1BillingPaymentMethodsByPaymentMethodIdDefault,
} from "@/codegen/api/product";
import { useToast } from "@/shared/hooks/use-toast";

type SelectDefaultPaymentMethodContext = {
  previousMyPaymentMethodsData?: GetApiV1BillingPaymentMethodsMyQueryResponse;
};

export function useSelectDefaultPaymentMethod() {
  const queryClient = useQueryClient();
  const { showSuccessToast, showErrorToast } = useToast();
  const myPaymentMethodsQueryKey = getApiV1BillingPaymentMethodsMyQueryKey();

  const {
    mutate: selectDefaultPaymentMethod,
    isPending: isSelectDefaultPaymentMethodPending,
  } =
    usePatchApiV1BillingPaymentMethodsByPaymentMethodIdDefault<SelectDefaultPaymentMethodContext>(
      {
        mutation: {
          onMutate: async ({ paymentMethodId }) => {
            await queryClient.cancelQueries({
              queryKey: myPaymentMethodsQueryKey,
            });

            const previousMyPaymentMethodsData =
              queryClient.getQueryData<GetApiV1BillingPaymentMethodsMyQueryResponse>(
                myPaymentMethodsQueryKey,
              );

            queryClient.setQueryData<GetApiV1BillingPaymentMethodsMyQueryResponse>(
              myPaymentMethodsQueryKey,
              (currentMyPaymentMethodsData) => {
                if (!currentMyPaymentMethodsData)
                  return currentMyPaymentMethodsData;

                return {
                  ...currentMyPaymentMethodsData,
                  data: currentMyPaymentMethodsData.data.map(
                    (paymentMethod) => ({
                      ...paymentMethod,
                      default: paymentMethod.id === paymentMethodId,
                    }),
                  ),
                };
              },
            );

            return { previousMyPaymentMethodsData };
          },
          onSuccess: () => {
            showSuccessToast({
              title: "Способ оплаты обновлен",
              description: "Способ оплаты выбран основным",
            });
          },
          onError: (_error, _variables, context) => {
            if (context?.previousMyPaymentMethodsData) {
              queryClient.setQueryData(
                myPaymentMethodsQueryKey,
                context.previousMyPaymentMethodsData,
              );
            }

            showErrorToast({
              description:
                "Не удалось выбрать основной способ оплаты. Попробуйте еще раз",
            });
          },
          onSettled: () => {
            queryClient.invalidateQueries({
              queryKey: myPaymentMethodsQueryKey,
            });
          },
        },
      },
    );

  return {
    selectDefaultPaymentMethod,
    isSelectDefaultPaymentMethodPending,
  };
}
