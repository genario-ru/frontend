import { formOptions, revalidateLogic } from "@tanstack/react-form";

import type { GetApiV1ScenariosScenarioIdResponse } from "@/codegen/api/product/types.gen";

import {
  type ScenarioDialogFormSchema,
  ScenarioDialogFormSteps,
  scenarioDialogFormStepValidateFn,
} from "./scenario-dialog-form-helpers";

type PrepareScenarioDialogFormOptionsParams = {
  scenarioData: GetApiV1ScenariosScenarioIdResponse | undefined;
};

export const prepareScenarioDialogFormOptions = ({
  scenarioData,
}: PrepareScenarioDialogFormOptionsParams) => {
  return formOptions({
    defaultValues: {
      currentStep: ScenarioDialogFormSteps.TemplateSelection,
      [ScenarioDialogFormSteps.TemplateSelection]: {
        templateId: scenarioData?.data.templateId ?? "",
      },
      [ScenarioDialogFormSteps.PrimaryInfo]: {
        name: scenarioData?.data.name ?? "",
        description: scenarioData?.data.description ?? "",
      },
      [ScenarioDialogFormSteps.ParamsConfiguration]: {
        videoTypeId: scenarioData?.data.videoTypeId ?? "",
        videoDurationId: scenarioData?.data.videoDurationId ?? "",
        platformId: scenarioData?.data.platformId ?? "",
        profileId: scenarioData?.data.profileId ?? "",
        targetAudience: scenarioData?.data.targetAudience ?? "",
        toneIds: scenarioData?.data.tones?.map((tone) => tone.id) ?? [],
      },
    } as ScenarioDialogFormSchema,
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: scenarioDialogFormStepValidateFn,
    },
  });
};
