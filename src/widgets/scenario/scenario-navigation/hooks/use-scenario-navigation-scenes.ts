import { useCallback, useEffect, useMemo, useRef } from "react";

import { useScenarioChapters } from "@/actions/scenario/hooks/use-scenario-chapters";
import { useScenarioScenes } from "@/actions/scenario/hooks/use-scenario-scenes";

type UseScenarioNavigationScenesParams = {
  scenarioId: string;
  scrollToActiveScene: boolean;
};

export function useScenarioNavigationScenes({
  scenarioId,
  scrollToActiveScene,
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

  useEffect(() => {
    if (!activeScenarioChapterScene?.id || !scrollToActiveScene) {
      return;
    }

    const activeElement = sceneRefsMap.current.get(
      activeScenarioChapterScene?.id,
    );

    if (activeElement) {
      activeElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeScenarioChapterScene, scrollToActiveScene]);

  return {
    containerRef,
    activeScenarioChapterScene,
    activeScenarioChapterPosition,
    radioCardsScenesList,
    isScenarioNavigationScenesLoading:
      isScenarioChaptersLoading || isScenarioChapterLoading,
    isScenarioNavigationScenesError:
      isScenarioChaptersError || isScenarioChapterError,
    sceneRefCallback,
    handleScenarioChapterSceneClick,
  };
}
