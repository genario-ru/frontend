import { useCallback, useState } from "react";

import { useDeleteIdea } from "@/actions/ideas/hooks/use-delete-idea";

type UseIdeasListIdeaCardDeleteDialogParams = {
  ideaId: string;
  handleCloseMenu?: () => void;
};

export function useIdeasListIdeaCardDeleteDialog({
  ideaId,
  handleCloseMenu,
}: UseIdeasListIdeaCardDeleteDialogParams) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { deleteIdea, isDeleteIdeaPending } = useDeleteIdea();

  const handleConfirmDeleteButtonClick = useCallback(() => {
    deleteIdea(
      { ideaId },
      {
        onSuccess: () => {
          setIsDeleteDialogOpen(false);
          handleCloseMenu?.();
        },
      },
    );
  }, [ideaId, deleteIdea, handleCloseMenu]);

  return {
    isDeleteDialogOpen,
    isDeleteIdeaPending,
    setIsDeleteDialogOpen,
    handleConfirmDeleteButtonClick,
  };
}
