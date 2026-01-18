import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getApiV1ScenariosScenarioIdQueryKey,
  patchApiV1ScenariosScenarioIdSaveMutation,
} from "@/codegen/api/product/@tanstack/react-query.gen";
import { useToast } from "@/shared/hooks/use-toast";

type UseSaveScenarioParams = {
  onError?: () => void;
  onSuccess?: () => void;
};

export function useSaveScenario({ onError, onSuccess }: UseSaveScenarioParams) {
  const queryClient = useQueryClient();
  const { showErrorToast } = useToast();

  const { mutate: saveScenario, isPending: isSaveScenarioPending } =
    useMutation({
      ...patchApiV1ScenariosScenarioIdSaveMutation(),
      onError: () => {
        showErrorToast({
          description:
            "Произошла ошибка при сохранении сценария. Попробуйте еще раз чуть позже",
        });

        onError?.();
      },
      onSuccess: ({ data }) => {
        queryClient.invalidateQueries({
          queryKey: getApiV1ScenariosScenarioIdQueryKey({
            path: {
              scenarioId: data.id,
            },
          }),
        });

        onSuccess?.();
      },
    });

  return {
    saveScenario,
    isSaveScenarioPending,
  };
}
