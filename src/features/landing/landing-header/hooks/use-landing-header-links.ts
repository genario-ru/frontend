import { useCallback } from "react";

import { useReachGoal } from "@/lib/yandex-metrika";

export function useLandingHeaderLinks() {
  const reachGoal = useReachGoal();

  const handleClick = useCallback(
    () => reachGoal("landing-header-menu-link-click"),
    [reachGoal],
  );

  return { handleClick };
}
