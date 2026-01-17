import { PencilIcon } from "lucide-react";

import { IdeasListIdeaCardSecondaryActionsMenuButton } from "@/features/ideas-lists/ideas-list-idea-card/components/ideas-list-idea-card-secondary-actions-menu-button";
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

type IdeasListIdeaCardEditDialogProps = {
  isOpened: boolean;
  setIsOpened: (isOpened: boolean) => void;
};

export function IdeasListIdeaCardEditDialog({
  isOpened,
  setIsOpened,
}: IdeasListIdeaCardEditDialogProps) {
  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogTrigger asChild>
        <IdeasListIdeaCardSecondaryActionsMenuButton icon={<PencilIcon />}>
          Редактировать
        </IdeasListIdeaCardSecondaryActionsMenuButton>
      </DialogTrigger>
      <DialogContent>
        <DialogPredefinedHeader
          title="Редактировать идею"
          description="Измените название и контент идеи вручную"
        />
        <DialogBody>Тут будет форма для редактирования идеи</DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Отмена</Button>
          </DialogClose>
          <Button>Сохранить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
