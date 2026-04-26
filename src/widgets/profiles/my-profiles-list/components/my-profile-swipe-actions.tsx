import { PencilIcon, TrashIcon } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { ButtonLink } from "@/shared/components/ui/button-link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogPredefinedHeader,
} from "@/shared/components/ui/dialog";

import { useMyProfileActions } from "../hooks/use-my-profile-actions";

type MyProfileSwipeActionsProps = {
  profileId: string;
  profileName: string;
};

const swipeActionClassName =
  "h-full min-h-0 min-w-18 w-full max-w-none flex-1 shrink self-stretch justify-center";

export function MyProfileSwipeActions({
  profileId,
  profileName,
}: MyProfileSwipeActionsProps) {
  const {
    handleDeleteProfile,
    isDeleteProfilePending,
    isDeleteProfileDialogOpened,
    setIsDeleteProfileDialogOpened,
  } = useMyProfileActions({
    profileId,
  });

  return (
    <>
      <div className="flex h-full min-h-0 w-full min-w-min flex-1 items-stretch gap-2">
        <ButtonLink
          to="/profiles/settings"
          search={{ profileId }}
          variant="neutral"
          priority="tertiary"
          size="sm"
          direction="column"
          icon={<PencilIcon />}
          iconPosition="left"
          className={swipeActionClassName}
        >
          Изменить
        </ButtonLink>
        <Button
          type="button"
          variant="negative"
          priority="secondary"
          size="sm"
          direction="column"
          icon={<TrashIcon />}
          iconPosition="left"
          className={swipeActionClassName}
          onClick={() => setIsDeleteProfileDialogOpened(true)}
        >
          Удалить
        </Button>
      </div>
      <Dialog
        open={isDeleteProfileDialogOpened}
        onOpenChange={setIsDeleteProfileDialogOpened}
      >
        <DialogContent>
          <DialogPredefinedHeader
            title="Удаление профиля"
            description={`Вы уверены, что хотите удалить профиль "${profileName}"?`}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button>Отмена</Button>
            </DialogClose>
            <Button
              variant="negative"
              priority="primary"
              state={isDeleteProfilePending ? "loading" : "default"}
              onClick={handleDeleteProfile}
            >
              Удалить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
