import { useNavigate } from "@tanstack/react-router";
import { useCallback, useState } from "react";

import { useDeleteScenario } from "@/actions/scenario/hooks/use-delete-scenario";

type UseScenarioAppMenubarDeleteDialogParams = {
  scenarioId: string;
};

export function useScenarioAppMenubarDeleteDialog({
  scenarioId,
}: UseScenarioAppMenubarDeleteDialogParams) {
  const navigate = useNavigate();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { deleteScenario, isDeleteScenarioPending } = useDeleteScenario({
    onSuccess: () => {
      setIsDeleteDialogOpen(false);
      navigate({ to: "/archive" });
    },
  });

  const handleConfirmDeleteButtonClick = useCallback(() => {
    deleteScenario({ path: { scenarioId } });
  }, [scenarioId, deleteScenario]);

  return {
    isDeleteDialogOpen,
    isDeleteScenarioPending,
    setIsDeleteDialogOpen,
    handleConfirmDeleteButtonClick,
  };
}
