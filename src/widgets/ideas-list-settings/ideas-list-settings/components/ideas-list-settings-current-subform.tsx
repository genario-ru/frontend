import { withForm } from "@/lib/tanstack-form";

import {
  type IdeasListSettingsFormSchema,
  IdeasListSettingsFormSteps,
} from "../utils/ideas-list-settings-form-helpers";
import { IdeasListSettingsParamsConfigurationSubform } from "./ideas-list-settings-params-configuration-subform";
import { IdeasListSettingsPrimaryInfoSubform } from "./ideas-list-settings-primary-info-subform";
import { IdeasListSettingsTemplatesSelectionSubform } from "./ideas-list-settings-templates-selection-subform";

type IdeasListSettingsCurrentSubformProps = {
  currentStep: IdeasListSettingsFormSteps;
};

export const IdeasListSettingsCurrentSubform = withForm({
  defaultValues: {} as IdeasListSettingsFormSchema,
  props: {} as IdeasListSettingsCurrentSubformProps,
  render: ({ form, currentStep }) => {
    if (currentStep === IdeasListSettingsFormSteps.TemplateSelection) {
      return <IdeasListSettingsTemplatesSelectionSubform form={form} />;
    }

    if (currentStep === IdeasListSettingsFormSteps.PrimaryInfo) {
      return <IdeasListSettingsPrimaryInfoSubform form={form} />;
    }

    if (currentStep === IdeasListSettingsFormSteps.ParamsConfiguration) {
      return <IdeasListSettingsParamsConfigurationSubform form={form} />;
    }

    return null;
  },
});
