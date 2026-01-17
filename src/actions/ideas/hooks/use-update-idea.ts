import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getApiV1IdeasListsIdeasListIdIdeasQueryKey,
  patchApiV1IdeasIdeaIdMutation,
} from "@/codegen/api/product/@tanstack/react-query.gen";
import type { GetApiV1IdeasListsIdeasListIdIdeasResponse } from "@/codegen/api/product/types.gen";
import { useToast } from "@/shared/hooks/use-toast";

type UseUpdateIdeaParams = {
  onError?: () => void;
  onSuccess?: () => void;
};

export function useUpdateIdea({ onError, onSuccess }: UseUpdateIdeaParams) {
  const queryClient = useQueryClient();
  const { showErrorToast } = useToast();

  const { mutate: updateIdea, isPending: isUpdateIdeaPending } = useMutation({
    ...patchApiV1IdeasIdeaIdMutation(),
    onError: () => {
      showErrorToast({
        description:
          "Произошла ошибка при обновлении идеи. Попробуйте еще раз чуть позже",
      });

      onError?.();
    },
    onSuccess: ({ data: { id, ideasListId, saved, liked } }) => {
      queryClient.setQueryData(
        getApiV1IdeasListsIdeasListIdIdeasQueryKey({
          path: {
            ideasListId,
          },
        }),
        (previousData: GetApiV1IdeasListsIdeasListIdIdeasResponse) => ({
          ...previousData,
          data: previousData.data.map((idea) => {
            if (idea.id === id) {
              return {
                ...idea,
                saved,
                liked,
              };
            }

            return idea;
          }),
        }),
      );

      onSuccess?.();
    },
  });

  return {
    updateIdea,
    isUpdateIdeaPending,
  };
}
