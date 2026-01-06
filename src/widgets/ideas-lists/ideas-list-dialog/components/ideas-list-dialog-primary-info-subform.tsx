import { withForm } from "@/lib/tanstack-form";

import {
  type IdeasListDialogFormSchema,
  IdeasListDialogFormSteps,
} from "../utils/ideas-list-dialog-form-helpers";

export const IdeasListDialogPrimaryInfoSubform = withForm({
  defaultValues: {} as IdeasListDialogFormSchema,
  render: ({ form }) => {
    return (
      <div className="flex flex-col gap-6">
        <form.AppField name={`${IdeasListDialogFormSteps.PrimaryInfo}.name`}>
          {(field) => (
            <field.InputField
              label="Название"
              size="lg"
              placeholder="Мой новый крутой список идей..."
            />
          )}
        </form.AppField>
        <form.AppField
          name={`${IdeasListDialogFormSteps.PrimaryInfo}.description`}
        >
          {(field) => (
            <field.TextareaField
              label="Идея"
              placeholder="Список идей для видео про приготовление еды..."
            />
          )}
        </form.AppField>
      </div>
    );
  },
});
