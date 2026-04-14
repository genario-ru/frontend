import { useCallback } from "react";

import { useCreateScenarioScenePreview } from "@/actions/scenario/hooks/use-create-scenario-scene-preview";
import { useToast } from "@/shared/hooks/use-toast";

type UseScenarioChapterScenePreviewParams = {
  chapterId: string;
  sceneId: string;
};

export function useScenarioChapterScenePreview({
  chapterId,
  sceneId,
}: UseScenarioChapterScenePreviewParams) {
  const { showErrorToast } = useToast();

  const { createScenarioScenePreview, isCreateScenarioScenePreviewPending } =
    useCreateScenarioScenePreview({ chapterId });

  const handleCreateScenarioScenePreview = useCallback(() => {
    createScenarioScenePreview(
      { sceneId },
      {
        onError: (error) => {
          if (error.cause.status === 402) {
            showErrorToast({
              description: "Недостаточно кредитов для генерации превью сцены",
            });
          }
        },
      },
    );
  }, [sceneId, createScenarioScenePreview, showErrorToast]);

  return {
    handleCreateScenarioScenePreview,
    isCreateScenarioScenePreviewPending,
  };
}
