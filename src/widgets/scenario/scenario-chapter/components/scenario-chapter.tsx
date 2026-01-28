import { useScenarioChapters } from "@/actions/scenario/hooks/use-scenario-chapters";
import {
  ScenarioChapterHeader,
  ScenarioChapterHeaderSkeleton,
} from "@/features/scenario/scenario-chapter/scenario-chapter-header/components/scenario-chapter-header";
import {
  ErrorPlug,
  ErrorPlugDescription,
  ErrorPlugIcon,
  ErrorPlugTitle,
} from "@/shared/components/ui/error-plug";
import { Island } from "@/shared/components/ui/island";

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
    return <ScenarioChapterErrorPlug />;
  }

  if (!activeScenarioChapter) {
    return null;
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

export function ScenarioChapterErrorPlug() {
  return (
    <Island noPadding>
      <ErrorPlug className="h-[40dvh]">
        <ErrorPlugIcon />
        <ErrorPlugTitle>Ошибка</ErrorPlugTitle>
        <ErrorPlugDescription>
          Произошла ошибка при загрузке сценария
        </ErrorPlugDescription>
      </ErrorPlug>
    </Island>
  );
}
