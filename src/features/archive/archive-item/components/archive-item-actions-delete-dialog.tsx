import { TrashIcon } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogPredefinedHeader,
  DialogTrigger,
} from "@/shared/components/ui/dialog";

import { getArchiveItemActionsDeleteDialogTexts } from "../utils/get-archive-item-actions-delete-dialog-texts";
import { ArchiveItemActionsButton } from "./archive-item-actions-button";

type ArchiveItemActionsDeleteDialogProps = {
  entity: "ideasList" | "scenario";
  isDialogOpened: boolean;
  isDeleteArchiveItemPending: boolean;
  setIsDialogOpened: (isDialogOpened: boolean) => void;
  onConfirmDeleteArchiveItem: () => void;
};

export function ArchiveItemActionsDeleteDialog({
  entity,
  isDialogOpened,
  isDeleteArchiveItemPending,
  setIsDialogOpened,
  onConfirmDeleteArchiveItem,
}: ArchiveItemActionsDeleteDialogProps) {
  const { title, description } = getArchiveItemActionsDeleteDialogTexts(entity);

  return (
    <Dialog open={isDialogOpened} onOpenChange={setIsDialogOpened}>
      <DialogTrigger asChild>
        <ArchiveItemActionsButton variant="negative" icon={<TrashIcon />}>
          Удалить
        </ArchiveItemActionsButton>
      </DialogTrigger>
      <DialogContent>
        <DialogPredefinedHeader title={title} description={description} />
        <DialogFooter>
          <DialogClose asChild>
            <Button>Отмена</Button>
          </DialogClose>
          <Button
            variant="negative"
            priority="primary"
            state={isDeleteArchiveItemPending ? "loading" : "default"}
            onClick={onConfirmDeleteArchiveItem}
          >
            Удалить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
