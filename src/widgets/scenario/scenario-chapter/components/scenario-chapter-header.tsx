import { ScenarioChapterHeaderInfo } from "@/features/scenario/scenario-chapter/scenario-chapter-header/components/scenario-chapter-header-info";
import { ScenarioChapterHeaderScenesList } from "@/features/scenario/scenario-chapter/scenario-chapter-header/components/scenario-chapter-header-scenes-list";
import { Island } from "@/shared/components/ui/island";

import { useScenarioChapterHeader } from "../hooks/use-scenario-chapter-header";

type ScenarioChapterHeaderProps = {
  scenarioId: string;
  scenarioVersionId: string;
};

export function ScenarioChapterHeader({
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
    // isLoading,
    // isError,
    handlePreviousChapterClick,
    handleNextChapterClick,
    handleSceneClick,
  } = useScenarioChapterHeader({
    scenarioId,
    scenarioVersionId,
  });

  return (
    <Island as="header" roundedBottom={false} className="sticky top-0">
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
