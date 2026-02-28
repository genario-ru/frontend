import { useGetApiV1ScenariosScenarioId } from "@/codegen/api/product";

type UseGetScenarioParams = {
  scenarioId: string | undefined;
};

export function useGetScenario({ scenarioId }: UseGetScenarioParams) {
  const {
    data: scenarioData,
    isLoading: isScenarioLoading,
    isError: isScenarioError,
  } = useGetApiV1ScenariosScenarioId(
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
