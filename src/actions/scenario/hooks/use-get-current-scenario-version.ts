import { useQuery } from "@tanstack/react-query";

import { getApiV1ScenariosScenarioIdCurrentVersionOptions } from "@/codegen/api/product/@tanstack/react-query.gen";
import { checkIsGenerationStatus } from "@/shared/utils/check-is-generation-status";

const REFRESH_INTERVAL = 3000;

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
    refetchInterval: (query) => {
      if (checkIsGenerationStatus(query.state.data?.data.status)) {
        return REFRESH_INTERVAL;
      }

      return false;
    },
    enabled: Boolean(scenarioId),
  });

  return {
    scenarioCurrentVersionData,
    isScenarioCurrentVersionLoading,
    isScenarioCurrentVersionError,
  };
}
