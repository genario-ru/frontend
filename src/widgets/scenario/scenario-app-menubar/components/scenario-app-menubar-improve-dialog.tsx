import { WandSparklesIcon } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogPredefinedHeader,
  DialogTrigger,
} from "@/shared/components/ui/dialog";

import { useScenarioAppMenubarImproveDialog } from "../hooks/use-scenario-app-menubar-improve-dialog";

export function ScenarioAppMenubarImproveDialog() {
  const { isImproveDialogOpen, setIsImproveDialogOpen } =
    useScenarioAppMenubarImproveDialog();

  return (
    <Dialog open={isImproveDialogOpen} onOpenChange={setIsImproveDialogOpen}>
      <DialogTrigger asChild>
        <Button icon={<WandSparklesIcon />}>Улучшить</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogPredefinedHeader
          title="Улучшить сценарий"
          description="Опишите, что бы вы хотели улучшить или что вас в нем не устраивает"
        />
        <DialogBody>
          {/* <form onSubmit={onFormSubmit} className="flex flex-col">
            <form.AppField name="prompt">
              {(field) => (
                <field.TextareaField placeholder="Опишите, что вам не понравилось или хотелось бы улучшить" />
              )}
            </form.AppField>
          </form> */}
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Отмена</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
