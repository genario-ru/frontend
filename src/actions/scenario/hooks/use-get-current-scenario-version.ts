import { useQuery } from "@tanstack/react-query";

import { getApiV1ScenariosScenarioIdCurrentVersionOptions } from "@/codegen/api/product/@tanstack/react-query.gen";

type UseGetCurrentScenarioVersionParams = {
  scenarioId?: string | null;
};

export function useGetCurrentScenarioVersion({
  scenarioId,
}: UseGetCurrentScenarioVersionParams) {
  const {
    data: scenarioCurrentVersionData,
    isLoading: isScenarioCurrentVersionLoading,
    isError: isScenarioCurrentVersionError,
  } = useQuery({
    ...getApiV1ScenariosScenarioIdCurrentVersionOptions({
      path: {
        scenarioId: scenarioId as string,
      },
    }),
    enabled: Boolean(scenarioId),
  });

  return {
    scenarioCurrentVersionData,
    isScenarioCurrentVersionLoading,
    isScenarioCurrentVersionError,
  };
}
