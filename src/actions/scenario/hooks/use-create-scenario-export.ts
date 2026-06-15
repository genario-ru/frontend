import { usePostApiV1ScenariosByScenarioIdExport } from "@/codegen/api/product";
import { useReachGoal } from "@/lib/yandex-metrika";

export function useCreateScenarioExport() {
  const reachGoal = useReachGoal();

  const {
    mutate: createScenarioExport,
    isPending: isCreateScenarioExportPending,
  } = usePostApiV1ScenariosByScenarioIdExport({
    mutation: {
      onSuccess: () => reachGoal("scenario-export-request"),
    },
  });

  return {
    createScenarioExport,
    isCreateScenarioExportPending,
  };
}
