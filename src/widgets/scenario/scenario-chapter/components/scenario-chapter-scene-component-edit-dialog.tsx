import type { FormEvent } from "react";

import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogPredefinedHeader,
} from "@/shared/components/ui/dialog";

import type { useScenarioChapterSceneComponentEditDialog } from "../hooks/use-scenario-chapter-scene-component-edit-dialog";

type ScenarioChapterSceneComponentEditDialogProps = {
  isOpen: boolean;
  componentName: string;
  setIsOpen: (isOpen: boolean) => void;
  form: ReturnType<typeof useScenarioChapterSceneComponentEditDialog>["form"];
  isUpdateScenarioSceneComponentPending: boolean;
  onFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function ScenarioChapterSceneComponentEditDialog({
  isOpen,
  componentName,
  setIsOpen,
  form,
  isUpdateScenarioSceneComponentPending,
  onFormSubmit,
}: ScenarioChapterSceneComponentEditDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogPredefinedHeader title={componentName} />
        <form onSubmit={onFormSubmit} className="flex flex-col">
          <DialogBody>
            <form.AppField name="content">
              {(field) => <field.TextareaField />}
            </form.AppField>
          </DialogBody>
          <DialogFooter>
            <DialogClose asChild>
              <Button>Отмена</Button>
            </DialogClose>
            <form.AppForm>
              <form.SubmitButton
                state={
                  isUpdateScenarioSceneComponentPending ? "loading" : "default"
                }
              >
                Сохранить
              </form.SubmitButton>
            </form.AppForm>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
