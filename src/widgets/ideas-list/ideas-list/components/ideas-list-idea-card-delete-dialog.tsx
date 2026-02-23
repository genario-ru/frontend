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

import { useIdeasListIdeaCardDeleteDialog } from "../hooks/use-ideas-list-idea-card-delete-dialog";

type IdeasListIdeaCardDeleteDialogProps = {
  ideaId: string;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
};

export function IdeasListIdeaCardDeleteDialog({
  ideaId,
  setIsMenuOpen,
}: IdeasListIdeaCardDeleteDialogProps) {
  const {
    isDeleteDialogOpen,
    isDeleteIdeaPending,
    setIsDeleteDialogOpen,
    handleConfirmDeleteButtonClick,
  } = useIdeasListIdeaCardDeleteDialog({
    ideaId,
    setIsMenuOpen,
  });

  return (
    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <DialogTrigger asChild>
        <IdeasListIdeaCardSecondaryActionsMenuButton
          variant="negative"
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
            priority="primary"
            variant="negative"
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
