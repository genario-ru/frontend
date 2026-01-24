import { useNavigate, useSearch } from "@tanstack/react-router";
import { useCallback, useMemo } from "react";

import { useGetScenario } from "./use-get-scenario";
import { useGetScenarioVersion } from "./use-get-scenario-version";

type UseScenarioChaptersParams = {
  scenarioId: string;
};

export function useScenarioChapters({ scenarioId }: UseScenarioChaptersParams) {
  const navigate = useNavigate();
  const { chapterId } = useSearch({ from: "/_app/scenarios/$scenarioId" });

  const { scenarioData, isScenarioLoading, isScenarioError } = useGetScenario({
    scenarioId,
  });

  const {
    scenarioVersionData,
    isScenarioVersionLoading,
    isScenarioVersionError,
  } = useGetScenarioVersion({
    scenarioVersionId: scenarioData?.data.currentVersionId,
  });

  const scenarioChaptersList = useMemo(() => {
    return scenarioVersionData?.data.scenarioChapters;
  }, [scenarioVersionData]);

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
    scenarioChaptersList,
    activeScenarioChapter,
    activeScenarioChapterPosition,
    previousScenarioChapter,
    nextScenarioChapter,
    isScenarioChaptersLoading: isScenarioLoading || isScenarioVersionLoading,
    isScenarioChaptersError: isScenarioError || isScenarioVersionError,
    handleSetActiveScenarioChapter,
    handlePreviousScenarioChapterClick,
    handleNextScenarioChapterClick,
  };
}
