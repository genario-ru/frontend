import { useQueryClient } from "@tanstack/react-query";

import {
  getApiV1ArchiveItemsMyQueryKey,
  getApiV1OnboardingQueryKey,
  useDeleteApiV1IdeasListsByIdeasListId,
} from "@/codegen/api/product";
import { useToast } from "@/shared/hooks/use-toast";

export function useDeleteIdeasList() {
  const queryClient = useQueryClient();
  const { showErrorToast, showSuccessToast } = useToast();

  const { mutate: deleteIdeasList, isPending: isDeleteIdeasListPending } =
    useDeleteApiV1IdeasListsByIdeasListId({
      mutation: {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: getApiV1ArchiveItemsMyQueryKey(),
          });

          queryClient.invalidateQueries({
            queryKey: getApiV1OnboardingQueryKey(),
          });

          showSuccessToast({
            title: "Список идей удален",
            description: "Список идей был успешно удален",
          });
        },
        onError: () => {
          showErrorToast({
            title: "Ошибка",
            description: "Произошла ошибка при удалении списка идей",
          });
        },
      },
    });

  return {
    deleteIdeasList,
    isDeleteIdeasListPending,
  };
}
