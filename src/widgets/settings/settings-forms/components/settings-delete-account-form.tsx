import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogPredefinedHeader,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { IslandSection } from "@/shared/components/ui/island";

import { useSettingsDeleteAccountForm } from "../hooks/use-settings-delete-account-form";

const DIALOG_TITLE = "Вы уверены?";
const ISLAND_SECTION_TITLE = "Удаление аккаунта";
const ISLAND_SECTION_DESCRIPTION =
  "При удалении вашего аккаунта все ваши данные будут безвозвратно удалены и не смогут быть восстановлены.";

export function SettingsDeleteAccountForm() {
  const { isDeleteUserPending, onConfirmDeleteAccountButtonClick } =
    useSettingsDeleteAccountForm();

  return (
    <IslandSection
      title={ISLAND_SECTION_TITLE}
      description={ISLAND_SECTION_DESCRIPTION}
      className="gap-4"
    >
      <Dialog>
        <DialogTrigger asChild>
          <Button
            priority="secondary"
            variant="negative"
            className="w-full md:w-fit"
          >
            Удалить аккаунт
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogPredefinedHeader
            title={DIALOG_TITLE}
            description={ISLAND_SECTION_DESCRIPTION}
          />
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
    </IslandSection>
  );
}
