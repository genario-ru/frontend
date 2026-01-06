import { withForm } from "@/lib/tanstack-form";

import {
  type ScenarioDialogFormSchema,
  ScenarioDialogFormSteps,
} from "../utils/scenario-dialog-form-helpers";

export const ScenarioDialogPrimaryInfoSubform = withForm({
  defaultValues: {} as ScenarioDialogFormSchema,
  render: ({ form }) => {
    return (
      <div className="flex flex-col gap-6">
        <form.AppField name={`${ScenarioDialogFormSteps.PrimaryInfo}.name`}>
          {(field) => (
            <field.InputField
              label="Название"
              size="lg"
              placeholder="Мой новый крутой сценарий..."
            />
          )}
        </form.AppField>
        <form.AppField
          name={`${ScenarioDialogFormSteps.PrimaryInfo}.description`}
        >
          {(field) => (
            <field.TextareaField
              label="Идея"
              placeholder="Сценарий для видео про приготовление еды..."
            />
          )}
        </form.AppField>
      </div>
    );
  },
});
