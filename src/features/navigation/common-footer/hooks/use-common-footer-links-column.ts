import { useMemo } from "react";

import { useReachGoal } from "@/lib/yandex-metrika";

import type { CommonFooterLinksColumn } from "../types/common-footer-links";

export function useCommonFooterLinksColumn(
  items: CommonFooterLinksColumn["items"],
) {
  const reachGoal = useReachGoal();

  return useMemo(
    () =>
      items.map(({ goal, ...link }) => ({
        link,
        handleClick: () => reachGoal(goal),
      })),
    [items, reachGoal],
  );
}
