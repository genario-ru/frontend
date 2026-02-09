import { useNavigate } from "@tanstack/react-router";
import { useCallback, useState } from "react";

import { useDeleteIdeasList } from "@/actions/ideas-lists/hooks/use-delete-ideas-list";

type UseIdeasListAppMenubarDeleteIdeaDialogParams = {
  ideasListId: string;
};

export function useIdeasListAppMenubarDeleteIdeaDialog({
  ideasListId,
}: UseIdeasListAppMenubarDeleteIdeaDialogParams) {
  const navigate = useNavigate();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { deleteIdeasList, isDeleteIdeasListPending } = useDeleteIdeasList({
    onSuccess: () => {
      setIsDeleteDialogOpen(false);
      navigate({ to: "/archive" });
    },
  });

  const handleDeleteConfirmButtonClick = useCallback(() => {
    deleteIdeasList({ path: { ideasListId } });
  }, [deleteIdeasList, ideasListId]);

  return {
    isDeleteDialogOpen,
    isDeleteIdeasListPending,
    setIsDeleteDialogOpen,
    handleDeleteConfirmButtonClick,
  };
}
