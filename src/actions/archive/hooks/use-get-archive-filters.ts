import { useQuery } from "@tanstack/react-query";

import { getApiV1ArchiveFiltersQueryOptions } from "@/codegen/api/product";

export function useGetArchiveFilters() {
  const {
    data: archiveFiltersData,
    isLoading: isArchiveFiltersLoading,
    isError: isArchiveFiltersError,
  } = useQuery({
    ...getApiV1ArchiveFiltersQueryOptions(),
  });

  return {
    archiveFiltersData,
    isArchiveFiltersLoading,
    isArchiveFiltersError,
  };
}
