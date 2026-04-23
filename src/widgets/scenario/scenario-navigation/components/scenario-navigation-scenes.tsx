import { ScenarioNavigationScene } from "@/features/scenario/scenario-navigation/components/scenario-navigation-scene";
import { ItemsList } from "@/shared/components/common/items-list";
import { Plug } from "@/shared/components/ui/plug";
import {
  RadioCardsGroup,
  RadioCardsGroupItem,
} from "@/shared/components/ui/radio-cards-group";
import { Skeleton } from "@/shared/components/ui/skeleton";

import { useScenarioNavigationScenes } from "../hooks/use-scenario-navigation-scenes";

type ScenarioNavigationScenesProps = {
  scenarioId: string;
};

export function ScenarioNavigationScenes({
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
    handleSceneValueChange,
  } = useScenarioNavigationScenes({ scenarioId });

  if (isScenarioNavigationScenesLoading) {
    return <ScenarioNavigationScenesSkeleton />;
  }

  if (isScenarioNavigationScenesError) {
    return <ScenarioNavigationScenesErrorPlug />;
  }

  if (!radioCardsScenesList?.length || !activeScenarioChapterPosition) {
    return <ScenarioNavigationScenesEmptyPlug />;
  }

  return (
    <div
      ref={containerRef}
      className="hide-scrollbar flex w-full overflow-auto p-4"
    >
      <RadioCardsGroup
        value={activeScenarioChapterScene?.id}
        onValueChange={handleSceneValueChange}
      >
        {radioCardsScenesList?.map((scene) => (
          <RadioCardsGroupItem
            key={scene.id}
            value={scene.id}
            size="sm"
            className="items-start"
          >
            <ScenarioNavigationScene
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

export function ScenarioNavigationScenesSkeleton() {
  return (
    <ItemsList
      row
      gap={8}
      count={8}
      item={<Skeleton className="h-[58px] w-48 rounded-2xl" />}
      className="flex flex-1 overflow-hidden p-4"
    />
  );
}

export function ScenarioNavigationScenesErrorPlug() {
  return (
    <Plug
      variant="negative"
      direction="row"
      title="Ошибка"
      description="Произошла ошибка при загрузке сцен"
      className="h-[98px]"
    />
  );
}

export function ScenarioNavigationScenesEmptyPlug() {
  return (
    <Plug
      direction="row"
      title="В данном разделе пока нет сцен"
      className="h-[98px]"
    />
  );
}
