import { useGetApiV1ScenariosByScenarioIdExports } from "@/codegen/api/product";

type UseGetScenarioExportsProps = {
  scenarioId: string;
  versionId?: string;
  refetchInterval?: number;
};

export function useGetScenarioExports({
  scenarioId,
  versionId,
  refetchInterval,
}: UseGetScenarioExportsProps) {
  const {
    data: scenarioVersionExportsData,
    isLoading: isGetScenarioVersionExportsLoading,
  } = useGetApiV1ScenariosByScenarioIdExports(
    { scenarioId, params: { versionId } },
    {
      query: {
        refetchInterval,
      },
    },
  );

  return {
    scenarioVersionExportsData,
    isGetScenarioVersionExportsLoading,
  };
}
