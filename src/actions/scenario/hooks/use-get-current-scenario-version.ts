import { useGetApiV1ScenariosByScenarioIdCurrentVersion } from "@/codegen/api/product";
import { checkIsGenerationStatus } from "@/shared/utils/check-is-generation-status";

const REFRESH_INTERVAL = 3000;

type UseGetCurrentScenarioVersionParams = {
  scenarioId?: string | null;
  versionId?: string;
};

export function useGetCurrentScenarioVersion({
  scenarioId,
  versionId,
}: UseGetCurrentScenarioVersionParams) {
  const {
    data: scenarioCurrentVersionData,
    isLoading: isScenarioCurrentVersionLoading,
    isError: isScenarioCurrentVersionError,
  } = useGetApiV1ScenariosByScenarioIdCurrentVersion(
    {
      scenarioId: scenarioId as string,
      params: { versionId },
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
