import { useGetApiV1ScenariosScenarioIdCurrentVersion } from "@/codegen/api/product";
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
  } = useGetApiV1ScenariosScenarioIdCurrentVersion(
    {
      scenarioId: scenarioId as string,
    },
    {
      query: {
        refetchInterval: (query) => {
          if (checkIsGenerationStatus(query.state.data?.data.status)) {
            return REFRESH_INTERVAL;
          }

          return false;
        },
        enabled: Boolean(scenarioId),
      },
    },
  );

  return {
    scenarioCurrentVersionData,
    isScenarioCurrentVersionLoading,
    isScenarioCurrentVersionError,
  };
}
