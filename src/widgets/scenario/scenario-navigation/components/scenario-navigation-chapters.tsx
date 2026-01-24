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
    tabsUnderlineTriggerRefCallback,
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
    <div
      ref={containerRef}
      className={cn("hide-scrollbar flex overflow-auto", {
        "px-4": size === "sm",
        "px-5": size === "base",
      })}
    >
      <TabsUnderline
        value={activeScenarioChapter?.id}
        onValueChange={handleScenarioChapterClick}
      >
        <TabsUnderlineList>
          {scenarioChaptersList.map((chapter, index) => (
            <TabsUnderlineTrigger
              key={chapter.id}
              id={chapter.id}
              size={size}
              value={chapter.id}
              ref={(el) => tabsUnderlineTriggerRefCallback(el, chapter.id)}
            >
              {index + 1}. {chapter.name}
            </TabsUnderlineTrigger>
          ))}
        </TabsUnderlineList>
      </TabsUnderline>
    </div>
  );
}
