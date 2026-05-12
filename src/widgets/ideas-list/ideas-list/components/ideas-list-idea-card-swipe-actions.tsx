import {
  BookmarkIcon,
  BookmarkXIcon,
  PencilIcon,
  TrashIcon,
} from "lucide-react";

import { Button } from "@/shared/components/ui/button";

import { useIdeasListIdeaCardDeleteDialog } from "../hooks/use-ideas-list-idea-card-delete-dialog";
import { useIdeasListIdeaCardEditDialog } from "../hooks/use-ideas-list-idea-card-edit-dialog";
import { useIdeasListIdeaCardSecondaryActions } from "../hooks/use-ideas-list-idea-card-secondary-actions";
import { IdeasListIdeaCardDeleteDialogDrawer } from "./ideas-list-idea-card-delete-drawer";
import { IdeasListIdeaCardEditDialogDrawer } from "./ideas-list-idea-card-edit-drawer";

const SWIPE_ACTION_CLASS_NAME = "h-full w-full justify-center flex-1";

type IdeasListIdeaCardSwipeActionsProps = {
  ideaId: string;
  initialSaved: boolean;
  initialName?: string | null;
  initialDescription?: string | null;
};

export function IdeasListIdeaCardSwipeActions({
  ideaId,
  initialSaved,
  initialName,
  initialDescription,
}: IdeasListIdeaCardSwipeActionsProps) {
  const { isOptimisticSaved, handleSaveButtonClick } =
    useIdeasListIdeaCardSecondaryActions({
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
  });
  const {
    isDeleteDialogOpen,
    isDeleteIdeaPending,
    setIsDeleteDialogOpen,
    handleConfirmDeleteButtonClick,
  } = useIdeasListIdeaCardDeleteDialog({
    ideaId,
  });

  return (
    <div className="flex h-full w-full flex-col gap-2">
      <IdeasListIdeaCardEditDialogDrawer
        trigger={
          <Button
            size="sm"
            priority="tertiary"
            direction="column"
            iconPosition="left"
            icon={<PencilIcon />}
            className={SWIPE_ACTION_CLASS_NAME}
          >
            Редактировать
          </Button>
        }
        form={form}
        isUpdateIdeaPending={isUpdateIdeaPending}
        isEditDialogOpen={isEditDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
        onFormSubmit={onFormSubmit}
      />
      <Button
        type="button"
        size="sm"
        priority="tertiary"
        direction="column"
        iconPosition="left"
        icon={isOptimisticSaved ? <BookmarkXIcon /> : <BookmarkIcon />}
        className={SWIPE_ACTION_CLASS_NAME}
        onClick={handleSaveButtonClick}
      >
        {isOptimisticSaved ? "Убрать из сохраненных" : "Сохранить"}
      </Button>
      <IdeasListIdeaCardDeleteDialogDrawer
        trigger={
          <Button
            type="button"
            size="sm"
            variant="negative"
            direction="column"
            iconPosition="left"
            icon={<TrashIcon />}
            className={SWIPE_ACTION_CLASS_NAME}
          >
            Удалить
          </Button>
        }
        isDeleteDialogOpen={isDeleteDialogOpen}
        isDeleteIdeaPending={isDeleteIdeaPending}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        handleConfirmDeleteButtonClick={handleConfirmDeleteButtonClick}
      />
    </div>
  );
}
