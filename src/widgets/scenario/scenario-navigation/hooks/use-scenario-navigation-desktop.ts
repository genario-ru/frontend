import { useScenarioChapters } from "@/actions/scenario/hooks/use-scenario-chapters";
import { usePageCheckScroll } from "@/shared/hooks/use-page-check-scroll";

import { useScenarioNavigationChaptersScroll } from "./use-scenario-navigation-chapters-scroll";

type UseScenarioNavigationDesktopParams = {
  scenarioId: string;
};

export function useScenarioNavigationDesktop({
  scenarioId,
}: UseScenarioNavigationDesktopParams) {
  const { isScenarioChaptersGenerating } = useScenarioChapters({ scenarioId });

  const { isScrolledToBottom } = usePageCheckScroll({
    scrollOffsetBottom: 1,
  });

  const { chapterRefCallback, handleChapterScrollIntoView } =
    useScenarioNavigationChaptersScroll();

  return {
    isScenarioChaptersGenerating,
    isScrolledToBottom,
    chapterRefCallback,
    handleChapterScrollIntoView,
  };
}
