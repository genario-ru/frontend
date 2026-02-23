import type { GetApiV1ScenariosChaptersChapterIdResponse } from "@/codegen/api/product/types.gen";
import {
  ScenarioChapterSceneComponent,
  ScenarioChapterSceneComponentSkeleton,
} from "@/features/scenario/scenario-chapter/scenario-chapter-scene/components/scenario-chapter-scene-component";
import { GenerationAlert } from "@/shared/components/common/generation-alert";
import { ItemsList } from "@/shared/components/common/items-list";
import { checkIsGenerationStatus } from "@/shared/utils/check-is-generation-status";
import { cn } from "@/shared/utils/cn";

type ScenarioChapterSceneComponentsProps = {
  videoTypeSlug: string;
  scene: GetApiV1ScenariosChaptersChapterIdResponse["data"]["scenes"][number];
};

type ScenarioChapterSceneComponentsGenerationAlertProps = {
  videoTypeSlug: string;
};

type ScenarioChapterSceneComponentsSkeletonProps = {
  videoTypeSlug: string;
};

export function ScenarioChapterSceneComponents({
  videoTypeSlug,
  scene,
}: ScenarioChapterSceneComponentsProps) {
  if (!checkIsGenerationStatus(scene.status)) {
    return (
      <ScenarioChapterSceneComponentsGeneratingAlert
        videoTypeSlug={videoTypeSlug}
      />
    );
  }

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

export function ScenarioChapterSceneComponentsGeneratingAlert({
  videoTypeSlug,
}: ScenarioChapterSceneComponentsGenerationAlertProps) {
  return (
    <GenerationAlert
      title="Генерируем компоненты сцены"
      description="Генерируем для вас компоненты сцены, подождите несколько секунд"
      hasGradient={false}
      className={cn("border-neutral-3 flex-1 border", {
        "col-span-6 grid-cols-2": videoTypeSlug === "short",
        "col-span-1": videoTypeSlug === "long",
      })}
    />
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
