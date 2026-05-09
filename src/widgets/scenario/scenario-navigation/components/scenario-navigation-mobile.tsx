import { useMemo } from "react";

import { ItemsList } from "@/shared/components/common/items-list";
import { Island } from "@/shared/components/ui/island";
import { Plug } from "@/shared/components/ui/plug";
import {
  RadioCardsGroup,
  RadioCardsGroupItem,
} from "@/shared/components/ui/radio-cards-group";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { cn } from "@/shared/utils/cn";

import { useScenarioNavigationChapters } from "../hooks/use-scenario-navigation-chapters";

type ScenarioNavigationMobileProps = {
  scenarioId: string;
};

export function ScenarioNavigationMobile({
  scenarioId,
}: ScenarioNavigationMobileProps) {
  const {
    scenarioChaptersList,
    activeScenarioChapter,
    isScenarioChaptersGenerating,
    isScenarioChaptersLoading,
    isScenarioChaptersError,
    handleScenarioValueChange,
  } = useScenarioNavigationChapters({ scenarioId });

  const body = useMemo(() => {
    if (isScenarioChaptersLoading) {
      return <ScenarioNavigationMobileSkeleton />;
    }

    if (isScenarioChaptersError) {
      return <ScenarioNavigationMobileError />;
    }

    if (!scenarioChaptersList?.length) {
      return <ScenarioNavigationMobileEmptyPlug />;
    }

    return (
      <RadioCardsGroup
        className="flex-col items-stretch"
        value={activeScenarioChapter?.id}
        onValueChange={handleScenarioValueChange}
      >
        {scenarioChaptersList.map((chapter, index) => {
          return (
            <RadioCardsGroupItem
              key={chapter.id}
              value={chapter.id}
              size="sm"
              className={cn("w-full items-start text-left", {
                "ring-neutral-8 ring-2":
                  activeScenarioChapter?.id === chapter.id,
              })}
            >
              <p className="line-clamp-2">
                {index + 1}. {chapter.name}
              </p>
            </RadioCardsGroupItem>
          );
        })}
      </RadioCardsGroup>
    );
  }, [
    activeScenarioChapter,
    isScenarioChaptersError,
    isScenarioChaptersLoading,
    scenarioChaptersList,
    handleScenarioValueChange,
  ]);

  if (isScenarioChaptersGenerating) {
    return null;
  }

  return (
    <Island roundedBottom={false} title="Навигация по сценарию">
      {body}
    </Island>
  );
}

function ScenarioNavigationMobileSkeleton() {
  return (
    <ItemsList
      count={3}
      gap={8}
      item={<Skeleton className="h-12 w-full rounded-xl" />}
    />
  );
}

function ScenarioNavigationMobileError() {
  return (
    <Plug
      variant="negative"
      title="Ошибка"
      description="Произошла ошибка при загрузке разделов"
    />
  );
}

function ScenarioNavigationMobileEmptyPlug() {
  return (
    <Plug
      title="Нет разделов"
      description="В данном сценарии пока нет разделов"
    />
  );
}
