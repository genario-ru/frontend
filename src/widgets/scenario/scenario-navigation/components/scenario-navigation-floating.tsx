import { animated } from "@react-spring/web";
import type { RefObject } from "react";

import { useScenarioNavigationFloating } from "../hooks/use-scenario-navigation-floating";
import { ScenarioNavigation } from "./scenario-navigation";

type ScenarioNavigationFloatingProps = {
  scenarioId: string;
  staticNavigationRef: RefObject<HTMLDivElement | null>;
};

const AnimatedDiv = animated("div");

export function ScenarioNavigationFloating({
  scenarioId,
  staticNavigationRef,
}: ScenarioNavigationFloatingProps) {
  const { animatedStyles, isScenarioNavigationStaticHidden } =
    useScenarioNavigationFloating({ staticNavigationRef });

  return (
    <AnimatedDiv
      style={animatedStyles}
      className="fixed left-1/2 max-w-3xl -translate-x-1/2"
    >
      <ScenarioNavigation
        size="sm"
        scenarioId={scenarioId}
        scrollToActiveElement={isScenarioNavigationStaticHidden}
        className="shadow-bottom-2"
      />
    </AnimatedDiv>
  );
}
