import {
  BookmarkIcon,
  BookmarkXIcon,
  PencilIcon,
  TrashIcon,
} from "lucide-react";

import { Button } from "@/shared/components/ui/button";

import { useIdeasListIdeaCardSecondaryActions } from "../hooks/use-ideas-list-idea-card-secondary-actions";
import { IdeasListIdeaCardDeleteDialog } from "./ideas-list-idea-card-delete-dialog";
import { IdeasListIdeaCardEditDialog } from "./ideas-list-idea-card-edit-dialog";

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

  return (
    <div className="flex h-full w-full flex-col gap-2">
      <IdeasListIdeaCardEditDialog
        ideaId={ideaId}
        initialName={initialName}
        initialDescription={initialDescription}
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
      <IdeasListIdeaCardDeleteDialog
        ideaId={ideaId}
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
      />
    </div>
  );
}
