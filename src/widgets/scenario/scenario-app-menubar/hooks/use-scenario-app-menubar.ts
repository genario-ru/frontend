import { useSearch } from "@tanstack/react-router";
import { useMemo } from "react";

import { useGetScenario } from "@/actions/scenario/hooks/use-get-scenario";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";

type UseScenarioAppMenubarParams = {
  scenarioId: string;
};

export function useScenarioAppMenubar({
  scenarioId,
}: UseScenarioAppMenubarParams) {
  const { isMobile } = useBreakpoints();

  const { versionId: selectedVersionId } = useSearch({
    from: "/_with-auth/_with-subscription/scenarios/$scenarioId",
  });

  const { scenarioData, isScenarioLoading, isScenarioError } = useGetScenario({
    scenarioId,
  });

  const scenarioVersionId = useMemo(() => {
    if (selectedVersionId) {
      return selectedVersionId;
    }

    if (scenarioData?.data?.currentVersion?.id) {
      return scenarioData.data.currentVersion.id;
    }
  }, [scenarioData, selectedVersionId]);

  const scenarioTitle = useMemo(() => {
    if (!scenarioData) {
      return undefined;
    }

    return scenarioData.data.name || "Без названия";
  }, [scenarioData]);

  const scenarioDescription = useMemo(() => {
    if (!scenarioData) {
      return undefined;
    }

    return scenarioData.data.description;
  }, [scenarioData]);

  return {
    scenarioData,
    scenarioVersionId,
    scenarioTitle,
    scenarioDescription,
    isMobile,
    isScenarioLoading,
    isScenarioError,
  };
}
