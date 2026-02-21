import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getApiV1ScenariosChaptersChapterIdQueryKey,
  postApiV1ScenariosScenesSceneIdPreviewMutation,
} from "@/codegen/api/product/@tanstack/react-query.gen";
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
  } = useMutation({
    ...postApiV1ScenariosScenesSceneIdPreviewMutation(),
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
          path: {
            chapterId,
          },
        }),
      });
    },
  });

  return {
    createScenarioScenePreview,
    isCreateScenarioScenePreviewPending,
  };
}
