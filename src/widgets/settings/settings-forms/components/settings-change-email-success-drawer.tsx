import { Button } from "@/shared/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerSection,
} from "@/shared/components/ui/drawer";

const DIALOG_TITLE = "Подтверждение смены Email";
const DIALOG_DESCRIPTION =
  "Письмо для подтверждения было отправлено на ваш новый Email";
const DIALOG_CLOSE_BUTTON_TEXT = "Хорошо, спасибо";

type SettingsChangeEmailSuccessDrawerProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export function SettingsChangeEmailSuccessDrawer({
  isOpen,
  onOpenChange,
}: SettingsChangeEmailSuccessDrawerProps) {
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader title={DIALOG_TITLE} description={DIALOG_DESCRIPTION} />
        <DrawerSection row roundedBottom={false} className="justify-end">
          <DrawerClose
            render={
              <Button size="lg" priority="primary">
                {DIALOG_CLOSE_BUTTON_TEXT}
              </Button>
            }
          />
        </DrawerSection>
      </DrawerContent>
    </Drawer>
  );
}
