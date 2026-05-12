import type { FormEvent, ReactElement } from "react";

import { Button } from "@/shared/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerSection,
  DrawerTrigger,
} from "@/shared/components/ui/drawer";

import type { useIdeasListIdeaCardEditDialog } from "../hooks/use-ideas-list-idea-card-edit-dialog";

type IdeasListIdeaCardEditDialogDrawerProps = {
  trigger: ReactElement;
  form: ReturnType<typeof useIdeasListIdeaCardEditDialog>["form"];
  isUpdateIdeaPending: boolean;
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (isOpen: boolean) => void;
  onFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function IdeasListIdeaCardEditDialogDrawer({
  trigger,
  form,
  isUpdateIdeaPending,
  isEditDialogOpen,
  setIsEditDialogOpen,
  onFormSubmit,
}: IdeasListIdeaCardEditDialogDrawerProps) {
  return (
    <Drawer open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DrawerTrigger render={trigger} />
      <DrawerContent>
        <DrawerHeader
          title="Редактировать идею"
          description="Измените название и контент идеи вручную"
        />
        <form onSubmit={onFormSubmit} className="flex flex-col">
          <DrawerSection>
            <form.AppField name="name">
              {(field) => (
                <field.InputField
                  label="Название идеи"
                  type="text"
                  placeholder="Название идеи"
                />
              )}
            </form.AppField>
            <form.AppField name="description">
              {(field) => (
                <field.TextareaField
                  label="Описание идеи"
                  placeholder="Описание идеи"
                />
              )}
            </form.AppField>
          </DrawerSection>
          <DrawerSection row roundedBottom={false} className="justify-between">
            <DrawerClose render={<Button>Отмена</Button>} />
            <form.AppForm>
              <form.SubmitButton
                state={isUpdateIdeaPending ? "loading" : "default"}
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
