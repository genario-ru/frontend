import { useScenarioChapters } from "@/actions/scenario/hooks/use-scenario-chapters";
import {
  ScenarioChapterHeader,
  ScenarioChapterHeaderSkeleton,
} from "@/features/scenario/scenario-chapter/scenario-chapter-header/components/scenario-chapter-header";

import {
  ScenarioChapterScenes,
  ScenarioChapterScenesSkeleton,
} from "./scenario-chapter-scenes";

type ScenarioChapterProps = {
  scenarioId: string;
};

export function ScenarioChapter({ scenarioId }: ScenarioChapterProps) {
  const {
    scenarioVideoType,
    activeScenarioChapter,
    isScenarioChaptersLoading,
    isScenarioChaptersError,
  } = useScenarioChapters({ scenarioId });

  if (isScenarioChaptersLoading) {
    return <ScenarioChapterSkeleton />;
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
        videoTypeSlug={scenarioVideoType?.slug}
      />
    </div>
  );
}

export function ScenarioChapterSkeleton() {
  return (
    <div className="flex flex-col">
      <ScenarioChapterHeaderSkeleton />
      <ScenarioChapterScenesSkeleton />
    </div>
  );
}
