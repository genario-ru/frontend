import { useNavigate, useSearch } from "@tanstack/react-router";
import { debounce } from "es-toolkit";
import { type ChangeEvent, useCallback, useMemo } from "react";

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

  const activeFilters = useSearch({
    from: "/_app/archive",
  });

  const hasActiveFilters = useMemo(
    () => Object.values(activeFilters).some(Boolean),
    [activeFilters],
  );

  const { archiveFiltersData, isArchiveFiltersLoading, isArchiveFiltersError } =
    useGetArchiveFilters();

  const handleApplyArchiveSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      navigate({
        to: "/archive",
        search: {
          ...activeFilters,
          q: event.target.value,
        },
      });
    },
    [navigate, activeFilters],
  );

  const handleApplyArchiveSearchDebounced = debounce(
    handleApplyArchiveSearch,
    1000,
  );

  const handleApplyArchiveFilter = useCallback(
    ({ name, value }: HandleApplyArchiveFilterParams) => {
      navigate({
        to: "/archive",
        search: {
          ...activeFilters,
          [name]: value.length ? value : undefined,
        },
      });
    },
    [navigate, activeFilters],
  );

  const handleDeleteArchiveFilter = useCallback(
    ({ name }: HandleDeleteArchiveFilterParams) => {
      navigate({
        to: "/archive",
        search: {
          ...activeFilters,
          [name]: undefined,
        },
      });
    },
    [navigate, activeFilters],
  );

  const handleResetArchiveFilters = useCallback(() => {
    navigate({
      to: "/archive",
      search: {},
    });
  }, [navigate]);

  return {
    activeFilters,
    archiveFiltersData,
    hasActiveFilters,
    isArchiveFiltersLoading,
    isArchiveFiltersError,
    handleApplyArchiveSearchDebounced,
    handleApplyArchiveFilter,
    handleDeleteArchiveFilter,
    handleResetArchiveFilters,
  };
}
