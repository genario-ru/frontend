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

import { useScenarioAppMenubarDeleteDialog } from "../hooks/use-scenario-app-menubar-delete-dialog";

type ScenarioAppMenubarDeleteDialogProps = {
  scenarioId: string;
  handleDropdownMenuClose: () => void;
};

export function ScenarioAppMenubarDeleteDialog({
  scenarioId,
  handleDropdownMenuClose,
}: ScenarioAppMenubarDeleteDialogProps) {
  const {
    isDeleteDialogOpen,
    isDeleteScenarioPending,
    setIsDeleteDialogOpen,
    handleConfirmDeleteButtonClick,
  } = useScenarioAppMenubarDeleteDialog({
    scenarioId,
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
