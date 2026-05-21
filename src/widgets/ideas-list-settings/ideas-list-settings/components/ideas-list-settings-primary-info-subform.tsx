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
              label="Наброски"
              placeholder="10 идей для видео про личный бренд для эксперта, который развивает YouTube-канал"
            />
          )}
        </form.AppField>
      </div>
    );
  },
});
