import { useState } from "react";

import { useDeleteIdeasList } from "@/actions/ideas-lists/hooks/use-delete-ideas-list";
import { useDeleteScenario } from "@/actions/scenario/hooks/use-delete-scenario";

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

  const { deleteIdeasList, isDeleteIdeasListPending } = useDeleteIdeasList();
  const { deleteScenario, isDeleteScenarioPending } = useDeleteScenario();

  const handleDeleteArchiveItem = () => {
    if (entity === "ideasList") {
      deleteIdeasList(
        { ideasListId: id },
        {
          onSuccess: () => {
            setIsDeleteArchiveItemDialogOpen(false);
          },
        },
      );
    } else if (entity === "scenario") {
      deleteScenario(
        { scenarioId: id },
        {
          onSuccess: () => {
            setIsDeleteArchiveItemDialogOpen(false);
          },
        },
      );
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
