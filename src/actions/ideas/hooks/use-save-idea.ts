import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getApiV1IdeasListsIdeasListIdQueryKey,
  patchApiV1IdeasIdeaIdSaveMutation,
} from "@/codegen/api/product/@tanstack/react-query.gen";
import { useToast } from "@/shared/hooks/use-toast";

type UseSaveIdeaParams = {
  onError?: () => void;
  onSuccess?: () => void;
};

export function useSaveIdea({ onError, onSuccess }: UseSaveIdeaParams) {
  const queryClient = useQueryClient();
  const { showErrorToast } = useToast();

  const { mutate: saveIdea, isPending: isSaveIdeaPending } = useMutation({
    ...patchApiV1IdeasIdeaIdSaveMutation(),
    onError: () => {
      showErrorToast({
        description:
          "Произошла ошибка при сохранении идеи. Попробуйте еще раз чуть позже",
      });

      onError?.();
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({
        queryKey: getApiV1IdeasListsIdeasListIdQueryKey({
          path: {
            ideasListId: data.ideasListId,
          },
        }),
      });

      onSuccess?.();
    },
  });

  return {
    saveIdea,
    isSaveIdeaPending,
  };
}
