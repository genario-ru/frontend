import { WandSparklesIcon } from "lucide-react";

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

import { useIdeasListAppMenubarMoreIdeasDialog } from "../hooks/use-ideas-list-app-menubar-more-ideas-dialog";

type IdeasListAppMenubarMoreIdeasDialogProps = {
  ideasListId: string;
};

export function IdeasListAppMenubarMoreIdeasDialog({
  ideasListId,
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
        <Button priority="tertiary" icon={<WandSparklesIcon />}>
          Больше идей
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogPredefinedHeader
          title="Сгенерировать еще идей"
          description="Опишите, что вас не устраивает в текущих идеях или что бы вы хотели улучшить. Если же просто хотите больше вариантов, просто нажмите кнопку."
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
