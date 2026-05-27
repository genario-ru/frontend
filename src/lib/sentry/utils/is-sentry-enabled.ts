import { envs } from "@/shared/constants/envs";

export function isSentryEnabled() {
  return Boolean(envs.VITE_GLITCHTIP_DSN) && envs.MODE === "production";
}
