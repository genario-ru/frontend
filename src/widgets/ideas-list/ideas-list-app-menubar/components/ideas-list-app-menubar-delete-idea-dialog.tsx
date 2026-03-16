import { TrashIcon } from "lucide-react";

import { AppMenubarDropdownMenuButton } from "@/features/navigation/app-menubar/components/app-menubar-dropdown-menu-button";
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
  handleDropdownMenuClose: () => void;
};

export function IdeasListAppMenubarDeleteIdeaDialog({
  ideasListId,
  handleDropdownMenuClose,
}: IdeasListAppMenubarDeleteIdeaDialogProps) {
  const {
    isDeleteDialogOpen,
    isDeleteIdeasListPending,
    setIsDeleteDialogOpen,
    handleDeleteConfirmButtonClick,
  } = useIdeasListAppMenubarDeleteIdeaDialog({
    ideasListId,
    handleDropdownMenuClose,
  });

  return (
    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <DialogTrigger asChild>
        <AppMenubarDropdownMenuButton variant="negative" icon={<TrashIcon />}>
          Удалить
        </AppMenubarDropdownMenuButton>
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
            priority="primary"
            variant="negative"
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
