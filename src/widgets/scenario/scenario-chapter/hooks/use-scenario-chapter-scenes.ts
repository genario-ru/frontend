import { useScenarioScenes } from "@/actions/scenario/hooks/use-scenario-scenes";

import { useScenarioChapterIntersectingScene } from "./use-scenario-chapter-intersecting-scene";
import { useScenarioChapterScenesAutoScroll } from "./use-scenario-chapter-scenes-autoscroll";

type UseScenarioChapterScenesParams = {
  scenarioId: string;
  chapterId: string;
};

export function useScenarioChapterScenes({
  scenarioId,
  chapterId,
}: UseScenarioChapterScenesParams) {
  const {
    activeScenarioChapterScene,
    scenarioChapterScenesList,
    isScenarioChapterGenerating,
    isScenarioChapterGenerationFailed,
    isScenarioChapterLoading,
    isScenarioChapterError,
    scrollToScenarioChapterScene,
  } = useScenarioScenes({ scenarioId, chapterId });

  const { handleIntersectingSceneIdChange } =
    useScenarioChapterIntersectingScene({ scenarioId, chapterId });

  useScenarioChapterScenesAutoScroll({
    activeScenarioChapterScene,
    scenarioChapterScenesList,
    scrollToScenarioChapterScene,
  });

  return {
    scenarioChapterScenesList,
    isScenarioChapterGenerating,
    isScenarioChapterGenerationFailed,
    isScenarioChapterLoading,
    isScenarioChapterError,
    handleIntersectingSceneIdChange,
  };
}
