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

import type { useIdeasListAppMenubarMoreIdeasDialog } from "../hooks/use-ideas-list-app-menubar-more-ideas-dialog";

type IdeasListAppMenubarMoreIdeasDialogProps = {
  trigger: ReactElement;
  form: ReturnType<typeof useIdeasListAppMenubarMoreIdeasDialog>["form"];
  isMoreIdeasDialogOpen: boolean;
  isGenerateMoreIdeasPending: boolean;
  setIsMoreIdeasDialogOpen: (isOpen: boolean) => void;
  onFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function IdeasListAppMenubarMoreIdeasDialog({
  trigger,
  form,
  isMoreIdeasDialogOpen,
  isGenerateMoreIdeasPending,
  setIsMoreIdeasDialogOpen,
  onFormSubmit,
}: IdeasListAppMenubarMoreIdeasDialogProps) {
  return (
    <Dialog
      open={isMoreIdeasDialogOpen}
      onOpenChange={setIsMoreIdeasDialogOpen}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogPredefinedHeader
          title="Сгенерировать еще идей"
          description="Опишите ниже, если бы вы хотели как-то изменить или улучшить результаты"
        />
        <form onSubmit={onFormSubmit} className="flex flex-col">
          <DialogBody>
            <form.AppField name="userPrompt">
              {(field) => (
                <field.TextareaField placeholder="Придумай такие идеи для видео, чтобы зрители сразу хотели их посмотреть" />
              )}
            </form.AppField>
          </DialogBody>
          <DialogFooter>
            <DialogClose asChild>
              <Button>Отмена</Button>
            </DialogClose>
            <form.AppForm>
              <form.SubmitButton
                state={isGenerateMoreIdeasPending ? "loading" : "default"}
              >
                Сгенерировать идеи
              </form.SubmitButton>
            </form.AppForm>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
