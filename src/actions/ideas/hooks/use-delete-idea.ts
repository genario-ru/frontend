import { useMutation } from "@tanstack/react-query";

import { deleteApiV1IdeasIdeaIdMutation } from "@/codegen/api/product/@tanstack/react-query.gen";
import { useToast } from "@/shared/hooks/use-toast";

type UseDeleteIdeaParams = {
  onError?: () => void;
  onSuccess?: () => void;
};

export function useDeleteIdea(params?: UseDeleteIdeaParams) {
  const { onError, onSuccess } = params ?? {};
  const { showErrorToast, showSuccessToast } = useToast();

  const { mutate: deleteIdea, isPending: isDeleteIdeaPending } = useMutation({
    ...deleteApiV1IdeasIdeaIdMutation(),
    onError: () => {
      showErrorToast({
        description:
          "Произошла ошиюка во время удаления идеи. Попробуйте еще раз чуть позже",
      });

      onError?.();
    },
    onSuccess: () => {
      showSuccessToast({
        description: "Идея была успешно удалена",
      });

      onSuccess?.();
    },
  });

  return {
    deleteIdea,
    isDeleteIdeaPending,
  };
}
