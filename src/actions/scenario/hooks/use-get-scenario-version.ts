import { useQuery } from "@tanstack/react-query";

import { getApiV1ScenariosVersionsVersionIdOptions } from "@/codegen/api/product/@tanstack/react-query.gen";

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
  } = useQuery({
    ...getApiV1ScenariosVersionsVersionIdOptions({
      path: {
        versionId: scenarioVersionId as string,
      },
    }),
    enabled: Boolean(scenarioVersionId),
  });

  return {
    scenarioVersionData,
    isScenarioVersionLoading,
    isScenarioVersionError,
  };
}
