import type { YMCounterId } from "../types/ym-counter-id";
import type { YMInitParams } from "../types/ym-init-params";

export function ymInit(id: YMCounterId, params: YMInitParams) {
  window.ym?.(id, "init", params);
}

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
