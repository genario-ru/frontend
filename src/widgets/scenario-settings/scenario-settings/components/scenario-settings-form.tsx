import type {
  GetApiV1IdeasIdeaIdResponse,
  GetApiV1ScenariosScenarioIdResponse,
} from "@/codegen/api/product/types.gen";
import {
  ErrorPlug,
  ErrorPlugDescription,
  ErrorPlugHeader,
  ErrorPlugIcon,
  ErrorPlugTitle,
} from "@/shared/components/ui/error-plug";
import { Island } from "@/shared/components/ui/island";

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

type ScenarioSettingsFormProps = {
  templateId: string | undefined;
  scenarioData: GetApiV1ScenariosScenarioIdResponse | undefined;
  ideaData: GetApiV1IdeasIdeaIdResponse | undefined;
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
        editMode={Boolean(scenarioData)}
        currentStep={currentStep}
        isCreateScenarioPending={isCreateScenarioPending}
        isUpdateScenarioPending={isUpdateScenarioPending}
      />
    </form>
  );
}

export function ScenarioSettingsFormSkeleton() {
  return (
    <div className="flex w-full flex-1 flex-col">
      <Island roundedBottom={false} className="flex-1 gap-6">
        <ScenarioSettingsFormNavigationStepsSkeleton />
        <ScenarioSettingsTemplatesSelectionSubformSkeleton />
      </Island>
      <ScenarioSettingsFormButtonsSkeleton />
    </div>
  );
}

export function ScenarioSettingsFormErrorPlug() {
  return (
    <Island className="flex-1">
      <ErrorPlug className="flex-1">
        <ErrorPlugHeader>
          <ErrorPlugIcon />
          <ErrorPlugTitle>Ошибка загрузки</ErrorPlugTitle>
          <ErrorPlugDescription>
            Произошла ошибка при загрузке формы. Попробуйте обновить страницу
          </ErrorPlugDescription>
        </ErrorPlugHeader>
      </ErrorPlug>
    </Island>
  );
}
