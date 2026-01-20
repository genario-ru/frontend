import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { getApiV1ScenariosChaptersChapterIdOptions } from "@/codegen/api/product/@tanstack/react-query.gen";

type UseGetScenarioChapterParams = {
  chapterId: string | undefined;
  sceneId: string | undefined;
};

export function useGetScenarioChapter({
  chapterId,
  sceneId,
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

  const scenarioChapterScenesList = useMemo(() => {
    return scenarioChapterData?.data.scenes;
  }, [scenarioChapterData]);

  const activeScenarioChapterScene = useMemo(() => {
    if (!scenarioChapterScenesList?.length) {
      return undefined;
    }

    const selectedChapter = scenarioChapterScenesList.find(
      (scene) => scene.id === sceneId,
    );

    return selectedChapter ?? scenarioChapterScenesList[0];
  }, [scenarioChapterScenesList, sceneId]);

  const previousScenarioChapterScene = useMemo(() => {
    if (!scenarioChapterScenesList?.length) {
      return undefined;
    }

    const currentChapterIndex = scenarioChapterScenesList.findIndex(
      (chapter) => chapter.id === chapterId,
    );

    if (currentChapterIndex === 0) {
      return undefined;
    }

    return scenarioChapterScenesList[currentChapterIndex - 1];
  }, [scenarioChapterScenesList, chapterId]);

  const nextScenarioChapterScene = useMemo(() => {
    if (!scenarioChapterScenesList?.length) {
      return undefined;
    }

    const currentChapterIndex = scenarioChapterScenesList.findIndex(
      (chapter) => chapter.id === chapterId,
    );

    if (currentChapterIndex === scenarioChapterScenesList.length - 1) {
      return undefined;
    }

    return scenarioChapterScenesList[currentChapterIndex + 1];
  }, [scenarioChapterScenesList, chapterId]);

  return {
    scenarioChapterData,
    scenarioChapterScenesList,
    activeScenarioChapterScene,
    previousScenarioChapterScene,
    nextScenarioChapterScene,
    isScenarioChapterLoading,
    isScenarioChapterError,
  };
}
