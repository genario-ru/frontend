import { Button } from "@/shared/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerSection,
} from "@/shared/components/ui/drawer";

import type { ArchiveItemActionsDeleteProps } from "../types/archive-item-actions-delete";
import { getArchiveItemActionsDeleteDialogTexts } from "../utils/get-archive-item-actions-delete-dialog-texts";

export function ArchiveItemActionsDeleteDialogDrawer({
  entity,
  isDialogOpened,
  isDeleteArchiveItemPending,
  setIsDialogOpened,
  onConfirmDeleteArchiveItem,
}: ArchiveItemActionsDeleteProps) {
  const { title, description } = getArchiveItemActionsDeleteDialogTexts(entity);

  return (
    <Drawer open={isDialogOpened} onOpenChange={setIsDialogOpened}>
      <DrawerContent>
        <DrawerHeader title={title} description={description} />
        <DrawerSection row roundedBottom={false} className="justify-between">
          <DrawerClose render={<Button size="lg">Отмена</Button>} />
          <Button
            size="lg"
            variant="negative"
            priority="primary"
            state={isDeleteArchiveItemPending ? "loading" : "default"}
            onClick={onConfirmDeleteArchiveItem}
          >
            Удалить
          </Button>
        </DrawerSection>
      </DrawerContent>
    </Drawer>
  );
}
