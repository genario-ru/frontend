import { useCallback } from "react";

import type { YMGoal } from "../types/ym-goal";
import { ymReachGoal } from "../utils/ym-functions";
import { useYMConfig } from "./use-ym-config";

export function useReachGoal() {
  const ymConfig = useYMConfig();

  return useCallback(
    (goal: YMGoal, params?: Record<string, unknown>) => {
      if (!ymConfig.enabled) {
        return;
      }

      ymReachGoal(ymConfig.id, goal, params);
    },
    [ymConfig],
  );
}
