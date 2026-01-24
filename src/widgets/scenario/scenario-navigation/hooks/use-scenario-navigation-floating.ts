import { config, useSpring } from "@react-spring/web";
import { type RefObject } from "react";

import { useScenarioNavigationStaticVisible } from "./use-scenario-navigation-static-visible";

type UseScenarioNavigationFloatingParams = {
  staticNavigationRef: RefObject<HTMLDivElement | null>;
};

export function useScenarioNavigationFloating({
  staticNavigationRef,
}: UseScenarioNavigationFloatingParams) {
  const { isScenarioNavigationStaticVisible } =
    useScenarioNavigationStaticVisible({ staticNavigationRef });

  const animatedStyles = useSpring({
    bottom: isScenarioNavigationStaticVisible ? -200 : 32,
    opacity: isScenarioNavigationStaticVisible ? 0 : 1,
    config: config.default,
  });

  return {
    animatedStyles,
  };
}
