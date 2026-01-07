import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  deleteApiV1IdeasListsIdeasListIdMutation,
  getApiV1ArchiveItemsMyQueryKey,
} from "@/codegen/api/product/@tanstack/react-query.gen";
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
    useMutation({
      ...deleteApiV1IdeasListsIdeasListIdMutation(),
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
    });

  return {
    deleteIdeasList,
    isDeleteIdeasListPending,
  };
}
