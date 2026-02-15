import { useQuery } from "@tanstack/react-query";

import { getApiV1ScenariosChaptersChapterIdOptions } from "@/codegen/api/product/@tanstack/react-query.gen";

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
  } = useQuery({
    ...getApiV1ScenariosChaptersChapterIdOptions({
      path: {
        chapterId: chapterId as string,
      },
    }),
    refetchInterval: (query) => {
      if (query.state.data?.data.status === "generation") {
        return REFRESH_INTERVAL;
      }

      if (
        query.state.data?.data.scenes.some(
          (scene) => scene.status === "generation",
        )
      ) {
        return REFRESH_INTERVAL;
      }

      return false;
    },
    enabled: Boolean(chapterId),
  });

  return {
    scenarioChapterData,
    isScenarioChapterLoading,
    isScenarioChapterError,
  };
}
