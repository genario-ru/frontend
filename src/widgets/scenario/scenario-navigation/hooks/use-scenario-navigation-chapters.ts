import { useCallback, useRef } from "react";

import { useScenarioChapters } from "@/actions/scenario/hooks/use-scenario-chapters";

type UseScenarioNavigationChaptersParams = {
  scenarioId: string;
};

export function useScenarioNavigationChapters({
  scenarioId,
}: UseScenarioNavigationChaptersParams) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chapterRefsMap = useRef<Map<string, Element>>(new Map());

  const {
    scenarioChaptersList,
    activeScenarioChapter,
    isScenarioChaptersLoading,
    isScenarioChaptersError,
    handleSetActiveScenarioChapter,
  } = useScenarioChapters({ scenarioId });

  const chapterRefCallback = useCallback(
    (el: Element | null, chapterId: string) => {
      if (el) {
        chapterRefsMap.current.set(chapterId, el);
      } else {
        chapterRefsMap.current.delete(chapterId);
      }
    },
    [],
  );

  const handleScenarioValueChange = useCallback(
    (chapterId: string) => {
      handleSetActiveScenarioChapter(chapterId);

      const activeElement = chapterRefsMap.current.get(chapterId);

      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    },
    [handleSetActiveScenarioChapter],
  );

  return {
    containerRef,
    scenarioChaptersList,
    activeScenarioChapter,
    isScenarioChaptersLoading,
    isScenarioChaptersError,
    chapterRefCallback,
    handleScenarioValueChange,
  };
}
