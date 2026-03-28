import { IslandSection } from "@/shared/components/ui/island";

import { useSettingsChangeNameForm } from "../hooks/use-settings-change-name-form";

export function SettingsChangeNameForm() {
  const { form, onFormSubmit } = useSettingsChangeNameForm();

  return (
    <IslandSection title="Имя">
      <form onSubmit={onFormSubmit} className="flex flex-row gap-3">
        <form.AppField name="name">
          {(field) => <field.InputField placeholder="Иван Иванов" />}
        </form.AppField>
        <form.AppForm>
          <form.SubmitButton>Сохранить</form.SubmitButton>
        </form.AppForm>
      </form>
    </IslandSection>
  );
}
