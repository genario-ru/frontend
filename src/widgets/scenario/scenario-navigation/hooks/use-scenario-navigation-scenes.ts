import { useCallback, useMemo, useRef } from "react";

import { useScenarioChapters } from "@/actions/scenario/hooks/use-scenario-chapters";
import { useScenarioScenes } from "@/actions/scenario/hooks/use-scenario-scenes";

type UseScenarioNavigationScenesParams = {
  scenarioId: string;
};

export function useScenarioNavigationScenes({
  scenarioId,
}: UseScenarioNavigationScenesParams) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRefsMap = useRef<Map<string, Element>>(new Map());

  const {
    activeScenarioChapter,
    activeScenarioChapterPosition,
    isScenarioChaptersLoading,
    isScenarioChaptersError,
  } = useScenarioChapters({ scenarioId });

  const {
    activeScenarioChapterScene,
    scenarioChapterScenesList,
    isScenarioChapterGenerationFailed,
    isScenarioChapterLoading,
    isScenarioChapterError,
    handleScenarioChapterSceneClick,
  } = useScenarioScenes({ scenarioId, chapterId: activeScenarioChapter?.id });

  const radioCardsScenesList = useMemo(() => {
    return scenarioChapterScenesList?.map((scene, index) => ({
      id: scene.id,
      position: index + 1,
      name: scene.name,
      startTime: scene.startTime,
      endTime: scene.endTime,
    }));
  }, [scenarioChapterScenesList]);

  const sceneRefCallback = useCallback(
    (el: Element | null, sceneId: string) => {
      if (el) {
        sceneRefsMap.current.set(sceneId, el);
      } else {
        sceneRefsMap.current.delete(sceneId);
      }
    },
    [],
  );

  const handleSceneValueChange = useCallback(
    (sceneId: string) => {
      const activeElement = sceneRefsMap.current.get(sceneId);

      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }

      handleScenarioChapterSceneClick(sceneId);
    },
    [handleScenarioChapterSceneClick],
  );

  return {
    containerRef,
    activeScenarioChapterScene,
    activeScenarioChapterPosition,
    radioCardsScenesList,
    isScenarioNavigationScenesLoading:
      isScenarioChaptersLoading || isScenarioChapterLoading,
    isScenarioNavigationScenesError:
      isScenarioChaptersError ||
      isScenarioChapterError ||
      isScenarioChapterGenerationFailed,
    sceneRefCallback,
    handleSceneValueChange,
  };
}
