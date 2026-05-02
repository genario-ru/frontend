import { useGetApiV1ScenariosByScenarioIdMetadata } from "@/codegen/api/product";
import { checkIsGenerationStatus } from "@/shared/utils/check-is-generation-status";

const REFRESH_INTERVAL = 3000;

type UseGetScenarioMetadataParams = {
  scenarioId: string | undefined;
};

export function useGetScenarioMetadata({
  scenarioId,
}: UseGetScenarioMetadataParams) {
  const {
    data: scenarioMetadataData,
    isLoading: isScenarioMetadataLoading,
    isError: isScenarioMetadataError,
  } = useGetApiV1ScenariosByScenarioIdMetadata(
    { scenarioId: scenarioId as string },
    {
      query: {
        enabled: Boolean(scenarioId),
        refetchInterval: (query) => {
          if (checkIsGenerationStatus(query.state.data?.data.status)) {
            return REFRESH_INTERVAL;
          }

          return false;
        },
      },
    },
  );

  return {
    scenarioMetadataData,
    isScenarioMetadataLoading,
    isScenarioMetadataError,
  };
}
