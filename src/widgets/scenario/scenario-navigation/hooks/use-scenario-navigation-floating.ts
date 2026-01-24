import { config, useSpring } from "@react-spring/web";
import { type RefObject } from "react";

import { useScenarioNavigationStaticHidden } from "./use-scenario-navigation-static-hidden";

type UseScenarioNavigationFloatingParams = {
  staticNavigationRef: RefObject<HTMLDivElement | null>;
};

export function useScenarioNavigationFloating({
  staticNavigationRef,
}: UseScenarioNavigationFloatingParams) {
  const { isScenarioNavigationStaticHidden } =
    useScenarioNavigationStaticHidden({ staticNavigationRef });

  const animatedStyles = useSpring({
    bottom: isScenarioNavigationStaticHidden ? 32 : -200,
    opacity: isScenarioNavigationStaticHidden ? 1 : 0,
    config: config.default,
  });

  return {
    animatedStyles,
    isScenarioNavigationStaticHidden,
  };
}
