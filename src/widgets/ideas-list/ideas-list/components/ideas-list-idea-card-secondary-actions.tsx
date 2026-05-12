import {
  BookmarkIcon,
  BookmarkXIcon,
  PencilIcon,
  TrashIcon,
} from "lucide-react";

import { IdeasListIdeaCardSecondaryActionsMenuButton } from "@/features/ideas-list/ideas-list-idea-card/components/ideas-list-idea-card-secondary-actions-menu-button";
import { IdeasListIdeaCardSecondaryActionsMenuDrawer } from "@/features/ideas-list/ideas-list-idea-card/components/ideas-list-idea-card-secondary-actions-menu-drawer";
import { IdeasListIdeaCardSecondaryActionsMenuDropdown } from "@/features/ideas-list/ideas-list-idea-card/components/ideas-list-idea-card-secondary-actions-menu-dropdown";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";

import { useIdeasListIdeaCardDeleteDialog } from "../hooks/use-ideas-list-idea-card-delete-dialog";
import { useIdeasListIdeaCardEditDialog } from "../hooks/use-ideas-list-idea-card-edit-dialog";
import { useIdeasListIdeaCardSecondaryActions } from "../hooks/use-ideas-list-idea-card-secondary-actions";
import { IdeasListIdeaCardDeleteDialog } from "./ideas-list-idea-card-delete-dialog";
import { IdeasListIdeaCardDeleteDialogDrawer } from "./ideas-list-idea-card-delete-drawer";
import { IdeasListIdeaCardEditDialog } from "./ideas-list-idea-card-edit-dialog";
import { IdeasListIdeaCardEditDialogDrawer } from "./ideas-list-idea-card-edit-drawer";

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
  const { isMobile } = useBreakpoints();

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

  const {
    form,
    isUpdateIdeaPending,
    isEditDialogOpen,
    setIsEditDialogOpen,
    onFormSubmit,
  } = useIdeasListIdeaCardEditDialog({
    ideaId,
    initialName,
    initialDescription,
    handleCloseMenu,
  });

  const {
    isDeleteDialogOpen,
    isDeleteIdeaPending,
    setIsDeleteDialogOpen,
    handleConfirmDeleteButtonClick,
  } = useIdeasListIdeaCardDeleteDialog({
    ideaId,
    handleCloseMenu,
  });

  const menuContent = (
    <>
      {isMobile ? (
        <IdeasListIdeaCardEditDialogDrawer
          trigger={
            <IdeasListIdeaCardSecondaryActionsMenuButton icon={<PencilIcon />}>
              Редактировать
            </IdeasListIdeaCardSecondaryActionsMenuButton>
          }
          form={form}
          isUpdateIdeaPending={isUpdateIdeaPending}
          isEditDialogOpen={isEditDialogOpen}
          setIsEditDialogOpen={setIsEditDialogOpen}
          onFormSubmit={onFormSubmit}
        />
      ) : (
        <IdeasListIdeaCardEditDialog
          trigger={
            <IdeasListIdeaCardSecondaryActionsMenuButton icon={<PencilIcon />}>
              Редактировать
            </IdeasListIdeaCardSecondaryActionsMenuButton>
          }
          form={form}
          isUpdateIdeaPending={isUpdateIdeaPending}
          isEditDialogOpen={isEditDialogOpen}
          setIsEditDialogOpen={setIsEditDialogOpen}
          onFormSubmit={onFormSubmit}
        />
      )}
      <IdeasListIdeaCardSecondaryActionsMenuButton
        icon={isOptimisticSaved ? <BookmarkXIcon /> : <BookmarkIcon />}
        onClick={() => {
          handleSaveButtonClick();
          handleCloseMenu();
        }}
      >
        {isOptimisticSaved ? "Убрать из сохраненных" : "Сохранить"}
      </IdeasListIdeaCardSecondaryActionsMenuButton>
      {isMobile ? (
        <IdeasListIdeaCardDeleteDialogDrawer
          trigger={
            <IdeasListIdeaCardSecondaryActionsMenuButton
              variant="negative"
              icon={<TrashIcon />}
            >
              Удалить
            </IdeasListIdeaCardSecondaryActionsMenuButton>
          }
          isDeleteDialogOpen={isDeleteDialogOpen}
          isDeleteIdeaPending={isDeleteIdeaPending}
          setIsDeleteDialogOpen={setIsDeleteDialogOpen}
          handleConfirmDeleteButtonClick={handleConfirmDeleteButtonClick}
        />
      ) : (
        <IdeasListIdeaCardDeleteDialog
          trigger={
            <IdeasListIdeaCardSecondaryActionsMenuButton
              variant="negative"
              icon={<TrashIcon />}
            >
              Удалить
            </IdeasListIdeaCardSecondaryActionsMenuButton>
          }
          isDeleteDialogOpen={isDeleteDialogOpen}
          isDeleteIdeaPending={isDeleteIdeaPending}
          setIsDeleteDialogOpen={setIsDeleteDialogOpen}
          handleConfirmDeleteButtonClick={handleConfirmDeleteButtonClick}
        />
      )}
    </>
  );

  if (isMobile) {
    return (
      <IdeasListIdeaCardSecondaryActionsMenuDrawer
        isOpen={isMenuOpen}
        setIsOpen={setIsMenuOpen}
      >
        {menuContent}
      </IdeasListIdeaCardSecondaryActionsMenuDrawer>
    );
  }

  return (
    <IdeasListIdeaCardSecondaryActionsMenuDropdown
      isOpen={isMenuOpen}
      setIsOpen={setIsMenuOpen}
    >
      {menuContent}
    </IdeasListIdeaCardSecondaryActionsMenuDropdown>
  );
}
