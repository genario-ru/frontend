import { useCallback, useRef } from "react";

import { useScenarioChapters } from "@/actions/scenario/hooks/use-scenario-chapters";

type UseScenarioNavigationChaptersParams = {
  scenarioId: string;
  handleChapterScrollIntoView: (chapterId: string) => void;
};

export function useScenarioNavigationChapters({
  scenarioId,
  handleChapterScrollIntoView,
}: UseScenarioNavigationChaptersParams) {
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    scenarioChaptersList,
    activeScenarioChapter,
    isScenarioChaptersLoading,
    isScenarioChaptersError,
    handleSetActiveScenarioChapter,
  } = useScenarioChapters({ scenarioId });

  const handleScenarioValueChange = useCallback(
    (chapterId: string) => {
      handleSetActiveScenarioChapter(chapterId);
      handleChapterScrollIntoView(chapterId);
    },
    [handleSetActiveScenarioChapter, handleChapterScrollIntoView],
  );

  return {
    containerRef,
    scenarioChaptersList,
    activeScenarioChapter,
    isScenarioChaptersLoading,
    isScenarioChaptersError,
    handleScenarioValueChange,
  };
}
