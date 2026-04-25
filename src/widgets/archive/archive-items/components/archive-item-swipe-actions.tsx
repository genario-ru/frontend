import { PencilIcon, TrashIcon } from "lucide-react";

import { getArchiveItemActionsDeleteDialogTexts } from "@/features/archive/archive-item/utils/get-archive-item-actions-delete-dialog-texts";
import { getArchiveItemActionsEditLinkOptions } from "@/features/archive/archive-item/utils/get-archive-item-actions-edit-link-options";
import { Button } from "@/shared/components/ui/button";
import { ButtonLink } from "@/shared/components/ui/button-link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogPredefinedHeader,
} from "@/shared/components/ui/dialog";

import { useArchiveItemActions } from "../hooks/use-archive-item-actions";

type ArchiveItemSwipeActionsProps = {
  id: string;
  entity: "ideasList" | "scenario";
};

const swipeActionClassName =
  "h-full min-h-0 min-w-18 w-full max-w-none flex-1 shrink self-stretch justify-center";

export function ArchiveItemSwipeActions({
  id,
  entity,
}: ArchiveItemSwipeActionsProps) {
  const {
    isDeleteArchiveItemDialogOpen,
    isDeleteArchiveItemPending,
    setIsDeleteArchiveItemDialogOpen,
    handleDeleteArchiveItem,
  } = useArchiveItemActions({ id, entity });

  const { title, description } = getArchiveItemActionsDeleteDialogTexts(entity);

  return (
    <>
      <div className="flex h-full min-h-0 w-full min-w-min flex-1 items-stretch gap-2">
        <ButtonLink
          size="sm"
          direction="column"
          iconPosition="left"
          icon={<PencilIcon />}
          className={swipeActionClassName}
          {...getArchiveItemActionsEditLinkOptions({ id, entity })}
        >
          Изменить
        </ButtonLink>
        <Button
          size="sm"
          type="button"
          variant="negative"
          direction="column"
          iconPosition="left"
          icon={<TrashIcon />}
          className={swipeActionClassName}
          onClick={() => setIsDeleteArchiveItemDialogOpen(true)}
        >
          Удалить
        </Button>
      </div>
      <Dialog
        open={isDeleteArchiveItemDialogOpen}
        onOpenChange={setIsDeleteArchiveItemDialogOpen}
      >
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
              onClick={handleDeleteArchiveItem}
            >
              Удалить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
