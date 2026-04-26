import { EllipsisIcon } from "lucide-react";

import { ArchiveItemActionsDeleteDialog } from "@/features/archive/archive-item/components/archive-item-actions-delete-dialog";
import { ArchiveItemEditLink } from "@/features/archive/archive-item/components/archive-item-edit-link";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

import { useArchiveItemActions } from "../hooks/use-archive-item-actions";

type ArchiveItemActionsProps = {
  id: string;
  entity: "ideasList" | "scenario";
};

export function ArchiveItemActions({ id, entity }: ArchiveItemActionsProps) {
  const {
    isArchiveItemActionsOpened,
    isDeleteArchiveItemDialogOpen,
    isDeleteArchiveItemPending,
    setIsArchiveItemActionsOpened,
    setIsDeleteArchiveItemDialogOpen,
    handleDeleteArchiveItem,
  } = useArchiveItemActions({ id, entity });

  return (
    <DropdownMenu
      modal={false}
      open={isArchiveItemActionsOpened}
      onOpenChange={setIsArchiveItemActionsOpened}
    >
      <DropdownMenuTrigger data-ignore-parent-link asChild>
        <Button size="sm" icon={<EllipsisIcon />} />
      </DropdownMenuTrigger>
      <DropdownMenuContent data-ignore-parent-link align="end">
        <DropdownMenuGroup>
          <ArchiveItemEditLink id={id} entity={entity} />
          <ArchiveItemActionsDeleteDialog
            entity={entity}
            isDialogOpened={isDeleteArchiveItemDialogOpen}
            isDeleteArchiveItemPending={isDeleteArchiveItemPending}
            setIsDialogOpened={setIsDeleteArchiveItemDialogOpen}
            onConfirmDeleteArchiveItem={handleDeleteArchiveItem}
          />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
