import type { RefObject } from "react";

import { ScenarioNavigation } from "./scenario-navigation";

type ScenarioNavigationStaticProps = {
  ref: RefObject<HTMLDivElement | null>;
  scenarioId: string;
};

export function ScenarioNavigationStatic({
  ref,
  scenarioId,
}: ScenarioNavigationStaticProps) {
  return <ScenarioNavigation ref={ref} scenarioId={scenarioId} />;
}
