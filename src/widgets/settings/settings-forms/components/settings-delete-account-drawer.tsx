import { Button } from "@/shared/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerSection,
} from "@/shared/components/ui/drawer";

type SettingsDeleteAccountDrawerProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isDeleteUserPending: boolean;
  onConfirmDeleteAccountButtonClick: () => void;
  title: string;
  description: string;
};

export function SettingsDeleteAccountDrawer({
  isOpen,
  setIsOpen,
  isDeleteUserPending,
  onConfirmDeleteAccountButtonClick,
  title,
  description,
}: SettingsDeleteAccountDrawerProps) {
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <DrawerHeader title={title} description={description} />
        <DrawerSection row roundedBottom={false} className="justify-between">
          <DrawerClose
            render={
              <Button size="lg" type="button">
                Отмена
              </Button>
            }
          />
          <Button
            size="lg"
            priority="primary"
            variant="negative"
            className="ml-auto"
            state={isDeleteUserPending ? "loading" : "default"}
            onClick={onConfirmDeleteAccountButtonClick}
          >
            Удалить аккаунт
          </Button>
        </DrawerSection>
      </DrawerContent>
    </Drawer>
  );
}
