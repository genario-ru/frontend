import { useCallback } from "react";

import { useCreateScenarioScenePreview } from "@/actions/scenario/hooks/use-create-scenario-scene-preview";

type UseScenarioChapterScenePreviewParams = {
  chapterId: string;
  sceneId: string;
};

export function useScenarioChapterScenePreview({
  chapterId,
  sceneId,
}: UseScenarioChapterScenePreviewParams) {
  const { createScenarioScenePreview, isCreateScenarioScenePreviewPending } =
    useCreateScenarioScenePreview({ chapterId });

  const handleCreateScenarioScenePreview = useCallback(() => {
    createScenarioScenePreview({ sceneId });
  }, [sceneId, createScenarioScenePreview]);

  return {
    handleCreateScenarioScenePreview,
    isCreateScenarioScenePreviewPending,
  };
}
