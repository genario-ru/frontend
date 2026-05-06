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
          const scenarioMetadata = query.state.data?.data;

          const isGenerating = checkIsGenerationStatus(
            scenarioMetadata?.status,
          );

          const hasGeneratingItems = scenarioMetadata?.items.some((item) =>
            checkIsGenerationStatus(item.status),
          );

          if (isGenerating || hasGeneratingItems) {
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
