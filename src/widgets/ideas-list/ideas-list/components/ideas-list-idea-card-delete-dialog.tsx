import type { ReactElement } from "react";

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
  trigger: ReactElement;
  isDeleteDialogOpen: boolean;
  isDeleteIdeaPending: boolean;
  setIsDeleteDialogOpen: (isOpen: boolean) => void;
  handleConfirmDeleteButtonClick: () => void;
};

export function IdeasListIdeaCardDeleteDialog({
  trigger,
  isDeleteDialogOpen,
  isDeleteIdeaPending,
  setIsDeleteDialogOpen,
  handleConfirmDeleteButtonClick,
}: IdeasListIdeaCardDeleteDialogProps) {
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
