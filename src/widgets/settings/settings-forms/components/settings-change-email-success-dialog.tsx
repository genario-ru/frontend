import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/shared/components/ui/dialog";

const DIALOG_TITLE = "Подтверждение смены Email";
const DIALOG_DESCRIPTION =
  "Письмо для подтверждения было отправлено на ваш новый Email";
const DIALOG_CLOSE_BUTTON_TEXT = "Хорошо, спасибо";

type SettingsChangeEmailSuccessDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export function SettingsChangeEmailSuccessDialog({
  isOpen,
  onOpenChange,
}: SettingsChangeEmailSuccessDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogBody>
          <DialogTitle>{DIALOG_TITLE}</DialogTitle>
          <DialogDescription>{DIALOG_DESCRIPTION}</DialogDescription>
          <DialogClose asChild>
            <Button priority="primary" className="ml-auto">
              {DIALOG_CLOSE_BUTTON_TEXT}
            </Button>
          </DialogClose>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
