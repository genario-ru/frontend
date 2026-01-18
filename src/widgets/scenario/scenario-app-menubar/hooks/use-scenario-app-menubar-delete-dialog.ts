import { useState } from "react";

type UseScenarioAppMenubarDeleteDialogParams = {
  scenarioId: string;
};

export function useScenarioAppMenubarDeleteDialog({
  scenarioId,
}: UseScenarioAppMenubarDeleteDialogParams) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return {
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
  };
}
