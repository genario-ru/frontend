import type { FormEvent } from "react";

import { Button } from "@/shared/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerSection,
} from "@/shared/components/ui/drawer";

import type { useScenarioChapterSceneComponentEditDialog } from "../hooks/use-scenario-chapter-scene-component-edit-dialog";

type ScenarioChapterSceneComponentEditDialogDrawerProps = {
  isOpen: boolean;
  componentName: string;
  setIsOpen: (isOpen: boolean) => void;
  form: ReturnType<typeof useScenarioChapterSceneComponentEditDialog>["form"];
  isUpdateScenarioSceneComponentPending: boolean;
  onFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function ScenarioChapterSceneComponentEditDialogDrawer({
  isOpen,
  componentName,
  setIsOpen,
  form,
  isUpdateScenarioSceneComponentPending,
  onFormSubmit,
}: ScenarioChapterSceneComponentEditDialogDrawerProps) {
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <DrawerHeader title={componentName} />
        <form onSubmit={onFormSubmit} className="flex flex-col gap-2">
          <DrawerSection>
            <form.AppField name="content">
              {(field) => <field.TextareaField />}
            </form.AppField>
          </DrawerSection>
          <DrawerSection row roundedBottom={false} className="justify-between">
            <DrawerClose render={<Button size="lg">Отмена</Button>} />
            <form.AppForm>
              <form.SubmitButton
                size="lg"
                state={
                  isUpdateScenarioSceneComponentPending ? "loading" : "default"
                }
              >
                Сохранить
              </form.SubmitButton>
            </form.AppForm>
          </DrawerSection>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
