import { useGetApiV1ScenariosChaptersChapterId } from "@/codegen/api/product";
import { checkIsGenerationStatus } from "@/shared/utils/check-is-generation-status";

const REFRESH_INTERVAL = 3000;

type UseGetScenarioChapterParams = {
  chapterId?: string;
};

export function useGetScenarioChapter({
  chapterId,
}: UseGetScenarioChapterParams) {
  const {
    data: scenarioChapterData,
    isLoading: isScenarioChapterLoading,
    error: isScenarioChapterError,
  } = useGetApiV1ScenariosChaptersChapterId(
    {
      chapterId: chapterId as string,
    },
    {
      query: {
        refetchInterval: (query) => {
          if (checkIsGenerationStatus(query.state.data?.data.status)) {
            return REFRESH_INTERVAL;
          }

          if (
            query.state.data?.data.scenes.some((scene) =>
              checkIsGenerationStatus(scene.preview?.status),
            )
          ) {
            return REFRESH_INTERVAL;
          }

          return false;
        },
        enabled: Boolean(chapterId),
      },
    },
  );

  return {
    scenarioChapterData,
    isScenarioChapterLoading,
    isScenarioChapterError,
  };
}
