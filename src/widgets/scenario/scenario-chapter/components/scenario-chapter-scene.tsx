import type { ScenarioSceneExtendedSchema } from "@/codegen/api/product";
import {
  ScenarioChapterSceneHeader,
  ScenarioChapterSceneHeaderSkeleton,
} from "@/features/scenario/scenario-chapter/scenario-chapter-scene/components/scenario-chapter-scene-header";
import { cn } from "@/shared/utils/cn";

import { useScenarioChapterScene } from "../hooks/use-scenario-chapter-scene";
import {
  ScenarioChapterSceneComponents,
  ScenarioChapterSceneComponentsSkeleton,
} from "./scenario-chapter-scene-components";
import {
  ScenarioChapterScenePreview,
  ScenarioChapterScenePreviewSkeleton,
} from "./scenario-chapter-scene-preview";

type ScenarioChapterSceneProps = {
  chapterId: string;
  videoTypeSlug: string;
  chapterPosition: number;
  position: number;
  scene: ScenarioSceneExtendedSchema;
  handleIntersectingSceneIdChange: (sceneId: string) => void;
};

type ScenarioChapterSceneSkeletonProps = {
  videoTypeSlug: string;
};

export function ScenarioChapterScene({
  chapterId,
  videoTypeSlug,
  chapterPosition,
  position,
  scene,
  handleIntersectingSceneIdChange,
}: ScenarioChapterSceneProps) {
  const { sceneRef } = useScenarioChapterScene({
    sceneId: scene.id,
    handleIntersectingSceneIdChange,
  });

  return (
    <section
      id={`scenario-chapter-scene-${scene.id}`}
      ref={sceneRef}
      className="flex flex-col gap-4"
    >
      <ScenarioChapterSceneHeader
        key={scene.id}
        chapterPosition={chapterPosition}
        position={position}
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
  );
}

export function ScenarioChapterSceneSkeleton({
  videoTypeSlug,
}: ScenarioChapterSceneSkeletonProps) {
  return (
    <section className="flex flex-col gap-4">
      <ScenarioChapterSceneHeaderSkeleton />
      <div
        className={cn("grid w-full gap-4", {
          "grid-cols-8": videoTypeSlug === "short",
          "grid-cols-2": videoTypeSlug === "long",
        })}
      >
        <ScenarioChapterScenePreviewSkeleton videoTypeSlug={videoTypeSlug} />
        <ScenarioChapterSceneComponentsSkeleton videoTypeSlug={videoTypeSlug} />
      </div>
    </section>
  );
}
