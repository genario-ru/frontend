import { formOptions, revalidateLogic } from "@tanstack/react-form";

import type { GetApiV1ScenariosScenarioIdResponse } from "@/codegen/api/product/types.gen";

import {
  type ScenarioSettingsFormSchema,
  ScenarioSettingsFormSteps,
  scenarioSettingsFormStepValidateFn,
} from "./scenario-settings-form-helpers";

type PrepareScenarioSettingsFormOptionsParams = {
  templateId: string | undefined;
  scenarioData: GetApiV1ScenariosScenarioIdResponse | undefined;
};

export const prepareScenarioSettingsFormOptions = ({
  templateId,
  scenarioData,
}: PrepareScenarioSettingsFormOptionsParams) => {
  const currentStep = templateId
    ? ScenarioSettingsFormSteps.PrimaryInfo
    : ScenarioSettingsFormSteps.TemplateSelection;

  return formOptions({
    defaultValues: {
      currentStep,
      [ScenarioSettingsFormSteps.TemplateSelection]: {
        templateId: templateId ?? scenarioData?.data.templateId,
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
