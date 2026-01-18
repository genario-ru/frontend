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

  const { deleteIdea, isDeleteIdeaPending } = useDeleteIdea({
    onSuccess: () => {
      setIsDeleteDialogOpen(false);
      setIsMenuOpen(false);
    },
  });

  const handleConfirmDeleteButtonClick = useCallback(() => {
    deleteIdea({
      path: {
        ideaId,
      },
    });
  }, [ideaId, deleteIdea]);

  return {
    isDeleteDialogOpen,
    isDeleteIdeaPending,
    setIsDeleteDialogOpen,
    handleConfirmDeleteButtonClick,
  };
}
