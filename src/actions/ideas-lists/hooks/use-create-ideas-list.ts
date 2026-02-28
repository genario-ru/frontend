import {
  type PostApiV1IdeasListsMutationResponse,
  usePostApiV1IdeasLists,
} from "@/codegen/api/product";
import { useToast } from "@/shared/hooks/use-toast";

type UseCreateIdeasListParams = {
  onSuccess?: (data: PostApiV1IdeasListsMutationResponse) => void;
  onError?: () => void;
};

export function useCreateIdeasList(params?: UseCreateIdeasListParams) {
  const { showErrorToast } = useToast();
  const { onSuccess, onError } = params ?? {};

  const { mutate: createIdeasList, isPending: isCreateIdeasListPending } =
    usePostApiV1IdeasLists({
      mutation: {
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
      },
    });

  return {
    createIdeasList,
    isCreateIdeasListPending,
  };
}
