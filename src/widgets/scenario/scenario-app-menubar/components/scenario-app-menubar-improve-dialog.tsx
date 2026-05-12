import type { FormEvent, ReactElement } from "react";

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

import type { useScenarioAppMenubarImproveDialog } from "../hooks/use-scenario-app-menubar-improve-dialog";

type ScenarioAppMenubarImproveDialogProps = {
  trigger: ReactElement;
  form: ReturnType<typeof useScenarioAppMenubarImproveDialog>["form"];
  isImproveDialogOpen: boolean;
  isImproveDialogPending: boolean;
  setIsImproveDialogOpen: (isOpen: boolean) => void;
  onFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function ScenarioAppMenubarImproveDialog({
  trigger,
  form,
  isImproveDialogOpen,
  isImproveDialogPending,
  setIsImproveDialogOpen,
  onFormSubmit,
}: ScenarioAppMenubarImproveDialogProps) {
  return (
    <Dialog open={isImproveDialogOpen} onOpenChange={setIsImproveDialogOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
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
