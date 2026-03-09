import { useQueryClient } from "@tanstack/react-query";

import {
  getApiV1IdeasListsByIdeasListIdQueryKey,
  usePatchApiV1IdeasByIdeaId,
} from "@/codegen/api/product";
import { useToast } from "@/shared/hooks/use-toast";

type UseUpdateIdeaParams = {
  onError?: () => void;
  onSuccess?: () => void;
};

export function useUpdateIdea({ onError, onSuccess }: UseUpdateIdeaParams) {
  const queryClient = useQueryClient();
  const { showErrorToast } = useToast();

  const { mutate: updateIdea, isPending: isUpdateIdeaPending } =
    usePatchApiV1IdeasByIdeaId({
      mutation: {
        onError: () => {
          showErrorToast({
            description:
              "Произошла ошибка при обновлении идеи. Попробуйте еще раз чуть позже",
          });

          onError?.();
        },
        onSuccess: ({ data }) => {
          queryClient.invalidateQueries({
            queryKey: getApiV1IdeasListsByIdeasListIdQueryKey({
              ideasListId: data.ideasListId,
            }),
          });

          onSuccess?.();
        },
      },
    });

  return {
    updateIdea,
    isUpdateIdeaPending,
  };
}
