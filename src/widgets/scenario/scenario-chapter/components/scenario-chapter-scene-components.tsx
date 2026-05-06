import type { GetApiV1ScenariosChaptersByChapterIdQueryResponse } from "@/codegen/api/product";
import { ScenarioChapterSceneComponentSkeleton } from "@/features/scenario/scenario-chapter/scenario-chapter-scene/components/scenario-chapter-scene-component";
import { ItemsList } from "@/shared/components/common/items-list";
import { cn } from "@/shared/utils/cn";

import { ScenarioChapterSceneComponentCard } from "./scenario-chapter-scene-component-card";

type ScenarioChapterSceneComponentsProps = {
  chapterId: string;
  videoTypeSlug: string;
  scene: GetApiV1ScenariosChaptersByChapterIdQueryResponse["data"]["scenes"][number];
};

type ScenarioChapterSceneComponentsSkeletonProps = {
  videoTypeSlug: string;
};

export function ScenarioChapterSceneComponents({
  chapterId,
  videoTypeSlug,
  scene,
}: ScenarioChapterSceneComponentsProps) {
  return (
    <div
      className={cn("grid flex-1 gap-2", {
        "col-span-1 lg:col-span-6 lg:grid-cols-2": videoTypeSlug === "short",
        "col-span-1": videoTypeSlug === "long",
      })}
    >
      {scene.components.map((component) => (
        <ScenarioChapterSceneComponentCard
          key={component.id}
          componentId={component.id}
          chapterId={chapterId}
          name={component.name}
          content={component.content}
          icon={component.type.icon}
          color={component.type.color}
        />
      ))}
    </div>
  );
}

export function ScenarioChapterSceneComponentsSkeleton({
  videoTypeSlug,
}: ScenarioChapterSceneComponentsSkeletonProps) {
  return (
    <ItemsList
      count={videoTypeSlug === "long" ? 3 : 4}
      item={<ScenarioChapterSceneComponentSkeleton />}
      className={cn("grid flex-1 gap-2", {
        "col-span-6 grid-cols-2": videoTypeSlug === "short",
        "col-span-1": videoTypeSlug === "long",
      })}
    />
  );
}
