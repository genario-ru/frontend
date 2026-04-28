import { WandSparklesIcon } from "lucide-react";

import { AppMenubarButton } from "@/features/navigation/app-menubar/components/app-menubar-button";
import { Button, type ButtonProps } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogPredefinedHeader,
  DialogTrigger,
} from "@/shared/components/ui/dialog";

import { useIdeasListAppMenubarMoreIdeasDialog } from "../hooks/use-ideas-list-app-menubar-more-ideas-dialog";

type IdeasListAppMenubarMoreIdeasDialogProps = {
  ideasListId: string;
  triggerProps?: ButtonProps;
};

export function IdeasListAppMenubarMoreIdeasDialog({
  ideasListId,
  triggerProps,
}: IdeasListAppMenubarMoreIdeasDialogProps) {
  const {
    form,
    isMoreIdeasDialogOpen,
    isGenerateMoreIdeasPending,
    setIsMoreIdeasDialogOpen,
    onFormSubmit,
  } = useIdeasListAppMenubarMoreIdeasDialog({ ideasListId });

  return (
    <Dialog
      open={isMoreIdeasDialogOpen}
      onOpenChange={setIsMoreIdeasDialogOpen}
    >
      <DialogTrigger asChild>
        <AppMenubarButton icon={<WandSparklesIcon />} {...triggerProps}>
          Больше идей
        </AppMenubarButton>
      </DialogTrigger>
      <DialogContent>
        <DialogPredefinedHeader
          title="Сгенерировать еще идей"
          description="Опищите ниже, если бы вы хотели как-то изменить или улучшить в резултаты"
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
