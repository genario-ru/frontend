import { useGetApiV1ScenariosByScenarioIdVersions } from "@/codegen/api/product";

type UseGetScenarioVersionsParams = {
  scenarioId: string;
};

export function useGetScenarioVersions({
  scenarioId,
}: UseGetScenarioVersionsParams) {
  const {
    data: scenarioVersionsData,
    isLoading: isScenarioVersionsLoading,
    isError: isScenarioVersionsError,
  } = useGetApiV1ScenariosByScenarioIdVersions({
    scenarioId,
  });

  return {
    scenarioVersionsData,
    isScenarioVersionsLoading,
    isScenarioVersionsError,
  };
}
