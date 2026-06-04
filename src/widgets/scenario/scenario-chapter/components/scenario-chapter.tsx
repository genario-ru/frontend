import { useScenarioChapters } from "@/actions/scenario/hooks/use-scenario-chapters";
import {
  ScenarioChapterHeader,
  ScenarioChapterHeaderSkeleton,
} from "@/features/scenario/scenario-chapter/scenario-chapter-header/components/scenario-chapter-header";
import { GenerationAlert } from "@/shared/components/common/generation-alert";
import { Island } from "@/shared/components/ui/island";
import { Plug } from "@/shared/components/ui/plug";

import {
  ScenarioChapterScenes,
  ScenarioChapterScenesSkeleton,
} from "./scenario-chapter-scenes";
import { ScenarioChapterStatus } from "./scenario-chapter-status";

type ScenarioChapterProps = {
  scenarioId: string;
};

type ScenarioChapterSkeletonProps = {
  videoTypeSlug: string;
};

export function ScenarioChapter({ scenarioId }: ScenarioChapterProps) {
  const {
    scenarioVideoType,
    activeScenarioChapter,
    activeScenarioChapterPosition,
    isScenarioChaptersGenerating,
    isScenarioChaptersLoading,
    isScenarioChaptersError,
  } = useScenarioChapters({ scenarioId });

  if (isScenarioChaptersGenerating) {
    return null;
  }

  if (isScenarioChaptersLoading) {
    return (
      <ScenarioChapterSkeleton
        videoTypeSlug={scenarioVideoType?.slug ?? "long"}
      />
    );
  }

  if (isScenarioChaptersError) {
    return <ScenarioChapterErrorPlug />;
  }

  if (!activeScenarioChapter || !activeScenarioChapterPosition) {
    return <ScenarioChapterEmptyPlug />;
  }

  return (
    <div className="flex flex-1 flex-col">
      <ScenarioChapterHeader
        position={activeScenarioChapterPosition}
        name={activeScenarioChapter.name}
        description={activeScenarioChapter.description}
        startTime={activeScenarioChapter.startTime}
        endTime={activeScenarioChapter.endTime}
        status={<ScenarioChapterStatus chapterId={activeScenarioChapter.id} />}
      />
      <ScenarioChapterScenes
        chapterId={activeScenarioChapter.id}
        scenarioId={scenarioId}
        chapterPosition={activeScenarioChapterPosition}
        videoTypeSlug={scenarioVideoType?.slug ?? "long"}
      />
    </div>
  );
}

export function ScenarioChapterGeneratingAlert() {
  return (
    <GenerationAlert
      title="Генерируем сценарий"
      description="Генерируем для вас сценарий, подождите несколько секунд"
      className="flex-1 rounded-b-none"
    />
  );
}

export function ScenarioChapterSkeleton({
  videoTypeSlug,
}: ScenarioChapterSkeletonProps) {
  return (
    <div className="flex flex-col">
      <ScenarioChapterHeaderSkeleton />
      <ScenarioChapterScenesSkeleton videoTypeSlug={videoTypeSlug} />
    </div>
  );
}

export function ScenarioChapterErrorPlug() {
  return (
    <Island noPadding className="flex-1">
      <Plug
        variant="negative"
        className="flex-1"
        title="Ошибка"
        description="Произошла ошибка при загрузке сценария"
      />
    </Island>
  );
}

export function ScenarioChapterEmptyPlug() {
  return (
    <Island noPadding className="flex-1">
      <Plug
        className="flex-1"
        title="Нет разделов"
        description="В сценарии пока нет разделов"
      />
    </Island>
  );
}
