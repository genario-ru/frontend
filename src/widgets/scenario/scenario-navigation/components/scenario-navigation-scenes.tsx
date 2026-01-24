import { ScenarioNavigationScene } from "@/features/scenario/scenario-navigation/components/scenario-navigation-scene";
import {
  RadioCardsGroup,
  RadioCardsGroupItem,
} from "@/shared/components/ui/radio-cards-group";
import { cn } from "@/shared/utils/cn";

import { useScenarioNavigationScenes } from "../hooks/use-scenario-navigation-scenes";

type ScenarioNavigationScenesProps = {
  size?: "sm" | "base";
  scenarioId: string;
  scrollToActiveScene: boolean;
};

export function ScenarioNavigationScenes({
  size = "base",
  scenarioId,
  scrollToActiveScene,
}: ScenarioNavigationScenesProps) {
  const {
    containerRef,
    activeScenarioChapterScene,
    radioCardsScenesList,
    activeScenarioChapterPosition,
    isScenarioNavigationScenesLoading,
    isScenarioNavigationScenesError,
    sceneRefCallback,
    handleScenarioChapterSceneClick,
  } = useScenarioNavigationScenes({ scenarioId, scrollToActiveScene });

  if (isScenarioNavigationScenesLoading) {
    return <div>Loading...</div>;
  }

  if (isScenarioNavigationScenesError) {
    return <div>Error</div>;
  }

  if (!radioCardsScenesList?.length || !activeScenarioChapterPosition) {
    return <div>No scenes</div>;
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
        onValueChange={handleScenarioChapterSceneClick}
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
