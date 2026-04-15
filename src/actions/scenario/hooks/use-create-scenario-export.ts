import { usePostApiV1ScenariosByScenarioIdExport } from "@/codegen/api/product";

export function useCreateScenarioExport() {
  const {
    mutate: createScenarioExport,
    isPending: isCreateScenarioExportPending,
  } = usePostApiV1ScenariosByScenarioIdExport();

  return {
    createScenarioExport,
    isCreateScenarioExportPending,
  };
}
