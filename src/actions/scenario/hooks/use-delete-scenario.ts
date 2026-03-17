import { useQueryClient } from "@tanstack/react-query";

import {
  getApiV1ArchiveItemsMyQueryKey,
  useDeleteApiV1ScenariosByScenarioId,
} from "@/codegen/api/product";
import { useToast } from "@/shared/hooks/use-toast";

export function useDeleteScenario() {
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
        },
        onError: () => {
          showErrorToast({
            title: "Ошибка",
            description: "Произошла ошибка при удалении сценария",
          });
        },
      },
    });

  return {
    deleteScenario,
    isDeleteScenarioPending,
  };
}
