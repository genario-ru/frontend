import { usePatchApiV1ScenariosChaptersByChapterId } from "@/codegen/api/product";
import { useToast } from "@/shared/hooks/use-toast";

export function useUpdateScenarioChapter() {
  const { showErrorToast } = useToast();

  const {
    mutate: updateScenarioChapter,
    isPending: isUpdateScenarioChapterPending,
  } = usePatchApiV1ScenariosChaptersByChapterId({
    mutation: {
      onError: () => {
        showErrorToast({
          description: "Произошла ошибка при обновлении раздела сценария",
        });
      },
    },
  });

  return { updateScenarioChapter, isUpdateScenarioChapterPending };
}
