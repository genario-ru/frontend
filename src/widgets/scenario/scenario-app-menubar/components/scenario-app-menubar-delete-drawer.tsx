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

type ScenarioAppMenubarDeleteDialogDrawerProps = {
  trigger?: ReactElement | null;
  isDeleteDialogOpen: boolean;
  isDeleteScenarioPending: boolean;
  setIsDeleteDialogOpen: (isOpen: boolean) => void;
  handleConfirmDeleteButtonClick: () => void;
};

export function ScenarioAppMenubarDeleteDialogDrawer({
  trigger,
  isDeleteDialogOpen,
  isDeleteScenarioPending,
  setIsDeleteDialogOpen,
  handleConfirmDeleteButtonClick,
}: ScenarioAppMenubarDeleteDialogDrawerProps) {
  return (
    <Drawer open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      {trigger && <DrawerTrigger render={trigger} />}
      <DrawerContent>
        <DrawerHeader
          title="Вы уверены?"
          description="После удаления сценарий нельзя будет восстановить"
        />
        <DrawerSection row roundedBottom={false} className="justify-between">
          <DrawerClose render={<Button>Отмена</Button>} />
          <Button
            variant="negative"
            priority="primary"
            state={isDeleteScenarioPending ? "loading" : "default"}
            onClick={handleConfirmDeleteButtonClick}
          >
            Удалить
          </Button>
        </DrawerSection>
      </DrawerContent>
    </Drawer>
  );
}
