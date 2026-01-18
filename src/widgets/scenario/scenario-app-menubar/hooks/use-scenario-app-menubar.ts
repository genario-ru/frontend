import { useMemo } from "react";

import { useGetScenario } from "@/actions/scenario/hooks/use-get-scenario";

type UseScenarioAppMenubarParams = {
  scenarioId: string;
};

export function useScenarioAppMenubar({
  scenarioId,
}: UseScenarioAppMenubarParams) {
  const { scenarioData, isScenarioLoading, isScenarioError } = useGetScenario({
    scenarioId,
  });

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
    scenarioTitle,
    scenarioDescription,
    isScenarioLoading,
    isScenarioError,
  };
}
