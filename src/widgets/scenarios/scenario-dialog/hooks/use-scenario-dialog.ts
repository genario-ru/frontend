import { useCallback, useMemo, useRef, useState } from "react";

import { useGetScenario } from "@/actions/scenarios/hooks/use-get-scenario";

import { SCENARIO_DIALOG_DESCRIPTION } from "../constants/scenario-dialog-texts";

type UseScenarioDialogParams = {
  scenarioId: string | undefined;
};

export function useScenarioDialog({ scenarioId }: UseScenarioDialogParams) {
  const dialogOverlayRef = useRef<HTMLDivElement>(null);
  const dialogContentRef = useRef<HTMLDivElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onDialogClose = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  const { scenarioData, isScenarioLoading, isScenarioError } = useGetScenario({
    scenarioId,
  });

  const scenarioDialogTitle = useMemo(() => {
    return scenarioData ? "Редактирование сценария" : "Новый сценарий";
  }, [scenarioData]);

  return {
    dialogOverlayRef,
    dialogContentRef,
    scenarioData,
    scenarioDialogTitle,
    scenarioDialogDescription: SCENARIO_DIALOG_DESCRIPTION,
    isLoading: isScenarioLoading,
    isError: isScenarioError,
    isDialogOpen,
    setIsDialogOpen,
    onDialogClose,
  };
}
