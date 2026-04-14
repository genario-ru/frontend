import { useQueryClient } from "@tanstack/react-query";

import {
  getApiV1ScenariosChaptersByChapterIdQueryKey,
  usePostApiV1ScenariosScenesBySceneIdPreview,
} from "@/codegen/api/product";
import { useToast } from "@/shared/hooks/use-toast";

type UseCreateScenarioScenePreviewParams = {
  chapterId: string;
};

export function useCreateScenarioScenePreview({
  chapterId,
}: UseCreateScenarioScenePreviewParams) {
  const queryClient = useQueryClient();
  const { showErrorToast } = useToast();

  const {
    mutate: createScenarioScenePreview,
    isPending: isCreateScenarioScenePreviewPending,
  } = usePostApiV1ScenariosScenesBySceneIdPreview({
    mutation: {
      onError: () => {
        showErrorToast({
          title: "Произошла ошибка при создании превью сцены",
          description: "Попробуйте еще раз немного позже",
        });
      },
      onSuccess: () => {
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
