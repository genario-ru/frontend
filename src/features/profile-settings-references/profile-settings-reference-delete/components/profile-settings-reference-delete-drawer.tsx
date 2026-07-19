import { Button } from "@/shared/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerSection,
} from "@/shared/components/ui/drawer";

type ProfileSettingsReferenceDeleteDrawerProps = {
  title: string;
  description: string;
  isOpen: boolean;
  isPending: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: () => void;
};

export function ProfileSettingsReferenceDeleteDrawer({
  title,
  description,
  isOpen,
  isPending,
  setIsOpen,
  onConfirm,
}: ProfileSettingsReferenceDeleteDrawerProps) {
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <DrawerHeader title={title} description={description} />
        <DrawerSection row roundedBottom={false} className="justify-between">
          <DrawerClose
            render={
              <Button size="lg" variant="neutral" priority="secondary">
                Отмена
              </Button>
            }
          />
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
