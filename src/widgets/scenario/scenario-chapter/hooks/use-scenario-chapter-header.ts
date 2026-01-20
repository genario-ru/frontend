import { useNavigate, useSearch } from "@tanstack/react-router";
import { type RefObject, useCallback, useMemo } from "react";

import { useGetScenarioChapter } from "@/actions/scenario/hooks/use-get-scenario-chapter";
import { useGetScenarioVersion } from "@/actions/scenario/hooks/use-get-scenario-version";
import { useCheckScroll } from "@/shared/hooks/use-check-scroll";
import { formatTime } from "@/shared/utils/format-time";

type UseScenarioChapterHeaderParams = {
  containerRef: RefObject<HTMLDivElement | null>;
  scenarioId: string;
  scenarioVersionId: string;
};

export function useScenarioChapterHeader({
  containerRef,
  scenarioId,
  scenarioVersionId,
}: UseScenarioChapterHeaderParams) {
  const navigate = useNavigate();

  const { chapterId, sceneId } = useSearch({
    from: "/_app/scenarios/$scenarioId",
  });

  const { isScrolled: isContainerScrolled } = useCheckScroll({
    elementRef: containerRef,
  });

  const {
    activeScenarioChapter,
    previousScenarioChapter,
    nextScenarioChapter,
    isScenarioVersionLoading,
    isScenarioVersionError,
  } = useGetScenarioVersion({ scenarioVersionId });

  const {
    activeScenarioChapterScene,
    scenarioChapterData,
    isScenarioChapterLoading,
    isScenarioChapterError,
  } = useGetScenarioChapter({
    // Сначала смотрим на query параметры. Если chapterId там нет, то берется первый chapter
    chapterId: chapterId ?? activeScenarioChapter?.id,
    sceneId,
  });

  const scenarioChapterTitle = useMemo(() => {
    return scenarioChapterData?.data.name;
  }, [scenarioChapterData]);

  const scenarioChapterTime = useMemo(() => {
    const startTime = scenarioChapterData?.data.startTime;
    const endTime = scenarioChapterData?.data.endTime;

    if (!startTime || !endTime) {
      return undefined;
    }

    return `${formatTime({ time: startTime })} - ${formatTime({ time: endTime })}`;
  }, [scenarioChapterData]);

  const scenarioChapterDescription = useMemo(() => {
    return scenarioChapterData?.data.description;
  }, [scenarioChapterData]);

  const scenarioChapterScenes = useMemo(() => {
    return scenarioChapterData?.data.scenes.map((scene) => ({
      id: scene.id,
      name: scene.name,
      time: `${formatTime({ time: scene.startTime })} - ${formatTime({ time: scene.endTime })}`,
    }));
  }, [scenarioChapterData]);

  const hasPreviousScenarioChapter = useMemo(() => {
    return Boolean(previousScenarioChapter);
  }, [previousScenarioChapter]);

  const hasNextScenarioChapter = useMemo(() => {
    return Boolean(nextScenarioChapter);
  }, [nextScenarioChapter]);

  const handlePreviousChapterClick = useCallback(() => {
    if (!previousScenarioChapter) {
      return;
    }

    navigate({
      to: "/scenarios/$scenarioId",
      params: { scenarioId },
      search: { chapterId: previousScenarioChapter.id },
    });
  }, [scenarioId, previousScenarioChapter, navigate]);

  const handleNextChapterClick = useCallback(() => {
    if (!nextScenarioChapter) {
      return;
    }

    navigate({
      to: "/scenarios/$scenarioId",
      params: { scenarioId },
      search: { chapterId: nextScenarioChapter.id },
    });
  }, [scenarioId, nextScenarioChapter, navigate]);

  const handleSceneClick = useCallback(
    (sceneId: string) => {
      navigate({
        to: "/scenarios/$scenarioId",
        params: { scenarioId },
        search: { sceneId },
      });
    },
    [scenarioId, navigate],
  );

  return {
    activeScenarioChapterScene,
    scenarioChapterTitle,
    scenarioChapterTime,
    scenarioChapterDescription,
    scenarioChapterScenes,
    hasPreviousScenarioChapter,
    hasNextScenarioChapter,
    isContainerScrolled,
    isLoading: isScenarioVersionLoading || isScenarioChapterLoading,
    isError: isScenarioVersionError || isScenarioChapterError,
    handlePreviousChapterClick,
    handleNextChapterClick,
    handleSceneClick,
  };
}
