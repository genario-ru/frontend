import { useQuery } from "@tanstack/react-query";

import { getGetSessionOptions } from "@/codegen/api/auth/@tanstack/react-query.gen";

export function useGetSession() {
  return useQuery({
    ...getGetSessionOptions(),
  });
}
