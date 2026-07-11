import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogPredefinedHeader,
} from "@/shared/components/ui/dialog";

type ProfileSettingsReferenceDeleteDialogProps = {
  title: string;
  description: string;
  isOpen: boolean;
  isPending: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: () => void;
};

export function ProfileSettingsReferenceDeleteDialog({
  title,
  description,
  isOpen,
  isPending,
  setIsOpen,
  onConfirm,
}: ProfileSettingsReferenceDeleteDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogPredefinedHeader title={title} description={description} />
        <DialogBody />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="neutral" priority="secondary">
              Отмена
            </Button>
          </DialogClose>
          <Button
            variant="negative"
            priority="primary"
            state={isPending ? "loading" : "default"}
            onClick={onConfirm}
          >
            Удалить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
