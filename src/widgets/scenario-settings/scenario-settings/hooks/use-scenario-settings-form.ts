import { useStore } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { useCreateScenario } from "@/actions/scenario/hooks/use-create-scenario";
import { useUpdateScenario } from "@/actions/scenario/hooks/use-update-scenario";
import type {
  GetApiV1IdeasByIdeaIdQueryResponse,
  GetApiV1ScenariosByScenarioIdQueryResponse,
} from "@/codegen/api/product";
import {
  getApiV1ArchiveItemsMyQueryKey,
  getApiV1ScenariosByScenarioIdQueryKey,
} from "@/codegen/api/product";
import { useAppForm } from "@/lib/tanstack-form";
import { useFormHandlers } from "@/lib/tanstack-form/hooks/use-form-handlers";

import { prepareScenarioSettingsFormOptions } from "../utils/prepare-scenario-settings-forn-options";
import { ScenarioSettingsFormSteps } from "../utils/scenario-settings-form-helpers";
import { usePrefetchScenarioSettingsSubformsData } from "./use-prefetch-scenario-settings-subforms-data";

type UseScenarioSettingsFormParams = {
  templateId: string | undefined;
  scenarioData: GetApiV1ScenariosByScenarioIdQueryResponse | undefined;
  ideaData: GetApiV1IdeasByIdeaIdQueryResponse | undefined;
};

export function useScenarioSettingsForm({
  templateId,
  scenarioData,
  ideaData,
}: UseScenarioSettingsFormParams) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const formOptions = prepareScenarioSettingsFormOptions({
    templateId,
    scenarioData,
    ideaData,
  });

  const { createScenario, isCreateScenarioPending } = useCreateScenario();

  const { updateScenario, isUpdateScenarioPending } = useUpdateScenario();

  const form = useAppForm({
    ...formOptions,
    onSubmitMeta: {
      submitAction: "some-action",
    },
    onSubmit: ({ value, meta, formApi }) => {
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
            updateScenario(
              {
                scenarioId: scenarioData.data.id,
                data: {
                  ...commonScenarioParams,
                  regenerate: meta.submitAction === "regenerate",
                },
              },
              {
                onSuccess: (data) => {
                  queryClient.invalidateQueries({
                    queryKey: getApiV1ArchiveItemsMyQueryKey(),
                  });

                  queryClient.invalidateQueries({
                    queryKey: getApiV1ScenariosByScenarioIdQueryKey({
                      scenarioId: data.data.id,
                    }),
                  });

                  navigate({
                    to: "/scenarios/$scenarioId",
                    params: { scenarioId: data.data.id },
                  });
                },
              },
            );
          } else {
            createScenario(
              { data: commonScenarioParams },
              {
                onSuccess: (data) => {
                  queryClient.invalidateQueries({
                    queryKey: getApiV1ArchiveItemsMyQueryKey(),
                  });

                  navigate({
                    to: "/scenarios/$scenarioId",
                    params: { scenarioId: data.data.id },
                  });
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

  usePrefetchScenarioSettingsSubformsData();

  return {
    form,
    currentStep,
    isCreateScenarioPending,
    isUpdateScenarioPending,
    onFormSubmit,
  };
}
