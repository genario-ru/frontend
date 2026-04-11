import { useEffect, useRef } from "react";

import type { ScenarioSceneExtendedSchema } from "@/codegen/api/product";

type UseScenarioChapterScenesAutoScrollParams = {
  activeScenarioChapterScene: ScenarioSceneExtendedSchema | undefined;
  scenarioChapterScenesList: ScenarioSceneExtendedSchema[] | undefined;
  scrollToScenarioChapterScene: (sceneId: string) => void;
};

export function useScenarioChapterScenesAutoScroll({
  activeScenarioChapterScene,
  scenarioChapterScenesList,
  scrollToScenarioChapterScene,
}: UseScenarioChapterScenesAutoScrollParams) {
  const autoScrolledToSelectedScene = useRef(false);

  // Скроллим на выбранныую сцену при первичной загрузке страницы
  useEffect(() => {
    if (
      activeScenarioChapterScene &&
      scenarioChapterScenesList?.length &&
      !autoScrolledToSelectedScene.current
    ) {
      const sceneId = activeScenarioChapterScene.id;

      const sceneIndex = scenarioChapterScenesList.findIndex(
        (scene) => scene.id === sceneId,
      );

      // Если сцены не существует или она первая по порядку, то не скроллим
      if ([-1, 0].includes(sceneIndex)) {
        autoScrolledToSelectedScene.current = true;
        return;
      }

      autoScrolledToSelectedScene.current = true;
      scrollToScenarioChapterScene(sceneId);
    }
  }, [
    activeScenarioChapterScene,
    scenarioChapterScenesList,
    scrollToScenarioChapterScene,
  ]);
}
