import { usePostApiV1IdeasListsByIdeasListIdMoreIdeas } from "@/codegen/api/product";
import { useToast } from "@/shared/hooks/use-toast";

type UseGenerateMoreIdeasParams = {
  onSuccess?: () => void;
  onError?: () => void;
};

export function useGenerateMoreIdeas(params?: UseGenerateMoreIdeasParams) {
  const { onSuccess, onError } = params ?? {};
  const { showErrorToast } = useToast();

  const { mutate: generateMoreIdeas, isPending: isGenerateMoreIdeasPending } =
    usePostApiV1IdeasListsByIdeasListIdMoreIdeas({
      mutation: {
        onSuccess: () => {
          onSuccess?.();
        },
        onError: () => {
          showErrorToast({
            description: "Произошла ошибка при генерации больше идей",
          });

          onError?.();
        },
      },
    });

  return {
    generateMoreIdeas,
    isGenerateMoreIdeasPending,
  };
}
