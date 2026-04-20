import { useScenarioChapters } from "@/actions/scenario/hooks/use-scenario-chapters";
import { Island } from "@/shared/components/ui/island";
import { usePageCheckScroll } from "@/shared/hooks/use-page-check-scroll";
import { cn } from "@/shared/utils/cn";

import { useScenarioNavigationChaptersScroll } from "../hooks/use-scenario-navigation-chapters-scroll";
import { ScenarioNavigationChapters } from "./scenario-navigation-chapters";
import { ScenarioNavigationChaptersArrows } from "./scenario-navigation-chapters-arrows";
import { ScenarioNavigationScenes } from "./scenario-navigation-scenes";

type ScenarioNavigationProps = {
  scenarioId: string;
};

export function ScenarioNavigation({ scenarioId }: ScenarioNavigationProps) {
  const { isScenarioChaptersGenerating } = useScenarioChapters({ scenarioId });

  const { isScrolledToBottom } = usePageCheckScroll({
    scrollOffsetBottom: 1,
  });

  const { chapterRefCallback, handleChapterScrollIntoView } =
    useScenarioNavigationChaptersScroll();

  if (isScenarioChaptersGenerating) {
    return null;
  }

  return (
    <Island
      noPadding
      noGap
      roundedBottom={false}
      className={cn("sticky bottom-0", {
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
