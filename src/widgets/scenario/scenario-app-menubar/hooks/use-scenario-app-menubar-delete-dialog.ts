import { useNavigate } from "@tanstack/react-router";
import { useCallback, useState } from "react";

import { useDeleteScenario } from "@/actions/scenario/hooks/use-delete-scenario";

type UseScenarioAppMenubarDeleteDialogParams = {
  scenarioId: string;
  handleDropdownMenuClose: () => void;
};

export function useScenarioAppMenubarDeleteDialog({
  scenarioId,
  handleDropdownMenuClose,
}: UseScenarioAppMenubarDeleteDialogParams) {
  const navigate = useNavigate();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { deleteScenario, isDeleteScenarioPending } = useDeleteScenario();

  const handleConfirmDeleteButtonClick = useCallback(() => {
    deleteScenario(
      { scenarioId },
      {
        onSuccess: () => {
          setIsDeleteDialogOpen(false);
          handleDropdownMenuClose();
          navigate({ to: "/archive", replace: true });
        },
      },
    );
  }, [scenarioId, handleDropdownMenuClose, navigate, deleteScenario]);

  return {
    isDeleteDialogOpen,
    isDeleteScenarioPending,
    setIsDeleteDialogOpen,
    handleConfirmDeleteButtonClick,
  };
}
