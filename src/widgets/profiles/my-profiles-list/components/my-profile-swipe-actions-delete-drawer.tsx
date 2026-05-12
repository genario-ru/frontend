import { Button } from "@/shared/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerSection,
} from "@/shared/components/ui/drawer";

type MyProfileSwipeActionsDeleteDrawerProps = {
  profileName: string;
  isOpen: boolean;
  isPending: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: () => void;
};

export function MyProfileSwipeActionsDeleteDrawer({
  profileName,
  isOpen,
  isPending,
  setIsOpen,
  onConfirm,
}: MyProfileSwipeActionsDeleteDrawerProps) {
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <DrawerHeader
          title="Удаление профиля"
          description={`Вы уверены, что хотите удалить профиль "${profileName}"?`}
        />
        <DrawerSection row roundedBottom={false} className="justify-between">
          <DrawerClose render={<Button size="lg">Отмена</Button>} />
          <Button
            size="lg"
            variant="negative"
            priority="primary"
            state={isPending ? "loading" : "default"}
            onClick={onConfirm}
          >
            Удалить
          </Button>
        </DrawerSection>
      </DrawerContent>
    </Drawer>
  );
}
