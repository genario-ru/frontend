import { useNavigate } from "@tanstack/react-router";
import { useCallback, useState } from "react";

import { useDeleteIdeasList } from "@/actions/ideas-lists/hooks/use-delete-ideas-list";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";

type UseIdeasListAppMenubarDeleteIdeaDialogParams = {
  ideasListId: string;
  handleDropdownMenuClose: () => void;
};

export function useIdeasListAppMenubarDeleteIdeaDialog({
  ideasListId,
  handleDropdownMenuClose,
}: UseIdeasListAppMenubarDeleteIdeaDialogParams) {
  const { isMobile } = useBreakpoints();
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
    isMobile,
    isDeleteDialogOpen,
    isDeleteIdeasListPending,
    setIsDeleteDialogOpen,
    handleConfirmDeleteButtonClick,
  };
}
