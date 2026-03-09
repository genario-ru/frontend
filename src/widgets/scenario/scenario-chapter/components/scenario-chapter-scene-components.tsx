import type { GetApiV1ScenariosChaptersByChapterIdQueryResponse } from "@/codegen/api/product";
import {
  ScenarioChapterSceneComponent,
  ScenarioChapterSceneComponentSkeleton,
} from "@/features/scenario/scenario-chapter/scenario-chapter-scene/components/scenario-chapter-scene-component";
import { ItemsList } from "@/shared/components/common/items-list";
import { cn } from "@/shared/utils/cn";

type ScenarioChapterSceneComponentsProps = {
  videoTypeSlug: string;
  scene: GetApiV1ScenariosChaptersByChapterIdQueryResponse["data"]["scenes"][number];
};

type ScenarioChapterSceneComponentsSkeletonProps = {
  videoTypeSlug: string;
};

export function ScenarioChapterSceneComponents({
  videoTypeSlug,
  scene,
}: ScenarioChapterSceneComponentsProps) {
  return (
    <div
      className={cn("grid flex-1 gap-4", {
        "col-span-6 grid-cols-2": videoTypeSlug === "short",
        "col-span-1": videoTypeSlug === "long",
      })}
    >
      {scene.components.map((component) => (
        <ScenarioChapterSceneComponent
          key={component.id}
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
      className={cn("grid flex-1 gap-4", {
        "col-span-6 grid-cols-2": videoTypeSlug === "short",
        "col-span-1": videoTypeSlug === "long",
      })}
    />
  );
}
