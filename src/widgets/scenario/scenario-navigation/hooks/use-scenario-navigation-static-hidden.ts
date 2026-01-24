import { useResizeObserver } from "@siberiacancode/reactuse";
import { type RefObject, useMemo } from "react";

import { usePageCheckScroll } from "@/shared/hooks/use-page-check-scroll";

const SCENARIO_NAVIGATION_STATIC_TOP_OFFSET = 20;

type UseScenarioNavigationStaticHiddenParams = {
  staticNavigationRef: RefObject<HTMLDivElement | null>;
};

export function useScenarioNavigationStaticHidden({
  staticNavigationRef,
}: UseScenarioNavigationStaticHiddenParams) {
  const { entry } = useResizeObserver(staticNavigationRef, {
    box: "border-box",
  });

  const staticNavigationScrollOffsetTop = useMemo(() => {
    if (!entry) {
      return 0;
    }

    return entry.contentRect.height + SCENARIO_NAVIGATION_STATIC_TOP_OFFSET;
  }, [entry]);

  const { isScrolled: isScenarioNavigationStaticHidden } = usePageCheckScroll({
    scrollOffsetTop: staticNavigationScrollOffsetTop,
  });

  return {
    isScenarioNavigationStaticHidden,
  };
}
