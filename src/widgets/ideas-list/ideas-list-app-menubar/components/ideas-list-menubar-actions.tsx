import { PencilIcon, TrashIcon } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { ButtonLink } from "@/shared/components/ui/button-link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogPredefinedHeader,
  DialogTrigger,
} from "@/shared/components/ui/dialog";

import { useIdeasListMenubarActions } from "../hooks/use-ideas-list-menubar-actions";

type IdeasListMenubarActionsProps = {
  ideasListId: string;
};

export function IdeasListMenubarActions({
  ideasListId,
}: IdeasListMenubarActionsProps) {
  const {
    isDeleteDialogOpen,
    isDeleteIdeasListPending,
    setIsDeleteDialogOpen,
    handleDeleteConfirmButtonClick,
  } = useIdeasListMenubarActions({ ideasListId });

  return (
    <div className="flex items-center gap-2">
      <ButtonLink
        to="/ideas-lists/settings"
        search={{
          ideasListId,
        }}
        icon={<PencilIcon />}
      >
        Изменить параметры
      </ButtonLink>
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogTrigger asChild>
          <Button color="negative" icon={<TrashIcon />} />
        </DialogTrigger>
        <DialogContent>
          <DialogPredefinedHeader
            title="Удаление списка идей"
            description="Вы уверены, что хотите удалить список идей?"
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button>Отмена</Button>
            </DialogClose>
            <Button
              variant="primary"
              color="negative"
              state={isDeleteIdeasListPending ? "loading" : "default"}
              onClick={handleDeleteConfirmButtonClick}
            >
              Удалить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
