import { useQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { useMemo } from "react";

import { getApiV1ScenariosVersionsVersionIdOptions } from "@/codegen/api/product/@tanstack/react-query.gen";

type UseGetScenarioVersionParams = {
  scenarioVersionId?: string | null;
};

export function useGetScenarioVersion({
  scenarioVersionId,
}: UseGetScenarioVersionParams) {
  const { chapterId } = useSearch({ from: "/_app/scenarios/$scenarioId" });

  const {
    data: scenarioVersionData,
    isLoading: isScenarioVersionLoading,
    isError: isScenarioVersionError,
  } = useQuery({
    ...getApiV1ScenariosVersionsVersionIdOptions({
      path: { versionId: scenarioVersionId as string },
    }),
    enabled: Boolean(scenarioVersionId),
  });

  const scenarioChaptersList = useMemo(() => {
    return scenarioVersionData?.data.scenarioChapters;
  }, [scenarioVersionData]);

  const activeScenarioChapter = useMemo(() => {
    if (!scenarioChaptersList?.length) {
      return undefined;
    }

    const selectedChapter = scenarioChaptersList.find(
      (chapter) => chapter.id === chapterId,
    );

    return selectedChapter ?? scenarioChaptersList[0];
  }, [scenarioChaptersList, chapterId]);

  const previousScenarioChapter = useMemo(() => {
    if (!scenarioChaptersList?.length) {
      return undefined;
    }

    const currentChapterIndex = scenarioChaptersList.findIndex(
      (chapter) => chapter.id === activeScenarioChapter?.id,
    );

    if (currentChapterIndex === 0) {
      return undefined;
    }

    return scenarioChaptersList[currentChapterIndex - 1];
  }, [scenarioChaptersList, activeScenarioChapter]);

  const nextScenarioChapter = useMemo(() => {
    if (!scenarioChaptersList?.length) {
      return undefined;
    }

    const currentChapterIndex = scenarioChaptersList.findIndex(
      (chapter) => chapter.id === activeScenarioChapter?.id,
    );

    if (currentChapterIndex === scenarioChaptersList.length - 1) {
      return undefined;
    }

    return scenarioChaptersList[currentChapterIndex + 1];
  }, [scenarioChaptersList, activeScenarioChapter]);

  return {
    scenarioVersionData,
    scenarioChaptersList,
    activeScenarioChapter,
    previousScenarioChapter,
    nextScenarioChapter,
    isScenarioVersionLoading,
    isScenarioVersionError,
  };
}
