import { useQuery } from "@tanstack/react-query";

import { getApiV1ScenariosChaptersChapterIdOptions } from "@/codegen/api/product/@tanstack/react-query.gen";

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
    enabled: Boolean(chapterId),
  });

  return {
    scenarioChapterData,
    isScenarioChapterLoading,
    isScenarioChapterError,
  };
}
