import type { ReactElement } from "react";

import { Button } from "@/shared/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerSection,
  DrawerTrigger,
} from "@/shared/components/ui/drawer";

type IdeasListAppMenubarDeleteIdeaDialogDrawerProps = {
  trigger?: ReactElement | null;
  isDeleteDialogOpen: boolean;
  isDeleteIdeasListPending: boolean;
  setIsDeleteDialogOpen: (isOpen: boolean) => void;
  handleConfirmDeleteButtonClick: () => void;
};

export function IdeasListAppMenubarDeleteIdeaDialogDrawer({
  trigger,
  isDeleteDialogOpen,
  isDeleteIdeasListPending,
  setIsDeleteDialogOpen,
  handleConfirmDeleteButtonClick,
}: IdeasListAppMenubarDeleteIdeaDialogDrawerProps) {
  return (
    <Drawer open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      {trigger && <DrawerTrigger render={trigger} />}
      <DrawerContent>
        <DrawerHeader
          title="Удаление списка идей"
          description="Вы уверены, что хотите удалить список идей?"
        />
        <DrawerSection row roundedBottom={false} className="justify-between">
          <DrawerClose render={<Button size="lg">Отмена</Button>} />
          <Button
            size="lg"
            priority="primary"
            variant="negative"
            state={isDeleteIdeasListPending ? "loading" : "default"}
            onClick={handleConfirmDeleteButtonClick}
          >
            Удалить
          </Button>
        </DrawerSection>
      </DrawerContent>
    </Drawer>
  );
}
