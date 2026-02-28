import { useQueryClient } from "@tanstack/react-query";

import {
  getApiV1ArchiveItemsMyQueryKey,
  useDeleteApiV1IdeasListsIdeasListId,
} from "@/codegen/api/product";
import { useToast } from "@/shared/hooks/use-toast";

type UseDeleteIdeasListParams = {
  onSuccess?: () => void;
  onError?: () => void;
};

export function useDeleteIdeasList(params?: UseDeleteIdeasListParams) {
  const { onSuccess, onError } = params ?? {};
  const queryClient = useQueryClient();
  const { showErrorToast, showSuccessToast } = useToast();

  const { mutate: deleteIdeasList, isPending: isDeleteIdeasListPending } =
    useDeleteApiV1IdeasListsIdeasListId({
      mutation: {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: getApiV1ArchiveItemsMyQueryKey(),
          });

          showSuccessToast({
            title: "Список идей удален",
            description: "Список идей был успешно удален",
          });

          onSuccess?.();
        },
        onError: () => {
          showErrorToast({
            title: "Ошибка",
            description: "Произошла ошибка при удалении списка идей",
          });

          onError?.();
        },
      },
    });

  return {
    deleteIdeasList,
    isDeleteIdeasListPending,
  };
}
