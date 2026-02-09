import { useMutation } from "@tanstack/react-query";

import { postApiV1IdeasListsIdeasListIdMoreIdeasMutation } from "@/codegen/api/product/@tanstack/react-query.gen";
import { useToast } from "@/shared/hooks/use-toast";

type UseGenerateMoreIdeasParams = {
  onSuccess?: () => void;
  onError?: () => void;
};

export function useGenerateMoreIdeas(params?: UseGenerateMoreIdeasParams) {
  const { onSuccess, onError } = params ?? {};
  const { showErrorToast } = useToast();

  const { mutate: generateMoreIdeas, isPending: isGenerateMoreIdeasPending } =
    useMutation({
      ...postApiV1IdeasListsIdeasListIdMoreIdeasMutation(),
      onSuccess: () => {
        onSuccess?.();
      },
      onError: () => {
        showErrorToast({
          description: "Произошла ошибка при генерации больше идей",
        });

        onError?.();
      },
    });

  return {
    generateMoreIdeas,
    isGenerateMoreIdeasPending,
  };
}
