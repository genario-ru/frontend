import type { RefObject } from "react";

import type { GetApiV1ScenariosScenarioIdResponse } from "@/codegen/api/product/types.gen";
import { DialogBody } from "@/shared/components/ui/dialog";

import { useScenarioSettingsForm } from "../hooks/use-scenario-dialog-form";
import { ScenarioSettingsCurrentSubform } from "./scenario-dialog-current-subform";
import { ScenarioSettingsFormButtons } from "./scenario-dialog-form-buttons";
import { ScenarioSettingsFormNavigationSteps } from "./scenario-dialog-form-navigation-steps";
import { ScenarioSettingsFormNavigationStepsListener } from "./scenario-dialog-form-navigation-steps-listener";

type ScenarioSettingsFormProps = {
  dialogContentRef: RefObject<HTMLDivElement | null>;
  dialogOverlayRef: RefObject<HTMLDivElement | null>;
  scenarioData: GetApiV1ScenariosScenarioIdResponse | undefined;
  onDialogClose: () => void;
};

export function ScenarioSettingsForm({
  dialogContentRef,
  dialogOverlayRef,
  scenarioData,
  onDialogClose,
}: ScenarioSettingsFormProps) {
  const {
    form,
    currentStep,
    onFormSubmit,
    isCreateScenarioPending,
    isUpdateScenarioPending,
  } = useScenarioSettingsForm({ scenarioData, onDialogClose });

  return (
    <form onSubmit={onFormSubmit} className="flex w-full flex-col">
      <ScenarioSettingsFormNavigationStepsListener
        form={form}
        currentStep={currentStep}
      />
      <DialogBody className="gap-8">
        <ScenarioSettingsFormNavigationSteps form={form} />
        <ScenarioSettingsCurrentSubform
          form={form}
          currentStep={currentStep}
          dialogContentRef={dialogContentRef}
        />
      </DialogBody>
      <ScenarioSettingsFormButtons
        form={form}
        currentStep={currentStep}
        isCreateScenarioPending={isCreateScenarioPending}
        isUpdateScenarioPending={isUpdateScenarioPending}
        dialogOverlayRef={dialogOverlayRef}
      />
    </form>
  );
}
