import { useQuery } from "@tanstack/react-query";

import { getApiV1ProfilesMyOptions } from "@/codegen/api/product/@tanstack/react-query.gen";

export function useGetMyProfiles() {
  return useQuery({
    ...getApiV1ProfilesMyOptions(),
  });
}
