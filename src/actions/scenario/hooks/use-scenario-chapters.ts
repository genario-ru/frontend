import { useNavigate, useSearch } from "@tanstack/react-router";
import { useCallback, useMemo } from "react";

import { useGetCurrentScenarioVersion } from "./use-get-current-scenario-version";

type UseScenarioChaptersParams = {
  scenarioId: string;
};

export function useScenarioChapters({ scenarioId }: UseScenarioChaptersParams) {
  const navigate = useNavigate();
  const { chapterId } = useSearch({ from: "/_app/scenarios/$scenarioId" });

  const {
    scenarioCurrentVersionData,
    isScenarioCurrentVersionLoading,
    isScenarioCurrentVersionError,
  } = useGetCurrentScenarioVersion({
    scenarioId,
  });

  const scenarioVideoType = useMemo(() => {
    return scenarioCurrentVersionData?.data.videoType;
  }, [scenarioCurrentVersionData]);

  const scenarioChaptersList = useMemo(() => {
    return scenarioCurrentVersionData?.data.scenarioChapters;
  }, [scenarioCurrentVersionData]);

  const activeScenarioChapter = useMemo(() => {
    if (!scenarioChaptersList?.length) {
      return undefined;
    }

    const selectedChapter = scenarioChaptersList.find(
      (chapter) => chapter.id === chapterId,
    );

    return selectedChapter ?? scenarioChaptersList[0];
  }, [scenarioChaptersList, chapterId]);

  const activeScenarioChapterPosition = useMemo(() => {
    if (!scenarioChaptersList?.length) {
      return undefined;
    }

    const currentChapterIndex = scenarioChaptersList.findIndex(
      (chapter) => chapter.id === activeScenarioChapter?.id,
    );

    if (currentChapterIndex === -1) {
      return undefined;
    }

    return currentChapterIndex + 1;
  }, [scenarioChaptersList, activeScenarioChapter]);

  const previousScenarioChapter = useMemo(() => {
    if (!scenarioChaptersList?.length) {
      return undefined;
    }

    const currentChapterIndex = scenarioChaptersList.findIndex(
      (chapter) => chapter.id === activeScenarioChapter?.id,
    );

    if (currentChapterIndex === 0) {
      return undefined;
    }

    return scenarioChaptersList[currentChapterIndex - 1];
  }, [scenarioChaptersList, activeScenarioChapter]);

  const nextScenarioChapter = useMemo(() => {
    if (!scenarioChaptersList?.length) {
      return undefined;
    }

    const currentChapterIndex = scenarioChaptersList.findIndex(
      (chapter) => chapter.id === activeScenarioChapter?.id,
    );

    if (currentChapterIndex === scenarioChaptersList.length - 1) {
      return undefined;
    }

    return scenarioChaptersList[currentChapterIndex + 1];
  }, [scenarioChaptersList, activeScenarioChapter]);

  const isScenarioChaptersGenerating = useMemo(() => {
    return scenarioCurrentVersionData?.data.status === "generation";
  }, [scenarioCurrentVersionData]);

  const handleSetActiveScenarioChapter = useCallback(
    (chapterId: string) => {
      navigate({
        to: "/scenarios/$scenarioId",
        params: { scenarioId },
        search: { chapterId },
        replace: true,
      });
    },
    [scenarioId, navigate],
  );

  const handlePreviousScenarioChapterClick = useCallback(() => {
    if (!previousScenarioChapter) {
      return;
    }

    handleSetActiveScenarioChapter(previousScenarioChapter.id);
  }, [previousScenarioChapter, handleSetActiveScenarioChapter]);

  const handleNextScenarioChapterClick = useCallback(() => {
    if (!nextScenarioChapter) {
      return;
    }
    handleSetActiveScenarioChapter(nextScenarioChapter.id);
  }, [nextScenarioChapter, handleSetActiveScenarioChapter]);

  return {
    scenarioVideoType,
    scenarioChaptersList,
    activeScenarioChapter,
    activeScenarioChapterPosition,
    previousScenarioChapter,
    nextScenarioChapter,
    isScenarioChaptersGenerating,
    isScenarioChaptersLoading: isScenarioCurrentVersionLoading,
    isScenarioChaptersError: isScenarioCurrentVersionError,
    handleSetActiveScenarioChapter,
    handlePreviousScenarioChapterClick,
    handleNextScenarioChapterClick,
  };
}
