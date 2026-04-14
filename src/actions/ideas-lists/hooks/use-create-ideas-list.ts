import { usePostApiV1IdeasLists } from "@/codegen/api/product";
import { isPaymentRequiredError } from "@/lib/api/utils/is-payment-required-error";
import { useToast } from "@/shared/hooks/use-toast";

export function useCreateIdeasList() {
  const { showErrorToast } = useToast();

  const { mutate: createIdeasList, isPending: isCreateIdeasListPending } =
    usePostApiV1IdeasLists({
      mutation: {
        onError: (error) => {
          const description = isPaymentRequiredError(error)
            ? "Недостаточно кредитов для генерации новых идей"
            : "Произошла ошибка при создании списка идей";

          showErrorToast({ description });
        },
      },
    });

  return {
    createIdeasList,
    isCreateIdeasListPending,
  };
}
