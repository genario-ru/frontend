import { usePostApiV1ScenariosVersionsByVersionIdExport } from "@/codegen/api/product";

export function useCreateScenarioVersionExport() {
  const {
    mutate: createScenarioVersionExport,
    isPending: isCreateScenarioVersionExportPending,
  } = usePostApiV1ScenariosVersionsByVersionIdExport();

  return {
    createScenarioVersionExport,
    isCreateScenarioVersionExportPending,
  };
}
