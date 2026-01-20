import { useNavigate } from "@tanstack/react-router";
import { useCallback, useMemo } from "react";

import { useGetScenario } from "@/actions/scenario/hooks/use-get-scenario";
import { useGetScenarioVersion } from "@/actions/scenario/hooks/use-get-scenario-version";

type UseScenarioChaptersListParams = {
  scenarioId: string;
};

export function useScenarioChaptersList({
  scenarioId,
}: UseScenarioChaptersListParams) {
  const navigate = useNavigate();
  const { scenarioData } = useGetScenario({ scenarioId });

  const {
    activeScenarioChapter,
    scenarioVersionData,
    isScenarioVersionLoading,
    isScenarioVersionError,
  } = useGetScenarioVersion({
    scenarioVersionId: scenarioData?.data.currentVersionId,
  });

  const scenarioChaptersList = useMemo(() => {
    return scenarioVersionData?.data.scenarioChapters;
  }, [scenarioVersionData]);

  const handleChapterClick = useCallback(
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

  return {
    scenarioChaptersList,
    activeScenarioChapter,
    isScenarioVersionLoading,
    isScenarioVersionError,
    handleChapterClick,
  };
}
