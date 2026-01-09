import { SearchIcon, XIcon } from "lucide-react";
import { useMemo } from "react";

import { ArchiveFilterSkeleton } from "@/features/archive/archive-filters/components/archive-filter-skeleton";
import { ItemsList } from "@/shared/components/common/items-list";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

import { useArchiveFilters } from "../hooks/use-archive-filters";
import { ArchiveMultiselectFilter } from "./archive-multiselect-filter";
import { ArchiveSelectFilter } from "./archive-select-filter";

export function ArchiveFilters() {
  const {
    activeFilters,
    archiveFiltersData,
    hasActiveFilters,
    isArchiveFiltersLoading,
    handleApplyArchiveSearchDebounced,
    handleApplyArchiveFilter,
    handleResetArchiveFilters,
  } = useArchiveFilters();

  const filters = useMemo(() => {
    if (isArchiveFiltersLoading) {
      return (
        <ItemsList count={8} noParent={true} item={<ArchiveFilterSkeleton />} />
      );
    }

    if (!archiveFiltersData) return null;

    return archiveFiltersData.data.map((filter) => {
      const handleChange = (value: string | string[]) => {
        handleApplyArchiveFilter({
          name: filter.slug,
          value,
        });
      };

      if (filter.type === "multiselect") {
        return (
          <ArchiveMultiselectFilter
            key={filter.slug}
            slug={filter.slug}
            name={filter.name}
            icon={filter.icon}
            options={filter.options}
            currentValues={activeFilters[filter.slug] as string[] | undefined}
            handleChange={handleChange}
          />
        );
      }

      return (
        <ArchiveSelectFilter
          key={filter.slug}
          slug={filter.slug}
          name={filter.name}
          icon={filter.icon}
          options={filter.options}
          currentValue={activeFilters[filter.slug] as string | undefined}
          handleChange={handleChange}
        />
      );
    });
  }, [
    activeFilters,
    archiveFiltersData,
    isArchiveFiltersLoading,
    handleApplyArchiveFilter,
  ]);

  return (
    <div className="flex flex-wrap gap-2">
      <Input
        size="sm"
        Icon={SearchIcon}
        placeholder="Заголовок или описание..."
        defaultValue={activeFilters.q ?? ""}
        onChange={handleApplyArchiveSearchDebounced}
        className="w-60"
        labelClassName="w-fit"
      />
      {filters}
      {hasActiveFilters && (
        <Button size="sm" icon={<XIcon />} onClick={handleResetArchiveFilters}>
          Сбросить
        </Button>
      )}
    </div>
  );
}
