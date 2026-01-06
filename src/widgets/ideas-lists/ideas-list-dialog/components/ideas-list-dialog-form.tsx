import type { RefObject } from "react";

import type { GetApiV1IdeasListsIdeasListIdResponse } from "@/codegen/api/product/types.gen";
import { DialogBody } from "@/shared/components/ui/dialog";

import { useIdeasListDialogForm } from "../hooks/use-ideas-list-dialog-form";
import { IdeasListDialogFormSteps } from "../utils/ideas-list-dialog-form-helpers";
import { IdeasListDialogFormButtons } from "./ideas-list-dialog-form-buttons";
import { IdeasListDialogFormNavigationSteps } from "./ideas-list-dialog-form-navigation-steps";
import { IdeasListDialogFormNavigationStepsListener } from "./ideas-list-dialog-form-navigation-steps-listener";
import { IdeasListDialogParamsConfigurationSubform } from "./ideas-list-dialog-params-configuration-subform";
import { IdeasListDialogPrimaryInfoSubform } from "./ideas-list-dialog-primary-info-subform";
import { IdeasListDialogTemplatesSelectionSubform } from "./ideas-list-dialog-templates-selection-subform";

type IdeasListDialogFormProps = {
  dialogContentRef: RefObject<HTMLDivElement | null>;
  dialogOverlayRef: RefObject<HTMLDivElement | null>;
  ideasListData: GetApiV1IdeasListsIdeasListIdResponse | undefined;
  onDialogClose: () => void;
};

export function IdeasListDialogForm({
  dialogContentRef,
  dialogOverlayRef,
  ideasListData,
  onDialogClose,
}: IdeasListDialogFormProps) {
  const {
    form,
    currentStep,
    onFormSubmit,
    isCreateIdeasListPending,
    isUpdateIdeasListPending,
  } = useIdeasListDialogForm({ ideasListData, onDialogClose });

  return (
    <form onSubmit={onFormSubmit} className="flex w-full flex-col">
      <IdeasListDialogFormNavigationStepsListener
        form={form}
        currentStep={currentStep}
      />
      <DialogBody className="gap-8">
        <IdeasListDialogFormNavigationSteps form={form} />
        {currentStep === IdeasListDialogFormSteps.PrimaryInfo && (
          <IdeasListDialogPrimaryInfoSubform form={form} />
        )}
        {currentStep === IdeasListDialogFormSteps.TemplateSelection && (
          <IdeasListDialogTemplatesSelectionSubform form={form} />
        )}
        {currentStep === IdeasListDialogFormSteps.ParamsConfiguration && (
          <IdeasListDialogParamsConfigurationSubform
            form={form}
            dialogContentRef={dialogContentRef}
          />
        )}
      </DialogBody>
      <IdeasListDialogFormButtons
        form={form}
        currentStep={currentStep}
        isCreateIdeasListPending={isCreateIdeasListPending}
        isUpdateIdeasListPending={isUpdateIdeasListPending}
        dialogOverlayRef={dialogOverlayRef}
      />
    </form>
  );
}
