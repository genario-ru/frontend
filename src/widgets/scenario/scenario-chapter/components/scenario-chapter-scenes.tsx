import { useScenarioScenes } from "@/actions/scenario/hooks/use-scenario-scenes";
import {
  ScenarioChapterSceneHeader,
  ScenarioChapterSceneHeaderSkeleton,
} from "@/features/scenario/scenario-chapter/scenario-chapter-scene/components/scenario-chapter-scene-header";
import { GenerationAlert } from "@/shared/components/common/generation-alert";
import { ItemsList } from "@/shared/components/common/items-list";
import { EmptyPlug } from "@/shared/components/ui/empty-plug";
import { ErrorPlug } from "@/shared/components/ui/error-plug";
import { Island } from "@/shared/components/ui/island";
import { cn } from "@/shared/utils/cn";

import {
  ScenarioChapterSceneComponents,
  ScenarioChapterSceneComponentsSkeleton,
} from "./scenario-chapter-scene-components";
import {
  ScenarioChapterScenePreview,
  ScenarioChapterScenePreviewSkeleton,
} from "./scenario-chapter-scene-preview";

type ScenarioChapterScenesProps = {
  chapterId: string;
  scenarioId: string;
  chapterPosition: number;
  videoTypeSlug: string;
};

type ScenarioChapterScenesSkeletonProps = {
  videoTypeSlug: string;
};

export function ScenarioChapterScenes({
  chapterId,
  scenarioId,
  chapterPosition,
  videoTypeSlug,
}: ScenarioChapterScenesProps) {
  const {
    scenarioChapterScenesList,
    isScenarioChapterGenerating,
    isScenarioChapterGenerationFailed,
    isScenarioChapterLoading,
    isScenarioChapterError,
  } = useScenarioScenes({ scenarioId, chapterId });

  if (isScenarioChapterGenerating) {
    return <ScenarioChapterScenesGeneratingAlert />;
  }

  if (isScenarioChapterLoading) {
    return <ScenarioChapterScenesSkeleton videoTypeSlug={videoTypeSlug} />;
  }

  if (isScenarioChapterError || isScenarioChapterGenerationFailed) {
    return <ScenarioChapterScenesErrorPlug />;
  }

  if (!scenarioChapterScenesList?.length) {
    return <ScenarioChapterScenesEmptyPlug />;
  }

  return (
    <Island roundedTop={false} className="gap-8 py-8">
      {scenarioChapterScenesList.map((scene, index) => (
        <section key={scene.id} className="flex flex-col gap-4">
          <ScenarioChapterSceneHeader
            key={scene.id}
            chapterPosition={chapterPosition}
            position={index + 1}
            name={scene.name}
            startTime={scene.startTime}
            endTime={scene.endTime}
          />
          <div
            className={cn("grid w-full gap-4", {
              "grid-cols-8": videoTypeSlug === "short",
              "grid-cols-2": videoTypeSlug === "long",
            })}
          >
            <ScenarioChapterScenePreview
              chapterId={chapterId}
              sceneId={scene.id}
              videoTypeSlug={videoTypeSlug}
              scene={scene}
            />
            <ScenarioChapterSceneComponents
              videoTypeSlug={videoTypeSlug}
              scene={scene}
            />
          </div>
        </section>
      ))}
    </Island>
  );
}

export function ScenarioChapterScenesGeneratingAlert() {
  return (
    <Island roundedTop={false} className="flex-1">
      <GenerationAlert
        title="Генерируем сцены"
        description="Генерируем для вас сцены, подождите несколько секунд"
        className="border-neutral-3 flex-1 border"
        hasGradient={false}
      />
    </Island>
  );
}

export function ScenarioChapterScenesSkeleton({
  videoTypeSlug,
}: ScenarioChapterScenesSkeletonProps) {
  return (
    <Island roundedTop={false} className="gap-8 py-8">
      <ItemsList
        noParent
        count={2}
        item={
          <section className="flex flex-col gap-4">
            <ScenarioChapterSceneHeaderSkeleton />
            <div
              className={cn("grid w-full gap-4", {
                "grid-cols-8": videoTypeSlug === "short",
                "grid-cols-2": videoTypeSlug === "long",
              })}
            >
              <ScenarioChapterScenePreviewSkeleton
                videoTypeSlug={videoTypeSlug}
              />
              <ScenarioChapterSceneComponentsSkeleton
                videoTypeSlug={videoTypeSlug}
              />
            </div>
          </section>
        }
      />
    </Island>
  );
}

export function ScenarioChapterScenesErrorPlug() {
  return (
    <Island roundedTop={false} className="flex-1">
      <ErrorPlug
        variant="outlined"
        className="flex-1"
        title="Ошибка"
        description="Произошла ошибка при загрузке сцен"
      />
    </Island>
  );
}

export function ScenarioChapterScenesEmptyPlug() {
  return (
    <Island roundedTop={false} className="flex-1">
      <EmptyPlug
        variant="outlined"
        title="Нет сцен"
        description="В данном разделе пока нет сцен."
        className="flex-1"
      />
    </Island>
  );
}
