import type { QueryClient } from "@tanstack/react-query";

import type { GetGetSessionData } from "@/codegen/api/auth/types.gen";

export type RouterContext = {
  queryClient: QueryClient;
  sessionData?: GetGetSessionData;
};
