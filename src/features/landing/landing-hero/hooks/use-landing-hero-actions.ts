import { useCallback } from "react";

import { useReachGoal } from "@/lib/yandex-metrika";

export function useLandingHeroActions() {
  const reachGoal = useReachGoal();

  const handleClick = useCallback(
    () => reachGoal("trial-tariff-anchor-link-click"),
    [reachGoal],
  );

  return { handleClick };
}
