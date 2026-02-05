import { useStore } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { useCreateScenario } from "@/actions/scenario/hooks/use-create-scenario";
import { useUpdateScenario } from "@/actions/scenario/hooks/use-update-scenario";
import {
  getApiV1ArchiveItemsMyQueryKey,
  getApiV1ScenariosScenarioIdQueryKey,
} from "@/codegen/api/product/@tanstack/react-query.gen";
import type { GetApiV1ScenariosScenarioIdResponse } from "@/codegen/api/product/types.gen";
import { useAppForm } from "@/lib/tanstack-form";
import { useFormHandlers } from "@/lib/tanstack-form/hooks/use-form-handlers";

import { prepareScenarioSettingsFormOptions } from "../utils/prepare-scenario-settings-forn-options";
import { ScenarioSettingsFormSteps } from "../utils/scenario-settings-form-helpers";
import { usePrefetchScenarioSettingsSubformsData } from "./use-prefetch-scenario-settings-subforms-data";

type UseScenarioSettingsFormParams = {
  templateId: string | undefined;
  scenarioData: GetApiV1ScenariosScenarioIdResponse | undefined;
};

export function useScenarioSettingsForm({
  templateId,
  scenarioData,
}: UseScenarioSettingsFormParams) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const formOptions = prepareScenarioSettingsFormOptions({
    templateId,
    scenarioData,
  });

  const { createScenario, isCreateScenarioPending } = useCreateScenario({
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: getApiV1ArchiveItemsMyQueryKey(),
      });

      navigate({
        to: "/scenarios/$scenarioId",
        params: { scenarioId: data.data.id },
      });
    },
  });

  const { updateScenario, isUpdateScenarioPending } = useUpdateScenario({
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: getApiV1ArchiveItemsMyQueryKey(),
      });

      queryClient.invalidateQueries({
        queryKey: getApiV1ScenariosScenarioIdQueryKey({
          path: { scenarioId: data.data.id },
        }),
      });

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
        case ScenarioSettingsFormSteps.TemplateSelection:
          formApi.setFieldValue(
            "currentStep",
            ScenarioSettingsFormSteps.PrimaryInfo,
          );
          break;

        case ScenarioSettingsFormSteps.PrimaryInfo:
          formApi.setFieldValue(
            "currentStep",
            ScenarioSettingsFormSteps.ParamsConfiguration,
          );
          break;

        case ScenarioSettingsFormSteps.ParamsConfiguration:
          const commonScenarioParams = {
            ...value[ScenarioSettingsFormSteps.PrimaryInfo],
            ...value[ScenarioSettingsFormSteps.TemplateSelection],
            ...value[ScenarioSettingsFormSteps.ParamsConfiguration],
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

  usePrefetchScenarioSettingsSubformsData();

  return {
    form,
    currentStep,
    isCreateScenarioPending,
    isUpdateScenarioPending,
    onFormSubmit,
  };
}
