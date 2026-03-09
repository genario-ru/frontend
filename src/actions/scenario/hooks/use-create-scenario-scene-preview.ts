import { useQueryClient } from "@tanstack/react-query";

import {
  getApiV1ScenariosChaptersByChapterIdQueryKey,
  usePostApiV1ScenariosScenesBySceneIdPreview,
} from "@/codegen/api/product";
import { useToast } from "@/shared/hooks/use-toast";

type UseCreateScenarioScenePreviewParams = {
  chapterId: string;
  onSuccess?: () => void;
  onError?: () => void;
};

export function useCreateScenarioScenePreview({
  chapterId,
  onSuccess,
  onError,
}: UseCreateScenarioScenePreviewParams) {
  const queryClient = useQueryClient();
  const { showErrorToast } = useToast();

  const {
    mutate: createScenarioScenePreview,
    isPending: isCreateScenarioScenePreviewPending,
  } = usePostApiV1ScenariosScenesBySceneIdPreview({
    mutation: {
      onError: () => {
        onError?.();

        showErrorToast({
          title: "Произошла ошибка при создании превью сцены",
          description: "Попробуйте еще раз немного позже",
        });
      },
      onSuccess: () => {
        onSuccess?.();

        queryClient.invalidateQueries({
          queryKey: getApiV1ScenariosChaptersByChapterIdQueryKey({
            chapterId,
          }),
        });
      },
    },
  });

  return {
    createScenarioScenePreview,
    isCreateScenarioScenePreviewPending,
  };
}
