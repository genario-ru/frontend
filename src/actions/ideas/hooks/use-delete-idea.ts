import { useQueryClient } from "@tanstack/react-query";

import {
  getApiV1IdeasListsIdeasListIdQueryKey,
  useDeleteApiV1IdeasIdeaId,
} from "@/codegen/api/product";
import { useToast } from "@/shared/hooks/use-toast";

type UseDeleteIdeaParams = {
  onError?: () => void;
  onSuccess?: () => void;
};

export function useDeleteIdea(params?: UseDeleteIdeaParams) {
  const { onError, onSuccess } = params ?? {};
  const queryClient = useQueryClient();
  const { showErrorToast, showSuccessToast } = useToast();

  const { mutate: deleteIdea, isPending: isDeleteIdeaPending } =
    useDeleteApiV1IdeasIdeaId({
      mutation: {
        onError: () => {
          showErrorToast({
            description:
              "Произошла ошиюка во время удаления идеи. Попробуйте еще раз чуть позже",
          });

          onError?.();
        },
        onSuccess: ({ data }) => {
          showSuccessToast({
            description: "Идея была успешно удалена",
          });

          queryClient.invalidateQueries({
            queryKey: getApiV1IdeasListsIdeasListIdQueryKey({
              ideasListId: data.ideasListId,
            }),
          });

          onSuccess?.();
        },
      },
    });

  return {
    deleteIdea,
    isDeleteIdeaPending,
  };
}
