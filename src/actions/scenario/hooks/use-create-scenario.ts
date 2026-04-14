import { usePostApiV1Scenarios } from "@/codegen/api/product";
import { isPaymentRequiredError } from "@/lib/api/utils/is-payment-required-error";
import { useToast } from "@/shared/hooks/use-toast";

export function useCreateScenario() {
  const { showErrorToast } = useToast();

  const { mutate: createScenario, isPending: isCreateScenarioPending } =
    usePostApiV1Scenarios({
      mutation: {
        onError: (error) => {
          const description = isPaymentRequiredError(error)
            ? "Недостаточно кредитов для генерации нового сценария"
            : "Произошла ошибка при создании сценария";

          showErrorToast({ description });
        },
      },
    });

  return {
    createScenario,
    isCreateScenarioPending,
  };
}
