import { useStore } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { useCreateIdeasList } from "@/actions/ideas-lists/hooks/use-create-ideas-list";
import { useUpdateIdeasList } from "@/actions/ideas-lists/hooks/use-update-ideas-list";
import {
  getApiV1ArchiveItemsMyQueryKey,
  getApiV1IdeasListsByIdeasListIdQueryKey,
  type GetApiV1IdeasListsByIdeasListIdQueryResponse,
} from "@/codegen/api/product";
import { useAppForm } from "@/lib/tanstack-form";
import { useFormHandlers } from "@/lib/tanstack-form/hooks/use-form-handlers";
import { useToast } from "@/shared/hooks/use-toast";

import { IdeasListSettingsFormSteps } from "../utils/ideas-list-settings-form-helpers";
import { prepareIdeasListSettingsFormOptions } from "../utils/prepare-ideas-list-settings-form-options";
import { usePrefetchIdeasListSettingsSubformsData } from "./use-prefetch-ideas-list-settings-subforms-data";

type UseIdeasListSettingsFormParams = {
  templateId: string | undefined;
  ideasListData: GetApiV1IdeasListsByIdeasListIdQueryResponse | undefined;
};

export function useIdeasListSettingsForm({
  templateId,
  ideasListData,
}: UseIdeasListSettingsFormParams) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showErrorToast } = useToast();
  const { createIdeasList, isCreateIdeasListPending } = useCreateIdeasList();
  const { updateIdeasList, isUpdateIdeasListPending } = useUpdateIdeasList();

  const formOptions = prepareIdeasListSettingsFormOptions({
    templateId,
    ideasListData,
  });

  const form = useAppForm({
    ...formOptions,
    onSubmitMeta: {
      submitAction: "some-action",
    },
    onSubmit: ({ value, meta, formApi }) => {
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
            updateIdeasList(
              {
                ideasListId: ideasListData.data.id,
                data: {
                  ...commonIdeasListParams,
                  regenerate: meta.submitAction === "regenerate",
                },
              },
              {
                onSuccess: (data) => {
                  queryClient.invalidateQueries({
                    queryKey: getApiV1ArchiveItemsMyQueryKey(),
                  });

                  queryClient.invalidateQueries({
                    queryKey: getApiV1IdeasListsByIdeasListIdQueryKey({
                      ideasListId: data.data.id,
                    }),
                  });

                  navigate({
                    to: "/ideas-lists/$ideasListId",
                    params: { ideasListId: data.data.id },
                  });
                },
                onError: (error) => {
                  if (error.cause.status === 402) {
                    showErrorToast({
                      description:
                        "Недостаточно кредитов для генерации новых идей",
                    });
                  }
                },
              },
            );
          } else {
            createIdeasList(
              { data: commonIdeasListParams },
              {
                onSuccess: (data) => {
                  queryClient.invalidateQueries({
                    queryKey: getApiV1ArchiveItemsMyQueryKey(),
                  });

                  navigate({
                    to: "/ideas-lists/$ideasListId",
                    params: { ideasListId: data.data.id },
                  });
                },
                onError: (error) => {
                  if (error.cause.status === 402) {
                    showErrorToast({
                      description:
                        "Недостаточно кредитов для генерации новых идей",
                    });
                  }
                },
              },
            );
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
