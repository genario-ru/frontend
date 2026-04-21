import type {
  GetApiV1IdeasByIdeaIdQueryResponse,
  GetApiV1ScenariosByScenarioIdQueryResponse,
} from "@/codegen/api/product";
import { Island } from "@/shared/components/ui/island";
import { Plug } from "@/shared/components/ui/plug";

import { useScenarioSettingsForm } from "../hooks/use-scenario-settings-form";
import { ScenarioSettingsCurrentSubform } from "./scenario-settings-current-subform";
import {
  ScenarioSettingsFormButtons,
  ScenarioSettingsFormButtonsSkeleton,
} from "./scenario-settings-form-buttons";
import {
  ScenarioSettingsFormNavigationSteps,
  ScenarioSettingsFormNavigationStepsSkeleton,
} from "./scenario-settings-form-navigation-steps";
import { ScenarioSettingsFormNavigationStepsListener } from "./scenario-settings-form-navigation-steps-listener";
import { ScenarioSettingsTemplatesSelectionSubformSkeleton } from "./scenario-settings-templates-selection-subform";

const SCENARIO_SETTINGS_FORM_ID = "scenario-settings-form";

type ScenarioSettingsFormProps = {
  templateId: string | undefined;
  scenarioData: GetApiV1ScenariosByScenarioIdQueryResponse | undefined;
  ideaData: GetApiV1IdeasByIdeaIdQueryResponse | undefined;
};

export function ScenarioSettingsForm({
  templateId,
  scenarioData,
  ideaData,
}: ScenarioSettingsFormProps) {
  const {
    form,
    currentStep,
    isCreateScenarioPending,
    isUpdateScenarioPending,
    onFormSubmit,
  } = useScenarioSettingsForm({ templateId, scenarioData, ideaData });

  return (
    <>
      <form
        id={SCENARIO_SETTINGS_FORM_ID}
        onSubmit={onFormSubmit}
        className="flex w-full flex-1 flex-col"
      >
        <ScenarioSettingsFormNavigationStepsListener
          form={form}
          currentStep={currentStep}
        />
        <Island className="flex-1 gap-6">
          <ScenarioSettingsFormNavigationSteps form={form} />
          <ScenarioSettingsCurrentSubform
            form={form}
            currentStep={currentStep}
          />
        </Island>
      </form>
      <ScenarioSettingsFormButtons
        form={form}
        formId={SCENARIO_SETTINGS_FORM_ID}
        editMode={Boolean(scenarioData)}
        currentStep={currentStep}
        isCreateScenarioPending={isCreateScenarioPending}
        isUpdateScenarioPending={isUpdateScenarioPending}
      />
    </>
  );
}

export function ScenarioSettingsFormSkeleton() {
  return (
    <>
      <Island className="flex-1 gap-6">
        <ScenarioSettingsFormNavigationStepsSkeleton />
        <ScenarioSettingsTemplatesSelectionSubformSkeleton />
      </Island>
      <ScenarioSettingsFormButtonsSkeleton />
    </>
  );
}

export function ScenarioSettingsFormErrorPlug() {
  return (
    <Island className="flex-1" roundedBottom={false}>
      <Plug
        variant="negative"
        title="Ошибка загрузки"
        description="Произошла ошибка при загрузке формы. Попробуйте обновить страницу"
        className="flex-1"
      />
    </Island>
  );
}
