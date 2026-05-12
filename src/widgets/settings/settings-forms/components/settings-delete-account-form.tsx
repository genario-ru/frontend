import { useState } from "react";

import { Button } from "@/shared/components/ui/button";
import { IslandSection } from "@/shared/components/ui/island";

import { useSettingsDeleteAccountForm } from "../hooks/use-settings-delete-account-form";
import { SettingsDeleteAccountDialog } from "./settings-delete-account-dialog";
import { SettingsDeleteAccountDrawer } from "./settings-delete-account-drawer";

const DIALOG_TITLE = "Вы уверены?";
const ISLAND_SECTION_TITLE = "Удаление аккаунта";
const ISLAND_SECTION_DESCRIPTION =
  "При удалении вашего аккаунта все ваши данные будут безвозвратно удалены и не смогут быть восстановлены.";

export function SettingsDeleteAccountForm() {
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile, isDeleteUserPending, onConfirmDeleteAccountButtonClick } =
    useSettingsDeleteAccountForm();

  return (
    <IslandSection
      title={ISLAND_SECTION_TITLE}
      description={ISLAND_SECTION_DESCRIPTION}
      className="gap-4"
    >
      <Button
        priority="secondary"
        variant="negative"
        className="w-full md:w-fit"
        onClick={() => setIsOpen(true)}
      >
        Удалить аккаунт
      </Button>
      {isMobile ? (
        <SettingsDeleteAccountDrawer
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isDeleteUserPending={isDeleteUserPending}
          onConfirmDeleteAccountButtonClick={onConfirmDeleteAccountButtonClick}
          title={DIALOG_TITLE}
          description={ISLAND_SECTION_DESCRIPTION}
        />
      ) : (
        <SettingsDeleteAccountDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isDeleteUserPending={isDeleteUserPending}
          onConfirmDeleteAccountButtonClick={onConfirmDeleteAccountButtonClick}
          title={DIALOG_TITLE}
          description={ISLAND_SECTION_DESCRIPTION}
        />
      )}
    </IslandSection>
  );
}
