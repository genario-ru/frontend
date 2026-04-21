import { useNavigate, useSearch } from "@tanstack/react-router";
import { useCallback, useMemo } from "react";

import { useGetArchiveFilters } from "@/actions/archive/hooks/use-get-archive-filters";

type HandleApplyArchiveFilterParams = {
  name: string;
  value: string | string[];
};

type HandleDeleteArchiveFilterParams = {
  name: string;
};

export function useArchiveFilters() {
  const navigate = useNavigate();

  const { q: _searchQuery, ...activeFilters } = useSearch({
    from: "/_with-auth/_with-subscription/archive",
  });

  const hasActiveFilters = useMemo(
    () => Object.values(activeFilters).some(Boolean),
    [activeFilters],
  );

  const { archiveFiltersData, isArchiveFiltersLoading, isArchiveFiltersError } =
    useGetArchiveFilters();

  const handleApplyArchiveFilter = useCallback(
    ({ name, value }: HandleApplyArchiveFilterParams) => {
      navigate({
        to: "/archive",
        search: (prev) => ({
          ...prev,
          [name]: value.length ? value : undefined,
        }),
        replace: true,
      });
    },
    [navigate],
  );

  const handleDeleteArchiveFilter = useCallback(
    ({ name }: HandleDeleteArchiveFilterParams) => {
      navigate({
        to: "/archive",
        search: (prev) => ({
          ...prev,
          [name]: undefined,
        }),
        replace: true,
      });
    },
    [navigate],
  );

  const handleResetArchiveFilters = useCallback(() => {
    navigate({
      to: "/archive",
      search: ({ q }) => ({ q }),
      replace: true,
    });
  }, [navigate]);

  return {
    activeFilters,
    archiveFiltersData,
    hasActiveFilters,
    isArchiveFiltersLoading,
    isArchiveFiltersError,
    handleApplyArchiveFilter,
    handleDeleteArchiveFilter,
    handleResetArchiveFilters,
  };
}
