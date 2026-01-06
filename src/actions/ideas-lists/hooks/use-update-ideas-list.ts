import { useMutation } from "@tanstack/react-query";

import { patchApiV1IdeasListsIdeasListIdMutation } from "@/codegen/api/product/@tanstack/react-query.gen";
import type { PatchApiV1IdeasListsIdeasListIdResponse } from "@/codegen/api/product/types.gen";
import { useToast } from "@/shared/hooks/use-toast";

type UseUpdateIdeasListParams = {
  onSuccess?: (data: PatchApiV1IdeasListsIdeasListIdResponse) => void;
  onError?: () => void;
};

export function useUpdateIdeasList(params?: UseUpdateIdeasListParams) {
  const { onSuccess, onError } = params ?? {};
  const { showErrorToast } = useToast();

  const { mutate: updateIdeasList, isPending: isUpdateIdeasListPending } =
    useMutation({
      ...patchApiV1IdeasListsIdeasListIdMutation(),
      onSuccess: (data) => {
        onSuccess?.(data);
      },
      onError: () => {
        showErrorToast({
          title: "Произошла ошибка при обновлении списка идей",
          description: "Попробуйте еще раз немного позже",
        });

        onError?.();
      },
    });

  return {
    updateIdeasList,
    isUpdateIdeasListPending,
  };
}
