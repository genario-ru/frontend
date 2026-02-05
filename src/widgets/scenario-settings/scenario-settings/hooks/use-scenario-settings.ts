import { useMemo } from "react";

import { useGetIdea } from "@/actions/ideas/hooks/use-get-idea";
import { useGetScenario } from "@/actions/scenario/hooks/use-get-scenario";

import { SCENARIO_DIALOG_DESCRIPTION } from "../constants/scenario-settings-texts";

type UseScenarioSettingsParams = {
  scenarioId: string | undefined;
  fromIdeaId: string | undefined;
};

export function useScenarioSettings({
  scenarioId,
  fromIdeaId,
}: UseScenarioSettingsParams) {
  const { scenarioData, isScenarioLoading, isScenarioError } = useGetScenario({
    scenarioId,
  });

  const { ideaData, isIdeaLoading, isIdeaError } = useGetIdea({
    ideaId: fromIdeaId,
  });

  const scenarioSettingsTitle = useMemo(() => {
    return scenarioData ? "Редактирование сценария" : "Новый сценарий";
  }, [scenarioData]);

  return {
    scenarioData,
    ideaData,
    scenarioSettingsTitle,
    scenarioSettingsDescription: SCENARIO_DIALOG_DESCRIPTION,
    isLoading: isScenarioLoading || isIdeaLoading,
    isError: isScenarioError || isIdeaError,
  };
}
