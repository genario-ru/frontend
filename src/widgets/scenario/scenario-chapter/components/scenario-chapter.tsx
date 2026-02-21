import { useScenarioChapters } from "@/actions/scenario/hooks/use-scenario-chapters";
import {
  ScenarioChapterHeader,
  ScenarioChapterHeaderSkeleton,
} from "@/features/scenario/scenario-chapter/scenario-chapter-header/components/scenario-chapter-header";
import { GenerationAlert } from "@/shared/components/common/generation-alert";
import {
  EmptyPlugDescription,
  EmptyPlugIcon,
  EmptyPlugTitle,
} from "@/shared/components/ui/empty-plug";
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
    activeScenarioChapterPosition,
    isScenarioChaptersGenerating,
    isScenarioChaptersLoading,
    isScenarioChaptersError,
  } = useScenarioChapters({ scenarioId });

  if (isScenarioChaptersGenerating) {
    return null;
  }

  if (isScenarioChaptersLoading) {
    return <ScenarioChapterSkeleton />;
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
      />
      <ScenarioChapterScenes
        chapterId={activeScenarioChapter.id}
        scenarioId={scenarioId}
        chapterPosition={activeScenarioChapterPosition}
        videoTypeSlug={scenarioVideoType?.slug}
      />
    </div>
  );
}

export function ScenarioChapterGeneratingAlert() {
  return (
    <GenerationAlert
      title="Генерируем сценарий"
      description="Генерируем для вас сценарий, подождите несколько секунд..."
      className="flex-1"
    />
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
    <Island noPadding className="flex-1">
      <ErrorPlug className="flex-1">
        <ErrorPlugIcon />
        <ErrorPlugTitle>Ошибка</ErrorPlugTitle>
        <ErrorPlugDescription>
          Произошла ошибка при загрузке сценария
        </ErrorPlugDescription>
      </ErrorPlug>
    </Island>
  );
}

export function ScenarioChapterEmptyPlug() {
  return (
    <Island noPadding className="flex-1">
      <ErrorPlug className="flex-1">
        <EmptyPlugIcon />
        <EmptyPlugTitle>Нет разделов</EmptyPlugTitle>
        <EmptyPlugDescription>
          В сценарии пока нет разделов
        </EmptyPlugDescription>
      </ErrorPlug>
    </Island>
  );
}
