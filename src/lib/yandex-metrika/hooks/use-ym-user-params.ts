import { useEffect } from "react";

import type { AuthenticatedSessionSchema } from "@/codegen/api/product";

import { getYMUserParams } from "../utils/get-ym-user-params";
import { ymUserParams } from "../utils/ym-functions";
import { useYMConfig } from "./use-ym-config";

export function useYMUserParams(sessionData: AuthenticatedSessionSchema) {
  const ymConfig = useYMConfig();

  useEffect(() => {
    if (!ymConfig.enabled) {
      return;
    }

    ymUserParams(ymConfig.id, getYMUserParams(sessionData));
  }, [sessionData, ymConfig]);
}
