import type { RefObject } from "react";

import { Island } from "@/shared/components/ui/island";
import type { PropsWithClassName } from "@/shared/types/props-with-classname";

import { ScenarioNavigationChapters } from "./scenario-navigation-chapters";
import { ScenarioNavigationChaptersArrows } from "./scenario-navigation-chapters-arrows";
import { ScenarioNavigationScenes } from "./scenario-navigation-scenes";

type ScenarioNavigationProps = PropsWithClassName<{
  ref?: RefObject<HTMLDivElement | null>;
  size?: "sm" | "base";
  scenarioId: string;
  scrollToActiveElement?: boolean;
}>;

export function ScenarioNavigation({
  ref,
  size = "base",
  scenarioId,
  className,
  scrollToActiveElement = true,
}: ScenarioNavigationProps) {
  return (
    <Island ref={ref} noPadding noGap className={className}>
      <div className="flex w-full">
        <ScenarioNavigationChapters
          size={size}
          scenarioId={scenarioId}
          scrollToActiveChapter={scrollToActiveElement}
        />
        <ScenarioNavigationChaptersArrows size={size} scenarioId={scenarioId} />
      </div>
      <ScenarioNavigationScenes
        size={size}
        scenarioId={scenarioId}
        scrollToActiveScene={scrollToActiveElement}
      />
    </Island>
  );
}
