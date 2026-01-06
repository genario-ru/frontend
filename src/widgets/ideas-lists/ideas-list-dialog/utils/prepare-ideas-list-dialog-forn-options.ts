import { formOptions, revalidateLogic } from "@tanstack/react-form";

import type { GetApiV1IdeasListsIdeasListIdResponse } from "@/codegen/api/product/types.gen";

import {
  type IdeasListDialogFormSchema,
  IdeasListDialogFormSteps,
  ideasListDialogFormStepValidateFn,
} from "./ideas-list-dialog-form-helpers";

type PrepareScenarioFormOptionsParams = {
  ideasListData: GetApiV1IdeasListsIdeasListIdResponse | undefined;
};

export const prepareIdeasListDialogFormOptions = ({
  ideasListData,
}: PrepareScenarioFormOptionsParams) => {
  return formOptions({
    defaultValues: {
      currentStep: IdeasListDialogFormSteps.TemplateSelection,
      [IdeasListDialogFormSteps.TemplateSelection]: {
        templateId: ideasListData?.data.templateId ?? "",
      },
      [IdeasListDialogFormSteps.PrimaryInfo]: {
        name: ideasListData?.data.name ?? "",
        description: ideasListData?.data.description ?? "",
      },
      [IdeasListDialogFormSteps.ParamsConfiguration]: {
        profileId: ideasListData?.data.profileId ?? "",
        targetAudience: ideasListData?.data.targetAudience ?? "",
        toneIds: ideasListData?.data.tones?.map((tone) => tone.id) ?? [],
        videoTypeIds:
          ideasListData?.data.videoTypes.map((videoType) => videoType.id) ?? [],
      },
    } as IdeasListDialogFormSchema,
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: ideasListDialogFormStepValidateFn,
    },
  });
};
