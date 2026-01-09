import { useSearch } from "@tanstack/react-router";

export function useArchiveItemsFilters() {
  const activeFilters = useSearch({
    from: "/_app/archive",
  });

  return {
    activeFilters,
  };
}
