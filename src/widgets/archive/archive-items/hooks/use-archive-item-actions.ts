import { useState } from "react";

import { useDeleteIdeasList } from "@/actions/ideas-lists/hooks/use-delete-ideas-list";
import { useDeleteScenario } from "@/actions/scenarios/hooks/use-delete-scenario";

type UseArchiveItemActionsParams = {
  id: string;
  entity: "ideasList" | "scenario";
};

export function useArchiveItemActions({
  id,
  entity,
}: UseArchiveItemActionsParams) {
  const [isArchiveItemActionsOpened, setIsArchiveItemActionsOpened] =
    useState(false);

  const [isDeleteArchiveItemDialogOpen, setIsDeleteArchiveItemDialogOpen] =
    useState(false);

  const { deleteIdeasList, isDeleteIdeasListPending } = useDeleteIdeasList({
    onSuccess: () => {
      setIsDeleteArchiveItemDialogOpen(false);
    },
  });

  const { deleteScenario, isDeleteScenarioPending } = useDeleteScenario({
    onSuccess: () => {
      setIsDeleteArchiveItemDialogOpen(false);
    },
  });

  const handleDeleteArchiveItem = () => {
    if (entity === "ideasList") {
      deleteIdeasList({ path: { ideasListId: id } });
    } else if (entity === "scenario") {
      deleteScenario({ path: { scenarioId: id } });
    }
  };

  return {
    isArchiveItemActionsOpened,
    isDeleteArchiveItemDialogOpen,
    isDeleteArchiveItemPending:
      isDeleteIdeasListPending || isDeleteScenarioPending,
    setIsArchiveItemActionsOpened,
    setIsDeleteArchiveItemDialogOpen,
    handleDeleteArchiveItem,
  };
}
