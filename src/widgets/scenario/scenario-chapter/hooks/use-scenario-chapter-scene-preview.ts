import { useCallback } from "react";

import { useCreateScenarioScenePreview } from "@/actions/scenario/hooks/use-create-scenario-scene-preview";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";

type UseScenarioChapterScenePreviewParams = {
  chapterId: string;
  sceneId: string;
};

export function useScenarioChapterScenePreview({
  chapterId,
  sceneId,
}: UseScenarioChapterScenePreviewParams) {
  const { isMobile } = useBreakpoints();

  const { createScenarioScenePreview, isCreateScenarioScenePreviewPending } =
    useCreateScenarioScenePreview({ chapterId });

  const handleCreateScenarioScenePreview = useCallback(() => {
    createScenarioScenePreview({ sceneId });
  }, [sceneId, createScenarioScenePreview]);

  return {
    isExpandablePreview: isMobile,
    isCreateScenarioScenePreviewPending,
    handleCreateScenarioScenePreview,
  };
}
