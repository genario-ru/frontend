import { useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useEventListener } from "usehooks-ts";

import { COOKIE_CONSENT_CHANGE_EVENT } from "@/shared/constants/window-events";

import { ymInitParams } from "../constants/ym-init-params";
import { getYMConfig } from "../utils/get-ym-config";
import { ymHit, ymInit } from "../utils/ym-functions";

export function useYM() {
  const [ymInitialized, setYMInitialized] = useState(false);
  const [ymConfig, setYMConfig] = useState(getYMConfig());
  const { pathname } = useLocation();

  // Слушаем изменения согласия с куками
  useEventListener(COOKIE_CONSENT_CHANGE_EVENT, () => {
    setYMConfig(getYMConfig());
  });

  // Инициализируем счётчик
  useEffect(() => {
    if (!ymConfig.enabled) {
      return;
    }

    ymInit(ymConfig.id, ymInitParams);
    setYMInitialized(true);
  }, [ymConfig]);

  // Отправляем событие о смене страниц
  useEffect(() => {
    if (!ymConfig.enabled || !ymInitialized) {
      return;
    }

    ymHit(ymConfig.id, pathname);
  }, [pathname, ymConfig, ymInitialized]);

  return { ymConfig };
}
