import { usePostApiV1IdeasListsByIdeasListIdMoreIdeas } from "@/codegen/api/product";
import { isPaymentRequiredError } from "@/lib/api/utils/is-payment-required-error";
import { useReachGoal } from "@/lib/yandex-metrika";
import { useToast } from "@/shared/hooks/use-toast";

export function useGenerateMoreIdeas() {
  const reachGoal = useReachGoal();
  const { showErrorToast } = useToast();

  const { mutate: generateMoreIdeas, isPending: isGenerateMoreIdeasPending } =
    usePostApiV1IdeasListsByIdeasListIdMoreIdeas({
      mutation: {
        onSuccess: () => reachGoal("ideas-list-more-ideas-request"),
        onError: (error) => {
          const description = isPaymentRequiredError(error)
            ? "Недостаточно кредитов для генерации новых идей"
            : "Произошла ошибка при генерации больше идей";

          showErrorToast({ description });
        },
      },
    });

  return {
    generateMoreIdeas,
    isGenerateMoreIdeasPending,
  };
}
