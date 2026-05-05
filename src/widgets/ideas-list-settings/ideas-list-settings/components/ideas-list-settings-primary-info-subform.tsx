import { withForm } from "@/lib/tanstack-form";

import {
  type IdeasListSettingsFormSchema,
  IdeasListSettingsFormSteps,
} from "../utils/ideas-list-settings-form-helpers";

export const IdeasListSettingsPrimaryInfoSubform = withForm({
  defaultValues: {} as IdeasListSettingsFormSchema,
  render: ({ form }) => {
    return (
      <div className="flex flex-col gap-6">
        <form.AppField
          name={`${IdeasListSettingsFormSteps.PrimaryInfo}.prompt`}
        >
          {(field) => (
            <field.TextareaField
              label="Промпт"
              placeholder="Список идей для видео про приготовление еды..."
            />
          )}
        </form.AppField>
      </div>
    );
  },
});
