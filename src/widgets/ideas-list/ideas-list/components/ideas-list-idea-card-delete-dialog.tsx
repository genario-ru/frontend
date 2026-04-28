import type { ReactNode } from "react";

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
  trigger: ReactNode;
  handleCloseMenu?: () => void;
};

export function IdeasListIdeaCardDeleteDialog({
  ideaId,
  trigger,
  handleCloseMenu,
}: IdeasListIdeaCardDeleteDialogProps) {
  const {
    isDeleteDialogOpen,
    isDeleteIdeaPending,
    setIsDeleteDialogOpen,
    handleConfirmDeleteButtonClick,
  } = useIdeasListIdeaCardDeleteDialog({
    ideaId,
    handleCloseMenu,
  });

  return (
    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
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
