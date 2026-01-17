import { formOptions, revalidateLogic } from "@tanstack/react-form";

import type { GetApiV1IdeasListsIdeasListIdResponse } from "@/codegen/api/product/types.gen";

import {
  type IdeasListSettingsFormSchema,
  IdeasListSettingsFormSteps,
  ideasListSettingsFormStepValidateFn,
} from "./ideas-list-settings-form-helpers";

type PrepareScenarioFormOptionsParams = {
  ideasListData: GetApiV1IdeasListsIdeasListIdResponse | undefined;
};

export const prepareIdeasListSettingsFormOptions = ({
  ideasListData,
}: PrepareScenarioFormOptionsParams) => {
  return formOptions({
    defaultValues: {
      currentStep: IdeasListSettingsFormSteps.TemplateSelection,
      [IdeasListSettingsFormSteps.TemplateSelection]: {
        templateId: ideasListData?.data.templateId ?? "",
      },
      [IdeasListSettingsFormSteps.PrimaryInfo]: {
        name: ideasListData?.data.name ?? "",
        description: ideasListData?.data.description ?? "",
      },
      [IdeasListSettingsFormSteps.ParamsConfiguration]: {
        profileId: ideasListData?.data.profileId ?? "",
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
