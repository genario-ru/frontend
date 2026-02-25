import { useCallback } from "react";

import { useScenarioChapters } from "@/actions/scenario/hooks/use-scenario-chapters";

type UseScenarioNavigationChaptersArrowsParams = {
  scenarioId: string;
  handleChapterScrollIntoView: (chapterId: string) => void;
};

export function useScenarioNavigationChaptersArrows({
  scenarioId,
  handleChapterScrollIntoView,
}: UseScenarioNavigationChaptersArrowsParams) {
  const {
    previousScenarioChapter,
    nextScenarioChapter,
    handleSetActiveScenarioChapter,
  } = useScenarioChapters({ scenarioId });

  const handlePreviousScenarioChapterClick = useCallback(() => {
    if (!previousScenarioChapter) {
      return;
    }

    handleSetActiveScenarioChapter(previousScenarioChapter.id);
    handleChapterScrollIntoView(previousScenarioChapter.id);
  }, [
    previousScenarioChapter,
    handleSetActiveScenarioChapter,
    handleChapterScrollIntoView,
  ]);

  const handleNextScenarioChapterClick = useCallback(() => {
    if (!nextScenarioChapter) {
      return;
    }

    handleSetActiveScenarioChapter(nextScenarioChapter.id);
    handleChapterScrollIntoView(nextScenarioChapter.id);
  }, [
    nextScenarioChapter,
    handleSetActiveScenarioChapter,
    handleChapterScrollIntoView,
  ]);

  return {
    previousScenarioChapter,
    nextScenarioChapter,
    handlePreviousScenarioChapterClick,
    handleNextScenarioChapterClick,
  };
}
