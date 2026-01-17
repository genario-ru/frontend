import { useStore } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { useCreateIdeasList } from "@/actions/ideas-lists/hooks/use-create-ideas-list";
import { useUpdateIdeasList } from "@/actions/ideas-lists/hooks/use-update-ideas-list";
import { getApiV1IdeasListsIdeasListIdQueryKey } from "@/codegen/api/product/@tanstack/react-query.gen";
import type { GetApiV1IdeasListsIdeasListIdResponse } from "@/codegen/api/product/types.gen";
import { useAppForm } from "@/lib/tanstack-form";
import { useFormHandlers } from "@/lib/tanstack-form/hooks/use-form-handlers";

import { IdeasListSettingsFormSteps } from "../utils/ideas-list-settings-form-helpers";
import { prepareIdeasListSettingsFormOptions } from "../utils/prepare-ideas-list-settings-form-options";
import { usePrefetchIdeasListSettingsSubformsData } from "./use-prefetch-ideas-list-settings-subforms-data";

type UseIdeasListSettingsFormParams = {
  ideasListData: GetApiV1IdeasListsIdeasListIdResponse | undefined;
};

export function useIdeasListSettingsForm({
  ideasListData,
}: UseIdeasListSettingsFormParams) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const formOptions = prepareIdeasListSettingsFormOptions({ ideasListData });

  const { createIdeasList, isCreateIdeasListPending } = useCreateIdeasList({
    onSuccess: (data) => {
      navigate({
        to: "/ideas-lists/$ideasListId",
        params: { ideasListId: data.data.id },
      });
    },
  });

  const { updateIdeasList, isUpdateIdeasListPending } = useUpdateIdeasList({
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: getApiV1IdeasListsIdeasListIdQueryKey({
          path: { ideasListId: data.data.id },
        }),
      });
    },
  });

  const form = useAppForm({
    ...formOptions,
    onSubmit: ({ value, formApi }) => {
      switch (value.currentStep) {
        case IdeasListSettingsFormSteps.TemplateSelection:
          formApi.setFieldValue(
            "currentStep",
            IdeasListSettingsFormSteps.PrimaryInfo,
          );
          break;

        case IdeasListSettingsFormSteps.PrimaryInfo:
          formApi.setFieldValue(
            "currentStep",
            IdeasListSettingsFormSteps.ParamsConfiguration,
          );
          break;

        case IdeasListSettingsFormSteps.ParamsConfiguration:
          const commonIdeasListParams = {
            ...value[IdeasListSettingsFormSteps.PrimaryInfo],
            ...value[IdeasListSettingsFormSteps.TemplateSelection],
            ...value[IdeasListSettingsFormSteps.ParamsConfiguration],
          };

          if (ideasListData) {
            updateIdeasList({
              path: { ideasListId: ideasListData.data.id },
              body: commonIdeasListParams,
            });
          } else {
            createIdeasList({ body: commonIdeasListParams });
          }

          break;

        default:
          break;
      }
    },
  });

  const currentStep = useStore(form.store, (state) => state.values.currentStep);
  const { onFormSubmit } = useFormHandlers({ form: form });

  usePrefetchIdeasListSettingsSubformsData();

  return {
    form,
    currentStep,
    isCreateIdeasListPending,
    isUpdateIdeasListPending,
    onFormSubmit,
  };
}
