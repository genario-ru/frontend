import { withForm } from "@/lib/tanstack-form";

import {
  type ScenarioSettingsFormSchema,
  ScenarioSettingsFormSteps,
} from "../utils/scenario-settings-form-helpers";

export const ScenarioSettingsPrimaryInfoSubform = withForm({
  defaultValues: {} as ScenarioSettingsFormSchema,
  render: ({ form }) => {
    return (
      <div className="flex flex-col gap-6">
        <form.AppField name={`${ScenarioSettingsFormSteps.PrimaryInfo}.name`}>
          {(field) => (
            <field.InputField
              label="Название"
              size="lg"
              placeholder="Сценарий для YouTube-видео про запуск подкаста"
            />
          )}
        </form.AppField>
        <form.AppField
          name={`${ScenarioSettingsFormSteps.PrimaryInfo}.description`}
        >
          {(field) => (
            <field.TextareaField
              label="Идея"
              placeholder="Разобрать главные ошибки новичков при запуске подкаста и показать, как их избежать"
            />
          )}
        </form.AppField>
      </div>
    );
  },
});
