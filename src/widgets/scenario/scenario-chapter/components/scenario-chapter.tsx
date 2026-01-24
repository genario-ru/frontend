import { useScenarioChapters } from "@/actions/scenario/hooks/use-scenario-chapters";
import { ScenarioChapterHeader } from "@/features/scenario/scenario-chapter/components/scenario-chapter-header";

import { ScenarioChapterScenes } from "./scenario-chapter-scenes";

type ScenarioChapterProps = {
  scenarioId: string;
};

export function ScenarioChapter({ scenarioId }: ScenarioChapterProps) {
  const {
    activeScenarioChapter,
    isScenarioChaptersLoading,
    isScenarioChaptersError,
  } = useScenarioChapters({ scenarioId });

  if (isScenarioChaptersLoading) {
    return <div>Loading...</div>;
  }

  if (isScenarioChaptersError) {
    return <div>Error</div>;
  }

  if (!activeScenarioChapter) {
    return <div>No chapter</div>;
  }

  return (
    <div className="flex flex-col">
      <ScenarioChapterHeader
        name={activeScenarioChapter.name}
        description={activeScenarioChapter.description}
        startTime={activeScenarioChapter.startTime}
        endTime={activeScenarioChapter.endTime}
      />
      <ScenarioChapterScenes
        scenarioId={scenarioId}
        chapterId={activeScenarioChapter.id}
      />
    </div>
  );
}
