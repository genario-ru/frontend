import { formOptions, revalidateLogic } from "@tanstack/react-form";

import type { GetApiV1ScenariosScenarioIdResponse } from "@/codegen/api/product/types.gen";

import {
  type ScenarioSettingsFormSchema,
  ScenarioSettingsFormSteps,
  scenarioSettingsFormStepValidateFn,
} from "./scenario-settings-form-helpers";

type PrepareScenarioSettingsFormOptionsParams = {
  scenarioData: GetApiV1ScenariosScenarioIdResponse | undefined;
};

export const prepareScenarioSettingsFormOptions = ({
  scenarioData,
}: PrepareScenarioSettingsFormOptionsParams) => {
  return formOptions({
    defaultValues: {
      currentStep: ScenarioSettingsFormSteps.TemplateSelection,
      [ScenarioSettingsFormSteps.TemplateSelection]: {
        templateId: scenarioData?.data.templateId,
      },
      [ScenarioSettingsFormSteps.PrimaryInfo]: {
        name: scenarioData?.data.name ?? "",
        description: scenarioData?.data.description ?? "",
      },
      [ScenarioSettingsFormSteps.ParamsConfiguration]: {
        videoTypeId: scenarioData?.data.videoTypeId,
        videoDurationId: scenarioData?.data.videoDurationId,
        platformId: scenarioData?.data.platformId,
        profileId: scenarioData?.data.profileId,
        targetAudience: scenarioData?.data.targetAudience,
        toneIds: scenarioData?.data.tones?.map((tone) => tone.id) ?? [],
      },
    } as ScenarioSettingsFormSchema,
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: scenarioSettingsFormStepValidateFn,
    },
  });
};
