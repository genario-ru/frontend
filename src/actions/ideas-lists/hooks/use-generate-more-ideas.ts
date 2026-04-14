import { usePostApiV1IdeasListsByIdeasListIdMoreIdeas } from "@/codegen/api/product";
import { useToast } from "@/shared/hooks/use-toast";

export function useGenerateMoreIdeas() {
  const { showErrorToast } = useToast();

  const { mutate: generateMoreIdeas, isPending: isGenerateMoreIdeasPending } =
    usePostApiV1IdeasListsByIdeasListIdMoreIdeas({
      mutation: {
        onError: () => {
          showErrorToast({
            description: "Произошла ошибка при генерации больше идей",
          });
        },
      },
    });

  return {
    generateMoreIdeas,
    isGenerateMoreIdeasPending,
  };
}
