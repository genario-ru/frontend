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
  initialName?: string | null;
  initialDescription?: string | null;
  copyElementRef: RefObject<HTMLParagraphElement | null>;
};

export function IdeasListIdeaCardSecondaryActions({
  ideaId,
  initialSaved,
  initialName,
  initialDescription,
  copyElementRef,
}: IdeasListIdeaCardSecondaryActionsProps) {
  const {
    isOptimisticSaved,
    isMenuOpen,
    setIsMenuOpen,
    handleCloseMenu,
    handleSaveButtonClick,
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
        ideaId={ideaId}
        initialName={initialName}
        initialDescription={initialDescription}
        handleCloseMenu={handleCloseMenu}
      />
      <IdeasListIdeaCardSecondaryActionsMenuButton
        icon={isOptimisticSaved ? <BookmarkXIcon /> : <BookmarkIcon />}
        onClick={handleSaveButtonClick}
      >
        {isOptimisticSaved ? "Убрать из сохраненных" : "Сохранить"}
      </IdeasListIdeaCardSecondaryActionsMenuButton>
      <IdeasListIdeaCardDeleteDialog
        ideaId={ideaId}
        setIsMenuOpen={setIsMenuOpen}
      />
    </IdeasListIdeaCardSecondaryActionsMenu>
  );
}
