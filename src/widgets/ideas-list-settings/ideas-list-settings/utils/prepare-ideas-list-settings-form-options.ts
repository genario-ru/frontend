import { formOptions, revalidateLogic } from "@tanstack/react-form";

import type { GetApiV1IdeasListsByIdeasListIdQueryResponse } from "@/codegen/api/product";

import {
  type IdeasListSettingsFormSchema,
  IdeasListSettingsFormSteps,
  ideasListSettingsFormStepValidateFn,
} from "./ideas-list-settings-form-helpers";

type PrepareScenarioFormOptionsParams = {
  templateId: string | undefined;
  ideasListData: GetApiV1IdeasListsByIdeasListIdQueryResponse | undefined;
};

export const prepareIdeasListSettingsFormOptions = ({
  templateId,
  ideasListData,
}: PrepareScenarioFormOptionsParams) => {
  const currentStep = templateId
    ? IdeasListSettingsFormSteps.PrimaryInfo
    : IdeasListSettingsFormSteps.TemplateSelection;

  return formOptions({
    defaultValues: {
      currentStep,
      [IdeasListSettingsFormSteps.TemplateSelection]: {
        templateId: templateId ?? ideasListData?.data.templateId,
      },
      [IdeasListSettingsFormSteps.PrimaryInfo]: {
        name: ideasListData?.data.name ?? "",
        description: ideasListData?.data.description ?? "",
      },
      [IdeasListSettingsFormSteps.ParamsConfiguration]: {
        profileId: ideasListData?.data.profileId,
        targetAudience: ideasListData?.data.targetAudience ?? "",
        toneIds: ideasListData?.data.tones?.map((tone) => tone.id) ?? [],
        videoTypeIds:
          ideasListData?.data.videoTypes.map((videoType) => videoType.id) ?? [],
      },
    } as IdeasListSettingsFormSchema,
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: ideasListSettingsFormStepValidateFn,
    },
  });
};
