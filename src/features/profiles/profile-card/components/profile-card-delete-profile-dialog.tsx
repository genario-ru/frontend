import { TrashIcon } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogPredefinedHeader,
  DialogTrigger,
} from "@/shared/components/ui/dialog";

type ProfileCardDeleteProfileDialogProps = {
  profileName: string;
  isDialogOpened: boolean;
  isDeleteProfilePending: boolean;
  setIsDialogOpened: (isDialogOpened: boolean) => void;
  onDeleteProfileButtonClick: () => void;
};

export function ProfileCardDeleteProfileDialog({
  profileName,
  isDialogOpened,
  isDeleteProfilePending,
  setIsDialogOpened,
  onDeleteProfileButtonClick,
}: ProfileCardDeleteProfileDialogProps) {
  return (
    <Dialog open={isDialogOpened} onOpenChange={setIsDialogOpened}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="tertiary"
          color="negative"
          icon={<TrashIcon />}
          className="w-full justify-start"
        >
          Удалить
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogPredefinedHeader
          title="Удаление профиля"
          description={`Вы уверены, что хотите удалить профиль "${profileName}"?`}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button size="lg">Отмена</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              size="lg"
              color="negative"
              variant="primary"
              state={isDeleteProfilePending ? "loading" : "default"}
              onClick={onDeleteProfileButtonClick}
            >
              Удалить
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
