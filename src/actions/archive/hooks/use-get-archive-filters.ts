import { useQuery } from "@tanstack/react-query";

import { getApiV1ArchiveFiltersOptions } from "@/codegen/api/product/@tanstack/react-query.gen";

export function useGetArchiveFilters() {
  const {
    data: archiveFiltersData,
    isLoading: isArchiveFiltersLoading,
    isError: isArchiveFiltersError,
  } = useQuery({
    ...getApiV1ArchiveFiltersOptions(),
  });

  return {
    archiveFiltersData,
    isArchiveFiltersLoading,
    isArchiveFiltersError,
  };
}
