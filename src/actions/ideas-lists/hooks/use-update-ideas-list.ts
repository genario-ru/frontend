import { usePatchApiV1IdeasListsByIdeasListId } from "@/codegen/api/product";
import { isPaymentRequiredError } from "@/lib/api/utils/is-payment-required-error";
import { useToast } from "@/shared/hooks/use-toast";

export function useUpdateIdeasList() {
  const { showErrorToast } = useToast();

  const { mutate: updateIdeasList, isPending: isUpdateIdeasListPending } =
    usePatchApiV1IdeasListsByIdeasListId({
      mutation: {
        onError: (error) => {
          const description = isPaymentRequiredError(error)
            ? "Недостаточно кредитов для генерации новых идей"
            : "Произошла ошибка при обновлении списка идей";

          showErrorToast({ description });
        },
      },
    });

  return {
    updateIdeasList,
    isUpdateIdeasListPending,
  };
}
