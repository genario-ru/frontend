import type { RefObject } from "react";

import type { GetApiV1ScenariosScenarioIdResponse } from "@/codegen/api/product/types.gen";
import { DialogBody } from "@/shared/components/ui/dialog";

import { useScenarioDialogForm } from "../hooks/use-scenario-dialog-form";
import { ScenarioDialogCurrentSubform } from "./scenario-dialog-current-subform";
import { ScenarioDialogFormButtons } from "./scenario-dialog-form-buttons";
import { ScenarioDialogFormNavigationSteps } from "./scenario-dialog-form-navigation-steps";
import { ScenarioDialogFormNavigationStepsListener } from "./scenario-dialog-form-navigation-steps-listener";

type ScenarioDialogFormProps = {
  dialogContentRef: RefObject<HTMLDivElement | null>;
  dialogOverlayRef: RefObject<HTMLDivElement | null>;
  scenarioData: GetApiV1ScenariosScenarioIdResponse | undefined;
  onDialogClose: () => void;
};

export function ScenarioDialogForm({
  dialogContentRef,
  dialogOverlayRef,
  scenarioData,
  onDialogClose,
}: ScenarioDialogFormProps) {
  const {
    form,
    currentStep,
    onFormSubmit,
    isCreateScenarioPending,
    isUpdateScenarioPending,
  } = useScenarioDialogForm({ scenarioData, onDialogClose });

  return (
    <form onSubmit={onFormSubmit} className="flex w-full flex-col">
      <ScenarioDialogFormNavigationStepsListener
        form={form}
        currentStep={currentStep}
      />
      <DialogBody className="gap-8">
        <ScenarioDialogFormNavigationSteps form={form} />
        <ScenarioDialogCurrentSubform
          form={form}
          currentStep={currentStep}
          dialogContentRef={dialogContentRef}
        />
      </DialogBody>
      <ScenarioDialogFormButtons
        form={form}
        currentStep={currentStep}
        isCreateScenarioPending={isCreateScenarioPending}
        isUpdateScenarioPending={isUpdateScenarioPending}
        dialogOverlayRef={dialogOverlayRef}
      />
    </form>
  );
}
