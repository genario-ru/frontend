import { useStore } from "@tanstack/react-form";
import { useCallback } from "react";

import { withForm } from "@/lib/tanstack-form";
import {
  type NavigationStep,
  NavigationSteps,
} from "@/shared/components/ui/navigation-steps";

import { IDEAS_LIST_DIALOG_FORM_NAVIGATION_STEPS } from "../constants/ideas-list-settings-form-navigation-steps";
import type {
  IdeasListSettingsFormSchema,
  IdeasListSettingsFormSteps,
} from "../utils/ideas-list-settings-form-helpers";

export const IdeasListSettingsFormNavigationSteps = withForm({
  defaultValues: {} as IdeasListSettingsFormSchema,
  render: ({ form }) => {
    const currentStep = useStore(
      form.store,
      (state) => state.values.currentStep,
    );

    const onStepClick = useCallback(
      (step: NavigationStep<IdeasListSettingsFormSteps>) => {
        form.setFieldValue("currentStep", step.id);
      },
      [form],
    );

    return (
      <NavigationSteps
        steps={IDEAS_LIST_DIALOG_FORM_NAVIGATION_STEPS.map((step) => ({
          ...step,
          active: step.id === currentStep,
          disabled: false,
        }))}
        onStepClick={onStepClick}
      />
    );
  },
});
