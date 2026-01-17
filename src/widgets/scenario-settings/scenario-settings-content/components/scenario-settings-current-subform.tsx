import { withForm } from "@/lib/tanstack-form";

import {
  type ScenarioSettingsFormSchema,
  ScenarioSettingsFormSteps,
} from "../utils/scenario-settings-form-helpers";
import { ScenarioSettingsParamsConfigurationSubform } from "./scenario-settings-params-configuration-subform";
import { ScenarioSettingsPrimaryInfoSubform } from "./scenario-settings-primary-info-subform";
import { ScenarioSettingsTemplatesSelectionSubform } from "./scenario-settings-templates-selection-subform";

type ScenarioSettingsCurrentSubformProps = {
  currentStep: ScenarioSettingsFormSteps;
};

export const ScenarioSettingsCurrentSubform = withForm({
  defaultValues: {} as ScenarioSettingsFormSchema,
  props: {} as ScenarioSettingsCurrentSubformProps,
  render: ({ form, currentStep }) => {
    if (currentStep === ScenarioSettingsFormSteps.TemplateSelection) {
      return <ScenarioSettingsTemplatesSelectionSubform form={form} />;
    }

    if (currentStep === ScenarioSettingsFormSteps.PrimaryInfo) {
      return <ScenarioSettingsPrimaryInfoSubform form={form} />;
    }

    if (currentStep === ScenarioSettingsFormSteps.ParamsConfiguration) {
      return <ScenarioSettingsParamsConfigurationSubform form={form} />;
    }

    return null;
  },
});
