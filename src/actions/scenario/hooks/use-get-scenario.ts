import { useQuery } from "@tanstack/react-query";

import { getApiV1ScenariosScenarioIdOptions } from "@/codegen/api/product/@tanstack/react-query.gen";

type UseGetScenarioParams = {
  scenarioId: string | undefined;
};

export function useGetScenario({ scenarioId }: UseGetScenarioParams) {
  const {
    data: scenarioData,
    isLoading: isScenarioLoading,
    isError: isScenarioError,
  } = useQuery({
    ...getApiV1ScenariosScenarioIdOptions({
      path: { scenarioId: scenarioId as string },
    }),
    enabled: Boolean(scenarioId),
  });

  return {
    scenarioData,
    isScenarioLoading,
    isScenarioError,
  };
}
