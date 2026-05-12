import { IslandSection } from "@/shared/components/ui/island";

import { useSettingsChangeEmailForm } from "../hooks/use-settings-change-email-form";
import { SettingsChangeEmailSuccessDialog } from "./settings-change-email-success-dialog";
import { SettingsChangeEmailSuccessDrawer } from "./settings-change-email-success-drawer";

const ISLAND_TITLE = "Email";
const ISLAND_DESCRIPTION =
  "Вам будет отправлено письмо для подтверждения на новый Email";

export function SettingsChangeEmailForm() {
  const {
    form,
    isMobile,
    isEmailSentDialogOpen,
    setIsEmailSentDialogOpen,
    onFormSubmit,
  } = useSettingsChangeEmailForm();

  return (
    <IslandSection title={ISLAND_TITLE} description={ISLAND_DESCRIPTION}>
      <form onSubmit={onFormSubmit} className="flex flex-col gap-2 md:flex-row">
        <form.AppField name="newEmail">
          {(field) => (
            <field.InputField type="text" placeholder="new-email@example.ru" />
          )}
        </form.AppField>
        <form.AppForm>
          <form.SubmitButton className="w-full md:w-fit">
            Сохранить
          </form.SubmitButton>
        </form.AppForm>
      </form>
      {isMobile ? (
        <SettingsChangeEmailSuccessDrawer
          isOpen={isEmailSentDialogOpen}
          onOpenChange={setIsEmailSentDialogOpen}
        />
      ) : (
        <SettingsChangeEmailSuccessDialog
          isOpen={isEmailSentDialogOpen}
          onOpenChange={setIsEmailSentDialogOpen}
        />
      )}
    </IslandSection>
  );
}
