import { ScenarioChapterSceneComponent } from "@/features/scenario/scenario-chapter/scenario-chapter-scene/components/scenario-chapter-scene-component";
import { ScenarioChapterScenePreview } from "@/features/scenario/scenario-chapter/scenario-chapter-scene/components/scenario-chapter-scene-preview";
import { cn } from "@/shared/utils/cn";

type ScenarioChapterSceneComponentsProps = {
  videoTypeSlug?: string;
  components: {
    id: string;
    name: string;
    content?: string | null;
    icon?: string | null;
    color?: string | null;
  }[];
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
            icon={component.icon}
            color={component.color}
          />
        ))}
      </div>
    </div>
  );
}
