import { useQueryClient } from "@tanstack/react-query";

import {
  getApiV1ScenariosScenarioIdQueryKey,
  usePatchApiV1ScenariosScenarioIdSave,
} from "@/codegen/api/product";
import { useToast } from "@/shared/hooks/use-toast";

type UseSaveScenarioParams = {
  onError?: () => void;
  onSuccess?: () => void;
};

export function useSaveScenario({ onError, onSuccess }: UseSaveScenarioParams) {
  const queryClient = useQueryClient();
  const { showErrorToast } = useToast();

  const { mutate: saveScenario, isPending: isSaveScenarioPending } =
    usePatchApiV1ScenariosScenarioIdSave({
      mutation: {
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
              scenarioId: data.id,
            }),
          });

          onSuccess?.();
        },
      },
    });

  return {
    saveScenario,
    isSaveScenarioPending,
  };
}
