import type { RefObject } from "react";

import { ScenarioChapterHeaderInfo } from "@/features/scenario/scenario-chapter/scenario-chapter-header/components/scenario-chapter-header-info";
import { ScenarioChapterHeaderScenesList } from "@/features/scenario/scenario-chapter/scenario-chapter-header/components/scenario-chapter-header-scenes-list";
import { Island } from "@/shared/components/ui/island";
import { cn } from "@/shared/utils/cn";

import { useScenarioChapterHeader } from "../hooks/use-scenario-chapter-header";

type ScenarioChapterHeaderProps = {
  containerRef: RefObject<HTMLDivElement | null>;
  scenarioId: string;
  scenarioVersionId: string;
};

export function ScenarioChapterHeader({
  containerRef,
  scenarioId,
  scenarioVersionId,
}: ScenarioChapterHeaderProps) {
  const {
    activeScenarioChapterScene,
    scenarioChapterTitle,
    scenarioChapterTime,
    scenarioChapterDescription,
    scenarioChapterScenes,
    hasPreviousScenarioChapter,
    hasNextScenarioChapter,
    isContainerScrolled,
    // isLoading,
    // isError,
    handlePreviousChapterClick,
    handleNextChapterClick,
    handleSceneClick,
  } = useScenarioChapterHeader({
    containerRef,
    scenarioId,
    scenarioVersionId,
  });

  return (
    <Island
      as="header"
      className={cn("sticky top-0 duration-200", {
        "shadow-bottom-1": isContainerScrolled,
      })}
    >
      <ScenarioChapterHeaderInfo
        hasPreviousChapter={hasPreviousScenarioChapter}
        hasNextChapter={hasNextScenarioChapter}
        title={scenarioChapterTitle}
        time={scenarioChapterTime}
        description={scenarioChapterDescription}
        handlePreviousChapterClick={handlePreviousChapterClick}
        handleNextChapterClick={handleNextChapterClick}
      />
      <ScenarioChapterHeaderScenesList
        scenes={scenarioChapterScenes}
        activeSceneId={activeScenarioChapterScene?.id}
        handleSceneClick={handleSceneClick}
      />
    </Island>
  );
}
