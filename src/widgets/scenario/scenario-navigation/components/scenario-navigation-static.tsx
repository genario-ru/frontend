import type { RefObject } from "react";

import { useScenarioNavigationStaticHidden } from "../hooks/use-scenario-navigation-static-hidden";
import { ScenarioNavigation } from "./scenario-navigation";

type ScenarioNavigationStaticProps = {
  ref: RefObject<HTMLDivElement | null>;
  scenarioId: string;
};

export function ScenarioNavigationStatic({
  ref,
  scenarioId,
}: ScenarioNavigationStaticProps) {
  const { isScenarioNavigationStaticHidden } =
    useScenarioNavigationStaticHidden({ staticNavigationRef: ref });

  return (
    <ScenarioNavigation
      ref={ref}
      scenarioId={scenarioId}
      scrollToActiveElement={!isScenarioNavigationStaticHidden}
    />
  );
}
