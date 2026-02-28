import { useStore } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { useCreateIdeasList } from "@/actions/ideas-lists/hooks/use-create-ideas-list";
import { useUpdateIdeasList } from "@/actions/ideas-lists/hooks/use-update-ideas-list";
import {
  getApiV1ArchiveItemsMyQueryKey,
  getApiV1IdeasListsIdeasListIdQueryKey,
  type GetApiV1IdeasListsIdeasListIdQueryResponse,
} from "@/codegen/api/product";
import { useAppForm } from "@/lib/tanstack-form";
import { useFormHandlers } from "@/lib/tanstack-form/hooks/use-form-handlers";

import { IdeasListSettingsFormSteps } from "../utils/ideas-list-settings-form-helpers";
import { prepareIdeasListSettingsFormOptions } from "../utils/prepare-ideas-list-settings-form-options";
import { usePrefetchIdeasListSettingsSubformsData } from "./use-prefetch-ideas-list-settings-subforms-data";

type UseIdeasListSettingsFormParams = {
  templateId: string | undefined;
  ideasListData: GetApiV1IdeasListsIdeasListIdQueryResponse | undefined;
};

export function useIdeasListSettingsForm({
  templateId,
  ideasListData,
}: UseIdeasListSettingsFormParams) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const formOptions = prepareIdeasListSettingsFormOptions({
    templateId,
    ideasListData,
  });

  const { createIdeasList, isCreateIdeasListPending } = useCreateIdeasList({
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: getApiV1ArchiveItemsMyQueryKey(),
      });

      navigate({
        to: "/ideas-lists/$ideasListId",
        params: { ideasListId: data.data.id },
      });
    },
  });

  const { updateIdeasList, isUpdateIdeasListPending } = useUpdateIdeasList({
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: getApiV1ArchiveItemsMyQueryKey(),
      });

      queryClient.invalidateQueries({
        queryKey: getApiV1IdeasListsIdeasListIdQueryKey({
          ideasListId: data.data.id,
        }),
      });

      queryClient.invalidateQueries({
        queryKey: getApiV1IdeasListsIdeasListIdQueryKey({
          ideasListId: data.data.id,
        }),
      });

      navigate({
        to: "/ideas-lists/$ideasListId",
        params: { ideasListId: data.data.id },
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
              ideasListId: ideasListData.data.id,
              data: commonIdeasListParams,
            });
          } else {
            createIdeasList({ data: commonIdeasListParams });
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
