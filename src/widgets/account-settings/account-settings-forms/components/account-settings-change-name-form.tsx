import { IslandSection } from "@/shared/components/ui/island";

import { useAccountSettingsChangeNameForm } from "../hooks/use-account-settings-change-name-form";
import { changeNameFieldValidateFn } from "../utils/account-settings-change-name-form-helpers";

export function AccountSettingsChangeNameForm() {
  const { form, onFormSubmit } = useAccountSettingsChangeNameForm();

  return (
    <IslandSection title="Имя">
      <form onSubmit={onFormSubmit} className="flex flex-row gap-3">
        <form.AppField
          name="name"
          validators={{
            onChange: (data) => {
              if (form.state.submissionAttempts > 0) {
                return changeNameFieldValidateFn(data);
              }
            },
            onSubmit: changeNameFieldValidateFn,
          }}
        >
          {(field) => <field.InputField placeholder="Иван Иванов" />}
        </form.AppField>
        <form.AppForm>
          <form.SubmitButton>Сохранить</form.SubmitButton>
        </form.AppForm>
      </form>
    </IslandSection>
  );
}
