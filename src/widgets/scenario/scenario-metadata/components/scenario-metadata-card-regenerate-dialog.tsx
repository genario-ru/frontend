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

import type { ScenarioMetadataCardRegenerateDialogForm } from "../hooks/use-scenario-metadata-card-regenerate-dialog";

type ScenarioMetadataCardRegenerateDialogProps = {
  form: ScenarioMetadataCardRegenerateDialogForm;
  platformName: string;
  isOpen: boolean;
  isPending: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onFormSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export function ScenarioMetadataCardRegenerateDialog({
  form,
  platformName,
  isOpen,
  isPending,
  onOpenChange,
  onFormSubmit,
}: ScenarioMetadataCardRegenerateDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogPredefinedHeader
          title={`Повторно сгенерировать метаданные для ${platformName}`}
          description="Добавьте необязательные инструкции, если хотите уточнить результат для этой платформы"
        />
        <form onSubmit={onFormSubmit} className="flex flex-col">
          <DialogBody>
            <form.AppField name="prompt">
              {(field) => (
                <field.TextareaField placeholder="Например: сделать тон более провокационным, а описание короче" />
              )}
            </form.AppField>
          </DialogBody>
          <DialogFooter>
            <DialogClose asChild>
              <Button>Отмена</Button>
            </DialogClose>
            <form.AppForm>
              <form.SubmitButton state={isPending ? "loading" : "default"}>
                Сгенерировать повторно
              </form.SubmitButton>
            </form.AppForm>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
