import { useQueryClient } from "@tanstack/react-query";

import {
  getApiV1IdeasListsByIdeasListIdQueryKey,
  useDeleteApiV1IdeasByIdeaId,
} from "@/codegen/api/product";
import { useToast } from "@/shared/hooks/use-toast";

export function useDeleteIdea() {
  const queryClient = useQueryClient();
  const { showErrorToast, showSuccessToast } = useToast();

  const { mutate: deleteIdea, isPending: isDeleteIdeaPending } =
    useDeleteApiV1IdeasByIdeaId({
      mutation: {
        onError: () => {
          showErrorToast({
            description:
              "Произошла ошиюка во время удаления идеи. Попробуйте еще раз чуть позже",
          });
        },
        onSuccess: ({ data }) => {
          showSuccessToast({
            description: "Идея была успешно удалена",
          });

          queryClient.invalidateQueries({
            queryKey: getApiV1IdeasListsByIdeasListIdQueryKey({
              ideasListId: data.ideasListId,
            }),
          });
        },
      },
    });

  return {
    deleteIdea,
    isDeleteIdeaPending,
  };
}
