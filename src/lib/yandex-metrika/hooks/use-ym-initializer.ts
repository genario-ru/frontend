import { useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useEventListener } from "usehooks-ts";

import { COOKIE_CONSENT_CHANGE_EVENT } from "@/shared/constants/window-events";

import { getYMConfig } from "../utils/get-ym-config";
import { ymHit } from "../utils/ym-functions";

export function useYMInitializer() {
  const [ymConfig, setYMConfig] = useState(getYMConfig());
  const { pathname } = useLocation();

  useEventListener(COOKIE_CONSENT_CHANGE_EVENT, () => {
    setYMConfig(getYMConfig());
  });

  useEffect(() => {
    ymHit(pathname);
  }, [pathname, ymConfig]);

  return { ymConfig };
}
