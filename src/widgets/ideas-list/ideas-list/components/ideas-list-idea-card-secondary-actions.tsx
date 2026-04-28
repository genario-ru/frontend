import {
  BookmarkIcon,
  BookmarkXIcon,
  PencilIcon,
  TrashIcon,
} from "lucide-react";

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
};

export function IdeasListIdeaCardSecondaryActions({
  ideaId,
  initialSaved,
  initialName,
  initialDescription,
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
        trigger={
          <IdeasListIdeaCardSecondaryActionsMenuButton icon={<PencilIcon />}>
            Редактировать
          </IdeasListIdeaCardSecondaryActionsMenuButton>
        }
      />
      <IdeasListIdeaCardSecondaryActionsMenuButton
        icon={isOptimisticSaved ? <BookmarkXIcon /> : <BookmarkIcon />}
        onClick={handleSaveButtonClick}
      >
        {isOptimisticSaved ? "Убрать из сохраненных" : "Сохранить"}
      </IdeasListIdeaCardSecondaryActionsMenuButton>
      <IdeasListIdeaCardDeleteDialog
        ideaId={ideaId}
        handleCloseMenu={handleCloseMenu}
        trigger={
          <IdeasListIdeaCardSecondaryActionsMenuButton
            variant="negative"
            icon={<TrashIcon />}
          >
            Удалить
          </IdeasListIdeaCardSecondaryActionsMenuButton>
        }
      />
    </IdeasListIdeaCardSecondaryActionsMenu>
  );
}
