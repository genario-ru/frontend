import { useEffect } from "react";

import { withForm } from "@/lib/tanstack-form";

import type {
  ScenarioDialogFormSchema,
  ScenarioDialogFormSteps,
} from "../utils/scenario-dialog-form-helpers";

type ScenarioDialogFormNavigationStepsListenerProps = {
  currentStep: ScenarioDialogFormSteps;
};

export const ScenarioDialogFormNavigationStepsListener = withForm({
  defaultValues: {} as ScenarioDialogFormSchema,
  props: {} as ScenarioDialogFormNavigationStepsListenerProps,
  render: ({ form, currentStep }) => {
    useEffect(() => {
      const values = form.state.values;

      form.reset(values);
    }, [currentStep, form]);

    return <></>;
  },
});
