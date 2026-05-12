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

import type { useScenarioAppMenubarImproveDialog } from "../hooks/use-scenario-app-menubar-improve-dialog";

type ScenarioAppMenubarImproveDialogDrawerProps = {
  trigger?: ReactElement | null;
  form: ReturnType<typeof useScenarioAppMenubarImproveDialog>["form"];
  isImproveDialogOpen: boolean;
  isImproveDialogPending: boolean;
  setIsImproveDialogOpen: (isOpen: boolean) => void;
  onFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function ScenarioAppMenubarImproveDialogDrawer({
  trigger,
  form,
  isImproveDialogOpen,
  isImproveDialogPending,
  setIsImproveDialogOpen,
  onFormSubmit,
}: ScenarioAppMenubarImproveDialogDrawerProps) {
  return (
    <Drawer open={isImproveDialogOpen} onOpenChange={setIsImproveDialogOpen}>
      {trigger && <DrawerTrigger render={trigger} />}
      <DrawerContent>
        <DrawerHeader
          title="Улучшить сценарий"
          description="Опишите, что бы вы хотели улучшить или что вас в нем не устраивает"
        />
        <form onSubmit={onFormSubmit} className="flex flex-col gap-2">
          <DrawerSection>
            <form.AppField name="prompt">
              {(field) => (
                <field.TextareaField placeholder="Опишите, что вам не понравилось или хотелось бы улучшить" />
              )}
            </form.AppField>
          </DrawerSection>
          <DrawerSection row roundedBottom={false} className="justify-between">
            <DrawerClose render={<Button size="lg">Отмена</Button>} />
            <form.AppForm>
              <form.SubmitButton
                size="lg"
                state={isImproveDialogPending ? "loading" : "default"}
              >
                Улучшить
              </form.SubmitButton>
            </form.AppForm>
          </DrawerSection>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
