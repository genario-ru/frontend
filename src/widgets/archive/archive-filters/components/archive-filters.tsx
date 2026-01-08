import { SearchIcon, XIcon } from "lucide-react";
import { useMemo } from "react";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

import { useArchiveFilters } from "../hooks/use-archive-filters";
import { ArchiveMultiselectFilter } from "./archive-multiselect-filter";

export function ArchiveFilters() {
  const {
    activeFilters,
    archiveFiltersData,
    hasActiveFilters,
    // isArchiveFiltersLoading,
    // isArchiveFiltersError,
    handleApplyArchiveSearchDebounced,
    handleApplyArchiveFilter,
    // handleDeleteArchiveFilter,
    handleResetArchiveFilters,
  } = useArchiveFilters();

  const filters = useMemo(() => {
    if (!archiveFiltersData) return null;

    return archiveFiltersData.data.map((filter) => {
      if (filter.type === "multiselect") {
        const handleChange = (value: string | string[]) => {
          handleApplyArchiveFilter({
            name: filter.slug,
            value,
          });
        };

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
    });
  }, [activeFilters, archiveFiltersData, handleApplyArchiveFilter]);

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
