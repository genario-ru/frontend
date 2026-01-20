import { useMemo, useRef } from "react";

import { useGetScenario } from "@/actions/scenario/hooks/use-get-scenario";
import { Island } from "@/shared/components/ui/island";

import { ScenarioChapterHeader } from "./scenario-chapter-header";
import { ScenarioChapterScenes } from "./scenario-chapter-scenes";

type ScenarioChapterProps = {
  scenarioId: string;
};

export function ScenarioChapter({ scenarioId }: ScenarioChapterProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

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
          containerRef={containerRef}
          scenarioId={scenarioId}
          scenarioVersionId={scenarioData.data.currentVersionId}
        />
        <ScenarioChapterScenes />
      </>
    );
  }, [
    scenarioId,
    containerRef,
    scenarioData,
    isScenarioLoading,
    isScenarioError,
  ]);

  return (
    <Island className="col-span-3 flex h-full w-full flex-col overflow-hidden rounded-2xl p-0">
      <div ref={containerRef} className="h-full overflow-auto">
        {body}
      </div>
    </Island>
  );
}
