import { useStore } from "@tanstack/react-form";
import { useCallback } from "react";

import { withForm } from "@/lib/tanstack-form";
import {
  type NavigationStep,
  NavigationSteps,
} from "@/shared/components/ui/navigation-steps";

import { SCENARIO_DIALOG_FORM_NAVIGATION_STEPS } from "../constants/scenario-settings-form-navigation-steps";
import type {
  ScenarioSettingsFormSchema,
  ScenarioSettingsFormSteps,
} from "../utils/scenario-settings-form-helpers";

export const ScenarioSettingsFormNavigationSteps = withForm({
  defaultValues: {} as ScenarioSettingsFormSchema,
  render: ({ form }) => {
    const currentStep = useStore(
      form.store,
      (state) => state.values.currentStep,
    );

    const onStepClick = useCallback(
      (step: NavigationStep<ScenarioSettingsFormSteps>) => {
        form.setFieldValue("currentStep", step.id);
      },
      [form],
    );

    return (
      <NavigationSteps
        steps={SCENARIO_DIALOG_FORM_NAVIGATION_STEPS.map((step) => ({
          ...step,
          active: step.id === currentStep,
          disabled: false,
        }))}
        onStepClick={onStepClick}
      />
    );
  },
});
