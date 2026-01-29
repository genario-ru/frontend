import { ScenarioNavigationScene } from "@/features/scenario/scenario-navigation/components/scenario-navigation-scene";
import { ItemsList } from "@/shared/components/common/items-list";
import {
  EmptyPlug,
  EmptyPlugDescription,
  EmptyPlugHeader,
  EmptyPlugTitle,
} from "@/shared/components/ui/empty-plug";
import {
  ErrorPlug,
  ErrorPlugDescription,
  ErrorPlugIcon,
  ErrorPlugTitle,
} from "@/shared/components/ui/error-plug";
import {
  RadioCardsGroup,
  RadioCardsGroupItem,
} from "@/shared/components/ui/radio-cards-group";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { cn } from "@/shared/utils/cn";

import { useScenarioNavigationScenes } from "../hooks/use-scenario-navigation-scenes";

type ScenarioNavigationScenesProps = {
  size?: "sm" | "base";
  scenarioId: string;
};

export function ScenarioNavigationScenes({
  size = "base",
  scenarioId,
}: ScenarioNavigationScenesProps) {
  const {
    containerRef,
    activeScenarioChapterScene,
    radioCardsScenesList,
    activeScenarioChapterPosition,
    isScenarioNavigationScenesLoading,
    isScenarioNavigationScenesError,
    sceneRefCallback,
    handleScenarioValueChange,
  } = useScenarioNavigationScenes({ scenarioId });

  if (isScenarioNavigationScenesLoading) {
    return <ScenarioNavigationScenesSkeleton size={size} />;
  }

  if (isScenarioNavigationScenesError) {
    return <ScenarioNavigationScenesErrorPlug size={size} />;
  }

  if (!radioCardsScenesList?.length || !activeScenarioChapterPosition) {
    return <ScenarioNavigationScenesEmptyPlug size={size} />;
  }

  return (
    <div
      ref={containerRef}
      className={cn("hide-scrollbar flex w-full overflow-auto", {
        "p-4": size === "sm",
        "p-5": size === "base",
      })}
    >
      <RadioCardsGroup
        value={activeScenarioChapterScene?.id}
        onValueChange={handleScenarioValueChange}
      >
        {radioCardsScenesList?.map((scene) => (
          <RadioCardsGroupItem
            key={scene.id}
            value={scene.id}
            size="sm"
            className="items-start"
          >
            <ScenarioNavigationScene
              size={size}
              ref={(el) => sceneRefCallback(el, scene.id)}
              chapterPosition={activeScenarioChapterPosition}
              position={scene.position}
              name={scene.name}
              startTime={scene.startTime}
              endTime={scene.endTime}
            />
          </RadioCardsGroupItem>
        ))}
      </RadioCardsGroup>
    </div>
  );
}

export function ScenarioNavigationScenesSkeleton({
  size = "base",
}: Pick<ScenarioNavigationScenesProps, "size">) {
  return (
    <ItemsList
      row
      gap={8}
      count={8}
      item={
        <Skeleton
          className={cn("w-28", {
            "h-9 rounded-xl": size === "sm",
            "h-[58px] rounded-2xl": size === "base",
          })}
        />
      }
      className={cn("flex flex-1 overflow-hidden", {
        "p-4": size === "sm",
        "p-5": size === "base",
      })}
    />
  );
}

export function ScenarioNavigationScenesErrorPlug({
  size = "base",
}: Pick<ScenarioNavigationScenesProps, "size">) {
  const title =
    size === "base" ? "Ошибка" : "Произошла ошибка при загрузке сцен";

  return (
    <ErrorPlug
      direction="row"
      className={cn({
        "h-[68px]": size === "sm",
        "h-[98px]": size === "base",
      })}
    >
      <ErrorPlugIcon className={cn({ "size-6": size === "sm" })} />
      <div className="flex flex-col">
        <ErrorPlugTitle>{title}</ErrorPlugTitle>
        {size === "base" && (
          <ErrorPlugDescription>
            Произошла ошибка при загрузке сцен
          </ErrorPlugDescription>
        )}
      </div>
    </ErrorPlug>
  );
}

export function ScenarioNavigationScenesEmptyPlug({
  size = "base",
}: Pick<ScenarioNavigationScenesProps, "size">) {
  return (
    <EmptyPlug
      className={cn({
        "h-[68px]": size === "sm",
        "h-[98px]": size === "base",
      })}
    >
      <EmptyPlugHeader>
        <EmptyPlugTitle>Нет сцен</EmptyPlugTitle>
        <EmptyPlugDescription>
          В данном разделе пока нет сцен.
        </EmptyPlugDescription>
      </EmptyPlugHeader>
    </EmptyPlug>
  );
}
