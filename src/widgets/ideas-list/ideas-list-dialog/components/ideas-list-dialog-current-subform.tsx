import type { RefObject } from "react";

import { withForm } from "@/lib/tanstack-form";

import {
  type IdeasListDialogFormSchema,
  IdeasListDialogFormSteps,
} from "../utils/ideas-list-dialog-form-helpers";
import { IdeasListDialogParamsConfigurationSubform } from "./ideas-list-dialog-params-configuration-subform";
import { IdeasListDialogPrimaryInfoSubform } from "./ideas-list-dialog-primary-info-subform";
import { IdeasListDialogTemplatesSelectionSubform } from "./ideas-list-dialog-templates-selection-subform";

type IdeasListDialogCurrentSubformProps = {
  currentStep: IdeasListDialogFormSteps;
  dialogContentRef: RefObject<HTMLDivElement | null>;
};

export const IdeasListDialogCurrentSubform = withForm({
  defaultValues: {} as IdeasListDialogFormSchema,
  props: {} as IdeasListDialogCurrentSubformProps,
  render: ({ form, currentStep, dialogContentRef }) => {
    if (currentStep === IdeasListDialogFormSteps.TemplateSelection) {
      return <IdeasListDialogTemplatesSelectionSubform form={form} />;
    }

    if (currentStep === IdeasListDialogFormSteps.PrimaryInfo) {
      return <IdeasListDialogPrimaryInfoSubform form={form} />;
    }

    if (currentStep === IdeasListDialogFormSteps.ParamsConfiguration) {
      return (
        <IdeasListDialogParamsConfigurationSubform
          form={form}
          dialogContentRef={dialogContentRef}
        />
      );
    }

    return null;
  },
});
