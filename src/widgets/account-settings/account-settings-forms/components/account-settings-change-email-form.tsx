import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { IslandSection } from "@/shared/components/ui/island";

import { useAccountSettingsChangeEmailForm } from "../hooks/use-account-settings-change-email-form";

const ISLAND_TITLE = "Email";
const ISLAND_DESCRIPTION =
  "Вам будет отправлено письмо для подтверждения на новый Email";
const DIALOG_TITLE = "Подтверждение смены Email";
const DIALOG_DESCRIPTION =
  "Письмо для подтверждения было отправлено на ваш новый Email";
const DIALOG_CLOSE_BUTTON_TEXT = "Хорошо, спасибо";

export function AccountSettingsChangeEmailForm() {
  const {
    form,
    isEmailSentDialogOpen,
    setIsEmailSentDialogOpen,
    onFormSubmit,
  } = useAccountSettingsChangeEmailForm();

  return (
    <IslandSection title={ISLAND_TITLE} description={ISLAND_DESCRIPTION}>
      <form onSubmit={onFormSubmit} className="flex flex-row gap-3">
        <form.AppField name="newEmail">
          {(field) => (
            <field.InputField type="text" placeholder="new-email@example.ru" />
          )}
        </form.AppField>
        <form.AppForm>
          <form.SubmitButton>Сохранить</form.SubmitButton>
        </form.AppForm>
      </form>
      <Dialog
        open={isEmailSentDialogOpen}
        onOpenChange={setIsEmailSentDialogOpen}
      >
        <DialogContent>
          <DialogBody>
            <DialogTitle>{DIALOG_TITLE}</DialogTitle>
            <DialogDescription>{DIALOG_DESCRIPTION}</DialogDescription>
            <DialogClose asChild>
              <Button variant="primary" className="ml-auto">
                {DIALOG_CLOSE_BUTTON_TEXT}
              </Button>
            </DialogClose>
          </DialogBody>
        </DialogContent>
      </Dialog>
    </IslandSection>
  );
}
