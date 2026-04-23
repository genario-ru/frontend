import { useCallback, useMemo } from "react";

import type { ArchiveFilterSchema } from "@/codegen/api/product";

import { useArchiveFilters } from "../hooks/use-archive-filters";
import { ArchiveMultiselectFilter } from "./archive-multiselect-filter";
import { ArchiveSelectFilter } from "./archive-select-filter";

type ArchiveFilterProps = {
  filter: ArchiveFilterSchema;
};

export function ArchiveFilter({ filter }: ArchiveFilterProps) {
  const { activeFilters, handleApplyArchiveFilter } = useArchiveFilters();

  const handleChange = useCallback(
    (value: string | string[]) => {
      handleApplyArchiveFilter({
        name: filter.slug,
        value,
      });
    },
    [filter.slug, handleApplyArchiveFilter],
  );

  const currentValues = useMemo(() => {
    return activeFilters[filter.slug];
  }, [activeFilters, filter.slug]);

  if (filter.type === "multiselect") {
    return (
      <ArchiveMultiselectFilter
        key={filter.slug}
        slug={filter.slug}
        name={filter.name}
        icon={filter.icon}
        options={filter.options}
        currentValues={currentValues as string[] | undefined}
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
      currentValue={currentValues as string | undefined}
      handleChange={handleChange}
    />
  );
}
