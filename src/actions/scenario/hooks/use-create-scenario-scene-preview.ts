import { useQueryClient } from "@tanstack/react-query";

import {
  getApiV1ScenariosChaptersChapterIdQueryKey,
  usePostApiV1ScenariosScenesSceneIdPreview,
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
  } = usePostApiV1ScenariosScenesSceneIdPreview({
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
          queryKey: getApiV1ScenariosChaptersChapterIdQueryKey({
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
