import { type RefObject, useCallback, useState } from "react";

import { useDeleteIdea } from "@/actions/ideas/hooks/use-delete-idea";
import { useUpdateIdea } from "@/actions/ideas/hooks/use-update-idea";

type UseIdeasListIdeaCardSecondaryActionsParams = {
  ideaId: string;
  initialSaved: boolean;
  copyElementRef: RefObject<HTMLParagraphElement | null>;
};

export function useIdeasListIdeaCardSecondaryActions({
  ideaId,
  initialSaved,
}: UseIdeasListIdeaCardSecondaryActionsParams) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isOptimisticSaved, setIsOptimisticSaved] = useState(initialSaved);

  const { deleteIdea, isDeleteIdeaPending } = useDeleteIdea({
    onSuccess: () => {
      setIsDeleteDialogOpen(false);
      setIsMenuOpen(false);
    },
  });

  const { updateIdea } = useUpdateIdea({
    onError: () => {
      setIsOptimisticSaved(isOptimisticSaved);
    },
  });

  const handleConfirmDeleteButtonClick = useCallback(() => {
    deleteIdea({
      path: {
        ideaId,
      },
    });
  }, [ideaId, deleteIdea]);

  const handleSaveButtonClick = useCallback(() => {
    const newSaved = !isOptimisticSaved;

    setIsOptimisticSaved(newSaved);

    updateIdea({
      path: {
        ideaId,
      },
      body: {
        ideaId,
        saved: newSaved,
      },
    });
  }, [ideaId, isOptimisticSaved, updateIdea]);

  return {
    isOptimisticSaved,
    isMenuOpen,
    isEditDialogOpen,
    isDeleteDialogOpen,
    isDeleteIdeaPending,
    setIsMenuOpen,
    setIsEditDialogOpen,
    setIsDeleteDialogOpen,
    handleSaveButtonClick,
    handleConfirmDeleteButtonClick,
  };
}
