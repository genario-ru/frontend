import { useGetApiV1ScenariosVersionsByVersionIdExports } from "@/codegen/api/product";

type UseGetScenarioVersionExportsProps = {
  scenarioVersionId: string;
  refetchInterval?: number;
};

export function useGetScenarioVersionExports({
  scenarioVersionId,
  refetchInterval,
}: UseGetScenarioVersionExportsProps) {
  const {
    data: scenarioVersionExportsData,
    isLoading: isGetScenarioVersionExportsLoading,
  } = useGetApiV1ScenariosVersionsByVersionIdExports(
    { versionId: scenarioVersionId },
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
