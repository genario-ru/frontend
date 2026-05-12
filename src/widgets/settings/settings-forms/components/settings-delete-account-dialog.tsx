import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogPredefinedHeader,
} from "@/shared/components/ui/dialog";

type SettingsDeleteAccountDialogProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isDeleteUserPending: boolean;
  onConfirmDeleteAccountButtonClick: () => void;
  title: string;
  description: string;
};

export function SettingsDeleteAccountDialog({
  isOpen,
  setIsOpen,
  isDeleteUserPending,
  onConfirmDeleteAccountButtonClick,
  title,
  description,
}: SettingsDeleteAccountDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogPredefinedHeader title={title} description={description} />
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button">Отмена</Button>
          </DialogClose>
          <Button
            priority="primary"
            variant="negative"
            className="ml-auto"
            state={isDeleteUserPending ? "loading" : "default"}
            onClick={onConfirmDeleteAccountButtonClick}
          >
            Удалить аккаунт
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
