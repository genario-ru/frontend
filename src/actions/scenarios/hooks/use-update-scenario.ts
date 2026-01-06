import { useMutation } from "@tanstack/react-query";

import { patchApiV1ScenariosScenarioIdMutation } from "@/codegen/api/product/@tanstack/react-query.gen";
import type { PatchApiV1ScenariosScenarioIdResponse } from "@/codegen/api/product/types.gen";
import { useToast } from "@/shared/hooks/use-toast";

type UseUpdateScenarioParams = {
  onSuccess?: (data: PatchApiV1ScenariosScenarioIdResponse) => void;
  onError?: () => void;
};

export function useUpdateScenario(params?: UseUpdateScenarioParams) {
  const { onSuccess, onError } = params ?? {};
  const { showErrorToast } = useToast();

  const { mutate: updateScenario, isPending: isUpdateScenarioPending } =
    useMutation({
      ...patchApiV1ScenariosScenarioIdMutation(),
      onSuccess: (data) => {
        onSuccess?.(data);
      },
      onError: () => {
        showErrorToast({
          title: "Произошла ошибка при обновлении сценария",
          description: "Попробуйте еще раз немного позже",
        });

        onError?.();
      },
    });

  return {
    updateScenario,
    isUpdateScenarioPending,
  };
}
