import { useStore } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { useCreateIdeasList } from "@/actions/ideas-lists/hooks/use-create-ideas-list";
import { useUpdateIdeasList } from "@/actions/ideas-lists/hooks/use-update-ideas-list";
import { getApiV1IdeasListsIdeasListIdQueryKey } from "@/codegen/api/product/@tanstack/react-query.gen";
import type { GetApiV1IdeasListsIdeasListIdResponse } from "@/codegen/api/product/types.gen";
import { useAppForm } from "@/lib/tanstack-form";
import { useFormHandlers } from "@/lib/tanstack-form/hooks/use-form-handlers";

import { IdeasListDialogFormSteps } from "../utils/ideas-list-dialog-form-helpers";
import { prepareIdeasListDialogFormOptions } from "../utils/prepare-ideas-list-dialog-forn-options";
import { usePrefetchListDialogSubformsData } from "./use-prefetch-list-dialog-subforms-data";

type UseIdeasListDialogFormParams = {
  ideasListData: GetApiV1IdeasListsIdeasListIdResponse | undefined;
  onDialogClose: () => void;
};

export function useIdeasListDialogForm({
  ideasListData,
  onDialogClose,
}: UseIdeasListDialogFormParams) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const formOptions = prepareIdeasListDialogFormOptions({ ideasListData });

  const { createIdeasList, isCreateIdeasListPending } = useCreateIdeasList({
    onSuccess: (data) => {
      onDialogClose();

      navigate({
        to: "/ideas-lists/$ideasListId",
        params: { ideasListId: data.data.id },
      });
    },
  });

  const { updateIdeasList, isUpdateIdeasListPending } = useUpdateIdeasList({
    onSuccess: (data) => {
      onDialogClose();

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
        case IdeasListDialogFormSteps.TemplateSelection:
          formApi.setFieldValue(
            "currentStep",
            IdeasListDialogFormSteps.ParamsConfiguration,
          );
          break;

        case IdeasListDialogFormSteps.PrimaryInfo:
          formApi.setFieldValue(
            "currentStep",
            IdeasListDialogFormSteps.TemplateSelection,
          );
          break;

        case IdeasListDialogFormSteps.ParamsConfiguration:
          const commonIdeasListParams = {
            ...value[IdeasListDialogFormSteps.PrimaryInfo],
            ...value[IdeasListDialogFormSteps.TemplateSelection],
            ...value[IdeasListDialogFormSteps.ParamsConfiguration],
          };

          if (ideasListData) {
            updateIdeasList({
              path: {
                ideasListId: ideasListData.data.id,
              },
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

  usePrefetchListDialogSubformsData();

  return {
    form,
    currentStep,
    isCreateIdeasListPending,
    isUpdateIdeasListPending,
    onFormSubmit,
  };
}
