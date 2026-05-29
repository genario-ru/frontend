import type { YMCounterId } from "../types/ym-counter-id";

export function ymHit(id: YMCounterId, url: string) {
  window.ym?.(id, "hit", url);
}

export function ymReachGoal(
  id: YMCounterId,
  target: string,
  params?: Record<string, unknown>,
  callback?: () => void,
) {
  window.ym?.(id, "reachGoal", target, params, callback);
}
