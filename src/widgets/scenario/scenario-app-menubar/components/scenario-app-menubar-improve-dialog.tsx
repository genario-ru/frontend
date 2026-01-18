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

type ScenarioAppMenubarImproveDialogParams = {
  scenarioId: string;
};

export function ScenarioAppMenubarImproveDialog({
  scenarioId,
}: ScenarioAppMenubarImproveDialogParams) {
  const {
    form,
    isImproveDialogOpen,
    isImproveDialogPending,
    setIsImproveDialogOpen,
    onFormSubmit,
  } = useScenarioAppMenubarImproveDialog({ scenarioId });

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
        <form onSubmit={onFormSubmit} className="flex flex-col">
          <DialogBody>
            <form.AppField name="prompt">
              {(field) => (
                <field.TextareaField placeholder="Опишите, что вам не понравилось или хотелось бы улучшить" />
              )}
            </form.AppField>
          </DialogBody>
          <DialogFooter>
            <DialogClose asChild>
              <Button>Отмена</Button>
            </DialogClose>
            <form.AppForm>
              <form.SubmitButton
                state={isImproveDialogPending ? "loading" : "default"}
              >
                Улучшить
              </form.SubmitButton>
            </form.AppForm>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
