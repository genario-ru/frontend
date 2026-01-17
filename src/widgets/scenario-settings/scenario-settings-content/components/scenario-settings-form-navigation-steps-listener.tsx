import { useEffect } from "react";

import { withForm } from "@/lib/tanstack-form";

import type {
  ScenarioSettingsFormSchema,
  ScenarioSettingsFormSteps,
} from "../utils/scenario-settings-form-helpers";

type ScenarioSettingsFormNavigationStepsListenerProps = {
  currentStep: ScenarioSettingsFormSteps;
};

export const ScenarioSettingsFormNavigationStepsListener = withForm({
  defaultValues: {} as ScenarioSettingsFormSchema,
  props: {} as ScenarioSettingsFormNavigationStepsListenerProps,
  render: ({ form, currentStep }) => {
    useEffect(() => {
      const values = form.state.values;

      form.reset(values);
    }, [currentStep, form]);

    return <></>;
  },
});
