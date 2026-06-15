import { useCallback } from "react";

import { useReachGoal } from "@/lib/yandex-metrika";

export function useTariffCardSecondaryAction() {
  const reachGoal = useReachGoal();

  const handleClick = useCallback(
    () => reachGoal("tariff-card-secondary-button-click"),
    [reachGoal],
  );

  return { handleClick };
}
