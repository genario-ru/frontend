import { formOptions, revalidateLogic } from "@tanstack/react-form";

import type {
  GetApiV1IdeasIdeaIdResponse,
  GetApiV1ScenariosScenarioIdResponse,
} from "@/codegen/api/product/types.gen";

import {
  type ScenarioSettingsFormSchema,
  ScenarioSettingsFormSteps,
  scenarioSettingsFormStepValidateFn,
} from "./scenario-settings-form-helpers";

type PrepareScenarioSettingsFormOptionsParams = {
  templateId: string | undefined;
  scenarioData: GetApiV1ScenariosScenarioIdResponse | undefined;
  ideaData: GetApiV1IdeasIdeaIdResponse | undefined;
};

export const prepareScenarioSettingsFormOptions = ({
  templateId: templateIdParam,
  scenarioData,
  ideaData,
}: PrepareScenarioSettingsFormOptionsParams) => {
  const currentStep = templateIdParam
    ? ScenarioSettingsFormSteps.PrimaryInfo
    : ScenarioSettingsFormSteps.TemplateSelection;

  return formOptions({
    defaultValues: {
      currentStep,
      [ScenarioSettingsFormSteps.TemplateSelection]: {
        templateId:
          templateIdParam ??
          scenarioData?.data.templateId ??
          ideaData?.data.ideasList.templateId,
      },
      [ScenarioSettingsFormSteps.PrimaryInfo]: {
        name: scenarioData?.data.name ?? ideaData?.data.name ?? "",
        description:
          scenarioData?.data.description ?? ideaData?.data.description ?? "",
      },
      [ScenarioSettingsFormSteps.ParamsConfiguration]: {
        videoTypeId:
          scenarioData?.data.videoTypeId ?? ideaData?.data.videoType.id,
        videoDurationId: scenarioData?.data.videoDurationId,
        platformId: scenarioData?.data.platformId,
        profileId:
          scenarioData?.data.profileId ?? ideaData?.data.ideasList.profileId,
        targetAudience:
          scenarioData?.data.targetAudience ??
          ideaData?.data.ideasList.targetAudience,
        toneIds:
          scenarioData?.data.tones?.map((tone) => tone.id) ??
          ideaData?.data.ideasList.tones?.map((tone) => tone.id) ??
          [],
      },
    } as ScenarioSettingsFormSchema,
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: scenarioSettingsFormStepValidateFn,
    },
  });
};
