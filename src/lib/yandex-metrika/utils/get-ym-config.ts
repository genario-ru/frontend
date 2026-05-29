import { envs } from "@/shared/constants/envs";
import { isCookieConsentAccepted } from "@/shared/utils/cookie-consent";

import type { YMConfig } from "../types/ym-config";

export function getYMConfig(): YMConfig {
  const id = envs.VITE_YANDEX_METRIKA_ID;
  const isConsentAccepted = isCookieConsentAccepted();
  const isProduction = envs.MODE === "production";

  if (id && isConsentAccepted && isProduction) {
    return {
      id,
      enabled: true,
    };
  }

  return {
    enabled: false,
  };
}
