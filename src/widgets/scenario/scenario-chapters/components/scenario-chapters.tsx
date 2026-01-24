import { useMemo } from "react";

import { useScenarioChapters } from "@/actions/scenario/hooks/use-scenario-chapters";
import { ScenarioChapterHeader } from "@/features/scenario/scenario-chapters/components/scenario-chapter-header";
import { Island } from "@/shared/components/ui/island";

type ScenarioChaptersProps = {
  scenarioId: string;
};

export function ScenarioChapters({ scenarioId }: ScenarioChaptersProps) {
  const {
    scenarioChaptersList,
    isScenarioChaptersLoading,
    isScenarioChaptersError,
  } = useScenarioChapters({ scenarioId });

  const body = useMemo(() => {
    if (isScenarioChaptersLoading) {
      return <div>Loading...</div>;
    }

    if (isScenarioChaptersError) {
      return <div>Error</div>;
    }

    if (!scenarioChaptersList?.length) {
      return <div>No chapters</div>;
    }

    return (
      <>
        {scenarioChaptersList.map((chapter) => (
          <Island key={chapter.id} className="col-span-3">
            <ScenarioChapterHeader
              name={chapter.name}
              description={chapter.description}
              startTime={chapter.startTime}
              endTime={chapter.endTime}
            />
          </Island>
        ))}
      </>
    );
  }, [
    scenarioChaptersList,
    isScenarioChaptersLoading,
    isScenarioChaptersError,
  ]);

  return <div className="col-span-3 flex w-full flex-col gap-6">{body}</div>;
}
