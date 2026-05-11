import { PencilIcon, TrashIcon } from "lucide-react";

import { ArchiveItemActionsDeleteDialogDrawer } from "@/features/archive/archive-item/components/archive-item-actions-delete-drawer";
import { getArchiveItemActionsEditLinkOptions } from "@/features/archive/archive-item/utils/get-archive-item-actions-edit-link-options";
import { Button } from "@/shared/components/ui/button";
import { ButtonLink } from "@/shared/components/ui/button-link";

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
      <ArchiveItemActionsDeleteDialogDrawer
        entity={entity}
        isDialogOpened={isDeleteArchiveItemDialogOpen}
        isDeleteArchiveItemPending={isDeleteArchiveItemPending}
        setIsDialogOpened={setIsDeleteArchiveItemDialogOpen}
        onConfirmDeleteArchiveItem={handleDeleteArchiveItem}
      />
    </>
  );
}
