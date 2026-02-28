import type { QueryClient } from "@tanstack/react-query";

import type { GetSession200 } from "@/codegen/api/auth";

export type RouterContext = {
  queryClient: QueryClient;
  sessionData?: GetSession200;
};
