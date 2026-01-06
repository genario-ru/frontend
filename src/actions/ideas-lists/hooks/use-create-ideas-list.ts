import { useMutation } from "@tanstack/react-query";

import { postApiV1IdeasListsMutation } from "@/codegen/api/product/@tanstack/react-query.gen";
import type { PostApiV1IdeasListsResponse } from "@/codegen/api/product/types.gen";
import { useToast } from "@/shared/hooks/use-toast";

type UseCreateIdeasListParams = {
  onSuccess?: (data: PostApiV1IdeasListsResponse) => void;
  onError?: () => void;
};

export function useCreateIdeasList(params?: UseCreateIdeasListParams) {
  const { showErrorToast } = useToast();
  const { onSuccess, onError } = params ?? {};

  const { mutate: createIdeasList, isPending: isCreateIdeasListPending } =
    useMutation({
      ...postApiV1IdeasListsMutation(),
      onSuccess: (data) => {
        onSuccess?.(data);
      },
      onError: () => {
        showErrorToast({
          title: "Произошла ошибка при создании сценария",
          description: "Попробуйте еще раз немного позже",
        });

        onError?.();
      },
    });

  return {
    createIdeasList,
    isCreateIdeasListPending,
  };
}
