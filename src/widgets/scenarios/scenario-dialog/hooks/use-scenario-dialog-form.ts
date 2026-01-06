import { useStore } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { useCreateScenario } from "@/actions/scenarios/hooks/use-create-scenario";
import { useUpdateScenario } from "@/actions/scenarios/hooks/use-update-scenario";
import { getApiV1ScenariosScenarioIdQueryKey } from "@/codegen/api/product/@tanstack/react-query.gen";
import type { GetApiV1ScenariosScenarioIdResponse } from "@/codegen/api/product/types.gen";
import { useAppForm } from "@/lib/tanstack-form";
import { useFormHandlers } from "@/lib/tanstack-form/hooks/use-form-handlers";

import { prepareScenarioDialogFormOptions } from "../utils/prepare-scenario-dialog-forn-options";
import { ScenarioDialogFormSteps } from "../utils/scenario-dialog-form-helpers";
import { usePrefetchScenarioDialogSubformsData } from "./use-prefetch-scenario-dialog-subforms-data";

type UseScenarioDialogFormParams = {
  scenarioData: GetApiV1ScenariosScenarioIdResponse | undefined;
  onDialogClose: () => void;
};

export function useScenarioDialogForm({
  scenarioData,
  onDialogClose,
}: UseScenarioDialogFormParams) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const formOptions = prepareScenarioDialogFormOptions({ scenarioData });

  const { createScenario, isCreateScenarioPending } = useCreateScenario({
    onSuccess: (data) => {
      onDialogClose();

      navigate({
        to: "/scenarios/$scenarioId",
        params: { scenarioId: data.data.id },
      });
    },
  });

  const { updateScenario, isUpdateScenarioPending } = useUpdateScenario({
    onSuccess: (data) => {
      onDialogClose();

      queryClient.invalidateQueries({
        queryKey: getApiV1ScenariosScenarioIdQueryKey({
          path: { scenarioId: data.data.id },
        }),
      });
    },
  });

  const form = useAppForm({
    ...formOptions,
    onSubmit: ({ value, formApi }) => {
      switch (value.currentStep) {
        case ScenarioDialogFormSteps.TemplateSelection:
          formApi.setFieldValue(
            "currentStep",
            ScenarioDialogFormSteps.PrimaryInfo,
          );
          break;

        case ScenarioDialogFormSteps.PrimaryInfo:
          formApi.setFieldValue(
            "currentStep",
            ScenarioDialogFormSteps.ParamsConfiguration,
          );
          break;

        case ScenarioDialogFormSteps.ParamsConfiguration:
          const commonScenarioParams = {
            ...value[ScenarioDialogFormSteps.PrimaryInfo],
            ...value[ScenarioDialogFormSteps.TemplateSelection],
            ...value[ScenarioDialogFormSteps.ParamsConfiguration],
          };

          if (scenarioData) {
            updateScenario({
              path: { scenarioId: scenarioData.data.id },
              body: commonScenarioParams,
            });
          } else {
            createScenario({ body: commonScenarioParams });
          }

          break;

        default:
          break;
      }
    },
  });

  const currentStep = useStore(form.store, (state) => state.values.currentStep);
  const { onFormSubmit } = useFormHandlers({ form: form });

  usePrefetchScenarioDialogSubformsData();

  return {
    form,
    currentStep,
    isCreateScenarioPending,
    isUpdateScenarioPending,
    onFormSubmit,
  };
}
