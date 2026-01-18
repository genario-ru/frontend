import { PencilIcon } from "lucide-react";

import { IdeasListIdeaCardSecondaryActionsMenuButton } from "@/features/ideas-list/ideas-list-idea-card/components/ideas-list-idea-card-secondary-actions-menu-button";
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
  handleCloseMenu: () => void;
};

export function IdeasListIdeaCardEditDialog({
  ideaId,
  initialName,
  initialDescription,
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
      <DialogTrigger asChild>
        <IdeasListIdeaCardSecondaryActionsMenuButton icon={<PencilIcon />}>
          Редактировать
        </IdeasListIdeaCardSecondaryActionsMenuButton>
      </DialogTrigger>
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
