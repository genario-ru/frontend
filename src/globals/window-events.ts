import type { COOKIE_CONSENT_CHANGE_EVENT } from "@/shared/constants/window-events";

declare global {
  interface WindowEventMap {
    [COOKIE_CONSENT_CHANGE_EVENT]: Event;
  }
}
