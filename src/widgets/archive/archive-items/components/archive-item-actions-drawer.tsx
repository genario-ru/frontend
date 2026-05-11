import { PencilIcon, TrashIcon } from "lucide-react";

import { ArchiveItemActionsButtonLink } from "@/features/archive/archive-item/components/archive-item-actions-button-link";
import { ArchiveItemActionsDeleteDialogDrawer } from "@/features/archive/archive-item/components/archive-item-actions-delete-drawer";
import { getArchiveItemActionsEditLinkOptions } from "@/features/archive/archive-item/utils/get-archive-item-actions-edit-link-options";
import { Button } from "@/shared/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerSection,
} from "@/shared/components/ui/drawer";

import type { ArchiveItemActionsProps } from "../types/archive-item-actions";

export function ArchiveItemActionsDrawer({
  id,
  entity,
  isArchiveItemActionsOpened,
  isDeleteArchiveItemDialogOpen,
  isDeleteArchiveItemPending,
  setIsArchiveItemActionsOpened,
  setIsDeleteArchiveItemDialogOpen,
  handleDeleteArchiveItem,
}: ArchiveItemActionsProps) {
  return (
    <>
      <Drawer
        open={isArchiveItemActionsOpened}
        onOpenChange={setIsArchiveItemActionsOpened}
      >
        <DrawerContent>
          <DrawerHeader title="Действия" />
          <DrawerSection roundedBottom={false}>
            <ArchiveItemActionsButtonLink
              data-ignore-parent-link
              icon={<PencilIcon />}
              iconPosition="left"
              className="w-full"
              onClick={() => setIsArchiveItemActionsOpened(false)}
              {...getArchiveItemActionsEditLinkOptions({ id, entity })}
            >
              Редактировать
            </ArchiveItemActionsButtonLink>
            <Button
              data-ignore-parent-link
              size="sm"
              priority="tertiary"
              variant="negative"
              rounding="base"
              icon={<TrashIcon />}
              iconPosition="left"
              align="start"
              className="w-full"
              onClick={() => {
                setIsArchiveItemActionsOpened(false);
                setIsDeleteArchiveItemDialogOpen(true);
              }}
            >
              Удалить
            </Button>
          </DrawerSection>
        </DrawerContent>
      </Drawer>
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
