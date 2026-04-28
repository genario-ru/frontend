import type { ReactNode } from "react";

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

import { useIdeasListIdeaCardEditDialog } from "../hooks/use-ideas-list-idea-card-edit-dialog";

type IdeasListIdeaCardEditDialogProps = {
  ideaId: string;
  initialName?: string | null;
  initialDescription?: string | null;
  trigger: ReactNode;
  handleCloseMenu?: () => void;
};

export function IdeasListIdeaCardEditDialog({
  ideaId,
  initialName,
  initialDescription,
  trigger,
  handleCloseMenu,
}: IdeasListIdeaCardEditDialogProps) {
  const {
    form,
    isUpdateIdeaPending,
    isEditDialogOpen,
    setIsEditDialogOpen,
    onFormSubmit,
  } = useIdeasListIdeaCardEditDialog({
    ideaId,
    initialName,
    initialDescription,
    handleCloseMenu,
  });

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
