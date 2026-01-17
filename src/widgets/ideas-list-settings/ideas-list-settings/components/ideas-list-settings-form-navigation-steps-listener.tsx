import { useEffect } from "react";

import { withForm } from "@/lib/tanstack-form";

import type {
  IdeasListSettingsFormSchema,
  IdeasListSettingsFormSteps,
} from "../utils/ideas-list-settings-form-helpers";

type IdeasListSettingsFormNavigationStepsListenerProps = {
  currentStep: IdeasListSettingsFormSteps;
};

export const IdeasListSettingsFormNavigationStepsListener = withForm({
  defaultValues: {} as IdeasListSettingsFormSchema,
  props: {} as IdeasListSettingsFormNavigationStepsListenerProps,
  render: ({ form, currentStep }) => {
    useEffect(() => {
      const values = form.state.values;

      form.reset(values);
    }, [currentStep, form]);

    return <></>;
  },
});
