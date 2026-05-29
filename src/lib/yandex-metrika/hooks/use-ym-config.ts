import { useState } from "react";
import { useEventListener } from "usehooks-ts";

import { COOKIE_CONSENT_CHANGE_EVENT } from "@/shared/constants/window-events";

import { getYMConfig } from "../utils/get-ym-config";

export function useYMConfig() {
  const [ymConfig, setYMConfig] = useState(getYMConfig());

  useEventListener(COOKIE_CONSENT_CHANGE_EVENT, () => {
    setYMConfig(getYMConfig());
  });

  return ymConfig;
}
