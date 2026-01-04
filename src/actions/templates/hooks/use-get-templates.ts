import { useQuery } from "@tanstack/react-query";

import { getApiV1TemplatesOptions } from "@/codegen/api/product/@tanstack/react-query.gen";

export function useGetTemplates() {
  return useQuery({
    ...getApiV1TemplatesOptions(),
  });
}
