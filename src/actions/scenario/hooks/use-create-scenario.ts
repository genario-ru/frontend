import { useQueryClient } from "@tanstack/react-query";

import {
  getApiV1OnboardingQueryKey,
  usePostApiV1Scenarios,
} from "@/codegen/api/product";
import { isPaymentRequiredError } from "@/lib/api/utils/is-payment-required-error";
import { useReachGoal } from "@/lib/yandex-metrika";
import { useToast } from "@/shared/hooks/use-toast";

export function useCreateScenario() {
  const queryClient = useQueryClient();
  const reachGoal = useReachGoal();
  const { showErrorToast } = useToast();

  const { mutate: createScenario, isPending: isCreateScenarioPending } =
    usePostApiV1Scenarios({
      mutation: {
        onSuccess: () => {
          reachGoal("scenario-generation-start");

          queryClient.invalidateQueries({
            queryKey: getApiV1OnboardingQueryKey(),
          });
        },
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
