import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogPredefinedHeader,
} from "@/shared/components/ui/dialog";

import { useScenarioChapterSceneComponentEditDialog } from "../hooks/use-scenario-chapter-scene-component-edit-dialog";

type ScenarioChapterSceneComponentEditDialogProps = {
  isOpen: boolean;
  componentId: string;
  componentName: string;
  content: string;
  chapterId: string;
  setIsOpen: (isOpen: boolean) => void;
};

export function ScenarioChapterSceneComponentEditDialog({
  isOpen,
  componentId,
  componentName,
  content,
  chapterId,
  setIsOpen,
}: ScenarioChapterSceneComponentEditDialogProps) {
  const { form, isUpdateScenarioSceneComponentPending, onFormSubmit } =
    useScenarioChapterSceneComponentEditDialog({
      componentId,
      componentName,
      content,
      chapterId,
      setIsOpen,
    });

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
