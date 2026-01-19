import { useMemo } from "react";

import { ScenarioChaptersListItem } from "@/features/scenario/scenario-chapters-list/components/scenario-chapters-list-item";
import { Island } from "@/shared/components/ui/island";
import {
  RadioCardsGroup,
  RadioCardsGroupItem,
} from "@/shared/components/ui/radio-cards-group";

import { useScenarioChaptersList } from "../hooks/use-scenario-chapters-list";

type ScenarioChaptersListProps = {
  scenarioId: string;
};

export function ScenarioChaptersList({
  scenarioId,
}: ScenarioChaptersListProps) {
  const {
    activeChapter,
    scenarioChaptersList,
    isScenarioVersionLoading,
    isScenarioVersionError,
    handleChapterClick,
  } = useScenarioChaptersList({
    scenarioId,
  });

  const body = useMemo(() => {
    if (isScenarioVersionLoading) {
      return <div>Loading...</div>;
    }

    if (isScenarioVersionError) {
      return <div>Error</div>;
    }

    if (!scenarioChaptersList?.length) {
      return <div>No chapters</div>;
    }

    return (
      <RadioCardsGroup
        value={activeChapter?.id}
        onValueChange={handleChapterClick}
        className="flex-col gap-4"
      >
        {scenarioChaptersList.map((chapter, index) => (
          <RadioCardsGroupItem key={chapter.id} value={chapter.id}>
            <ScenarioChaptersListItem
              key={chapter.id}
              position={index + 1}
              name={chapter.name}
              description={chapter.description}
              startTime={chapter.startTime}
              endTime={chapter.endTime}
            />
          </RadioCardsGroupItem>
        ))}
      </RadioCardsGroup>
    );
  }, [
    activeChapter,
    scenarioChaptersList,
    isScenarioVersionLoading,
    isScenarioVersionError,
    handleChapterClick,
  ]);

  return (
    <div className="rounded-5 h-full overflow-hidden">
      <Island title="Разделы" className="h-full overflow-auto">
        {body}
      </Island>
    </div>
  );
}
