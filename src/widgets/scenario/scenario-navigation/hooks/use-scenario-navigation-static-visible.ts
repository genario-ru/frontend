import { useResizeObserver } from "@siberiacancode/reactuse";
import { type RefObject, useMemo } from "react";

import { usePageCheckScroll } from "@/shared/hooks/use-page-check-scroll";

const SCENARIO_NAVIGATION_STATIC_TOP_OFFSET = 20;

type UseScenarioNavigationStaticVisibleParams = {
  staticNavigationRef: RefObject<HTMLDivElement | null>;
};

export function useScenarioNavigationStaticVisible({
  staticNavigationRef,
}: UseScenarioNavigationStaticVisibleParams) {
  const { entry } = useResizeObserver(staticNavigationRef, {
    box: "border-box",
  });

  const staticNavigationScrollOffsetBottom = useMemo(() => {
    if (!entry) {
      return 0;
    }

    return entry.contentRect.height + SCENARIO_NAVIGATION_STATIC_TOP_OFFSET;
  }, [entry]);

  const { isScrolled: isScenarioNavigationStaticHidden } = usePageCheckScroll({
    scrollOffsetTop: staticNavigationScrollOffsetBottom,
  });

  return {
    isScenarioNavigationStaticVisible: !isScenarioNavigationStaticHidden,
  };
}
