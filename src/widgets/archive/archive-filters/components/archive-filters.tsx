import { useGetArchiveFilters } from "@/actions/archive/hooks/use-get-archive-filters";

export function ArchiveFilters() {
  const { archiveFiltersData, isArchiveFiltersLoading, isArchiveFiltersError } =
    useGetArchiveFilters();

  return <div>ArchiveFilters</div>;
}
