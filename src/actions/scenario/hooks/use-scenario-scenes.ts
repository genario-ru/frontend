import { useNavigate, useSearch } from "@tanstack/react-router";
import { useCallback, useMemo } from "react";

import { checkIsGenerationStatus } from "@/shared/utils/check-is-generation-status";

import { useGetScenarioChapter } from "./use-get-scenario-chapter";

type UseScenarioScenesParams = {
  scenarioId: string;
  chapterId?: string;
};

export function useScenarioScenes({
  scenarioId,
  chapterId,
}: UseScenarioScenesParams) {
  const navigate = useNavigate();

  const { sceneId } = useSearch({
    from: "/_with-auth/_with-subscription/scenarios/$scenarioId",
  });

  const {
    scenarioChapterData,
    isScenarioChapterLoading,
    isScenarioChapterError,
  } = useGetScenarioChapter({
    chapterId,
  });

  const isScenarioChapterGenerating = useMemo(() => {
    return checkIsGenerationStatus(scenarioChapterData?.data.status);
  }, [scenarioChapterData]);

  const isScenarioChapterGenerationFailed = useMemo(() => {
    return scenarioChapterData?.data.status === "failed";
  }, [scenarioChapterData]);

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

  const handleScenarioChapterSceneClick = useCallback(
    (sceneId: string) => {
      navigate({
        to: "/scenarios/$scenarioId",
        params: { scenarioId },
        search: { chapterId, sceneId },
        replace: true,
      });
    },
    [scenarioId, chapterId, navigate],
  );

  return {
    scenarioChapterScenesList,
    activeScenarioChapterScene,
    previousScenarioChapterScene,
    nextScenarioChapterScene,
    isScenarioChapterGenerating,
    isScenarioChapterGenerationFailed,
    isScenarioChapterLoading,
    isScenarioChapterError,
    handleScenarioChapterSceneClick,
  };
}
