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

import { useScenarioAppMenubarDeleteDialog } from "../hooks/use-scenario-app-menubar-delete-dialog";

type ScenarioAppMenubarDeleteDialogProps = {
  scenarioId: string;
};

export function ScenarioAppMenubarDeleteDialog({
  scenarioId,
}: ScenarioAppMenubarDeleteDialogProps) {
  const {
    isDeleteDialogOpen,
    isDeleteScenarioPending,
    setIsDeleteDialogOpen,
    handleConfirmDeleteButtonClick,
  } = useScenarioAppMenubarDeleteDialog({ scenarioId });

  return (
    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="tertiary" color="negative" icon={<TrashIcon />} />
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
            color="negative"
            variant="primary"
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
