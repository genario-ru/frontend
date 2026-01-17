import { BookmarkIcon } from "lucide-react";
import type { RefObject } from "react";

import { IdeasListIdeaCardSecondaryActionsMenu } from "@/features/ideas-lists/ideas-list-idea-card/components/ideas-list-idea-card-secondary-actions-menu";
import { IdeasListIdeaCardSecondaryActionsMenuButton } from "@/features/ideas-lists/ideas-list-idea-card/components/ideas-list-idea-card-secondary-actions-menu-button";
import { cn } from "@/shared/utils/cn";

import { useIdeasListIdeaCardSecondaryActions } from "../hooks/use-ideas-list-idea-card-secondary-actions";
import { IdeasListIdeaCardDeleteDialog } from "./ideas-list-idea-card-delete-dialog";
import { IdeasListIdeaCardEditDialog } from "./ideas-list-idea-card-edit-dialog";

type IdeasListIdeaCardSecondaryActionsProps = {
  ideaId: string;
  copyElementRef: RefObject<HTMLParagraphElement | null>;
};

export function IdeasListIdeaCardSecondaryActions({
  ideaId,
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
        icon={<BookmarkIcon />}
        onClick={handleSaveButtonClick}
        className={cn({
          "[&_svg]:fill-neutral-8 hover:[&_svg]:fill-neutral-8 focus-visible:[&_svg]:fill-neutral-8":
            isOptimisticSaved,
        })}
      >
        Сохранить
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
