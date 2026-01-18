import { useMemo } from "react";

import { useGetScenario } from "@/actions/scenario/hooks/use-get-scenario";

import { SCENARIO_DIALOG_DESCRIPTION } from "../constants/scenario-settings-texts";

type UseScenarioSettingsParams = {
  scenarioId: string | undefined;
};

export function useScenarioSettings({ scenarioId }: UseScenarioSettingsParams) {
  const { scenarioData, isScenarioLoading, isScenarioError } = useGetScenario({
    scenarioId,
  });

  const scenarioSettingsTitle = useMemo(() => {
    return scenarioData ? "Редактирование сценария" : "Новый сценарий";
  }, [scenarioData]);

  return {
    scenarioData,
    scenarioSettingsTitle,
    scenarioSettingsDescription: SCENARIO_DIALOG_DESCRIPTION,
    isLoading: isScenarioLoading,
    isError: isScenarioError,
  };
}
