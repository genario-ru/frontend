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

type IdeasListIdeaCardDeleteDialogDrawerProps = {
  trigger: ReactElement;
  isDeleteDialogOpen: boolean;
  isDeleteIdeaPending: boolean;
  setIsDeleteDialogOpen: (isOpen: boolean) => void;
  handleConfirmDeleteButtonClick: () => void;
};

export function IdeasListIdeaCardDeleteDialogDrawer({
  trigger,
  isDeleteDialogOpen,
  isDeleteIdeaPending,
  setIsDeleteDialogOpen,
  handleConfirmDeleteButtonClick,
}: IdeasListIdeaCardDeleteDialogDrawerProps) {
  return (
    <Drawer open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <DrawerTrigger render={trigger} />
      <DrawerContent>
        <DrawerHeader
          title="Вы уверены?"
          description="После удаления идею нельзя будет восстановить"
        />
        <DrawerSection row roundedBottom={false} className="justify-between">
          <DrawerClose render={<Button>Отмена</Button>} />
          <Button
            priority="primary"
            variant="negative"
            state={isDeleteIdeaPending ? "loading" : "default"}
            onClick={handleConfirmDeleteButtonClick}
          >
            Удалить
          </Button>
        </DrawerSection>
      </DrawerContent>
    </Drawer>
  );
}
