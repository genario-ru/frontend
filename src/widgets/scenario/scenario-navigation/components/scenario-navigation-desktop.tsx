import { Island } from "@/shared/components/ui/island";
import { cn } from "@/shared/utils/cn";

import { useScenarioNavigationDesktop } from "../hooks/use-scenario-navigation-desktop";
import { ScenarioNavigationChapters } from "./scenario-navigation-chapters";
import { ScenarioNavigationChaptersArrows } from "./scenario-navigation-chapters-arrows";
import { ScenarioNavigationScenes } from "./scenario-navigation-scenes";

type ScenarioNavigationDesktopProps = {
  scenarioId: string;
};

export function ScenarioNavigationDesktop({
  scenarioId,
}: ScenarioNavigationDesktopProps) {
  const {
    isScenarioChaptersGenerating,
    isScrolledToBottom,
    chapterRefCallback,
    handleChapterScrollIntoView,
  } = useScenarioNavigationDesktop({ scenarioId });

  if (isScenarioChaptersGenerating) {
    return null;
  }

  return (
    <Island
      noPadding
      noGap
      roundedBottom={false}
      className={cn("sticky bottom-0 duration-200", {
        "shadow-top-1": !isScrolledToBottom,
      })}
    >
      <div className="flex w-full">
        <ScenarioNavigationChapters
          scenarioId={scenarioId}
          chapterRefCallback={chapterRefCallback}
          handleChapterScrollIntoView={handleChapterScrollIntoView}
        />
        <ScenarioNavigationChaptersArrows
          scenarioId={scenarioId}
          handleChapterScrollIntoView={handleChapterScrollIntoView}
        />
      </div>
      <ScenarioNavigationScenes scenarioId={scenarioId} />
    </Island>
  );
}
