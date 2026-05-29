import { getYMConfig } from "./get-ym-config";

export function ymHit(url: string) {
  const ymConfig = getYMConfig();

  if (ymConfig.enabled) {
    window.ym?.(ymConfig.id, "hit", url);
  }
}

export function ymReachGoal(
  target: string,
  params?: Record<string, unknown>,
  callback?: () => void,
) {
  const ymConfig = getYMConfig();

  if (ymConfig.enabled) {
    window.ym?.(ymConfig.id, "reachGoal", target, params, callback);
  }
}
