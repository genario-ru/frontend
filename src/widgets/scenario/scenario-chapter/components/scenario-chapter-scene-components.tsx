import type { GetApiV1ScenariosChaptersChapterIdResponse } from "@/codegen/api/product/types.gen";
import {
  ScenarioChapterSceneComponent,
  ScenarioChapterSceneComponentSkeleton,
} from "@/features/scenario/scenario-chapter/scenario-chapter-scene/components/scenario-chapter-scene-component";
import {
  ScenarioChapterScenePreview,
  ScenarioChapterScenePreviewSkeleton,
} from "@/features/scenario/scenario-chapter/scenario-chapter-scene/components/scenario-chapter-scene-preview";
import { ItemsList } from "@/shared/components/common/items-list";
import { cn } from "@/shared/utils/cn";

type ScenarioChapterSceneComponentsProps = {
  videoTypeSlug?: string;
  components: GetApiV1ScenariosChaptersChapterIdResponse["data"]["scenes"][number]["components"];
};

export function ScenarioChapterSceneComponents({
  videoTypeSlug,
  components,
}: ScenarioChapterSceneComponentsProps) {
  return (
    <div
      className={cn("grid w-full gap-4", {
        "grid-cols-8": videoTypeSlug === "short",
        "grid-cols-2": videoTypeSlug === "long",
      })}
    >
      <div
        className={cn("flex h-full flex-col", {
          "col-span-2": videoTypeSlug === "short",
          "col-span-1": videoTypeSlug === "long",
        })}
      >
        <ScenarioChapterScenePreview
          videoTypeSlug={videoTypeSlug}
          previewUrl={undefined}
          className="sticky top-[200px]"
        />
      </div>
      <div
        className={cn("grid flex-1 gap-4", {
          "col-span-6 grid-cols-2": videoTypeSlug === "short",
          "col-span-1": videoTypeSlug === "long",
        })}
      >
        {components.map((component) => (
          <ScenarioChapterSceneComponent
            key={component.id}
            name={component.name}
            content={component.content}
            icon={component.type.icon}
            color={component.type.color}
          />
        ))}
      </div>
    </div>
  );
}

export function ScenarioChapterSceneComponentsSkeleton() {
  return (
    <div className="grid w-full grid-cols-8 gap-4">
      <div className="col-span-2 flex h-full flex-col">
        <ScenarioChapterScenePreviewSkeleton className="sticky top-[200px]" />
      </div>
      <div className="col-span-6 grid flex-1 grid-cols-2 gap-4">
        <ItemsList
          noParent
          count={5}
          item={<ScenarioChapterSceneComponentSkeleton />}
        />
      </div>
    </div>
  );
}
