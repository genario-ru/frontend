import { useGetMyArchiveItems } from "@/actions/archive/hooks/use-get-my-archive-items";

import { useArchiveItemsFilters } from "./use-archive-items-filters";

export function useArchiveItems() {
  const { activeFilters } = useArchiveItemsFilters();

  const {
    archiveItemsData,
    hasNextArchiveItemsPage,
    isLoadingArchiveItems,
    isErrorArchiveItems,
    isFetchingNextArchiveItemsPage,
    fetchNextArchiveItemsPage,
  } = useGetMyArchiveItems(activeFilters);

  return {
    archiveItemsData,
    hasNextArchiveItemsPage,
    isLoadingArchiveItems,
    isErrorArchiveItems,
    isFetchingNextArchiveItemsPage,
    fetchNextArchiveItemsPage,
  };
}
