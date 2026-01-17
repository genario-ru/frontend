import { BookmarkIcon, BookmarkXIcon } from "lucide-react";
import type { RefObject } from "react";

import { IdeasListIdeaCardSecondaryActionsMenu } from "@/features/ideas-list/ideas-list-idea-card/components/ideas-list-idea-card-secondary-actions-menu";
import { IdeasListIdeaCardSecondaryActionsMenuButton } from "@/features/ideas-list/ideas-list-idea-card/components/ideas-list-idea-card-secondary-actions-menu-button";

import { useIdeasListIdeaCardSecondaryActions } from "../hooks/use-ideas-list-idea-card-secondary-actions";
import { IdeasListIdeaCardDeleteDialog } from "./ideas-list-idea-card-delete-dialog";
import { IdeasListIdeaCardEditDialog } from "./ideas-list-idea-card-edit-dialog";

type IdeasListIdeaCardSecondaryActionsProps = {
  ideaId: string;
  initialSaved: boolean;
  copyElementRef: RefObject<HTMLParagraphElement | null>;
};

export function IdeasListIdeaCardSecondaryActions({
  ideaId,
  initialSaved,
  copyElementRef,
}: IdeasListIdeaCardSecondaryActionsProps) {
  const {
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
  } = useIdeasListIdeaCardSecondaryActions({
    ideaId,
    initialSaved,
    copyElementRef,
  });

  return (
    <IdeasListIdeaCardSecondaryActionsMenu
      isOpen={isMenuOpen}
      setIsOpen={setIsMenuOpen}
    >
      <IdeasListIdeaCardEditDialog
        isOpened={isEditDialogOpen}
        setIsOpened={setIsEditDialogOpen}
      />
      <IdeasListIdeaCardSecondaryActionsMenuButton
        icon={isOptimisticSaved ? <BookmarkXIcon /> : <BookmarkIcon />}
        onClick={handleSaveButtonClick}
      >
        {isOptimisticSaved ? "Убрать из сохраненных" : "Сохранить"}
      </IdeasListIdeaCardSecondaryActionsMenuButton>
      <IdeasListIdeaCardDeleteDialog
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        isDeleteIdeaPending={isDeleteIdeaPending}
        handleConfirmDeleteButtonClick={handleConfirmDeleteButtonClick}
      />
    </IdeasListIdeaCardSecondaryActionsMenu>
  );
}
