import { useQueryClient } from "@tanstack/react-query";

import {
  getApiV1IdeasListsByIdeasListIdQueryKey,
  usePatchApiV1IdeasByIdeaIdSave,
} from "@/codegen/api/product";
import { useToast } from "@/shared/hooks/use-toast";

type UseSaveIdeaParams = {
  onError?: () => void;
  onSuccess?: () => void;
};

export function useSaveIdea({ onError, onSuccess }: UseSaveIdeaParams) {
  const queryClient = useQueryClient();
  const { showErrorToast } = useToast();

  const { mutate: saveIdea, isPending: isSaveIdeaPending } =
    usePatchApiV1IdeasByIdeaIdSave({
      mutation: {
        onError: () => {
          showErrorToast({
            description:
              "Произошла ошибка при сохранении идеи. Попробуйте еще раз чуть позже",
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
    saveIdea,
    isSaveIdeaPending,
  };
}
