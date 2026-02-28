import {
  type PatchApiV1IdeasListsIdeasListIdMutationResponse,
  usePatchApiV1IdeasListsIdeasListId,
} from "@/codegen/api/product";
import { useToast } from "@/shared/hooks/use-toast";

type UseUpdateIdeasListParams = {
  onSuccess?: (data: PatchApiV1IdeasListsIdeasListIdMutationResponse) => void;
  onError?: () => void;
};

export function useUpdateIdeasList(params?: UseUpdateIdeasListParams) {
  const { onSuccess, onError } = params ?? {};
  const { showErrorToast } = useToast();

  const { mutate: updateIdeasList, isPending: isUpdateIdeasListPending } =
    usePatchApiV1IdeasListsIdeasListId({
      mutation: {
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
      },
    });

  return {
    updateIdeasList,
    isUpdateIdeasListPending,
  };
}
