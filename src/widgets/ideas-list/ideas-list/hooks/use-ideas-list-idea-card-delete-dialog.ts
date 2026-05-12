import { useCallback, useState } from "react";

import { useDeleteIdea } from "@/actions/ideas/hooks/use-delete-idea";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";

type UseIdeasListIdeaCardDeleteDialogParams = {
  ideaId: string;
  handleCloseMenu?: () => void;
};

export function useIdeasListIdeaCardDeleteDialog({
  ideaId,
  handleCloseMenu,
}: UseIdeasListIdeaCardDeleteDialogParams) {
  const { isMobile } = useBreakpoints();
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
    isMobile,
    isDeleteDialogOpen,
    isDeleteIdeaPending,
    setIsDeleteDialogOpen,
    handleConfirmDeleteButtonClick,
  };
}
