import { useEffect } from "react";

import { withForm } from "@/lib/tanstack-form";

import type {
  IdeasListDialogFormSchema,
  IdeasListDialogFormSteps,
} from "../utils/ideas-list-dialog-form-helpers";

type IdeasListDialogFormNavigationStepsListenerProps = {
  currentStep: IdeasListDialogFormSteps;
};

export const IdeasListDialogFormNavigationStepsListener = withForm({
  defaultValues: {} as IdeasListDialogFormSchema,
  props: {} as IdeasListDialogFormNavigationStepsListenerProps,
  render: ({ form, currentStep }) => {
    useEffect(() => {
      const values = form.state.values;

      form.reset(values);
    }, [currentStep, form]);

    return <></>;
  },
});
