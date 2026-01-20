import { useMemo } from "react";

import { useGetScenario } from "@/actions/scenario/hooks/use-get-scenario";

import { ScenarioChapterHeader } from "./scenario-chapter-header";

type ScenarioChapterProps = {
  scenarioId: string;
};

export function ScenarioChapter({ scenarioId }: ScenarioChapterProps) {
  const { scenarioData, isScenarioLoading, isScenarioError } = useGetScenario({
    scenarioId,
  });

  const body = useMemo(() => {
    if (isScenarioLoading) {
      return <div>Loading...</div>;
    }

    if (isScenarioError) {
      return <div>Error</div>;
    }

    if (!scenarioData?.data.currentVersionId) {
      return <div>No scenario</div>;
    }

    return (
      <>
        <ScenarioChapterHeader
          scenarioId={scenarioId}
          scenarioVersionId={scenarioData.data.currentVersionId}
        />
      </>
    );
  }, [scenarioId, scenarioData, isScenarioLoading, isScenarioError]);

  return <div className="col-span-3 flex h-full w-full flex-col">{body}</div>;
}
