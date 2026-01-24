import {
  TabsUnderline,
  TabsUnderlineList,
  TabsUnderlineTrigger,
} from "@/shared/components/ui/tabs-underline";
import { cn } from "@/shared/utils/cn";

import { useScenarioNavigationChapters } from "../hooks/use-scenario-navigation-chapters";

type ScenarioNavigationChaptersProps = {
  size?: "sm" | "base";
  scenarioId: string;
};

export function ScenarioNavigationChapters({
  size = "base",
  scenarioId,
}: ScenarioNavigationChaptersProps) {
  const {
    containerRef,
    isScenarioChaptersLoading,
    isScenarioChaptersError,
    scenarioChaptersList,
    activeScenarioChapter,
    chapterRefCallback,
    handleScenarioChapterClick,
  } = useScenarioNavigationChapters({ scenarioId });

  if (isScenarioChaptersLoading) {
    return <div className="flex flex-1 px-4">Loading...</div>;
  }

  if (isScenarioChaptersError) {
    return <div className="flex flex-1 px-4">Error</div>;
  }

  if (!scenarioChaptersList?.length) {
    return <div className="flex flex-1 px-4">No chapters found</div>;
  }

  return (
    <TabsUnderline
      value={activeScenarioChapter?.id}
      onValueChange={handleScenarioChapterClick}
      className="overflow-hidden"
    >
      <TabsUnderlineList
        ref={containerRef}
        className={cn(
          "border-neutral-3 hide-scrollbar overflow-auto border-b",
          {
            "px-4": size === "sm",
            "px-5": size === "base",
          },
        )}
      >
        {scenarioChaptersList.map((chapter, index) => (
          <TabsUnderlineTrigger
            key={chapter.id}
            id={chapter.id}
            size={size}
            value={chapter.id}
            ref={(el) => chapterRefCallback(el, chapter.id)}
          >
            {index + 1}. {chapter.name}
          </TabsUnderlineTrigger>
        ))}
      </TabsUnderlineList>
    </TabsUnderline>
  );
}
