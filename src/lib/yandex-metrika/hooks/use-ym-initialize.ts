import { useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { ymInitParams } from "../constants/ym-init-params";
import { ymHit, ymInit } from "../utils/ym-functions";
import { useYMConfig } from "./use-ym-config";

export function useYMInitialize() {
  const ymConfig = useYMConfig();
  const { pathname } = useLocation();
  const [ymInitialized, setYMInitialized] = useState(false);

  // Инициализируем счётчик после согласия на использование Cookie файлов
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
}
