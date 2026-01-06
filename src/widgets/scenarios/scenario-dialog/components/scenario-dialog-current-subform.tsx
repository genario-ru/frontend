import type { RefObject } from "react";

import { withForm } from "@/lib/tanstack-form";

import {
  type ScenarioDialogFormSchema,
  ScenarioDialogFormSteps,
} from "../utils/scenario-dialog-form-helpers";
import { ScenarioDialogParamsConfigurationSubform } from "./scenario-dialog-params-configuration-subform";
import { ScenarioDialogPrimaryInfoSubform } from "./scenario-dialog-primary-info-subform";
import { ScenarioDialogTemplatesSelectionSubform } from "./scenario-dialog-templates-selection-subform";

type ScenarioDialogCurrentSubformProps = {
  currentStep: ScenarioDialogFormSteps;
  dialogContentRef: RefObject<HTMLDivElement | null>;
};

export const ScenarioDialogCurrentSubform = withForm({
  defaultValues: {} as ScenarioDialogFormSchema,
  props: {} as ScenarioDialogCurrentSubformProps,
  render: ({ form, currentStep, dialogContentRef }) => {
    if (currentStep === ScenarioDialogFormSteps.TemplateSelection) {
      return <ScenarioDialogTemplatesSelectionSubform form={form} />;
    }

    if (currentStep === ScenarioDialogFormSteps.PrimaryInfo) {
      return <ScenarioDialogPrimaryInfoSubform form={form} />;
    }

    if (currentStep === ScenarioDialogFormSteps.ParamsConfiguration) {
      return (
        <ScenarioDialogParamsConfigurationSubform
          form={form}
          dialogContentRef={dialogContentRef}
        />
      );
    }

    return null;
  },
});
