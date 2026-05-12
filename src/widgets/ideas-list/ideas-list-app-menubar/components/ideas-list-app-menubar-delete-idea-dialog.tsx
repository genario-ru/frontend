import { TrashIcon } from "lucide-react";
import type { ReactElement } from "react";

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

type IdeasListAppMenubarDeleteIdeaDialogProps = {
  trigger?: ReactElement;
  ideasListId?: string;
  handleDropdownMenuClose?: () => void;
  onTriggerClick?: () => void;
  isDeleteDialogOpen: boolean;
  isDeleteIdeasListPending: boolean;
  setIsDeleteDialogOpen: (isOpen: boolean) => void;
  handleConfirmDeleteButtonClick: () => void;
};

export function IdeasListAppMenubarDeleteIdeaDialog({
  trigger,
  isDeleteDialogOpen,
  isDeleteIdeasListPending,
  setIsDeleteDialogOpen,
  handleConfirmDeleteButtonClick,
}: IdeasListAppMenubarDeleteIdeaDialogProps) {
  return (
    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <AppMenubarDropdownMenuButton variant="negative" icon={<TrashIcon />}>
            Удалить
          </AppMenubarDropdownMenuButton>
        )}
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
            onClick={handleConfirmDeleteButtonClick}
          >
            Удалить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
