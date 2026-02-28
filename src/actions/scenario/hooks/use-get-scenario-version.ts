import { useGetApiV1ScenariosVersionsVersionId } from "@/codegen/api/product";

type UseGetScenarioVersionParams = {
  scenarioVersionId?: string | null;
};

export function useGetScenarioVersion({
  scenarioVersionId,
}: UseGetScenarioVersionParams) {
  const {
    data: scenarioVersionData,
    isLoading: isScenarioVersionLoading,
    isError: isScenarioVersionError,
  } = useGetApiV1ScenariosVersionsVersionId(
    {
      versionId: scenarioVersionId as string,
    },
    {
      query: {
        enabled: Boolean(scenarioVersionId),
      },
    },
  );

  return {
    scenarioVersionData,
    isScenarioVersionLoading,
    isScenarioVersionError,
  };
}
