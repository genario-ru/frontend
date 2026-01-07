import { EllipsisIcon } from "lucide-react";

import { ArchiveItemActionsDeleteDialog } from "@/features/archive/archive-card/components/archive-item-actions-delete-dialog";
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
      <DropdownMenuTrigger asChild>
        <Button size="sm" icon={<EllipsisIcon />} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
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
