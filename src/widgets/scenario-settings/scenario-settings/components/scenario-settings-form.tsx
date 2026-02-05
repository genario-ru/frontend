import type { GetApiV1ScenariosScenarioIdResponse } from "@/codegen/api/product/types.gen";
import { Island } from "@/shared/components/ui/island";

import { useScenarioSettingsForm } from "../hooks/use-scenario-settings-form";
import { ScenarioSettingsCurrentSubform } from "./scenario-settings-current-subform";
import { ScenarioSettingsFormButtons } from "./scenario-settings-form-buttons";
import { ScenarioSettingsFormNavigationSteps } from "./scenario-settings-form-navigation-steps";
import { ScenarioSettingsFormNavigationStepsListener } from "./scenario-settings-form-navigation-steps-listener";

type ScenarioSettingsFormProps = {
  templateId: string | undefined;
  scenarioData: GetApiV1ScenariosScenarioIdResponse | undefined;
};

export function ScenarioSettingsForm({
  templateId,
  scenarioData,
}: ScenarioSettingsFormProps) {
  const {
    form,
    currentStep,
    onFormSubmit,
    isCreateScenarioPending,
    isUpdateScenarioPending,
  } = useScenarioSettingsForm({ templateId, scenarioData });

  return (
    <form onSubmit={onFormSubmit} className="flex w-full flex-1 flex-col">
      <ScenarioSettingsFormNavigationStepsListener
        form={form}
        currentStep={currentStep}
      />
      <Island roundedBottom={false} className="flex-1 gap-6">
        <ScenarioSettingsFormNavigationSteps form={form} />
        <ScenarioSettingsCurrentSubform form={form} currentStep={currentStep} />
      </Island>
      <ScenarioSettingsFormButtons
        form={form}
        currentStep={currentStep}
        isCreateScenarioPending={isCreateScenarioPending}
        isUpdateScenarioPending={isUpdateScenarioPending}
      />
    </form>
  );
}
