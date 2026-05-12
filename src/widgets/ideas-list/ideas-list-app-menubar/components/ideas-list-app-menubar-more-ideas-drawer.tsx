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

import type { useIdeasListAppMenubarMoreIdeasDialog } from "../hooks/use-ideas-list-app-menubar-more-ideas-dialog";

type IdeasListAppMenubarMoreIdeasDialogDrawerProps = {
  trigger?: ReactElement | null;
  form: ReturnType<typeof useIdeasListAppMenubarMoreIdeasDialog>["form"];
  isMoreIdeasDialogOpen: boolean;
  isGenerateMoreIdeasPending: boolean;
  setIsMoreIdeasDialogOpen: (isOpen: boolean) => void;
  onFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function IdeasListAppMenubarMoreIdeasDialogDrawer({
  trigger,
  form,
  isMoreIdeasDialogOpen,
  isGenerateMoreIdeasPending,
  setIsMoreIdeasDialogOpen,
  onFormSubmit,
}: IdeasListAppMenubarMoreIdeasDialogDrawerProps) {
  return (
    <Drawer
      open={isMoreIdeasDialogOpen}
      onOpenChange={setIsMoreIdeasDialogOpen}
    >
      {trigger && <DrawerTrigger render={trigger} />}
      <DrawerContent>
        <DrawerHeader
          title="Сгенерировать еще идей"
          description="Опишите ниже, если бы вы хотели как-то изменить или улучшить результаты"
        />
        <form onSubmit={onFormSubmit} className="flex flex-col">
          <DrawerSection>
            <form.AppField name="userPrompt">
              {(field) => (
                <field.TextareaField placeholder="Придумай такие идеи для видео, чтобы зрители сразу хотели их посмотреть" />
              )}
            </form.AppField>
          </DrawerSection>
          <DrawerSection row roundedBottom={false} className="justify-between">
            <DrawerClose render={<Button>Отмена</Button>} />
            <form.AppForm>
              <form.SubmitButton
                state={isGenerateMoreIdeasPending ? "loading" : "default"}
              >
                Сгенерировать идеи
              </form.SubmitButton>
            </form.AppForm>
          </DrawerSection>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
