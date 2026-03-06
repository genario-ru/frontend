import { useSearch } from "@tanstack/react-router";

export function useArchiveItemsFilters() {
  const activeFilters = useSearch({
    from: "/_with-auth/_with-subscription/archive",
  });

  return {
    activeFilters,
  };
}
