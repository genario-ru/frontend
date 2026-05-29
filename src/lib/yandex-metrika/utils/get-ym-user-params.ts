import type { AuthenticatedSessionSchema } from "@/codegen/api/product";

import type { YMUserParams } from "../types/ym-user-params";

export function getYMUserParams({
  user,
}: AuthenticatedSessionSchema): YMUserParams {
  return {
    UserID: user.id,
  };
}
