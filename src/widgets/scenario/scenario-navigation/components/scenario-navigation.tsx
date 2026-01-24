import type { RefObject } from "react";

import { Island } from "@/shared/components/ui/island";

import { ScenarioNavigationChapters } from "./scenario-navigation-chapters";
import { ScenarioNavigationChaptersArrows } from "./scenario-navigation-chapters-arrows";
import { ScenarioNavigationScenes } from "./scenario-navigation-scenes";

type ScenarioNavigationProps = {
  ref: RefObject<HTMLDivElement | null>;
  size?: "sm" | "base";
  scenarioId: string;
};

export function ScenarioNavigation({
  ref,
  size = "base",
  scenarioId,
}: ScenarioNavigationProps) {
  return (
    <Island ref={ref} noPadding noGap>
      <div className="flex w-full">
        <ScenarioNavigationChapters size={size} scenarioId={scenarioId} />
        <ScenarioNavigationChaptersArrows size={size} scenarioId={scenarioId} />
      </div>
      <ScenarioNavigationScenes size={size} scenarioId={scenarioId} />
    </Island>
  );
}
