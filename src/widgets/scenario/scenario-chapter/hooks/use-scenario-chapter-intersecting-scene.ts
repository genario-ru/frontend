import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";

type UseScenarioChapterIntersectingSceneParams = {
  scenarioId: string;
  chapterId: string;
};

export function useScenarioChapterIntersectingScene({
  scenarioId,
  chapterId,
}: UseScenarioChapterIntersectingSceneParams) {
  const navigate = useNavigate();

  const [intersectingSceneId, setIntersectingSceneId] = useState<string | null>(
    null,
  );

  const handleIntersectingSceneIdChange = useCallback((sceneId: string) => {
    setIntersectingSceneId(sceneId);
  }, []);

  useEffect(() => {
    if (!intersectingSceneId) {
      return;
    }

    const sceneElement = document.getElementById(
      `scenario-chapter-scene-${intersectingSceneId}`,
    );

    if (sceneElement) {
      navigate({
        to: "/scenarios/$scenarioId",
        params: { scenarioId },
        search: (prev) => ({
          ...prev,
          chapterId,
          sceneId: intersectingSceneId,
        }),
        replace: true,
        resetScroll: false,
      });
    }
  }, [intersectingSceneId, scenarioId, chapterId, navigate]);

  return {
    handleIntersectingSceneIdChange,
  };
}
