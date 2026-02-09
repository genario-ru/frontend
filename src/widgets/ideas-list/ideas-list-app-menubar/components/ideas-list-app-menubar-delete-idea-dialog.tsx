import { TrashIcon } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogPredefinedHeader,
  DialogTrigger,
} from "@/shared/components/ui/dialog";

import { useIdeasListAppMenubarDeleteIdeaDialog } from "../hooks/use-ideas-list-app-menubar-delete-idea-dialog";

type IdeasListAppMenubarDeleteIdeaDialogProps = {
  ideasListId: string;
};

export function IdeasListAppMenubarDeleteIdeaDialog({
  ideasListId,
}: IdeasListAppMenubarDeleteIdeaDialogProps) {
  const {
    isDeleteDialogOpen,
    isDeleteIdeasListPending,
    setIsDeleteDialogOpen,
    handleDeleteConfirmButtonClick,
  } = useIdeasListAppMenubarDeleteIdeaDialog({ ideasListId });

  return (
    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="tertiary" color="negative" icon={<TrashIcon />} />
      </DialogTrigger>
      <DialogContent>
        <DialogPredefinedHeader
          title="Удаление списка идей"
          description="Вы уверены, что хотите удалить список идей?"
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button>Отмена</Button>
          </DialogClose>
          <Button
            variant="primary"
            color="negative"
            state={isDeleteIdeasListPending ? "loading" : "default"}
            onClick={handleDeleteConfirmButtonClick}
          >
            Удалить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
