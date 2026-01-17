import { TrashIcon } from "lucide-react";

import { IdeasListIdeaCardSecondaryActionsMenuButton } from "@/features/ideas-list/ideas-list-idea-card/components/ideas-list-idea-card-secondary-actions-menu-button";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogPredefinedHeader,
  DialogTrigger,
} from "@/shared/components/ui/dialog";

type IdeasListIdeaCardDeleteDialogProps = {
  isDeleteDialogOpen: boolean;
  isDeleteIdeaPending: boolean;
  setIsDeleteDialogOpen: (isDeleteDialogOpen: boolean) => void;
  handleConfirmDeleteButtonClick: () => void;
};

export function IdeasListIdeaCardDeleteDialog({
  isDeleteDialogOpen,
  isDeleteIdeaPending,
  setIsDeleteDialogOpen,
  handleConfirmDeleteButtonClick,
}: IdeasListIdeaCardDeleteDialogProps) {
  return (
    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <DialogTrigger asChild>
        <IdeasListIdeaCardSecondaryActionsMenuButton
          color="negative"
          icon={<TrashIcon />}
        >
          Удалить
        </IdeasListIdeaCardSecondaryActionsMenuButton>
      </DialogTrigger>
      <DialogContent>
        <DialogPredefinedHeader
          title="Вы уверены?"
          description="После удаления идею нельзя будет восстановить"
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button>Отмена</Button>
          </DialogClose>
          <Button
            variant="primary"
            color="negative"
            state={isDeleteIdeaPending ? "loading" : "default"}
            onClick={handleConfirmDeleteButtonClick}
          >
            Удалить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
