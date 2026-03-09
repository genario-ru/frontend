import { useGetApiV1ScenariosByScenarioId } from "@/codegen/api/product";

type UseGetScenarioParams = {
  scenarioId: string | undefined;
};

export function useGetScenario({ scenarioId }: UseGetScenarioParams) {
  const {
    data: scenarioData,
    isLoading: isScenarioLoading,
    isError: isScenarioError,
  } = useGetApiV1ScenariosByScenarioId(
    {
      scenarioId: scenarioId as string,
    },
    {
      query: {
        enabled: Boolean(scenarioId),
      },
    },
  );

  return {
    scenarioData,
    isScenarioLoading,
    isScenarioError,
  };
}
