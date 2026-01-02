import type { QueryClient } from "@tanstack/react-query";

import type { GetUserData } from "@/codegen/api/auth/types.gen";

export type RouterContext = {
  queryClient: QueryClient;
  userData?: GetUserData;
};
