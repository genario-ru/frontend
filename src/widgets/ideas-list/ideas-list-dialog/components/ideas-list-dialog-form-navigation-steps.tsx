import { useStore } from "@tanstack/react-form";
import { useCallback } from "react";

import { withForm } from "@/lib/tanstack-form";
import {
  type NavigationStep,
  NavigationSteps,
} from "@/shared/components/ui/navigation-steps";

import { IDEAS_LIST_DIALOG_FORM_NAVIGATION_STEPS } from "../constants/ideas-list-dialog-form-navigation-steps";
import type {
  IdeasListDialogFormSchema,
  IdeasListDialogFormSteps,
} from "../utils/ideas-list-dialog-form-helpers";

export const IdeasListDialogFormNavigationSteps = withForm({
  defaultValues: {} as IdeasListDialogFormSchema,
  render: ({ form }) => {
    const currentStep = useStore(
      form.store,
      (state) => state.values.currentStep,
    );

    const onStepClick = useCallback(
      (step: NavigationStep<IdeasListDialogFormSteps>) => {
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
