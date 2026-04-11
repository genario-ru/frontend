import { useIntersectionObserver } from "usehooks-ts";

type UseScenarioChapterSceneParams = {
  sceneId: string;
  handleIntersectingSceneIdChange: (sceneId: string) => void;
};

export function useScenarioChapterScene({
  sceneId,
  handleIntersectingSceneIdChange,
}: UseScenarioChapterSceneParams) {
  const { ref: sceneRef } = useIntersectionObserver({
    threshold: 0.5,
    onChange: (isIntersecting) => {
      if (isIntersecting) {
        handleIntersectingSceneIdChange(sceneId);
      }
    },
  });

  return {
    sceneRef,
  };
}
