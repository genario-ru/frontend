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

import type { useIdeasListIdeaCardEditDialog } from "../hooks/use-ideas-list-idea-card-edit-dialog";

type IdeasListIdeaCardEditDialogProps = {
  trigger: ReactElement;
  form: ReturnType<typeof useIdeasListIdeaCardEditDialog>["form"];
  isUpdateIdeaPending: boolean;
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (isOpen: boolean) => void;
  onFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function IdeasListIdeaCardEditDialog({
  trigger,
  form,
  isUpdateIdeaPending,
  isEditDialogOpen,
  setIsEditDialogOpen,
  onFormSubmit,
}: IdeasListIdeaCardEditDialogProps) {
  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogPredefinedHeader
          title="Редактировать идею"
          description="Измените название и контент идеи вручную"
        />
        <form onSubmit={onFormSubmit} className="flex flex-col">
          <DialogBody>
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
          </DialogBody>
          <DialogFooter>
            <DialogClose asChild>
              <Button>Отмена</Button>
            </DialogClose>
            <form.AppForm>
              <form.SubmitButton
                state={isUpdateIdeaPending ? "loading" : "default"}
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
