import { useQueryClient } from "@tanstack/react-query";

import {
  getApiV1ArchiveItemsMyQueryKey,
  useDeleteApiV1ScenariosByScenarioId,
} from "@/codegen/api/product";
import { useToast } from "@/shared/hooks/use-toast";

type UseDeleteScenarioParams = {
  onSuccess?: () => void;
  onError?: () => void;
};

export function useDeleteScenario(params?: UseDeleteScenarioParams) {
  const { onSuccess, onError } = params ?? {};
  const queryClient = useQueryClient();
  const { showErrorToast, showSuccessToast } = useToast();

  const { mutate: deleteScenario, isPending: isDeleteScenarioPending } =
    useDeleteApiV1ScenariosByScenarioId({
      mutation: {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: getApiV1ArchiveItemsMyQueryKey(),
          });

          showSuccessToast({
            title: "Сценарий удален",
            description: "Сценарий был успешно удален",
          });

          onSuccess?.();
        },
        onError: () => {
          showErrorToast({
            title: "Ошибка",
            description: "Произошла ошибка при удалении сценария",
          });

          onError?.();
        },
      },
    });

  return {
    deleteScenario,
    isDeleteScenarioPending,
  };
}
