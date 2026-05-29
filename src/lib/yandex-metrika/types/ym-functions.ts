import type { YMCounterId } from "./ym-counter-id";
import type { YMInitParams } from "./ym-init-params";

export type YMFunction = {
  (id: YMCounterId, method: "init", params?: YMInitParams): void;
  (
    id: YMCounterId,
    method: "hit",
    url: string,
    options?: Record<string, unknown>,
  ): void;
  (
    id: YMCounterId,
    method: "reachGoal",
    target: string,
    params?: Record<string, unknown>,
    callback?: () => void,
  ): void;
};
