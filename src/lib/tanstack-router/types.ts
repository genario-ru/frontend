import type { QueryClient } from "@tanstack/react-query";

import type { GetApiV1AuthSessionQueryResponse } from "@/codegen/api/product";

export type RouterContext = {
  queryClient: QueryClient;
  sessionData?: GetApiV1AuthSessionQueryResponse;
};
