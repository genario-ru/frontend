import { usePatchApiV1ScenariosByScenarioId } from "@/codegen/api/product";
import { isPaymentRequiredError } from "@/lib/api/utils/is-payment-required-error";
import { useToast } from "@/shared/hooks/use-toast";

export function useUpdateScenario() {
  const { showErrorToast } = useToast();

  const { mutate: updateScenario, isPending: isUpdateScenarioPending } =
    usePatchApiV1ScenariosByScenarioId({
      mutation: {
        onError: (error) => {
          const description = isPaymentRequiredError(error)
            ? "Недостаточно кредитов для генерации новой версии сценария"
            : "Произошла ошибка при обновлении сценария";

          showErrorToast({ description });
        },
      },
    });

  return {
    updateScenario,
    isUpdateScenarioPending,
  };
}
