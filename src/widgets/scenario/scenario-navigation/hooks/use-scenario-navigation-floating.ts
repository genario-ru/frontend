import { config, useSpring } from "@react-spring/web";
import { type RefObject } from "react";

import { usePageScrollDirection } from "@/shared/hooks/use-page-scroll-direction";

import { useScenarioNavigationStaticVisible } from "./use-scenario-navigation-static-visible";

type UseScenarioNavigationFloatingParams = {
  staticNavigationRef: RefObject<HTMLDivElement | null>;
};

export function useScenarioNavigationFloating({
  staticNavigationRef,
}: UseScenarioNavigationFloatingParams) {
  const { isScenarioNavigationStaticVisible } =
    useScenarioNavigationStaticVisible({ staticNavigationRef });

  const { isScrollingUp } = usePageScrollDirection();
  const isFloatingVisible = isScrollingUp && !isScenarioNavigationStaticVisible;

  const animatedStyles = useSpring({
    bottom: isFloatingVisible ? 32 : -200,
    opacity: isFloatingVisible ? 1 : 0,
    config: config.default,
  });

  return {
    animatedStyles,
  };
}
