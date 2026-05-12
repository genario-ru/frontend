import type { FormEvent } from "react";

import { Button } from "@/shared/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerSection,
} from "@/shared/components/ui/drawer";

import type { ScenarioMetadataCardRegenerateDialogForm } from "../hooks/use-scenario-metadata-card-regenerate-dialog";

type ScenarioMetadataCardRegenerateDrawerProps = {
  form: ScenarioMetadataCardRegenerateDialogForm;
  platformName: string;
  isOpen: boolean;
  isPending: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onFormSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export function ScenarioMetadataCardRegenerateDrawer({
  form,
  platformName,
  isOpen,
  isPending,
  onOpenChange,
  onFormSubmit,
}: ScenarioMetadataCardRegenerateDrawerProps) {
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader
          title={`Изменить метаданные для ${platformName}`}
          description="Добавьте необязательные инструкции, если хотите уточнить результат для этой платформы"
        />
        <form onSubmit={onFormSubmit} className="flex flex-col gap-2">
          <DrawerSection>
            <form.AppField name="prompt">
              {(field) => (
                <field.TextareaField placeholder="Например: сделать тон более провокационным, а описание короче" />
              )}
            </form.AppField>
          </DrawerSection>
          <DrawerSection row roundedBottom={false} className="justify-between">
            <DrawerClose render={<Button size="lg">Отмена</Button>} />
            <form.AppForm>
              <form.SubmitButton
                size="lg"
                state={isPending ? "loading" : "default"}
              >
                Сгенерировать повторно
              </form.SubmitButton>
            </form.AppForm>
          </DrawerSection>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
