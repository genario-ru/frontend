import { useCallback, useState } from "react";

import { useDeleteIdea } from "@/actions/ideas/hooks/use-delete-idea";

type UseIdeasListIdeaCardDeleteDialogParams = {
  ideaId: string;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
};

export function useIdeasListIdeaCardDeleteDialog({
  ideaId,
  setIsMenuOpen,
}: UseIdeasListIdeaCardDeleteDialogParams) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { deleteIdea, isDeleteIdeaPending } = useDeleteIdea();

  const handleConfirmDeleteButtonClick = useCallback(() => {
    deleteIdea(
      { ideaId },
      {
        onSuccess: () => {
          setIsDeleteDialogOpen(false);
          setIsMenuOpen(false);
        },
      },
    );
  }, [ideaId, deleteIdea, setIsMenuOpen]);

  return {
    isDeleteDialogOpen,
    isDeleteIdeaPending,
    setIsDeleteDialogOpen,
    handleConfirmDeleteButtonClick,
  };
}
