import { useMemo } from "react";

import { useGetScenario } from "@/actions/scenario/hooks/use-get-scenario";
import { useGetScenarioVersion } from "@/actions/scenario/hooks/use-get-scenario-version";

type UseScenarioChaptersListParams = {
  scenarioId: string;
};

export function useScenarioChaptersList({
  scenarioId,
}: UseScenarioChaptersListParams) {
  const { scenarioData } = useGetScenario({ scenarioId });

  const {
    scenarioVersionData,
    isScenarioVersionLoading,
    isScenarioVersionError,
  } = useGetScenarioVersion({
    scenarioVersionId: scenarioData?.data.currentVersionId,
  });

  const scenarioChaptersList = useMemo(() => {
    return scenarioVersionData?.data.scenarioChapters ?? [];
  }, [scenarioVersionData]);

  return {
    scenarioChaptersList,
    isScenarioVersionLoading,
    isScenarioVersionError,
  };
}
