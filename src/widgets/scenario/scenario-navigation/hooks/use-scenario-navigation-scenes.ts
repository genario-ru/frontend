import { useMemo } from "react";

import { useScenarioChapters } from "@/actions/scenario/hooks/use-scenario-chapters";
import { useScenarioScenes } from "@/actions/scenario/hooks/use-scenario-scenes";

type UseScenarioNavigationScenesParams = {
  scenarioId: string;
};

export function useScenarioNavigationScenes({
  scenarioId,
}: UseScenarioNavigationScenesParams) {
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

  return {
    activeScenarioChapterScene,
    activeScenarioChapterPosition,
    radioCardsScenesList,
    isScenarioNavigationScenesLoading:
      isScenarioChaptersLoading || isScenarioChapterLoading,
    isScenarioNavigationScenesError:
      isScenarioChaptersError || isScenarioChapterError,
    handleScenarioChapterSceneClick,
  };
}
