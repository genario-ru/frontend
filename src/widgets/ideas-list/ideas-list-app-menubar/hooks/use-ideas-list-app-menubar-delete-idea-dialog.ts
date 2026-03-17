import { useNavigate } from "@tanstack/react-router";
import { useCallback, useState } from "react";

import { useDeleteIdeasList } from "@/actions/ideas-lists/hooks/use-delete-ideas-list";

type UseIdeasListAppMenubarDeleteIdeaDialogParams = {
  ideasListId: string;
  handleDropdownMenuClose: () => void;
};

export function useIdeasListAppMenubarDeleteIdeaDialog({
  ideasListId,
  handleDropdownMenuClose,
}: UseIdeasListAppMenubarDeleteIdeaDialogParams) {
  const navigate = useNavigate();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { deleteIdeasList, isDeleteIdeasListPending } = useDeleteIdeasList();

  const handleConfirmDeleteButtonClick = useCallback(() => {
    deleteIdeasList(
      { ideasListId },
      {
        onSuccess: () => {
          setIsDeleteDialogOpen(false);
          handleDropdownMenuClose();
          navigate({ to: "/archive", replace: true });
        },
      },
    );
  }, [ideasListId, handleDropdownMenuClose, navigate, deleteIdeasList]);

  return {
    isDeleteDialogOpen,
    isDeleteIdeasListPending,
    setIsDeleteDialogOpen,
    handleConfirmDeleteButtonClick,
  };
}
