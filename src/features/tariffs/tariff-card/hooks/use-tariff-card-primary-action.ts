import { useCallback } from "react";

import { useReachGoal } from "@/lib/yandex-metrika";

export function useTariffCardPrimaryAction() {
  const reachGoal = useReachGoal();

  const handleClick = useCallback(
    () => reachGoal("tariff-card-primary-button-click"),
    [reachGoal],
  );

  return { handleClick };
}
