import { useGetApiV1ArchiveFilters } from "@/codegen/api/product";

export function useGetArchiveFilters() {
  const {
    data: archiveFiltersData,
    isLoading: isArchiveFiltersLoading,
    isError: isArchiveFiltersError,
  } = useGetApiV1ArchiveFilters();

  return {
    archiveFiltersData,
    isArchiveFiltersLoading,
    isArchiveFiltersError,
  };
}
