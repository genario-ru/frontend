import { useQuery } from "@tanstack/react-query";

import { getApiV1TemplatesOptions } from "@/codegen/api/product/@tanstack/react-query.gen";

export function useGetTemplates() {
  const { data: templatesData, isLoading: isTemplatesLoading } = useQuery({
    ...getApiV1TemplatesOptions(),
  });

  return {
    templatesData,
    isTemplatesLoading,
  };
}
