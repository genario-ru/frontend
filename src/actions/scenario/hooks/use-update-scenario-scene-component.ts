import { useQueryClient } from "@tanstack/react-query";

import {
  getApiV1ScenariosChaptersByChapterIdQueryKey,
  usePatchApiV1ScenariosSceneComponentsBySceneComponentId,
} from "@/codegen/api/product";
import { useToast } from "@/shared/hooks/use-toast";

type UseUpdateScenarioSceneComponentParams = {
  chapterId: string;
};

export function useUpdateScenarioSceneComponent({
  chapterId,
}: UseUpdateScenarioSceneComponentParams) {
  const queryClient = useQueryClient();
  const { showErrorToast } = useToast();

  const {
    mutate: updateScenarioSceneComponent,
    isPending: isUpdateScenarioSceneComponentPending,
  } = usePatchApiV1ScenariosSceneComponentsBySceneComponentId({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: getApiV1ScenariosChaptersByChapterIdQueryKey({ chapterId }),
        });
      },
      onError: () => {
        showErrorToast({
          title: "Произошла ошибка при обновлении компонента сцены",
          description: "Попробуйте еще раз немного позже",
        });
      },
    },
  });

  return {
    updateScenarioSceneComponent,
    isUpdateScenarioSceneComponentPending,
  };
}
