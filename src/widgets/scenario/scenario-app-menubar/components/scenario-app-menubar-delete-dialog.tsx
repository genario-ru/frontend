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

type ScenarioAppMenubarDeleteDialogProps = {
  trigger?: ReactElement;
  scenarioId?: string;
  handleDropdownMenuClose?: () => void;
  onTriggerClick?: () => void;
  isDeleteDialogOpen: boolean;
  isDeleteScenarioPending: boolean;
  setIsDeleteDialogOpen: (isOpen: boolean) => void;
  handleConfirmDeleteButtonClick: () => void;
};

export function ScenarioAppMenubarDeleteDialog({
  trigger,
  isDeleteDialogOpen,
  isDeleteScenarioPending,
  setIsDeleteDialogOpen,
  handleConfirmDeleteButtonClick,
}: ScenarioAppMenubarDeleteDialogProps) {
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
          title="Вы уверены?"
          description="После удаления сценарий нельзя будет восстановить"
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button>Отмена</Button>
          </DialogClose>
          <Button
            variant="negative"
            priority="primary"
            state={isDeleteScenarioPending ? "loading" : "default"}
            onClick={handleConfirmDeleteButtonClick}
          >
            Удалить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
